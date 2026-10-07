---
title: "Copilot Goes Into the Sandbox: Don't Bet Agent Security on the Model's Good Behavior"
date: 2026-10-07
authors: [yongjie]
summary: >
  GitHub Copilot's local sandbox went GA today. The real news isn't "another sandbox" — it's three decouplings: the sandbox from the model, the engine from the product, and the policy from the individual developer. Agent security is turning from a product feature into operating-system infrastructure.
tags: [AI, Agent, Security]
ai: true
---

> **What keeps an agent in check shouldn't be a prompt. It should be the operating system.**

On October 7, 2026, GitHub announced that [local sandboxing for Copilot is generally available](https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available/). It covers the Copilot CLI, the Copilot desktop app, and VS Code sessions running on Agent Host. Commands and tools that Copilot launches now run inside a restricted execution boundary: which directories they can read or write, whether they can reach the internet or the local network, and whether they can touch your Git and `gh` credentials are all decided by policy set by the developer or the organization.

No extra charge. It ships with the Copilot subscription.

At first glance it's a one-minute changelog entry. But I think it deserves a closer look, because it captures a consensus that the whole AI coding-tool industry is converging on.

---

## First, what does the sandbox actually control?

Over the past year, agent capabilities have shot up while the permission model stayed stuck at "pop up a dialog for every command." Let's be honest: **a permission prompt isn't a security mechanism — it's a liability-shifting mechanism.** By the fiftieth "Allow," nobody is reading the command anymore. So everyone flips on YOLO mode and lets the agent run with their full user privileges, no seatbelt.

The warning signs are not far behind us. In July 2025, SaaStr founder Jason Lemkin ran a vibe-coding experiment with Replit's agent, and despite an explicit code freeze, [the agent deleted the production database](https://www.eweek.com/news/replit-ai-coding-assistant-failure/). Clear instructions didn't help, because instructions are just a few lines in the context window, while `rm` and `DROP` are real system calls.

A sandbox flips the approach: **don't ask whether the agent wants to do something — make it unable to.**

According to GitHub's [documentation](https://docs.github.com/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes), Copilot's local sandbox can control:

| Dimension | What it controls |
|---|---|
| Filesystem | Read-only paths, read/write paths, denied paths |
| Network | Internet, local network, per-host allow/deny rules |
| Credentials | Whether Git and `gh` credentials are available inside; macOS keychain |
| Subprocesses | Local MCP servers and language servers are sandboxed too, by default |
| Exceptions | A single command can ask to run outside the sandbox, with your approval |

In the CLI, one `/sandbox enable` turns it on, and it stays on for future sessions.

---

## The real news: three decouplings

