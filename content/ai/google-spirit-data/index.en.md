---
title: "$10 Million for an Airline's Entire Memory"
date: 2026-10-08
authors: [yongjie]
summary: >
  At a bankruptcy auction, Google bid $10 million for 600 million Spirit Airlines employee emails and chat messages to train AI, and more than 100 members of Congress want it stopped. The public internet is nearly mined out; the next seam is the inboxes of dead companies — and bankruptcy law gives customers a privacy ombudsman but gives employees nobody.
tags: [AI, LLM, Privacy, Society]
ai: true
---

An airline went under. Somebody took the planes, the slots and the hangars, which is normal. What is not normal is who bid on its *memory*: Google.

**Large models have nearly eaten the public internet. The next mine is the inbox of a dead company.** The Spirit deal is the first of its kind. It will not be the last.

---

## 1. What happened

On October 8, more than 100 members of the U.S. Congress signed a letter to Google CEO Sundar Pichai and Spirit Airlines CEO Dave Davis asking them to pause a data deal. It was led by Rep. Steven Horsford and Sen. Elizabeth Warren. Reports differ on the head count: [114](https://therecord.media/lawmakers-warn-of-google-spirit-ai-training-deal), [119](https://www.pymnts.com/big-data/2026/lawmakers-urge-google-and-spirit-airlines-to-pause-data-sale/) or [121](https://fightbacknews.org/articles/members-of-congress-send-letter-to-spirit-and-google-ceos-objecting-to-data-sale).

The deal itself: after its second Chapter 11 filing in two years, Spirit [stopped flying and began liquidating](https://www.fox35orlando.com/news/spirit-airlines-shuts-down-operations-all-flights-canceled) on May 2. At an asset auction on August 14, Google won Spirit's internal enterprise data for $10 million and [said openly](https://9to5google.com/2026/08/17/google-just-bought-a-bunch-of-spirit-airlines-data-for-ai-training/) that it would use it to improve its products and train its AI models.

How big is the package? According to the inventory in the court filings, [roughly this](https://thenextweb.com/news/google-spirit-airlines-data-10m-bankruptcy-auction-mercor):

| Category | Contents |
|---|---|
| Communication | About 100 million emails across 80,000 accounts; 500 million Teams messages |
| Files | About 17 million OneDrive files; more than 20 million SharePoint files |
| Code | 516 repositories, about 30 million lines of code, 43,000 pull requests |
| Operations | 190 million booking records; 7.5 billion transactions dating back to 2008 |
| Employees | 175,000 employee records, 3.4 million payroll records, nearly 150,000 tax forms, 1.09 million time cards |

The customer side — 97.5 million passenger profiles, 50.2 million loyalty members, more than 30 million customer-service call recordings — is excluded from this sale.

**What stays in the box is the employees.**

---

## 2. A little under two cents a message

Start with the math. 100 million emails plus 500 million Teams messages is 600 million items. For $10 million, **that works out to less than two cents apiece.**

Or slice it another way: about [17,000 people lost their jobs](https://thenextweb.com/news/google-spirit-airlines-data-10m-bankruptcy-auction-mercor) when Spirit shut down, which comes to about $590 per person. A decade or more of someone's emails, chats, performance reviews and time cards, bundled for under $600.

And Google did not set that price alone. At the auction, the AI data company Mercor bid up to $7.5 million and became the [backup buyer](https://www.outlookbusiness.com/corporate/google-to-buy-bankrupt-spirit-airlines-business-data-for-10-mn-to-train-ai). After the auction closed, another AI training-data company, Micro1, reportedly submitted a [late $12.5 million offer](https://www.ch-aviation.com/news/170908-court-delays-googles-acquisition-of-spirits-business-data).

**Competing bids mean there is a market; a market means this is an asset.** Starting with this deal, the digital remains of a dead company have a public market price.

---

## 3. Why Google wants this

Put plainly, Google is not buying aviation know-how. It is buying **a complete recording of how a real company actually runs**.

The open web is full of papers, news and forum posts. What it lacks is how an expense report moves between departments, how dispatch, crew scheduling and customer service argue in Teams during a mass delay, how many emails a budget goes through before it gets cut. That is exactly the training material "enterprise AI agents" are starving for.

A living company will never sell you that. Email is a trade secret, chat logs are legal exposure, and no CEO will sign off on handing them to an outsider to train a model.

**Only a dead company puts its entire memory on the shelf.** The logic of a bankruptcy liquidation is to recover as much cash as possible for creditors. An email server is an asset just like a hangar, and it can be sold.

---

## 4. The precedent: Enron's 600,000 emails

This story has a prequel.

After Enron collapsed in 2001, the Federal Energy Regulatory Commission (FERC) made the company's email public during its investigation. A computer scientist at UMass later bought a copy for [$10,000](https://en.wikipedia.org/wiki/Enron_Corpus) and turned it into a research dataset: more than 600,000 emails from 158 employees. The "Enron Corpus" became the standard textbook for two decades of NLP research and eventually ended up in The Pile, a large-model training set.

None of those 158 people imagined that emails to their colleagues would become AI feedstock twenty years later.

Compare: **Enron was 600,000 emails for $10,000; Spirit is 600 million messages for $10 million.** A thousand times the data, a thousand times the price, almost the same unit cost. What changed is the buyer — then an academic, now one of the largest AI companies in the world.

The other precedent is RadioShack's 2015 bankruptcy. It [put more than 65 million customer names and addresses up for sale](https://www.dataprivacyandsecurityinsider.com/2015/05/radioshack-bankruptcy-court-approves-sale-of-personal-information-collected-by-debtor/). The attorneys general of 38 states and the FTC objected together, and although the court approved the sale, the buyer got only 7 of 170 data fields.

**When customer data is sold, state attorneys general and the FTC step up. When employee data is sold, who steps up?**

---

## 5. The forgotten party

That is the real gap this deal exposes.

U.S. bankruptcy law has a dedicated role called the "consumer privacy ombudsman," appointed by the court to review asset sales involving customers' personal information. The Spirit case has one, and on October 5 the ombudsman [recommended approving the deal](https://www.pymnts.com/big-data/2026/lawmakers-urge-google-and-spirit-airlines-to-pause-data-sale/) on the condition that customers' personal information be excluded.

Note the word: **customers**. Employees fall outside that system. A Bloomberg Law headline put it bluntly: the Spirit data sale [shows gaps in employee protections](https://news.bgov.com/bankruptcy-law/spirit-data-sale-to-google-shows-gaps-in-employee-protections).

So the one speaking up for employees is AFA-CWA, the union representing Spirit's flight attendants. Its objection raises a concrete worry: even with names removed, [in small slices such as a single crew base](https://news.bgov.com/bankruptcy-law/spirit-data-sale-to-google-prompts-flight-attendants-objection), it is not hard to infer "who is being talked about" from the communication and operations data. Disciplinary records, training deficiencies, medical information and accommodation requests remain sensitive even when anonymized.

The lawmakers' letter makes the same argument: stripping direct identifiers does not make a dataset anonymous, especially in the face of AI.

---

## 6. In fairness: Google is not entirely careless

To be fair to Google.

Google's [response](https://therecord.media/lawmakers-warn-of-google-spirit-ai-training-deal) is that it is not looking to buy any personal information; such data will either be fully excluded or de-identified by an independent third party before delivery, and it is working with the privacy ombudsman. The buyer also reportedly agrees not to attempt to re-identify individuals. And passenger profiles and loyalty data were never part of this sale.

That is a great deal more disciplined than the "take it first, ask later" approach many companies have taken when scraping the web.

But read the contract closely and the problem appears. According to The Next Web's [reading of the sale agreement](https://thenextweb.com/news/google-spirit-airlines-data-10m-bankruptcy-auction-mercor), that "independent third party" is designated by Google and paid by Google, and the scrub has to be "reasonably satisfactory" to Google. The agreement also requires the de-identified data to **preserve referential integrity across the data set**.

Anyone who has worked with databases knows what "referential integrity" means: Employee A's emails, A's time cards, A's payroll, A's reviews — the name is replaced by an ID, but **they are still linked**. That is valuable for training a model. For privacy, it means stitching every fragment of a person into one complete file, missing only a name.

**You can erase a name. You cannot erase the shape a person leaves behind.**

---

## 7. Winners and losers

**The winners** are Google and the whole AI training-data industry. Ten million dollars is a rounding error for Google, and it buys a panoramic view of enterprise operations that the open web cannot provide. The bids from Mercor and Micro1 show that every player in this race has figured that out.

**The creditors** do not lose either. Hangars can be sold, email servers can be sold, and nobody complains about an extra $10 million in cash.

**The losers** are the roughly 17,000 former employees. They lost their jobs, and now they get to watch a decade or more of their work records packaged and sold — and under the law, they do not even have a dedicated reviewer looking out for them. As Horsford put it, employees did not hand over this information so it could be sold to train another company's AI.

Here is a falsifiable prediction: **within two years, "enterprise datasets" will become a standard asset class in U.S. bankruptcy liquidations, listed separately in the auction schedule like hangars and trademarks.** If the Spirit deal gets approved cleanly, there will be a long line behind it.

---

## Epilogue

This is a wake-up call for every employee: every word you type in your company's Slack, Teams or inbox legally belongs not to you but to the company. While the company lives, it is a record. When the company dies, it is an asset.

The hearing is set for October 14. The question before the judge is actually simple: when a company dies, should its employees' memories be auctioned off along with its desks?

And you — have you ever wondered where the things you said in the work chat will end up?

---

### References

1. [The Record: Lawmakers warn Google could expose Spirit Airlines data in $10 million AI training deal](https://therecord.media/lawmakers-warn-of-google-spirit-ai-training-deal)
2. [PYMNTS: Lawmakers Urge Google and Spirit Airlines to Pause Data Sale](https://www.pymnts.com/big-data/2026/lawmakers-urge-google-and-spirit-airlines-to-pause-data-sale/)
3. [Reuters: Lawmakers raise alarm at Google plan to acquire Spirit Airlines data for AI models](https://www.reuters.com/world/lawmakers-raise-alarm-google-plan-acquire-spirit-airlines-data-ai-models-2026-10-08/)
4. [The Next Web: Google picked and paid for the firm anonymising the Spirit Airlines data](https://thenextweb.com/news/google-spirit-airlines-data-10m-bankruptcy-auction-mercor)
5. [9to5Google: Google just bought a bunch of Spirit Airlines data for AI training](https://9to5google.com/2026/08/17/google-just-bought-a-bunch-of-spirit-airlines-data-for-ai-training/)
6. [Bloomberg Government: Spirit Data Sale to Google Shows Gaps in Employee Protections](https://news.bgov.com/bankruptcy-law/spirit-data-sale-to-google-shows-gaps-in-employee-protections)
7. [Bloomberg Government: Spirit Data Sale to Google Prompts Flight Attendants' Objection](https://news.bgov.com/bankruptcy-law/spirit-data-sale-to-google-prompts-flight-attendants-objection)
8. [ch-aviation: Court delays Google's acquisition of Spirit's business data](https://www.ch-aviation.com/news/170908-court-delays-googles-acquisition-of-spirits-business-data)
9. [Wikipedia: Enron Corpus](https://en.wikipedia.org/wiki/Enron_Corpus)
10. [Data Privacy + Security Insider: RadioShack Bankruptcy Court Approves Sale of Personal Information](https://www.dataprivacyandsecurityinsider.com/2015/05/radioshack-bankruptcy-court-approves-sale-of-personal-information-collected-by-debtor/)
