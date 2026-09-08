# Cover image prompts

One prompt per post, written against each post's actual subject. Run them
through whatever image model you use, then save each result into this folder
under the filename given — the build picks it up automatically, no code or
frontmatter change needed.

**Format:** 16:9, around 1600px wide. Save as `.jpg` (or `.png`/`.webp`).

**Prepend the style preamble to every prompt.** That is what makes fourteen
separate generations read as one set rather than fourteen unrelated pictures.

---

## Style preamble

> Editorial illustration for a personal blog. Cool restrained palette: pale
> blue-grey paper (#F1F4F8), deep navy-black ink (#16222E), one muted steel-blue
> accent (#245F94). Flat vector-leaning shapes with soft paper grain, gentle
> directional light, generous negative space, calm and considered. A single
> clear subject, centred or slightly off-centre, uncluttered. No text, no
> letters, no numbers, no logos, no watermarks, no people's faces. Not a photo,
> not 3D render, not neon, not cyberpunk.

Add per image: `--ar 16:9` (Midjourney), or "16:9 widescreen" for other models.

---

## Journal — reflection

These two are the personal entries. They break the study motif on purpose:
domestic, quiet, a little warmer in feeling though still in the cool palette.
Keep them wordless and unpeopled — suggestion, not depiction.

**`2026-05-09-first-weekend-without-tiki.jpg`**
> A quiet empty living room on a weekend morning, one armchair, a folded
> blanket, a cold cup of coffee on a low table, soft light through a window,
> one small toy left on the rug. Stillness and mild absence.

**`2026-05-17-second-weekend-without-tiki.jpg`**
> A kitchen table on a Sunday evening under a single warm lamp, two plates —
> one small — a child's drawing pinned nearby, dusk blue at the window.
> Ordinary domestic care, the end of a long week.

---

## Notes — English study

The largest group. Keep a shared motif of paper, print and language so they
read as a series.

**`2026-05-13-advanced-vocabulary-simple-english-phrases.jpg`**
> A plain word tile transforming into a more ornate, precise one mid-air above
> an open notebook. Simple becoming exact.

**`2026-05-15-professional-english.jpg`**
> A tangled thread on the left resolving into a single straight taut line on
> the right, over a clean desk surface. Cluttered speech becoming precise.

**`2026-05-27-advanced-vocabulary-17-business-economy-workplace-news.jpg`**
> A folded business newspaper beside a cooling coffee cup, an abstract
> descending line-graph motif embossed into the paper texture. Economic
> pressure, understated.

**`2026-05-31-newspaper.jpg`**
> A broadsheet newspaper folded into neat sections, each section a slightly
> different tone of blue-grey, arranged like an index. Organised reading.

**`2026-06-02-newspaper-bp-and-giga-ipos.jpg`**
> A classical column split into a corporate tower, with a shrinking series of
> ascending blocks beside it. Governance and a narrowing public market.

**`2026-06-02-newspaper-china-hukou-reform.jpg`**
> Stylised paper documents forming a bridge between two abstract city
> silhouettes, small figures implied as simple shapes crossing. Migration and
> registration reform.

**`2026-06-04-newspaper-edible-sensors-and-antarctic-team-life.jpg`**
> Split composition: a tiny capsule with a faint circuit motif on one side, a
> small polar research hut under a pale sky on the other. Two unrelated
> stories on one page.

**`2026-06-05-english-study-notes-book.jpg`**
> A thick review book lying open, its pages fanning into layered tabbed
> sections, each tab a different tone. A structured course in one object.

**`2026-06-05-interactive-english-fluency-builder.jpg`**
> Overlapping speech-bubble shapes forming a continuous flowing ribbon across
> the frame, increasingly smooth left to right. Building fluency.

---

## Notes — other subjects

**`2026-06-05-chaiknows-explains-modern-life.jpg`**
> A cutaway of an everyday object revealing clean schematic inner workings —
> gears, channels, layers — drawn like a patient technical diagram. Explaining
> how ordinary things work.

**`2026-06-05-debt-free-decisions-ramsey-show-money-lessons.jpg`**
> A stack of blocks being dismantled one by one, the removed pieces forming a
> steady rising line beside it. Debt coming down as stability goes up.

**`2026-06-05-hampton-law-legal-stories.jpg`**
> A pair of balanced scales rendered as simple geometry, a folded document on
> one side, a small house on the other, warm Texas light. Everyday legal
> reasoning.

---

## Notes

- Two journal entries are English/Chinese pairs sharing one slug, so fourteen
  images cover all sixteen posts.
- Models render text badly; the preamble bans it deliberately. Titles are
  already displayed over the image by the layout.
- If a generation comes out too busy, ask for "more negative space, fewer
  elements, one subject only" — restraint is what keeps these looking
  editorial rather than decorative.
- Fill in `coverCredit` in a post's frontmatter only if you want a caption
  under the hero; generated images need no attribution.
