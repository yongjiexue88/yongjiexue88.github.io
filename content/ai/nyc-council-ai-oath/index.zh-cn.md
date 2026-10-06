---
title: "没人报数：AI 四巨头在纽约市议会宣誓作证"
date: 2026-10-05
authors: [yongjie]
summary: >
  OpenAI、Anthropic、Google、Meta 在纽约市议会宣誓作证，没有一家给出最坏情况灾难风险的量化估计。答不出数字的行业，就不能自己给自己打分——纽约准备用第三方验证、披露、责任与吹哨人四件套，替它打分。
tags: [AI, 大模型, 安全, 社会观察]
---

四家 AI 公司举手宣誓，被问到同一个问题：最坏的情况，概率有多大？没有一家报出数字。

**答不出数字的行业，就不能自己给自己打分。** 纽约市议会这次摆上桌的四件套——第三方验证、信息披露、法律责任、吹哨人机制——恰恰就是为“答不出数字”设计的。

---

## 一、发生了什么

10 月 5 日上午 11 点，纽约市议会召开了一场罕见的“全体委员会”（Committee of the Whole）听证会，51 名议员全员到场，证人[宣誓作证](https://www.unite.ai/nyc-council-hearing-puts-anthropic-openai-google-meta-under-oath/)。

坐上证人席的四家公司，派的都不是 CEO，而是政策与安全条线的负责人：OpenAI 的政策发展与运营负责人 Morgan Dwyer，Anthropic 前沿红队负责人 Logan Graham，Google 的 AI 与新兴技术政策总监 Alice Friend，Meta 的 AI 立法政策总监 Shane Cahill。

请他们来也不容易。据报道，Google、Anthropic、OpenAI 都是在议会放话要发传票之后才答应出席；另一家 SpaceXAI 干脆没回应，收到了正式传票，当天也[没有露面](https://www.amny.com/news/ai-giants-nyc-council-whistleblower-warnings/)。

同场作证的还有三位“吹哨人”：前 Anthropic 研究员 Jacob Coxon、前 Google DeepMind 研究员 Alex Turner，以及前 OpenAI 员工 Daniel Kokotajlo。

---

## 二、那道没人答的题

议长 Julie Menin 的问题很直接：请量化最坏情况的风险。

OpenAI 的 Dwyer 答得最坦白：“我不知道。我也不认为 1%、10% 还是 20% 有什么区别。” Anthropic 的 Graham 谈了一通风险评估流程，但没给百分比；Meta 的 Cahill 说不想给一个不精确的数字，会后再补；Google 的 Friend 说，眼下还没有严谨的科学方法能算出这个数。

Menin 的回应也很直接：**“说不知道、说无所谓，往轻了说也是轻率。”**

Menin 接着又追问了两件事：如果独立安全测试没通过，模型是否一定不发布？如果模型造成严重伤害，公司是否承担法律责任？前者，四家都在描述内部评审流程，没有一家承诺“没过就不发”；后者，基本都[绕开了](https://www.amny.com/news/ai-giants-nyc-council-whistleblower-warnings/)。

---

## 三、平心而论：数字确实不好给

替 AI 公司说句公道话：这个数字真的不好算。

保险精算靠历史频率，可人类历史上没有出现过“超级智能失控”这种事件，没有样本，就没有频率。Google 说没有严谨方法，这话本身不假。

Dwyer 那句“1% 还是 20% 无所谓”，单拎出来很刺耳，但 Dwyer 的后半句是：**这些水平没有一个是可以接受的，如果不能非常有力地证明模型可控，就不应该训练它。** 这其实是一个比报数更强的表态。

问题在于，别的高风险行业早就解决过“没有历史样本也得报数”这道题。

民航就是例子。FAA 对“灾难性失效”的要求是“极不可能”，在适航咨询通告里，这个词被量化为[每飞行小时 10⁻⁹ 量级](https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_25.1309-1A.pdf)。一架新机型首飞之前，同样没有它自己的事故样本，但制造商必须拿出故障树、冗余设计和测试数据，证明自己做到了这个数。

**这个数字不是预言，是承诺。** 它的作用不是猜准未来，而是给出一个可以被检验、被证伪、被追责的标准。

所以，不报数的真正问题不是“不够精确”，而是没有给出任何可以被追究的东西。没有数字，就没有标准；没有标准，就没有违规；没有违规，就没有责任。

---

## 四、纽约的四件套

既然公司给不出数字，纽约的思路就是：不等你给数字，换个人来检查。9 月 25 日，议会公布了一个约 10 项法案的[立法包](https://forkast.news/nyc-exits-the-preemption-debate-a-10-bill-ai-package-creates-a-municipal-enforcement-layer-above-federal-and-state-frameworks/)，核心可以归成四件：

| 机制 | 法案 | 内容 |
|---|---|---|
| 第三方验证 | Intro 2602（Menin） | 未经第三方验证、或不具备人类操作员关停能力的 AI 模型，不得在本市销售或部署；违规每次罚款 2.5 万美元，造假验证同罚 |
| 披露 | Intro 2601 等 | 市政承包商须在 24 小时内向纽约市网络安全指挥部报告 AI 安全事件并公开；另有聊天机器人身份披露、AI 广告披露等配套法案 |
| 责任 | Intro 2600（Maloney） | 第三方滥用或越狱模型造成可预见伤害时，受害者可以直接起诉模型提供方 |
| 吹哨人 | Intro 2605（Menin） | 任何人都可以举报 AI 违规，追回款项的 25% 归举报人；若举报人亲自提起诉讼，比例升到 50%；另有法案保护举报安全风险的员工 |

这四件东西有一个共同点：**都不需要 AI 公司先报数。**

验证，由外人来做；披露，由事件来触发；责任，由法院来裁定；吹哨，由内部的人来补位。整套设计默认了一件事：自评不可信，至少不能只靠自评。

---

## 五、这套拳法，华尔街练过

这个组合并不新。2001 年安然倒下之后，美国给上市公司装的就是同一套东西。

[萨班斯-奥克斯利法案](https://en.wikipedia.org/wiki/Sarbanes%E2%80%93Oxley_Act)设立了监管审计师的 PCAOB，这是第三方验证；财报和内控要公开，这是披露；CEO 和 CFO 要在财报上亲笔签字担责，这是责任；同时保护举报公司造假的员工。后来的多德-弗兰克法案又加了赏金：举报证券违规、帮 SEC 罚到钱的人，可以拿罚没金额的 [10% 到 30%](https://en.wikipedia.org/wiki/SEC_Office_of_the_Whistleblower)。

纽约这次给的是 25% 到 50%，比 SEC 还大方。

说白了，金融监管从来没有要求公司算出“下一次金融危机的概率”。它要求的是：账给外人查，事要按时报，出事有人担，内鬼有赏金。**不信任，是一种制度设计，不是一种情绪。**

AI 行业今天的状态，很像安然之前的华尔街：最懂风险的人都在公司里，公司说自己有完善的内控，外人看不到账本。

---

## 六、谁最难受

如果这些法案真能落地，最难受的未必是闭源大厂，而可能是开放权重。

道理很简单。闭源模型跑在自家服务器上，出了事可以下线、打补丁、收紧接口。开放权重一旦发布，权重就散在全世界的硬盘里，没有人能按下关停键。Intro 2602 要求“人类操作员能够关停”，Intro 2600 要求为第三方滥用担责，这两条对开放权重来说，几乎是结构性的无解。

本站《[老黄的第一条推文，力挺开放权重模型](/ai/open-weight/)》一文讲过开放权重的价值：退出权、主权、没人能单方面按暂停键。这一点我很认同。但这次听证会说明，安全监管和开放权重之间的这道矛盾，迟早要正面回答，绕不过去。

另一边，最可能受益的是第三方验证机构。我立一个可以被打脸的 flag：**这个立法包只要通过一条验证类法案，最先赚到钱的不是 AI 公司，而是做 AI 审计的人。** 安然之后，安达信倒了，审计行业的生意却更大了，这次大概也一样。

还有一个现实问题：一个市议会，管得了模型训练吗？管不了。但它管得了“在本市销售和部署”。纽约有八百多万人口，是全美最大的市场之一，没有哪家 AI 公司会轻易放弃。加州的汽车排放标准能左右全美车厂的设计，靠的也是市场体量。

---

## 尾声

数字答不出来，不是罪过。真正的问题是，答不出数字的同时，还希望公众继续相信“我们内部有完善的评估流程”。

纽约的回答是：你可以不报数，但你的模型要给外人验，出了事要报，伤了人要赔，你的员工说话要有人保护、有人奖励。

听证会结束时，Menin 说议会仍有很多问题没有得到回答。下一次宣誓作证，会有人带着数字来吗？

---

### 参考链接

1. [amNY：AI giants give few clear answers to key safety questions at NYC Council hearing amid whistleblower warnings](https://www.amny.com/news/ai-giants-nyc-council-whistleblower-warnings/)
2. [Unite.AI：NYC Council Hearing Puts Anthropic, OpenAI, Google, Meta Under Oath](https://www.unite.ai/nyc-council-hearing-puts-anthropic-openai-google-meta-under-oath/)
3. [Forkast：NYC Exits the Preemption Debate: A 10-Bill AI Package](https://forkast.news/nyc-exits-the-preemption-debate-a-10-bill-ai-package-creates-a-municipal-enforcement-layer-above-federal-and-state-frameworks/)
4. [amNY：AI whistleblowers could get paid under new NYC Council proposal](https://www.amny.com/news/ai-whistleblower-paid-under-nyc-council-proposal/)
5. [CNBC：Anthropic, OpenAI, Google, Meta execs testify at NYC Council AI hearing](https://www.cnbc.com/2026/10/05/anthropic-openai-google-meta-execs-testify-nyc-council-ai-hearing.html)
6. [FAA AC 25.1309-1A：System Design and Analysis](https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_25.1309-1A.pdf)
7. [Wikipedia：SEC Office of the Whistleblower](https://en.wikipedia.org/wiki/SEC_Office_of_the_Whistleblower)
