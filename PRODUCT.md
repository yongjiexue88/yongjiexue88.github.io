# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary audience is recruiters, colleagues, and potential clients evaluating Yongjie Xue professionally. They need to understand who he is, what he does, and how he thinks without searching through a personal-blog interface.

## Product Purpose

This is Yongjie Xue's bilingual professional home on the web: a clear career introduction with writing as a secondary body of evidence. Success means that more people discover the site and choose to read it.

## Positioning

Lead with Yongjie as a **Full Stack & AI Engineer** in Austin, Texas, then let his existing long-form notes and reflections show the breadth and continuity of his learning. The site is a career presence that also contains a blog, not a personal diary presented as a technical portfolio.

## Operating Context

Visitors usually arrive from a shared link, search result, LinkedIn, or GitHub and may be scanning quickly on desktop or mobile. They should be able to identify Yongjie's role, location, writing, and contact path within one visit. English and Chinese remain first-class languages.

## Capabilities and Constraints

- Preserve the existing React/Vite site, its real routes, bilingual language control, light and dark themes, long-form post rendering, tag browsing, and contact capability.
- Continue to deploy as a free static site on GitHub Pages.
- Keep all existing journal and notes content intact, but place writing behind the professional introduction in the information hierarchy.
- Do not create a projects or work-history surface until real material exists.
- Do not fabricate employers, projects, credentials, client claims, testimonials, metrics, or a biography.

## Brand Commitments

- Use the name Yongjie Xue, with 薛勇杰 available in the Chinese experience.
- Present the confirmed role verbatim: **Full Stack & AI Engineer**.
- Preserve the bilingual English/Chinese experience.
- Preserve the profile photo, pronunciation audio, Austin location, email, and LinkedIn as available identity assets.
- The former “萦怀 / thoughts that linger” personal-blog framing is not a required brand commitment for the repositioned home page.

## Evidence on Hand

- Profile facts and identity assets: `public/data/profile.json`, `public/images/pictures/profile-picture.jpg`, and `public/audio/yongjie.mp3`.
- Contact and LinkedIn details in `public/data/sections/`.
- Existing bilingual journal entries and long-form study notes in `src/content/`.
- No resume is currently configured (`resumePdfUrl` is empty).
- No professional projects, work history, case studies, or verified achievement claims are ready to publish.

## Product Principles

1. Establish professional identity before presenting the archive.
2. Let real writing demonstrate curiosity and rigor; never manufacture proof.
3. Keep the path from identity to reading to contact obvious at every viewport.
4. Treat English and Chinese as equivalent product surfaces.
5. Grow gracefully: empty professional sections are omitted, not filled with placeholders.

