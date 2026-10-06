---
name: blog-post
description: Write a new article for this Hugo site (yongjiexue.io) from a one-line idea, rough notes, or a source article/URL — in the site's house style, as a bilingual zh-cn + en page bundle, filed under the right category with tags and a featured image. Use whenever the user says "write a post/article about…", "turn this into a blog post", "repost/translate this article", or hands over a topic, link, or draft meant for the site.
---

# Blog post — house style and publishing workflow

This profile was distilled from the site's 571 bilingual article bundles (Oct 2026): ~412 technical columns by `vonng` (reposted under CC BY 4.0), 15 personal/study posts by `yongjie` (the site owner), and ~40 by guest authors. The house style below is the column style; the personal style is recorded separately because it is genuinely different. Quoted fragments are style samples, not text to reuse.

## 0. Ground rules (read first)

- **New original posts are by `yongjie`.** The column voice is borrowed; the identity is not. Never write as “老冯”, never claim Pigsty / PGEXT / Silo / vonng's talks, group chats, purchases, or history as the author's own, and never add a `利益相关` disclosure that isn't true for the user.
- **Generated articles never name Vonng.** No “Vonng”, “老冯”, “冯若航”, or vonng.com anywhere in the text — the only name on the piece is the user's: `authors: [yongjie]`, which renders as 薛永杰 / Yongjie Xue. If the text ever needs the author's name, use 薛永杰 (zh) / Yongjie Xue (en). When linking to an existing post on this site (most are vonng's), cite it by title only — 本站《标题》一文 / “an earlier piece on this site, ‘Title’” — never “我在《…》里写过”, which would claim someone else's work. Exception: a repost/translation of a vonng article keeps `authors: [vonng]`, because the CC BY license requires the credit.
- **Never fabricate.** No invented first-person experiences, quotes, numbers, dates, prices, benchmarks, or sources. When the user gives only one line, research the facts (WebSearch/WebFetch), cite them as inline links, and list anything you could not verify in your reply to the user — not in the article.
- **Reposts/translations keep the original author.** `authors: [<original-author-slug>]`, an `origin:` URL, the `翻译` tag, and a first-line blockquote pointing to the original. Only translate content whose license allows it (CC BY etc.) or that the user confirms they may republish.
- **Show, don't ship.** Create the files and show the user the result; never commit, push, or publish without an explicit yes.

## 1. Pick the mode from the input

| Input | Mode | Voice | Author |
|---|---|---|---|
| One line / topic / opinion about tech, AI, DB, cloud | **Column** (original) | House column style (§3) | `yongjie` |
| A news item or announcement + "what do you think" | **Column — news commentary** | §3, news shape | `yongjie` |
| Someone else's article/URL + "repost/translate" | **Translation** | Faithful; light house polish only | original author |
| Personal reflection, life, family, money, health | **Personal essay** | Personal style (§4) | `yongjie` |
| Material to study (newspaper, transcripts, vocab) | **Study notes** | Notes shape (§4) | `yongjie` |

If the mode is genuinely ambiguous, ask one question; otherwise decide and say which mode you chose.

## 2. Pick the category (section) and tags

| Section | zh / en column name | What goes here | Common tags (zh → en) |
|---|---|---|---|
| `ai/` | AI 探路者 / AI Explorer | AI, agents, LLMs, coding agents (Claude, Codex), AI × DB, AI and society/philosophy | AI, Agent, 大模型→LLM, Claude, Codex, 软件工程→Software Engineering, 开源→Open Source, 哲学→Philosophy, 社会观察 |
| `cloud/` | 云计算泥石流 / Cloud-Exiter | Cloud cost, leaving the cloud, self-hosting, cloud outages and post-mortems, vendor criticism | 云计算→Cloud, 下云→Cloud Exit, 故障复盘→Post-mortem, 阿里云, AWS, 成本→Cost, 数据主权 |
| `db/` | 数据库老司机 / Database Guru | Database industry news, acquisitions, surveys, DB comparisons, architecture opinion, OS/infra adjacent (Linux, storage) | 数据库→Database, 技术评论→Tech Review, PostgreSQL, MySQL, 开源, OLAP, 对象存储, 国产数据库, 架构 |
| `pg/` | PostgreSQL 大法师 / PostgreSQL | PostgreSQL itself: releases, extensions, administration, tuning, internals, ecosystem, how-tos | PostgreSQL, PG管理→PG Admin, PG生态→PG Ecosystem, PG开发→PG Dev, 扩展→Extension, 性能 |
| `misc/` | 人生旅途 / Miscellaneous | Personal essays, reflections, study notes, English learning, reading notes, anything not (only) technical | 随笔→Essay, 反思→reflection, 英语写作→english-writing, 词汇→vocabulary, 报刊英语→newspaper, 研读手册 |
| `trip/` | — | Travel (only a template exists) | — |

Routing rules: PostgreSQL-specific → `pg` even if it touches AI; a DB-industry/business story → `db`; anything whose core is cost/sovereignty/outage of a cloud → `cloud`; AI with no DB/cloud core → `ai`. Use 2–5 tags, reuse existing ones (grep `content/<section>/*/index.zh-cn.md` for `^tags:`) before inventing new ones. Tag casing: column posts use bare `[AI, Agent]` lists; `yongjie`'s posts use quoted lowercase English tags in the en file (`["reflection", "family"]`).

## 3. House column style (zh-cn first)

The column voice is a sharp, opinionated industry commentator: confident, funny, concrete, and argument-driven. Chinese is the primary language; write zh-cn first, then the English version.

**How it writes (overall)**
- **Leads with the thesis.** The first paragraph (or a one-line blockquote above it) states the conclusion; background comes after. E.g. a post opens by restating its summary line, then `---`, then section one.
- **Short, punchy paragraphs.** Median ~50 Chinese characters per paragraph, ~29 characters per sentence. One idea per paragraph; frequent one-sentence paragraphs for emphasis.
- **Bold carries the argument.** About 8–9 bold spans per 1,000 characters. Bold the thesis, the aphorism, the key number — often a whole bold one-line paragraph (`**状态在哪里，锁链就在哪里。**`). Never bold decoratively.
- **Aphoristic parallelism.** Closes arguments with balanced, quotable pairs or chains: “租云，是裸奔的空头敞口；买硬件，是对冲”; “没有…，就没有…；没有…，就没有…”.
- **Concrete over abstract.** Dates, dollar figures, version numbers, named companies and people, each linked to a source inline. Analogies from everyday life (hotel bedsheets, ducks in a rainforest, feudal ranks) make technical points land.
- **Colloquial, lively Chinese.** Internet idioms and four-character phrases mixed into technical prose: 说白了 / 说穿了 / 说到底, 平心而论, 殷鉴不远, 齐活了, 赚麻了, 草台班子, 双叒叕, 拉胯. Rhetorical questions to pivot (“这算什么问题？”). Exclamation marks are rare (<1 per 1,000 chars); confidence comes from wording, not punctuation.
- **First person, conversational.** 我 appears throughout; addresses the reader as 你; makes falsifiable predictions (“我在这里立一个可以被打脸的 flag”).
- **Takes a side.** Criticizes vendors and hype by name, but adds a 平心而论 paragraph that steelmans the other side before landing the verdict.

**Shapes**
- *Opinion / essay* (the default): thesis opener → 4–9 `##` sections with punchy titles (sometimes numbered `## 一、…`, ~15% of posts) separated by `---` → ends on a callback line or a one-line question to the reader (“你呢？”).
- *News commentary*: what happened (date, who, numbers) in two paragraphs → `## 时间点` / why-now → the hidden angle (“出手的不是 X，是 Y”) → historical pattern (precedents listed) → who wins/loses → `## 尾声` → `### 参考链接` numbered list of sources.
- *Explainer*: a reader question opens it (“经常有人问我：…”) → an analogy from a familiar domain → layered breakdown with `### 1.` sub-sections → what actually matters.
- *How-to / methodology*: names the N rules up front in bold, then one section per rule with the pain point first, the fix second, numbered steps where it helps.

**Length and furniture**: 1,500–3,000 Chinese characters (pg how-tos shorter, ai/cloud essays longer). 3–5 inline images named descriptively (`odyssey-timeline.webp`) with Chinese alt text; tables for comparisons; code blocks only in pg how-tos. Internal links to related posts on the site (`/cloud/<slug>/`) where they genuinely relate.

**Tone by section**
- `cloud`: the most combative and satirical — vendor names, outage timelines, cost math, mocking marketing “话术”.
- `db`: industry analyst — acquisitions, market structure, precedents, predictions; still witty.
- `ai`: excited practitioner — first-hand workflow, numbers on tokens/subscriptions, occasional philosophy series.
- `pg`: the most technical and calm — precise terms, commands in backticks, fewer jokes, more lists and tables.

**Don'ts (column)**
- No corporate/AI-ish filler: 赋能、抓手、闭环 (unless mocking them), “在当今快速发展的时代”, “总而言之”, “值得注意的是”, “让我们一起”, “深入探讨/delve”, “leverage”, emoji.
- No hedge-everything neutrality; no listicle of bullet points where an argument belongs (bullets are ~4 per 1,000 chars).
- No “老冯” persona, no vonng's biography or products presented as the author's (§0).

## 4. Personal style (`yongjie`, misc)

Much plainer and gentler than the columns — keep it that way; do not import the column swagger.

- **Personal essay**: an H1 repeating the title, then 6–10 short paragraphs, no subheadings, no bold, no images inside. Simple, honest sentences in first person; states a feeling, then an idea from reading, then a small personal comparison, then a gentle hedge (“也许…” / “Maybe…”, “我觉得自己还没有完全到达那个阶段”). Rhetorical questions to think aloud. Ends on one calm takeaway line. Summary is a single quiet sentence (“关于…的一点安静思考。”). Use only facts the user supplied — never invent family details.
- **Study notes**: H1 title, `Date:` / `Category:` lines, then `## 来源主题` (numbered), `## 内容概要`, `## 核心要点` (bullets), one `##` per theme with `### 核心思想 / 关键意义 / 尚存挑战`, then vocabulary tables `| 短语表达 | 释义与用法 | 地道例句 |`. Chinese explanation, English example sentences. Title pattern `报刊读报笔记：A与B` / “Newspaper Notes: …”.
- English version of personal posts: plain, learner-friendly English, no contractions in essays (“I do not think…”), short sentences.

## 5. English version

- A faithful, natural translation — not a re-write. Keep every section, image, link and table in the same order; translate alt text and headings.
- Idiomatic and crisp: render Chinese internet slang by meaning (“ran circles around competitors”, “a money printer for cloud vendors”), keep the punchlines and bold lines bold.
- Title is a real English headline, not a literal gloss (“下云的人已经赚麻了” style → a sharp English equivalent). Tags in English, Title Case for column tags (`Database`, `Open Source`).
- Add `ai: true` to the en front matter when the English is machine-translated.

## 6. Files and front matter

Create one bundle: `content/<section>/<slug>/` with `index.zh-cn.md`, `index.en.md`, `featured.webp`, and any inline images. `<slug>` is short kebab-case English (`aws-get-duckdb`, `cloud-exit-2026`); check it doesn't already exist.

```yaml
---
title: "中文标题"
date: YYYY-MM-DD            # today unless the user says otherwise
authors: [yongjie]          # or the original author slug for translations
summary: >
  One or two sentences: the thesis or the hook, not a table of contents.
tags: [标签一, 标签二]
# origin: "https://…"       # translations only
---
```

The en file mirrors it with the English title/summary/tags (plus `ai: true` if machine-translated). Do not add `aliases`, `build`, `draft`, or `categories` for new posts. Summaries read like the subtitle of a magazine piece — the column style often uses the bold thesis itself.

## 7. Featured image

Every bundle has `featured.webp` (or `.jpg`); it renders as the page hero and card thumbnail. Observed styles:

- **Columns**: wide AI-generated illustration, ~2.35:1 (1080×460) or 5:3 (1000×600), WebP ≤ ~300 KB. Two looks: (a) warm, painterly storybook scenes (Ghibli-like, golden light) that turn the article's metaphor into a scene — a traveler leaving a chained cloud fortress for a farm barn; a duck flying into a rainforest; (b) cinematic, dark, neon-lit tech concept art for infrastructure explainers (a glowing machine labeled with the concept). PostgreSQL topics may feature a friendly elephant; avoid other brands' mascots and real people's likenesses.
- **Personal / study posts**: photorealistic warm still life, 1376×768 JPG — a quiet, sunlit table scene with a few objects that hint at the topic. No people's faces, no text.

Workflow: write an English image prompt (subject = the article's central metaphor, style, light, “no readable text, no logos, no real people” unless a label is the point).

Generate it with the local Antigravity CLI, which has a `generate_image` tool (no API key needed). Run it from a scratch directory outside the repo:

```bash
agy --mode accept-edits --print-timeout 300s -p 'Use your generate_image tool exactly once with this prompt, then save the image into the current working directory. PROMPT: <prompt>'
```

The CLI often leaves the file in its own store instead of the working directory; find it with `find ~/.gemini/antigravity-cli/brain -type f \( -name '*.jpg' -o -name '*.png' \) -mmin -15`. It returns 1376×768 (16:9) regardless of the requested ratio, so compose with the key subjects inside the middle 93% of the width, then crop to 5:3 and convert: `sips -c 768 1280 --cropOffset 0 48 raw.jpg --out crop.jpg && cwebp -q 82 -resize 1000 600 crop.jpg -o featured.webp` (personal posts may keep 1376×768 as `featured.jpg`). Look at the result before placing it in the bundle; regenerate if it shows text, logos, or a real person. If `agy` is unavailable, give the user the prompt and leave the bundle without `featured.*`, saying so plainly — never commit a placeholder.

## 8. Before showing the user

1. Self-check against §0 (identity, no fabrication, licensing) and the section's don'ts.
2. Verify zh and en have the same sections, images and links; front matter parses (YAML), and the slug is unique.
3. Build check: `hugo --gc --minify --quiet` must succeed (Hugo Extended + Go; `scripts/build.sh` installs them on CI).
4. Reply with: chosen mode, section and why, the file paths, the summary line, the image prompt/status, and any facts you could not verify. Then ask what to change.