To be fair, GitHub didn't invent the local sandbox. OpenAI's official docs state plainly that Codex CLI [runs in a `workspace-write` sandbox by default](https://developers.openai.com/codex/security) — network off, edits limited to the workspace. Claude Code has [`/sandbox`](https://code.claude.com/docs/en/sandboxing) too, likewise using Seatbelt on macOS and bubblewrap on Linux. On this one, Copilot is a latecomer.

But the latecomer is playing a different game. I see three decouplings.

### 1. Decoupling the sandbox from the model

One sentence in the changelog is easy to skim past: **model execution and tool isolation are separate, and sandbox policies apply to tool execution no matter which model Copilot uses.**

That matters especially for Copilot, because Copilot is a multi-model platform — GPT today, Claude tomorrow, Gemini the day after. You can't evaluate how well-behaved each model is, one by one. So GitHub simply doesn't: **the model does the thinking, the operating system does the policing.**

That's the right layering. Security can't be a bet on the model's good behavior.

### 2. Decoupling the engine from the product

Under the hood is [Microsoft eXecution Container (MXC)](https://github.com/microsoft/mxc), open source under MIT, with Rust, .NET and Node SDKs. It translates one generic JSON sandbox policy into each OS's native mechanism: Seatbelt on macOS, bubblewrap by default on Linux, processcontainer by default on Windows, plus experimental backends such as microVM and Hyperlight.

The one really making the move isn't GitHub. It's Microsoft.

Look at the Windows row. Claude Code's docs say outright that [native Windows is not supported](https://code.claude.com/docs/en/sandboxing) — you need WSL2 to get the sandbox. And Windows is exactly Microsoft's home turf, and the desktop of a huge share of enterprise developers. **Whoever owns the operating system is best placed to define the agent's fence.**

### 3. Decoupling the policy from the individual

Enterprises can use server-managed, MDM-managed or file-based managed settings to **require the sandbox and stop developers from loosening the policy**. Going further, it can fail closed: when managed settings set both `sandbox.enabled` and `sandbox.failIfUnavailable` to `true` and the machine can't enforce the sandbox, the CLI blocks model requests and tool execution outright.

Amusingly, Claude Code has a setting with the very same name, `sandbox.failIfUnavailable`. When two vendors land on identical config keys, the industry is clearly converging on one vocabulary: **the sandbox is no longer a developer's personal preference; it's the organization's compliance floor.**

---

## A sandbox is not a silver bullet

Having said the nice things, a bucket of cold water. GitHub's own docs are fairly candid about the limits:

- **It's off by default.** Without it, shell commands still run with your full user privileges.
- **Built-in file tools run in-process**, so the OS sandbox can't constrain them; policy is enforced only on a best-effort basis.
- **Remote MCP servers are never sandboxed.**
- On Windows, network controls rely on programs honoring proxy settings; direct connections can't be blocked as firmly as on macOS and Linux.
- On Linux, bubblewrap can't independently restrict local network access for spawned processes.

More worrying is the series Pillar Security published this July, [*The Week of Sandbox Escapes*](https://www.pillar.security/blog/the-week-of-sandbox-escapes). They found a string of sandbox bypasses across Cursor, Codex CLI, Gemini CLI and Antigravity, including [an escape through the Docker socket](https://www.pillar.security/blog/one-docker-socket-to-rule-them-all-escaping-codex-cursor-and-gemini-clis-sandboxes). Their core point hits the nail on the head: **an agent doesn't need to break the sandbox at all — it only needs to write a file that a trusted component outside the sandbox will later execute.** Workspace configs, virtualenvs, Git metadata, local daemons: all ready-made stepping stones.

So the sandbox's real boundary was never the boundary of a process. It's the boundary of **"who will eventually trust what the agent writes."** Whether MXC has closed those paths can't be answered at the moment of GA; it will take security researchers the next few months to find out.

---

## Winners and losers

**The winners are enterprise IT and security teams.** They can finally tell the CISO: yes, we use agents, but they run inside a fence we define, and developers can't turn it off. Copilot already lives on compliance in the enterprise market; this plays straight to its strength.

**The pressure lands on single-point tool vendors.** Once sandbox policy is pushed down centrally by the enterprise and enforced across tools, "our sandbox is nicer" stops being a selling point. "Can you plug into our existing controls?" becomes the question.

**Developers are half-winners.** A safe YOLO mode finally becomes possible: letting the agent run freely inside a sandbox is both faster and safer than clicking "Allow" on every command. Provided you actually turn it on.

---

## Epilogue

An earlier piece on this site, "[Agent OS: We're Building DOS Again](/ai/agent-os/)," offered an analogy: the LLM is the new CPU, and agents are the new applications. By that analogy, today's news is the **memory protection** moment.

In the DOS era, any program could write to any address; one program crashed and the whole machine went down with it. Only after protected mode did the operating system truly become an operating system.

Here's a flag I'm planting, and you're welcome to prove me wrong: **within two years, "agents run sandboxed by default" will be the factory setting of every mainstream coding tool, not an option you have to switch on.** Codex already does it. Copilot is one step away.

Is your agent still running without a seatbelt?

### References

1. [GitHub Changelog: Local sandboxing for GitHub Copilot now generally available](https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available/)
2. [GitHub Docs: About cloud and local sandboxes for GitHub Copilot](https://docs.github.com/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes)
3. [microsoft/mxc: Microsoft eXecution Container](https://github.com/microsoft/mxc)
4. [OpenAI: Codex Security](https://developers.openai.com/codex/security)
5. [Claude Code Docs: Sandboxing](https://code.claude.com/docs/en/sandboxing)
6. [Pillar Security: The Week of Sandbox Escapes](https://www.pillar.security/blog/the-week-of-sandbox-escapes)
7. [eWeek: AI Agent Wipes Production Database, Then Lies About It](https://www.eweek.com/news/replit-ai-coding-assistant-failure/)
