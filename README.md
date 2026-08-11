# Viva Lifestyle — Homepage Mockup

Static homepage mockup for **Viva Lifestyle Limited** (活力生活有限公司), a private
Hong Kong circle. Members are drawn from different fields and different generations;
the house runs a season of sporting and social occasions and connects members to
mentors, operators and capital.

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

**Type** — Display: Fraunces. Body: Inter. `index.html` no longer requests the Noto TC
families; the other pages, which are still bilingual, keep them.

**Layout** — 1440px max width, fluid padding `clamp(20px,5vw,80px)`, section rhythm
`clamp(88px,12vw,160px)`.

## Sections

Hero · Partner marquee · Manifesto · The season (event names and dates only) ·
The Circle (five cards) · Pull quote · Invitation (three steps) · Closing · Footer

The Sport / Recreation / Ventures triad was removed along with the impact counters.

The impact counters (12,480 members, 214 gatherings, 46 partners, 31 ventures) were
removed. They were the last fabricated figures on a public page, and the site no longer
argues its case with numbers.

## Voice

Formal, withholding, and unhurried. The site names what exists and declines to
explain it. It does not address a youth audience — the earlier youth framing was
removed, because the circle is composed of people from different fields and
different generations, and copy pitched at fifteen-to-thirty reads as a club the
rest of them are too old for. Traditional Chinese on the remaining bilingual pages
is written Chinese, not colloquial Cantonese.

## Features

- The homepage is **English only**. The language toggle and every `data-en` / `data-zh`
  attribute were stripped from `index.html`. `enquiry.html` is unchanged and keeps its
  bilingual toggle.
- Scroll-reveal animations, scroll progress bar
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

## Language

`index.html` is English only. The other pages still carry Traditional Chinese, so if the
homepage ever needs it back, the `data-en` / `data-zh` pattern and the toggle script are
still in `enquiry.html` to copy from.

## Membership model

Membership is **by invitation**. Members are introduced by an existing member or found
by Viva; anyone else writes an enquiry, which is answered by a person. The three tiers
run Associate, Onyx, Obsidian, Meteorite and Carbonado. Dues are not published on the
site. Copy is written in a formal register in both languages — the
Traditional Chinese is written Chinese, not colloquial Cantonese, because the
colloquial register undercuts the invitation framing.

## Membership prototype

Beyond the homepage, the repo carries the public half of the membership prototype.
**It is a front-end demonstration only** — there is no database, no authentication
and no server. `app.js` still fabricates member data in the browser from a fixed
seed, but nothing public renders it now that the staff console has been removed.

| File | What it is |
|------|------------|
| `index.html` | Public homepage (self-contained) |
| `enquiry.html` | Enquiry letter — membership is by invitation, so there is no self-service sign-up |
| `join.html` | Redirect to `enquiry.html`, kept so older links do not break |
| `card.html` | Redirect to `index.html#circle` — the card now lives on the main page |
| `app.css` | Shared design system for the application pages |
| `app.js` | Mock data (64 members across five tiers, 6 events, check-in log) and shared helpers |
| `qrcode.min.js` | qrcodejs by davidshimjs, MIT — vendored. Currently unreferenced: the card page became a redirect and the staff console is gone. Kept for the real build's check-in flow. |

### The Circle cards

Five cards on the homepage, in **The Circle**. Each is an emblem rather than an
issued credential — no member name, no number, no prices.

The ladder ascends by **rarity, not price**. Gold / Platinum / Diamond is banking
and airline vocabulary, and in Hong Kong it reads as *how much you spend* — the
wrong implication for a body that decides membership by introduction.

**All five cards are black.** This is the second attempt at that. The first one
differentiated the tiers by lightness, which produced a set where Meteorite was
twice as bright as anything else and read as a different product rather than a
higher rank. The set is now tuned to a mean luminance of 11–16 out of 255 — a
spread of five, which is to say they are all simply black.

What escalates instead is **how much gold a card is permitted to carry**. That is
the only axis that reads as rank rather than as price:

| Seal | Tier | Gold permitted | Material showing through | Admission |
|------|------|----------------|--------------------------|-----------|
| I | Associate | A single hairline edge. Nothing else. | Neutral graphite, a faint diagonal tooth | By introduction |
| II | Onyx | Hairline, plus an inner rule | Chalcedony banding with one gold vein | By nomination |
| III | Obsidian | Inner rule, plus corner brackets | Conchoidal sheen, gold flecks in the melt | By nomination |
| IV | Meteorite | Brighter rule, longer brackets | Widmanstätten lattice with gold inlay | By nomination |
| V | Carbonado | Double frame, full brackets, filled seal | Crystalline burst, gold grains in the speckle | By invitation |

Associate's restraint is the point: it is the only card in the set that carries no
ornament at all, and the absence is legible precisely because every card above it
has something.

**Carbonado** is natural black diamond — polycrystalline, found in only two places
on Earth, likely extraterrestrial, harder than ordinary diamond and rarer than
meteorite. It tops the ladder on the same axis the rest ascends.

**The markings changed karat, not colour.** Gold is now the only metal on the set;
the per-material silvers, pearls and glass-greens are gone. `CIRCLE` and the tier
name run from an antique, sunk gold at Associate through struck gold to a pale
white-gold at Carbonado. The `VIVA` wordmark is identical on all five — it is the
house constant, and the thing that makes the set read as one family.

**Every card carries a scrim.** A soft dark gradient sits between the material and
the markings, top and bottom. It is what allows the textures to be as busy as they
are — the wordmark and the tier line always have their own quiet ground, so
Meteorite's lattice can cross the whole face without swallowing the type.

**The ladder has a mechanism.** A member introduces you to Associate; every tier
above is by nomination; the last is not applied for.

Cards use flex rather than grid so the trailing row of two centres beneath the row
of three. On hover a card lifts 10px and a specular highlight rakes across it.
`background-clip: text` has a flat-colour fallback for browsers without it.

### The staff console is gone

`admin.html` — the members table, check-in console, events tab and retention
checklist — was removed from the repository. It was reachable from the public
footer, which meant a staff console full of fabricated member records sat on the
open web. It is still in git history; `git show <commit>^:admin.html` brings it
back if the real build wants it as a starting point. A production console belongs
behind authentication, not on GitHub Pages.

### What a production build still needs

- Real authentication, staff roles, and an audit log on every record change
- A database (members, tiers, events, attendance, consents) and payment handling
- Server-side QR token issuance and validation — the current tokens are cosmetic
- Wallet pass signing, and push updates when a tier or expiry changes
- A PDPO collection statement, a retention policy, and member data access/erasure

### Personal data note

Viva's members are based in Hong Kong, so the Personal Data (Privacy) Ordinance
applies. Membership is no longer age-bounded, but minors are still admitted, so
guardian consent remains a live requirement for anyone under 18. The sign-up flow
captures guardian email and separates marketing and photo consent from the mandatory
terms — but consent capture is not the same as a compliance review, and the
retention checklist that used to live in `admin.html` went with that page.

## Licence

© 2026 Viva Lifestyle Limited. All rights reserved.
