# Viva Lifestyle — Homepage Mockup

Static homepage mockup for **Viva Lifestyle Limited** (活力生活有限公司), a Hong Kong
organisation running sports and recreational events for young people and connecting
them to start-up incubators, mentors and funding.

This is a **design mockup**, not a production build. It is a single self-contained
HTML file with inlined CSS and JavaScript, intended as the visual reference for the
real site.

## Preview

Open `index.html` in any browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

If GitHub Pages is enabled on this repository, the live preview is at
`https://<owner>.github.io/<repo>/`.

## Design system

| Token       | Value     | Use                                      |
|-------------|-----------|------------------------------------------|
| `ink`       | `#0A0E17` | Primary dark background                  |
| `navy`      | `#121C31` | Raised surfaces, cards                   |
| `gold`      | `#C9A227` | Accents, hairlines, eyebrow text         |
| `champagne` | `#E8C86A` | Highlighted display text, hover states   |
| `pulse`     | `#FF4B3E` | Single urgent accent (CTAs, spots left)  |
| `pearl`     | `#F6F3EC` | Body text on dark; light section ground  |

**Type** — Display: Fraunces (Noto Serif TC fallback). Body: Inter (Noto Sans TC fallback).

**Layout** — 1440px max width, fluid padding `clamp(20px,5vw,80px)`, section rhythm
`clamp(88px,12vw,160px)`.

## Sections

Hero (with stat chips and dual CTA) · Partner marquee · Manifesto ·
Three pillars (each with a four-point breakdown) · Upcoming events rail (six events,
with tags and logistics detail) · Impact counters with context lines ·
The Circle (three tiers, itemised benefits) · Ventures (pull quote + three venture
stories) · How to join (three steps) · Journal (four posts with category and read time) ·
Closing band · Footer

## Voice

Copy is written for a 15–30 Hong Kong audience: second person, short sentences,
concrete local detail (districts, MTR exits, prices in HKD). Direct and energetic
rather than slangy, so it sits with the editorial design and does not date quickly.
Traditional Chinese uses natural Hong Kong phrasing rather than literal translation.

## Features

- Bilingual EN / 繁體中文 toggle (demo implementation via `data-en` / `data-zh` attributes)
- Scroll-reveal animations, animated counters, scroll progress bar
- Drag-to-scroll events rail, accordion membership tiers
- Custom cursor and magnetic buttons on fine-pointer devices
- Full-screen mobile navigation overlay
- Responsive down to 360px; honours `prefers-reduced-motion`

## Known limitations of the mockup

These are intentional shortcuts appropriate to a mockup, and should be replaced in
the production build:

- The language toggle rewrites `textContent` in place, so switching EN → 繁中 → EN
  works only because both strings are held on the element. A real build needs proper
  i18n resource files and a persisted locale.
- All content (events, journal posts, tiers, partners) is hardcoded.
- The newsletter input has no submit handling.
- No routing — the nav links are in-page anchors only.

## Membership model

Membership is **by invitation**. Members are introduced by an existing member or found
by Viva; anyone else writes an enquiry, which is answered by a person. The three tiers
are **Diamond** (by invitation), **Platinum** (by introduction) and **Black Gold** (by
nomination). Dues are not published on the site. Copy is written in a formal register in both languages — the
Traditional Chinese is written Chinese, not colloquial Cantonese, because the
colloquial register undercuts the invitation framing.

## Membership prototype

Beyond the homepage, the repo now contains a clickable prototype of the membership
system. **It is a front-end demonstration only** — there is no database, no
authentication and no server. All member data is fabricated in the browser by
`app.js` from a fixed seed, so the demo looks identical on every load, and nothing
is transmitted anywhere.

| File | What it is |
|------|------------|
| `index.html` | Public homepage (self-contained) |
| `enquiry.html` | Enquiry letter — membership is by invitation, so there is no self-service sign-up |
| `join.html` | Redirect to `enquiry.html`, kept so older links do not break |
| `card.html` | Redirect to `index.html#circle` — the card now lives on the main page |
| `admin.html` | Staff console: members, check-in, events, data-retention checklist |
| `app.css` | Shared design system for the three application pages |
| `app.js` | Mock data (64 members, 6 events, check-in log) and shared helpers |
| `qrcode.min.js` | qrcodejs by davidshimjs, MIT — vendored so the card works offline |

### The Circle card

The cards live on the homepage, in **The Circle** — three of them, one per tier. There
is no separate card page and no member's card on the public site: each is an emblem
rather than an issued credential, so no fabricated member name or number appears. No
prices are shown; each card states only how one is admitted.

| Tier | Seal | Material | Admission |
|------|------|----------|-----------|
| Diamond | I | Pale ice-blue with cut facets and a raking highlight | By invitation |
| Platinum | II | Brushed silver-grey metal | By introduction |
| Black Gold | III | Near-black and bronze, guilloché, double gold edge | By nomination |

`VIVA CIRCLE` appears on every card. On **Black Gold** it is gold foil — a gradient
clipped to the glyphs with a nine-second sheen. On **Diamond** and **Platinum** it is
*engraved* instead: a dark steel gradient, because a light metallic foil on a pale
ground is illegible. That is why the two pale cards carry dark markings and the black
card carries gold.

On hover a card lifts 7px and a specular highlight rakes across it. Tier names and
admission routes both carry Chinese (鑽石 / 白金 / 黑金), so the cards follow the
language toggle. `background-clip: text` has a flat-colour fallback.

### Admin console

Searchable, sortable, filterable member table with pagination and CSV export; a
member detail drawer; a check-in console with scan simulation that enforces tier
eligibility and flags missing guardian consent; event fill rates; and a data
retention checklist.

### What a production build still needs

- Real authentication, staff roles, and an audit log on every record change
- A database (members, tiers, events, attendance, consents) and payment handling
- Server-side QR token issuance and validation — the current tokens are cosmetic
- Wallet pass signing, and push updates when a tier or expiry changes
- A PDPO collection statement, a retention policy, and member data access/erasure

### Personal data note

Viva's members are aged 15–30 and based in Hong Kong, so the Personal Data (Privacy)
Ordinance applies, and under-18 members need guardian consent. The sign-up flow
captures guardian email and separates marketing and photo consent from the mandatory
terms — but consent capture is not the same as a compliance review. Treat the
`Data & retention` tab in `admin.html` as a checklist, not as evidence.

## Licence

© 2026 Viva Lifestyle Limited. All rights reserved.
