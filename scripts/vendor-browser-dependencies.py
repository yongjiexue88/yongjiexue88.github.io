#!/usr/bin/env python3
"""Restore pinned browser overrides, or audit them and the theme against npm."""

import argparse
import base64
import hashlib
import io
import json
from pathlib import Path
import re
import subprocess
import tarfile
import tempfile
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parents[1]
LOCK = ROOT / "scripts/browser-dependencies.json"


def download(url):
    with urlopen(url, timeout=60) as response:
        return response.read()


def archive(package):
    content = download(package["source"])
    algorithm, expected = package["integrity"].split("-", 1)
    actual = base64.b64encode(hashlib.new(algorithm, content).digest()).decode()
    if actual != expected:
        raise ValueError(f"Integrity mismatch for {package['name']}")
    return tarfile.open(fileobj=io.BytesIO(content), mode="r:gz")


def write_member(bundle, source, destination):
    content = bundle.extractfile(source).read()
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(content)


def sync(packages):
    by_name = {package["name"]: package for package in packages}
    for package in packages:
        if not package["files"]:
            continue
        with archive(package) as bundle:
            for source, target in package["files"].items():
                if source.endswith("/"):
                    for member in bundle.getmembers():
                        if member.isfile() and member.name.startswith(source):
                            write_member(bundle, member.name, ROOT / target / member.name[len(source):])
                else:
                    write_member(bundle, source, ROOT / target)
        print(f"Restored {package['name']} {package['version']}")

    # Rebuild the SVG loader with current idb-keyval rather than copying its
    # published bundle, which still embeds the older 6.2.0 dependency.
    with tempfile.TemporaryDirectory(prefix="site-svg-loader-") as directory:
        work = Path(directory)
        with archive(by_name["external-svg-loader"]) as bundle:
            for member in bundle.getmembers():
                if member.isfile() and (member.name == "package/svg-loader.js" or member.name.startswith("package/lib/")):
                    write_member(bundle, member.name, work / member.name.removeprefix("package/"))
        with archive(by_name["idb-keyval"]) as bundle:
            write_member(bundle, "package/dist/index.js", work / "idb-keyval.js")
        source = work / "svg-loader.js"
        source.write_text(source.read_text().replace("'idb-keyval'", "'./idb-keyval.js'").replace('"idb-keyval"', '"./idb-keyval.js"'))
        output = ROOT / "assets/third_party/external-svg-loader/svg-loader.min.js"
        subprocess.run([
            "npx", "--yes", f"esbuild@{by_name['esbuild']['version']}", str(source),
            "--bundle", "--minify", "--format=iife", "--target=es2020", f"--outfile={output}",
        ], cwd=work, check=True)
    print(f"Bundled external-svg-loader with idb-keyval {by_name['idb-keyval']['version']}")


def check(packages):
    theme_version = re.search(r"github.com/pgsty/oink\s+(\S+)", (ROOT / "go.mod").read_text()).group(1)
    theme = json.loads(download(f"https://raw.githubusercontent.com/pgsty/oink/{theme_version}/VENDOR.json"))
    versions = {package["name"]: package["version"] for package in theme["dependencies"]}
    versions.update({package["name"]: package["version"] for package in packages})
    outdated = False
    for name, version in sorted(versions.items()):
        latest = json.loads(download(f"https://registry.npmjs.org/{name}/latest"))["version"]
        status = "current" if latest == version else f"update available: {latest}"
        print(f"{name} {version}: {status}")
        outdated |= latest != version
    return int(outdated)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Check latest releases without changing files")
    args = parser.parse_args()
    locked = json.loads(LOCK.read_text())["packages"]
    if args.check:
        raise SystemExit(check(locked))
    sync(locked)
