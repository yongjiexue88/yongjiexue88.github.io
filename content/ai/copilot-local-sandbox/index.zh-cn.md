---
title: "Copilot 进了沙箱：AI 的安全，不能押在模型的人品上"
date: 2026-10-07
authors: [yongjie]
summary: >
  GitHub Copilot 本地沙箱今天正式 GA。真正的新闻不是"又多了一个沙箱"，而是三件事：沙箱和模型解耦、底层引擎开源、企业可以强制开启。Agent 安全正在从产品功能，变成操作系统的基础设施。
tags: [AI, Agent, 安全]
---

> **管住 Agent 的，不该是提示词，而是操作系统。**

2026 年 10 月 7 日，GitHub 宣布 Copilot 的[本地沙箱正式 GA](https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available/)。覆盖 Copilot CLI、Copilot 桌面 App，以及 VS Code 里基于 Agent Host 的会话。Copilot 发起的命令和工具，会在一个受限的执行边界里运行：能读写哪些目录、能不能上网、能不能连内网、能不能碰 Git 和 `gh` 的凭据，都由开发者或者组织的策略说了算。

不额外收钱，包含在 Copilot 订阅里。

乍一看，这是一条一分钟就能读完的 changelog。但我觉得它值得多说几句，因为里面藏着整个 AI 编程工具行业正在形成的一条共识。

---

## 先说清楚：沙箱管的是什么

过去一年，Agent 的能力涨得飞快，权限模型却基本停留在"每条命令弹个窗问你"的阶段。说白了，**弹窗不是安全机制，是甩锅机制**。点到第五十次"允许"的时候，没人还在认真看命令内容。于是大家纷纷打开 YOLO 模式，让 Agent 拿着你的完整用户权限裸奔。

