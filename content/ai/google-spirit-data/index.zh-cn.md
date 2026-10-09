---
title: "一千万美元，买下一家航空公司的全部记忆"
date: 2026-10-08
authors: [yongjie]
summary: >
  Google 在破产拍卖中出价 1000 万美元，要买下 Spirit 航空 6 亿条员工邮件和聊天记录来训练 AI，一百多位国会议员联名喊停。公共互联网快被吃干净了，下一座矿是倒闭公司的收件箱——而破产法给顾客配了隐私监察官，却没给员工配。
tags: [AI, 大模型, 隐私, 社会观察]
---

一家航空公司倒了。飞机、航线时刻、机库都有人接盘，这很正常。不正常的是，出价买它“记忆”的，是 Google。

**公共互联网快被大模型吃干净了，下一座矿，是倒闭公司的收件箱。** Spirit 这笔交易只是第一单，不会是最后一单。

---

## 一、发生了什么

10 月 8 日，一百多位美国国会议员联名致信 Google CEO Sundar Pichai 和 Spirit 航空 CEO Dave Davis，要求暂停一笔数据交易，牵头的是众议员 Steven Horsford 和参议员 Elizabeth Warren。签名人数各家报道说法不一，有 [114 人](https://therecord.media/lawmakers-warn-of-google-spirit-ai-training-deal)、[119 人](https://www.pymnts.com/big-data/2026/lawmakers-urge-google-and-spirit-airlines-to-pause-data-sale/)，也有 [121 人](https://fightbacknews.org/articles/members-of-congress-send-letter-to-spirit-and-google-ceos-objecting-to-data-sale)。

交易本身是这样的：Spirit 在两年内第二次申请破产保护后，于 5 月 2 日[停飞清算](https://www.fox35orlando.com/news/spirit-airlines-shuts-down-operations-all-flights-canceled)。8 月 14 日的资产拍卖上，Google 以 1000 万美元拍下了 Spirit 的内部企业数据，[公开表示](https://9to5google.com/2026/08/17/google-just-bought-a-bunch-of-spirit-airlines-data-for-ai-training/)要用来改进产品和训练 AI 模型。

这一包东西有多大？按法庭文件的清单，[大致如下](https://thenextweb.com/news/google-spirit-airlines-data-10m-bankruptcy-auction-mercor)：

| 类别 | 内容 |
|---|---|
| 沟通 | 8 万个账户的约 1 亿封邮件，5 亿条 Teams 消息 |
| 文件 | 约 1700 万个 OneDrive 文件，2000 多万个 SharePoint 文件 |
| 代码 | 516 个代码仓库，约 3000 万行代码，4.3 万个 PR |
| 运营 | 1.9 亿条订座记录，2008 年以来的 75 亿条交易记录 |
| 员工 | 17.5 万条员工档案，340 多万条工资记录，近 15 万份税表，109 万张考勤卡 |

顾客那一侧——9750 万份旅客档案、5020 万个常旅客会员、3000 多万条客服通话录音——不在这次出售范围内。

**被留在包里的，是员工。**

---

## 二、一分钱多一点一条

先算笔账。1 亿封邮件加 5 亿条 Teams 消息，一共 6 亿条，1000 万美元，**平均每条不到两美分。**

再换个算法：Spirit 停飞时[约 1.7 万人失业](https://thenextweb.com/news/google-spirit-airlines-data-10m-bankruptcy-auction-mercor)，摊下来每人约 590 美元。一个人在这家公司十几年的邮件、聊天、绩效、考勤，打包价不到 600 美元。

这个价格还不是 Google 一家拍脑袋定的。拍卖时 AI 数据公司 Mercor 一路跟到 750 万美元，成了[备选买家](https://www.outlookbusiness.com/corporate/google-to-buy-bankrupt-spirit-airlines-business-data-for-10-mn-to-train-ai)；拍卖结束后，另一家 AI 训练数据公司 Micro1 据报道又递上了 [1250 万美元的迟到报价](https://www.ch-aviation.com/news/170908-court-delays-googles-acquisition-of-spirits-business-data)。

**有人竞价，就说明有市场；有市场，就说明这是一种资产。** 一家公司死后留下的数字遗体，从这一单开始，有了公开的市价。

---

## 三、为什么 Google 要买这个

说穿了，Google 买的不是航空业知识，是**一家真实企业怎么运转的完整录像**。

公开网页上有的是论文、新闻、论坛帖子，没有的是：一张报销单在部门之间怎么流转，一次航班大面积延误时调度、机组、客服在 Teams 里怎么吵，一个预算从提出到砍掉经历了几封邮件。这些东西，恰恰是“企业 AI Agent”最缺的训练材料。

活着的公司不会把这些卖给你。邮件是商业机密，聊天记录是法律风险，没有哪个 CEO 会签字让外人拿去训练模型。

**只有死掉的公司，才会把自己的全部记忆摆上货架。** 破产清算的逻辑是给债权人尽量多回收现金，邮件服务器和机库一样，是资产，可以卖。

---

## 四、殷鉴不远：安然的 60 万封邮件

这件事其实有前传。

安然 2001 年破产后，美国联邦能源监管委员会（FERC）在调查中把公司邮件公之于众。后来一位 UMass 的计算机科学家花 [1 万美元](https://en.wikipedia.org/wiki/Enron_Corpus)买下了这批邮件，整理成研究数据集：158 名员工、60 多万封邮件。这个“安然语料库”成了二十年来 NLP 研究的标准教材，最后还进了大模型训练集 The Pile。

当年那 158 个人，没有一个想到自己写给同事的邮件，会在二十年后变成 AI 的养料。

对比一下：**安然是 60 万封邮件、1 万美元；Spirit 是 6 亿条消息、1000 万美元。** 数据量翻了一千倍，价格也翻了一千倍，单价几乎没变。变的是买家——当年是学者，今天是全世界最大的 AI 公司之一。

另一个前例是 2015 年 RadioShack 破产。它把 6500 多万条顾客姓名和地址[挂牌出售](https://www.dataprivacyandsecurityinsider.com/2015/05/radioshack-bankruptcy-court-approves-sale-of-personal-information-collected-by-debtor/)，38 个州的总检察长和 FTC 联手反对，最后法院虽然批准了出售，但买家只能拿到 170 个字段中的 7 个。

**顾客数据被卖，有州检察长和 FTC 出头；员工数据被卖，谁出头？**

---

## 五、被遗忘的那一方

这正是这笔交易真正暴露的漏洞。

美国破产法有一个专门的角色叫“消费者隐私监察官”（consumer privacy ombudsman），出售涉及顾客个人信息的资产时由法院指派审查。Spirit 案里也有一位，10 月 5 日[建议法官批准交易](https://www.pymnts.com/big-data/2026/lawmakers-urge-google-and-spirit-airlines-to-pause-data-sale/)，条件是排除顾客个人信息。

注意，是**顾客**。员工不在这个制度的保护范围里。Bloomberg Law 一篇报道的标题说得很直白：Spirit 的数据出售，[暴露了员工保护的空白](https://news.bgov.com/bankruptcy-law/spirit-data-sale-to-google-shows-gaps-in-employee-protections)。

所以出来替员工说话的，是代表 Spirit 空乘的工会 AFA-CWA。工会的反对意见里有一个很具体的担心：就算去掉名字，[按机组基地切分的小样本里](https://news.bgov.com/bankruptcy-law/spirit-data-sale-to-google-prompts-flight-attendants-objection)，从沟通和运营数据中推断出“说的是谁”并不难。纪律处分、培训不合格、医疗信息和工作便利申请，这些记录即使匿名，依然敏感。

议员们的信里引用了同一个逻辑：去掉直接标识符，不等于数据就匿名了，尤其是在 AI 面前。

---

## 六、平心而论：Google 也不是全无防备

替 Google 说句公道话。

Google 的[回应](https://therecord.media/lawmakers-warn-of-google-spirit-ai-training-deal)是：不打算购买任何个人信息，这类数据要么完全排除，要么在交付前由独立第三方去标识化；Google 还表示在和隐私监察官合作。据报道，买方还要承诺不尝试重新识别个人。旅客档案和常旅客数据本来也不在这次出售之列。

这比很多公司爬网页时“先拿了再说”的做法，确实规矩得多。

但细看合同，问题就出来了。按 The Next Web 对销售协议的[解读](https://thenextweb.com/news/google-spirit-airlines-data-10m-bankruptcy-auction-mercor)：那个“独立第三方”，由 Google 指定、Google 付钱，脱敏结果要让 Google “合理满意”；协议还要求脱敏后**保留整个数据集的引用完整性**。

做过数据库的人都知道“引用完整性”是什么意思：员工 A 的邮件、A 的考勤、A 的工资、A 的绩效，名字换成了编号，但**还连在一起**。这对训练模型很有价值，对隐私来说，就是把一个人的全部碎片串成了一份完整档案，只差一个名字。

**名字可以抹掉，一个人留下的形状抹不掉。**

---

## 七、谁赢谁输

**赢家**是 Google，以及整个 AI 训练数据行业。一千万美元对 Google 来说是零头，换来的是一份公开互联网上找不到的企业运作全景。Mercor 和 Micro1 的跟价则说明，这个赛道里的玩家都看懂了。

**债权人**也不算输。机库可以卖，邮件服务器也可以卖，多回收 1000 万现金，没人会嫌少。

**输家**是那 1.7 万名前员工。他们丢了工作，还要眼看自己十几年的工作记录被打包卖掉，而法律上，他们连一个专门替自己审查的人都没有。正如 Horsford 所说，员工提供这些信息，不是为了让它被卖给另一家公司训练 AI。

我在这里立一个可以被打脸的 flag：**两年之内，“企业数据集”会成为美国破产清算里的标准资产类别，像机库和商标一样，单独列在拍卖清单上。** Spirit 这单要是顺利批下来，后面排队的会是一长串。

---

## 尾声

这件事给每个打工人提了个醒：你在公司 Slack、Teams、邮箱里打的每一个字，从法律上说都不属于你，属于公司。公司活着，它是档案；公司死了，它是资产。

听证会定在 10 月 14 日。法官面对的问题其实很简单：一家公司死了，它员工的记忆，该不该和它的办公桌一起拍卖？

你呢？你在工作群里说过的话，想过它们最后会去哪里吗？

---

### 参考链接

1. [The Record：Lawmakers warn Google could expose Spirit Airlines data in $10 million AI training deal](https://therecord.media/lawmakers-warn-of-google-spirit-ai-training-deal)
2. [PYMNTS：Lawmakers Urge Google and Spirit Airlines to Pause Data Sale](https://www.pymnts.com/big-data/2026/lawmakers-urge-google-and-spirit-airlines-to-pause-data-sale/)
3. [Reuters：Lawmakers raise alarm at Google plan to acquire Spirit Airlines data for AI models](https://www.reuters.com/world/lawmakers-raise-alarm-google-plan-acquire-spirit-airlines-data-ai-models-2026-10-08/)
4. [The Next Web：Google picked and paid for the firm anonymising the Spirit Airlines data](https://thenextweb.com/news/google-spirit-airlines-data-10m-bankruptcy-auction-mercor)
5. [9to5Google：Google just bought a bunch of Spirit Airlines data for AI training](https://9to5google.com/2026/08/17/google-just-bought-a-bunch-of-spirit-airlines-data-for-ai-training/)
6. [Bloomberg Government：Spirit Data Sale to Google Shows Gaps in Employee Protections](https://news.bgov.com/bankruptcy-law/spirit-data-sale-to-google-shows-gaps-in-employee-protections)
7. [Bloomberg Government：Spirit Data Sale to Google Prompts Flight Attendants' Objection](https://news.bgov.com/bankruptcy-law/spirit-data-sale-to-google-prompts-flight-attendants-objection)
8. [ch-aviation：Court delays Google's acquisition of Spirit's business data](https://www.ch-aviation.com/news/170908-court-delays-googles-acquisition-of-spirits-business-data)
9. [Wikipedia：Enron Corpus](https://en.wikipedia.org/wiki/Enron_Corpus)
10. [Data Privacy + Security Insider：RadioShack Bankruptcy Court Approves Sale of Personal Information](https://www.dataprivacyandsecurityinsider.com/2015/05/radioshack-bankruptcy-court-approves-sale-of-personal-information-collected-by-debtor/)
