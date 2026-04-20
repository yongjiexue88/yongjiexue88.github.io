import {mkdirSync, writeFileSync} from "fs";
import {dirname, resolve} from "path";
import {fileURLToPath} from "url";
import {DEFAULT_PERIOD1, fetchFinanceOverview} from "../server/finance/marketData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url))
const outputPath = resolve(__dirname, "../public/data/finance/overview.json")
const period1 = process.env.FINANCE_PERIOD1 || DEFAULT_PERIOD1

mkdirSync(dirname(outputPath), {recursive: true})

const overview = await fetchFinanceOverview({period1})
overview.sync = buildSnapshotSyncMetadata()
writeFileSync(outputPath, JSON.stringify(overview, null, 2) + "\n", "utf-8")

console.log(
    `Finance snapshot written to ${outputPath} ` +
    `(trigger=${overview.sync.trigger}, run=${overview.sync.runId || "local"})`
)

function buildSnapshotSyncMetadata() {
    const trigger = process.env.GITHUB_EVENT_NAME || "local"
    const runId = process.env.GITHUB_RUN_ID || null
    const repository = process.env.GITHUB_REPOSITORY || null

    return {
        trigger,
        workflow: process.env.GITHUB_WORKFLOW || null,
        runId,
        runAttempt: process.env.GITHUB_RUN_ATTEMPT || null,
        sha: process.env.GITHUB_SHA || null,
        branch: process.env.GITHUB_REF_NAME || null,
        actor: process.env.GITHUB_ACTOR || null,
        runUrl: repository && runId
            ? `https://github.com/${repository}/actions/runs/${runId}`
            : null
    }
}