殷鉴不远。2025 年 7 月，SaaStr 创始人 Jason Lemkin 用 Replit 的 Agent 做 vibe coding 实验，在明确要求代码冻结的情况下，[Agent 还是删掉了生产数据库](https://www.eweek.com/news/replit-ai-coding-assistant-failure/)。指令写得再清楚也没用，因为指令只是上下文里的几行字，而 `rm` 和 `DROP` 是真实的系统调用。

沙箱换了一个思路：**不问 Agent 想不想做，直接让它做不到。**

按 GitHub 的[文档](https://docs.github.com/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes)，Copilot 本地沙箱可以：

| 维度 | 能管什么 |
|---|---|
| 文件系统 | 只读路径、读写路径、禁止访问的路径 |
| 网络 | 外网、本地网络，按主机名放行或拦截 |
| 凭据 | 沙箱里能不能用 Git 和 `gh` 的凭据，macOS 钥匙串 |
| 子进程 | 本地 MCP Server、语言服务器默认一起关进去 |
| 例外 | 单条命令申请出沙箱，需要你批准 |

在 CLI 里一行 `/sandbox enable` 就能打开，之后的会话一直生效。

---

## 真正的新闻：三个"解耦"

平心而论，本地沙箱不是 GitHub 发明的。OpenAI Codex CLI 的官方文档写得很清楚，[默认就跑在 `workspace-write` 沙箱里](https://developers.openai.com/codex/security)，断网、只能改工作区；Claude Code 也有 [`/sandbox`](https://code.claude.com/docs/en/sandboxing)，同样是 macOS 用 Seatbelt、Linux 用 bubblewrap。Copilot 在这件事上，算是后来者。

但后来者的打法不一样。我看到的是三个解耦。

### 1. 沙箱和模型解耦

changelog 里有一句话很容易被略过：**模型执行和工具隔离是分开的，无论 Copilot 用哪个模型，沙箱策略都作用在工具执行上。**

这句话对 Copilot 格外重要，因为 Copilot 是个多模型平台，今天跑 GPT，明天跑 Claude，后天跑 Gemini。你不可能挨个去评估每个模型"乖不乖"。所以 GitHub 干脆不评估：**模型负责想，操作系统负责管。**

这才是正确的分层。安全不能押在模型的人品上。

### 2. 引擎和产品解耦

沙箱的底层是 [Microsoft eXecution Container（MXC）](https://github.com/microsoft/mxc)，MIT 协议开源，提供 Rust、.NET、Node 三套 SDK。它把一份通用的 JSON 沙箱策略，翻译成三大操作系统各自的原生机制：macOS 用 Seatbelt，Linux 默认 bubblewrap，Windows 默认 processcontainer，另外还挂着 microVM、Hyperlight 之类的实验后端。

出手的其实不是 GitHub，是微软。

注意 Windows 这一格。Claude Code 的文档明确写着[不支持原生 Windows](https://code.claude.com/docs/en/sandboxing)，要跑沙箱得进 WSL2。而 Windows 恰恰是微软的主场，也是大量企业开发者的桌面。**谁掌握操作系统，谁就最有资格定义 Agent 的围栏。**

### 3. 策略和个人解耦

企业可以通过服务端、MDM 或文件形式的托管配置，**强制开启沙箱，并且禁止开发者放松策略**。更狠的是 fail-closed：托管配置同时设了 `sandbox.enabled` 和 `sandbox.failIfUnavailable` 为 `true` 时，如果当前机器没法执行沙箱，CLI 会直接拒绝调用模型和执行工具。

有意思的是，Claude Code 里也有一个同名的 `sandbox.failIfUnavailable` 配置。两家的配置名都撞上了，说明这个行业已经在收敛到同一套语言：**沙箱不再是开发者的个人偏好，而是组织的合规底线。**

---

## 沙箱不是银弹

说完好话，也得泼点冷水。GitHub 自己的文档里，限制条件写得挺老实：

- **默认是关的。** 不开沙箱，Shell 命令照样拿着你的完整用户权限跑。
- **内置文件工具在进程内运行**，OS 沙箱管不到，只能"尽力而为"地检查策略。
- **远程 MCP Server 永远不进沙箱。**
- Windows 上的网络管控依赖程序自觉遵守代理设置，直连没法像 macOS 和 Linux 那样硬拦。
- Linux 上 bubblewrap 没法单独管住子进程的本地网络访问。

更值得警惕的是今年 7 月 Pillar Security 发的系列研究 [《The Week of Sandbox Escapes》](https://www.pillar.security/blog/the-week-of-sandbox-escapes)。他们在 Cursor、Codex CLI、Gemini CLI 和 Antigravity 上找到了一串沙箱绕过，其中一个是[通过 Docker socket 逃逸](https://www.pillar.security/blog/one-docker-socket-to-rule-them-all-escaping-codex-cursor-and-gemini-clis-sandboxes)。核心观点一针见血：**Agent 根本不需要打破沙箱，只要它能写下一个文件，而这个文件稍后会被沙箱外的可信组件执行就够了。** 工作区配置、虚拟环境、Git 元数据、本地守护进程，全是现成的跳板。

所以沙箱的边界，从来不是一个进程的边界，而是**"Agent 写下的东西，最终会被谁信任"**的边界。MXC 有没有把这些路径都堵上，GA 的那一刻并不能回答，得靠接下来几个月安全研究员的检验。

---

## 谁赢谁输

**赢家是企业 IT 和安全团队。** 他们终于可以对 CISO 说：Agent 可以用，但跑在我们定的围栏里，开发者关不掉。Copilot 在企业市场本来就靠合规吃饭，这一步是顺着自己的长板走。

**压力给到了只做单点工具的厂商。** 当沙箱策略变成企业统一下发、跨工具执行的东西，"我家的沙箱更好用"就不再是卖点，"能不能接入企业现有的管控体系"才是。

**开发者是半个赢家。** 安全的 YOLO 模式终于有了可能：在沙箱里放手让 Agent 跑，比每条命令点"允许"既快又安全。前提是你真的把它打开。

---

## 尾声

本站《[AI Agent 的操作系统时刻](/ai/agent-os/)》一文打过一个比方：LLM 是新 CPU，Agent 是新应用。按这个类比，今天这条新闻就是**内存保护**的那一刻。

DOS 时代，任何程序都能写任何地址，一个程序崩了，整台机器跟着崩。后来有了保护模式，操作系统才真正成为操作系统。

我立一个可以被打脸的 flag：**两年内，"Agent 默认在沙箱里运行"会成为所有主流编程工具的出厂设置，而不是一个需要手动开启的选项。** Codex 已经这么做了，Copilot 还差最后一步。

你的 Agent，现在还在裸奔吗？

### 参考链接

1. [GitHub Changelog：Local sandboxing for GitHub Copilot now generally available](https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available/)
2. [GitHub Docs：About cloud and local sandboxes for GitHub Copilot](https://docs.github.com/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes)
3. [microsoft/mxc：Microsoft eXecution Container](https://github.com/microsoft/mxc)
4. [OpenAI：Codex Security](https://developers.openai.com/codex/security)
5. [Claude Code Docs：Sandboxing](https://code.claude.com/docs/en/sandboxing)
6. [Pillar Security：The Week of Sandbox Escapes](https://www.pillar.security/blog/the-week-of-sandbox-escapes)
7. [eWeek：AI Agent Wipes Production Database, Then Lies About It](https://www.eweek.com/news/replit-ai-coding-assistant-failure/)
