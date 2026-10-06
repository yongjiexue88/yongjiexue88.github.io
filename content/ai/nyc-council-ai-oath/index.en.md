---
title: "Nobody Gave a Number: Big AI Testifies Under Oath in New York"
date: 2026-10-05
authors: [yongjie]
summary: >
  OpenAI, Anthropic, Google and Meta testified under oath before the New York City Council, and none of them would put a number on worst-case catastrophic risk. An industry that cannot give a number cannot grade itself — so New York plans to grade it with four tools: third-party validation, disclosure, liability and whistleblowers.
tags: [AI, LLM, Security, Society]
ai: true
---

Four AI companies raised their right hands and were asked the same question: in the worst case, how likely is catastrophe? Not one of them gave a number.

**An industry that cannot give a number cannot grade itself.** The four tools the New York City Council has put on the table — third-party validation, disclosure, liability, and a whistleblower mechanism — are designed precisely for an industry that cannot give a number.

---

## 1. What Happened

At 11 a.m. on October 5, the New York City Council held a rare “Committee of the Whole” hearing. All 51 members attended, and witnesses [testified under oath](https://www.unite.ai/nyc-council-hearing-puts-anthropic-openai-google-meta-under-oath/).

None of the four companies sent a CEO. They sent their policy and safety leads: Morgan Dwyer, OpenAI's head of policy development and operations; Logan Graham, head of Anthropic's Frontier Red Team; Alice Friend, Google's director of AI and emerging tech policy; and Shane Cahill, Meta's AI policy director for legislation.

Getting them there was not easy. According to reports, Google, Anthropic and OpenAI agreed to appear only after the council threatened subpoenas. SpaceXAI did not respond at all, received a formal subpoena, and [did not show up](https://www.amny.com/news/ai-giants-nyc-council-whistleblower-warnings/) on the day.

Three whistleblowers testified at the same hearing: former Anthropic researcher Jacob Coxon, former Google DeepMind researcher Alex Turner, and former OpenAI employee Daniel Kokotajlo.

---

## 2. The Question Nobody Answered

Speaker Julie Menin's question was simple: quantify the worst-case risk.

OpenAI's Dwyer gave the most candid answer: “I don't know. I also don't think it matters whether it's 1% or 10% or a 20% chance that something catastrophic will go wrong.” Anthropic's Graham walked through the company's risk-assessment process but gave no percentage. Meta's Cahill declined to offer an imprecise figure and promised a follow-up. Google's Friend said that no rigorous scientific method exists yet to calculate such a number.

Menin's reply was just as direct: **“To say you don't know and it doesn't matter is flippant at best.”**

Menin then pressed on two more points. If a model fails an independent safety test, will it be blocked from release? If a model causes serious harm, will the company be legally responsible? On the first, all four described internal review processes, and none committed to “fail the test, no release.” On the second, they [largely sidestepped](https://www.amny.com/news/ai-giants-nyc-council-whistleblower-warnings/) the question.

---

## 3. To Be Fair: The Number Is Hard

In fairness to the AI companies, this number really is hard to calculate.

Actuaries rely on historical frequency, but humanity has never seen a “superintelligence loses control” event. No samples, no frequency. When Google says there is no rigorous method, that is simply true.

Dwyer's “1% or 20%, it doesn't matter” sounds jarring on its own, but the second half of the answer was this: **none of these levels is remotely acceptable, and we should not train models unless we can make an extremely strong case that we can keep them under human control.** That is arguably a stronger position than naming a number.

The trouble is that other high-risk industries solved the problem of “no historical samples, but you still owe us a number” a long time ago.

Aviation is the example. The FAA requires catastrophic failure conditions to be “extremely improbable,” and its advisory circular puts that term at [on the order of 10⁻⁹ per flight hour](https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_25.1309-1A.pdf). A new aircraft type has no accident history of its own before its first flight either, yet the manufacturer must show fault trees, redundant design and test data proving it meets that number.

**That number is not a prophecy. It is a commitment.** Its job is not to predict the future; it is to set a standard that can be tested, falsified and enforced.

So the real problem with refusing to give a number is not imprecision. It is that nothing has been offered that anyone can be held to. No number, no standard; no standard, no violation; no violation, no accountability.

---

## 4. New York's Four Tools

If the companies cannot give a number, New York's approach is: don't wait for one — have someone else check. On September 25, the council unveiled a [package of about 10 bills](https://forkast.news/nyc-exits-the-preemption-debate-a-10-bill-ai-package-creates-a-municipal-enforcement-layer-above-federal-and-state-frameworks/). Its core comes down to four tools:

| Mechanism | Bill | What it does |
|---|---|---|
| Third-party validation | Intro 2602 (Menin) | AI models without third-party validation, or without a technical capability for a human operator to shut them down, may not be sold or deployed in the city; $25,000 per violation, with the same penalty for falsified validation |
| Disclosure | Intro 2601 and others | City contractors must report AI safety incidents to NYC Cyber Command within 24 hours and disclose them publicly; companion bills require chatbots and AI advertising to disclose themselves |
| Liability | Intro 2600 (Maloney) | When a third party misuses or jailbreaks a model and causes foreseeable harm, victims can sue the model provider directly |
| Whistleblowers | Intro 2605 (Menin) | Anyone can report an AI violation and receive 25% of the money recovered, rising to 50% if they bring the action themselves; a separate bill protects employees who report safety risks |

All four share one feature: **none of them requires the AI companies to give a number first.**

Validation is done by outsiders. Disclosure is triggered by incidents. Liability is decided by courts. Whistleblowing fills the gap from the inside. The whole design assumes one thing: self-assessment cannot be trusted — or at least cannot be the only thing trusted.

---

## 5. Wall Street Has Done This Before

This combination is not new. After Enron collapsed in 2001, the United States fitted public companies with exactly the same kit.

The [Sarbanes–Oxley Act](https://en.wikipedia.org/wiki/Sarbanes%E2%80%93Oxley_Act) created the PCAOB to oversee auditors — third-party validation. Financial statements and internal controls had to be made public — disclosure. CEOs and CFOs had to personally certify the numbers — liability. And employees who reported fraud gained legal protection. Dodd-Frank later added a bounty: people who report securities violations that lead to SEC sanctions can receive [10% to 30%](https://en.wikipedia.org/wiki/SEC_Office_of_the_Whistleblower) of the money collected.

New York is offering 25% to 50% — more generous than the SEC.

Put simply, financial regulation has never asked a company to calculate “the probability of the next financial crisis.” It asks for this instead: let outsiders audit the books, report on schedule, have someone answer for failures, and pay insiders who speak up. **Distrust is an institutional design, not an emotion.**

The AI industry today looks a lot like Wall Street before Enron: the people who understand the risk best all work inside the companies, the companies say their internal controls are excellent, and outsiders cannot see the books.

---

## 6. Who Has the Most to Lose

If these bills actually become law, the ones who suffer most may not be the closed-model giants. It may be open weights.

The logic is simple. A closed model runs on the company's own servers; if something goes wrong, it can be taken offline, patched, or locked down. Once open weights are released, they sit on hard drives all over the world, and nobody can press the off switch. Intro 2602 requires that a human operator be able to shut the model down; Intro 2600 makes providers liable for third-party misuse. For open weights, those two rules are close to structurally impossible to satisfy.

An earlier piece on this site, “[Jensen Huang's First-Ever Tweet Backs Open-Weight Models](/ai/open-weight/),” makes the case for open weights: exit rights, sovereignty, and nobody being able to hit pause unilaterally. I agree with it. But this hearing shows that the tension between safety regulation and open weights will have to be faced head-on sooner or later. There is no way around it.

On the other side, the likeliest winners are third-party validators. Here is a prediction that may age badly: **if even one validation bill in this package passes, the first people to make money will not be the AI companies but the people doing AI audits.** After Enron, Arthur Andersen died, yet the audit business got bigger. This time will probably be no different.

There is also a practical question: can a city council regulate model training? No. But it can regulate selling and deploying in the city. New York has more than eight million people and is one of the largest markets in the United States; no AI company will walk away from it lightly. California's vehicle emission standards shape how carmakers design for the whole country for the same reason: market size.

---

## Epilogue

Not being able to give a number is not a crime. The real problem is being unable to give a number while still asking the public to trust that “we have rigorous internal evaluation processes.”

New York's answer: you don't have to give a number, but your model gets checked by outsiders, your incidents get reported, your harms get paid for, and your employees who speak up get protected and rewarded.

At the end of the hearing, Menin said the council still had many questions that went unanswered. At the next hearing under oath, will anyone bring a number?

---

### References

1. [amNY: AI giants give few clear answers to key safety questions at NYC Council hearing amid whistleblower warnings](https://www.amny.com/news/ai-giants-nyc-council-whistleblower-warnings/)
2. [Unite.AI: NYC Council Hearing Puts Anthropic, OpenAI, Google, Meta Under Oath](https://www.unite.ai/nyc-council-hearing-puts-anthropic-openai-google-meta-under-oath/)
3. [Forkast: NYC Exits the Preemption Debate: A 10-Bill AI Package](https://forkast.news/nyc-exits-the-preemption-debate-a-10-bill-ai-package-creates-a-municipal-enforcement-layer-above-federal-and-state-frameworks/)
4. [amNY: AI whistleblowers could get paid under new NYC Council proposal](https://www.amny.com/news/ai-whistleblower-paid-under-nyc-council-proposal/)
5. [CNBC: Anthropic, OpenAI, Google, Meta execs testify at NYC Council AI hearing](https://www.cnbc.com/2026/10/05/anthropic-openai-google-meta-execs-testify-nyc-council-ai-hearing.html)
6. [FAA AC 25.1309-1A: System Design and Analysis](https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_25.1309-1A.pdf)
7. [Wikipedia: SEC Office of the Whistleblower](https://en.wikipedia.org/wiki/SEC_Office_of_the_Whistleblower)
