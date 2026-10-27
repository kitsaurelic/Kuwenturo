# Kuwenturo — Style Reference
> a bright, signage-driven reading adventure for Grade 2 Filipino learners. Glossy sign-gradients and chunky pill buttons carry the playfulness; ivory space and large, high-legibility type keep it readable from the back of a projected classroom.

**Theme:** light (a dark card-state set also exists in the file)

Source measurements are read from the "2026 - KUWENTURO FILE" Figma file (local variables, paint styles, and the Design System pages: Colour, Typography, Buttons, Cards). Roles and recommendations are interpreted. Values marked *inferred* were derived (for example from zoomed artboards or swatch appearance) and should be confirmed against Figma. See **Open Items** at the end.

Kuwenturo is built for three audiences on three screens: **students** on a TV or projector in the classroom (text must survive projection), **teachers** on laptops (24px body, scanned quickly), and **parents/guardians** on phones (17–18px body, quick reading). The visual language borrows from road and shop signage: lessons are framed by glossy gradient "signs" with a light center band, actions are chunky rounded pills, and scenery (sky, clouds, grass, street) comes from layered gradients and vector illustration. Reading activities follow a traffic-light rhythm: green sign for *Bago Basahin* (before reading), amber for *Ang Basahin* (during), red for *Pagkatapos Basahin* (after). Everything is ivory-backed rather than stark white.

## Tokens — Colors

### Brand and core

| Name | Value | Token | Role |
|------|-------|-------|------|
| Royal Blue | `#336DFF` | `--color-royal-blue` | Primary buttons and selected states (Colour page) |
| Main Blue | `#2478FF` | `--color-main-blue` | Paint style MAIN BLUE; activity-screen blue. Close to but not identical to Royal Blue (see Open Items) |
| Secondary Blue | `#002D9E` | `--color-secondary-blue` | Figma variable SECONDARY BLUE; deeper supporting blue |
| Dark Blue | `#001343` | `--color-dark-blue` | Deep navy for navigation, blue signs, and high-contrast text on light surfaces |
| Amber | `#FFBE33` | `--color-amber` | Rewards and positive moments (also paint style MAIN YELLOW) |
| Ivory | `#FFFBF4` | `--color-ivory` | Page background (also paint style MAIN CREAM) |
| Main Red | `#B42224` | `--color-main-red` | Activity red; "after reading" and retry emphasis |
| Main Orange | `#F37F2F` | `--color-main-orange` | Activity orange |
| Black | `#000000` | `--color-black` | Pure black text and sign edges |
| Text Grey | `#727272` | `--color-text-grey` | Paint style TEXT; secondary text (4.66:1 on Ivory) |
| Hint Green | `#00834A` | `--color-hint-green` | Figma variable HINT; hints and guidance. Matches the dark end of the Green Button gradient |

### Feedback

| Name | Value | Token | Role |
|------|-------|-------|------|
| Emerald Green | `#2ECC71` | `--color-emerald` | Correct answers, completed states |
| Tangerine | `#FF8A3D` | `--color-tangerine` | Warnings, important notices |
| Coral Red | `#E95656` | `--color-coral-red` | Incorrect answers, destructive actions |

### Interactive states (buttons)

| Name | Value | Token | Role |
|------|-------|-------|------|
| Button Green | `#1FB84E` | `--color-button-green` | Basic button default fill; text-button label color |
| Button Green Hover | `#4CD76C` | `--color-button-green-hover` | Basic button hover fill |
| Button Green Pressed | `#297E3D` | `--color-button-green-pressed` | Basic button pressed fill |
| Disabled Fill | `#A1A1A1` | `--color-disabled-fill` | Basic button disabled fill |
| Disabled Text | `#D1D1D1` | `--color-disabled-text` | Basic button disabled label |
| Disabled Fill (Stylized) | `#B2B3BD` | `--color-disabled-fill-stylized` | Stylized button disabled fill |
| Disabled Text (Stylized) | `#DFDFDF` | `--color-disabled-text-stylized` | Stylized button disabled label |

### Card state neutrals

Used by the elevated and outlined card state specimens.

| State | Light fill | Light stroke | Dark fill | Dark stroke |
|-------|-----------|--------------|-----------|-------------|
| Default | `#D9D9D9` | `#CCCCCC` | `#3E3F42` | `#656565` |
| Hovered | `#C3C3C3` | `#CCCCCC` | `#333436` | `#656565` |
| Focused | `#D9D9D9` | `#A4A4A4` (thick) | `#3E3F42` | `#787878` (thick) |
| Pressed | `#9A9A9A` | `#CCCCCC` | `#1F2021` | `#656565` |
| Dragged | `#F2F2F2` | `#CCCCCC` | `#55575B` | `#656565` |
| Disabled | `#F4F4F4` | `#CCCCCC` | `#3E3F42` | `#656565` |

### Gradients (paint styles)

Stops are read directly from the Figma paint styles. Gradient direction is *inferred* from the Colour page swatches. Three-stop A→B→A gradients create a light center band, which gives the glossy "sign" look.

| Style | Stops | Role |
|-------|-------|------|
| Green Sign | `#136C39` → `#29BF68` → `#136C39` | Signage in activities; *Bago Basahin* header; "Magaling!" reward |
| Yellow Sign | `#FFAE00` → `#FBCB39` → `#FFAE00` | Signage; *Ang Basahin* header |
| Red Sign | `#AF0414` → `#E43D45` → `#AF0414` | Signage; *Pagkatapos Basahin* header; "Subukan Muli!" reward |
| Blue Sign | `#001343` → `#002581` → `#001343` | Signage in activities |
| Black Sign | `#000000` → `#848484` → `#000000` | Signage |
| Nav | `#001343` → `#002581` → `#001343` | Navigation bar surface |
| Green Button | `#2FBF80` → `#00834A` | Stylized pill button (primary) |
| Red Button | `#C9373C` → `#9D0A0A` | Stylized pill button |
| Blue Button | `#2163FA` → `#001E90` | Stylized pill button |
| Orange Button | `#FFB846` → `#FA7500` | Stylized pill button |
| Pink Button | `#EC88BC` → `#D60186` | Stylized pill button |
| Orange | `#F36800` → `#EF9163` → `#F36800` | Accent band |
| Yellow | `#FDB422` → `#FFE26B` → `#FDB422` | Accent band |
| Pink | `#E61F93` → `#E88EB6` → `#E61F93` | Accent band |
| Light Blue | `#0476BB` → `#6EAFE5` → `#0476BB` | Accent band |
| Purple | `#550868` → `#9D4CB1` → `#550868` | Accent band |
| Title | `#FDC771` → `#FEDEA3` → `#FDC771` | Title plates |
| Subtitle | `#FFF4C0` → `#FFFFFF` → `#FFF4C0` | Subtitle plates |
| Card | `#FFF3E2` → `#FFFFFF` → `#FFF3E2` | Card surface with soft cream edges |
| Sky | `#0079E9` → `#0095FF` at 0% opacity | Sky background in Lakbay activities and stories |
| Sky 2 | `#57B9FB` → `#0095FF` at 50% opacity | Secondary sky |
| Grass | `#439F52` → `#1F5F29` (plus image fill) | Grass illustration |
| Grass 2 | `#439F52` → `#359246` → `#213C24` | Secondary grass illustration |
| Street | `#4A4744` → `#A9A095` (plus image fill) | Street / path scenery |

## Tokens — Typography

### Fredoka One — Display
Headings, titles, and short child-facing labels. The large h1–h3 sizes help students at the back of a projected classroom spot key information; compact steps on tablet and mobile save screen space and keep sections distinct. · `--font-display`
- **Fallback:** `ui-rounded, 'Nunito', system-ui, sans-serif`
- **Weight:** 400 only (Fredoka One ships a single weight)
- **Sizes:** Desktop 19–73px · Tablet 16–58px · Mobile 14–52px (8 values)
- **Line height:** 1.00–1.47
- **Letter spacing:** auto (no tracking applied)

### Atkinson Hyperlegible — Body
Body copy, instructions, explanations, lesson content, and parent messages. Its distinct letterforms make characters easy to tell apart for teachers with varying visual needs and for students far from the screen. Bold is used for button labels and card state labels. · `--font-body`
- **Fallback:** `system-ui, 'Segoe UI', Arial, sans-serif`
- **Weights:** 400 (body), 700 (buttons, labels)
- **Sizes:** Desktop 24px · Tablet 20px · Mobile 18px
- **Line height:** 1.42–1.56
- **Letter spacing:** auto

### Type Scale (responsive)

Heading and caption values come from the Typescale (Desktop / Tablet / Phone) frames. All are weight 400 in Fredoka One.

| Role | Desktop | Tablet | Phone | Token |
|------|---------|--------|-------|-------|
| heading 1 | 73px / 1.10 | 58px / 1.15 | 52px / 1.15 | `--text-h1` |
| heading 2 | 53px / 1.23 | 46px / 1.20 | 42px / 1.20 | `--text-h2` |
| heading 3 | 47px / 1.13 | 37px / 1.25 | 33px / 1.25 | `--text-h3` |
| heading 4 | 36px / 1.28 | 30px / 1.30 | 27px / 1.30 | `--text-h4` |
| heading 5 | 30px / 1.27 | 24px / 1.35 | 21px / 1.35 | `--text-h5` |
| heading 6 | 24px / 1.33 | 19px / 1.50 | 17px / 1.50 | `--text-h6` |
| body (reading) | 24px / 1.42 | 20px / 1.50 | 18px / 1.56 | `--text-body` |
| caption | 19px / 1.26 | 16px / 1.40 | 14px / 1.40 | `--text-caption` |

The Typescale frames show body at 24 / 19 / 17px; the Fonts spec and the audience notes show 24 / 20 / 18px. This file uses the Fonts spec values for reading text because the accessibility notes are written around them (see Open Items).

### Lakbay Aralin scale (projected lesson screens)

A larger scale for classroom-projected content. All Fredoka One / Atkinson Hyperlegible at weight 400.

| Role | Size / line height |
|------|--------------------|
| heading 1 | 96px / 1.08 |
| heading 2 | 73px / 1.12 |
| heading 3 | 64px / 1.18 |
| heading 4 | 48px / 1.25 |
| heading 5 | 40px / 1.32 |
| heading 6 | 30px / 1.40 |
| body | 20px / 1.45 |
| caption | 12px / 1.50 |

### Audience reading rules (from the file)
- **Parent / guardian (phone):** 17–18px body with 28px line height; 14px reserved for non-essential captions; compact headings; shorter line lengths; generous line spacing so Filipino text does not feel cramped.
- **Teacher (laptop):** 24px body with 34px line height; large headings for scanning lessons; avoid small text for instructions, explanations, and answer keys.
- **Classroom (TV/projector):** 24px+ for student-facing content; high contrast because projection reduces clarity; shorter text blocks; never rely on color or small text alone to communicate.

## Tokens — Spacing & Shapes

The file does not define a spacing scale or spacing variables. Values below are what the components actually use. Where a value was measured on a zoomed artboard it is normalized back to 1× and marked *inferred*.

**Density:** comfortable, touch-first

### Observed measurements

| Item | Value |
|------|-------|
| Pill button size | 218 × 65px |
| Pill button radius | 40px (full pill) |
| Pill button stroke | 5px gradient stroke (stylized buttons) |
| Pill button label | Atkinson Hyperlegible Bold 30px |
| Pill button padding / gap | ≈ 10px (inferred from 15% of button height) |
| Card tile radius | 30px (inferred) |
| Card tile size (state specimen) | 120 × 108px (inferred) |
| Card border: elevated, default | 1px (inferred) |
| Card border: outlined | 3px (inferred) |
| Card border: focused | 4px (inferred) |
| Inner container radius | 20px with 10px padding and 10px gap |

### Border Radius

| Element | Value |
|---------|-------|
| buttons | 40px at 65px height (full pill) |
| cards | 30px |
| inner containers / panels | 20px |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| hover | `0 2px 2px rgba(0,0,0,0.25)` | `--shadow-hover` |
| dragged | `4px 8px 10px rgba(0,0,0,0.25)` | `--shadow-dragged` |

Values are normalized from specimens zoomed 6.74× (inferred). Shadows appear only on hover and drag; resting cards are flat.

## Components

### Stylized Pill Button
**Role:** Primary activity action (child-facing)

A 218 × 65px pill, 40px radius, filled with a color-matched button gradient (Green, Pink, Orange, Red, or Blue Button) and wrapped in a 5px gradient stroke that reads as a white or silver rim. Glossy highlight vectors sit on the upper edge and a small dot highlights the left. Label is Atkinson Hyperlegible Bold 30px in `#FFFFFF`. States: default, hover (lighter fill), pressed (darker fill), disabled (`#B2B3BD` fill with `#DFDFDF` label). Each color ships as a three-variant component set (default, hover, pressed).

### Basic Pill Button
**Role:** Flat, lower-emphasis action for dashboards and adult views

Same pill geometry with a flat fill and no gloss. Green states: default `#1FB84E`, hover `#4CD76C`, pressed `#297E3D`, disabled `#A1A1A1` with `#D1D1D1` label. Label is Atkinson Hyperlegible Bold in white. No stroke.

### Text Button
**Role:** Tertiary action

No fill, no stroke; the label is Atkinson Hyperlegible Bold in `#1FB84E`.

### Elevated Card
**Role:** Surface that lifts on interaction

Radius 30px, 1px `#CCCCCC` border. Six states: Default (flat), Hovered (darker fill + hover shadow), Focused (4px `#A4A4A4` ring), Pressed (darkest fill), Dragged (lightest fill + large shadow), Disabled (faint fill). A dark variant with matching states exists. State labels use Atkinson Hyperlegible Bold 20px.

### Outlined Card
**Role:** Card with a defined edge instead of elevation

Same geometry and states as the elevated card, with a 3px border and no resting border color change. Dark variant available.

### Reading Cards
**Role:** Frame each stage of a reading lesson

Cards carry a sign-gradient header with the stage name in display type, over a white-to-cream Card gradient body.
- **Pre-reading — Bago Basahin:** Green Sign header (mission, objectives, "did you know" content).
- **During reading — Ang Basahin:** Yellow Sign header (reminders, key points, the passage).
- **Post-reading — Pagkatapos Basahin:** Red Sign header (challenge and activity tasks).
- Post-reading cards also include comprehension prompts such as speech-bubble questions and sequence/diagram layouts.

### Reward Cards
**Role:** Feedback after an answer or activity

Hexagonal sign shapes with gradient fill and a white rim: **Magaling!** (Green Sign, with variants such as "Tama ang iyong sagot") for correct, **Subukan Muli!** (Red Sign, "Mali ang iyong sagot") for incorrect. Pair with feedback colors but never depend on color alone; the label text carries the meaning.

### Navigation Bar
**Role:** Persistent navigation

Uses the Nav gradient (`#001343` → `#002581` → `#001343`) with light text.

### Scenery Backgrounds
**Role:** Story and activity atmosphere

Layered Sky, Sky 2, Grass, Grass 2, and Street gradient styles with cloud and foliage vectors. Used in Lakbay activities and stories.

## Do's and Don'ts

### Do
- Use Ivory `#FFFBF4` as the default page background, not pure white.
- Use Fredoka One for headings and short child-facing labels; use Atkinson Hyperlegible for everything people read in sentences.
- Keep student-facing text at 24px or larger on laptop and projected screens; keep parent-facing body text at 17–18px or larger on phones.
- Pair a color with a text label or icon for every correct/incorrect and warning state.
- Match each sign gradient to its role: green for Bago Basahin, yellow for Ang Basahin, red for Pagkatapos Basahin.
- Use dark text (`#001343` or `#000000`) on Amber, Orange, and light button fills.
- Provide all interactive states: default, hover, pressed, disabled for buttons; plus focused and dragged for cards.
- Keep captions (12–19px by device) for non-essential details only.

### Don't
- Don't put white text on Amber (`#FFBE33`, 1.66:1) or on the hover green `#4CD76C` (1.87:1).
- Don't use Emerald, Tangerine, or Coral Red as decorative colors; they are reserved for feedback meaning.
- Don't add shadows to resting cards; reserve them for hover and drag.
- Don't mix stylized (glossy) and basic (flat) buttons in the same action group.
- Don't use small text for instructions, explanations, or answer keys.
- Don't apply wide letter-spacing to Fredoka One headings.
- Don't rely on color or small text alone to communicate information in projected views.

## Accessibility notes

Contrast ratios calculated (WCAG relative luminance) for pairings used in the file. 4.5:1 is the AA minimum for body text; 3:1 for large text (about 24px regular or 19px bold and up).

| Pairing | Ratio | Result |
|---------|-------|--------|
| White on `#001343` Dark Blue | 17.88 | Pass |
| `#001343` on Ivory | 17.34 | Pass |
| `#000000` on Amber | 12.67 | Pass |
| `#001343` on Amber | 10.79 | Pass |
| White on `#B42224` Main Red | 6.57 | Pass |
| White on `#297E3D` (pressed green) | 5.07 | Pass |
| White on `#00834A` Hint Green | 4.83 | Pass |
| `#00834A` on Ivory | 4.68 | Pass |
| `#727272` Text Grey on Ivory | 4.66 | Pass |
| White on `#336DFF` Royal Blue | 4.40 | Large text only |
| White on `#2478FF` Main Blue | 4.03 | Large text only |
| White on `#E95656` Coral Red | 3.54 | Large text only |
| White on `#F37F2F` Main Orange | 2.66 | Fail |
| White on `#1FB84E` (basic button default) | 2.62 | Fail |
| White on `#FF8A3D` Tangerine | 2.35 | Fail |
| White on `#2ECC71` Emerald | 2.10 | Fail |
| White on `#4CD76C` (basic button hover) | 1.87 | Fail |
| White on `#FFBE33` Amber | 1.66 | Fail |

Because the file's own guidance prioritizes readability on projectors, the white-on-green basic button (default and hover) is the most important pairing to revisit. Stylized buttons have a gradient fill and white rim, so their effective contrast varies across the button (white on `#2FBF80` is 2.36:1, on `#00834A` is 4.83:1).

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Ivory | `#FFFBF4` | Page background |
| 1 | Card gradient | `#FFF3E2` → `#FFFFFF` → `#FFF3E2` | Cards and content panels |
| 2 | Subtitle gradient | `#FFF4C0` → `#FFFFFF` → `#FFF4C0` | Subtitle plates |
| 3 | Title gradient | `#FDC771` → `#FEDEA3` → `#FDC771` | Title plates |
| 4 | Nav / Blue Sign | `#001343` → `#002581` → `#001343` | Navigation and dark signage |

## Elevation

Depth comes mostly from gradient shading, not shadows: the light center band on every sign gradient and the gloss highlights on stylized buttons create a raised, glossy feel. Cast shadows appear only as interaction feedback (a small shadow on hover, a larger offset shadow when dragged). Focus is shown with a thicker 4px ring rather than a glow.

## Imagery

Illustration-led and vector-based rather than photographic: layered clouds, grass, street scenes, and characters on sky-gradient backdrops, used in Lakbay activities and stories. Sky and grass gradients carry the scene color; reading cards include story illustrations inside rounded frames. Content is Filipino in context and language (Tagalog headings such as Bago Basahin, Magaling!, Subukan Muli!). Icons live on their own Design System page (not yet read for this document).

## Layout

Three layout targets share one system. The classroom view is built on 1280 × 720 TV frames with large type and short text blocks. The teacher view is a laptop layout with 24px body copy and quick-scan headings. The parent view is a phone layout with 17–18px body copy and compact headings. Reading lessons run in three stages: *Bago Basahin* (before), *Ang Basahin* (during), and *Pagkatapos Basahin* (after), each represented by a column of cards with a colored sign header. Reward cards appear after activities.

## Agent Prompt Guide

Quick Color Reference:
- Ivory `#FFFBF4`: page background
- Dark Blue `#001343`: deep navy text and navigation
- Royal Blue `#336DFF`: primary buttons and selected states
- Amber `#FFBE33`: rewards and positive moments
- Emerald `#2ECC71` / Tangerine `#FF8A3D` / Coral Red `#E95656`: correct / warning / incorrect
- Button Green `#1FB84E`, hover `#4CD76C`, pressed `#297E3D`
- Text Grey `#727272`: secondary text

Build prompts:
- Create a lesson screen on an Ivory `#FFFBF4` background with a Fredoka One 73px heading in Dark Blue `#001343` and Atkinson Hyperlegible 24px body copy at 1.42 line height; frame it with a Green Sign (`#136C39 → #29BF68 → #136C39`) header labeled "Bago Basahin".
- Create a stylized pill button, 218 × 65px, 40px radius, filled with the Green Button gradient (`#2FBF80 → #00834A`), with a 5px white-silver gradient rim and a white Atkinson Hyperlegible Bold 30px label; add hover (lighter) and pressed (darker) variants.
- Create an elevated card with 30px radius and a 1px `#CCCCCC` border; add a `0 2px 2px rgba(0,0,0,0.25)` shadow on hover and a 4px `#A4A4A4` focus ring.
- Create a reward card in the shape of a hexagonal sign: "Magaling!" on the Green Sign gradient for a correct answer and "Subukan Muli!" on the Red Sign gradient for an incorrect one, each with a text label so color is never the only signal.
- Create a parent-facing phone screen with 18px Atkinson Hyperlegible body text at 28px line height, 14px captions for secondary details only, and Dark Blue headings in Fredoka One at 33px.
- Create a sky-and-grass story scene using the Sky (`#0079E9` fading to transparent) and Grass (`#439F52 → #1F5F29`) gradients with cloud vectors.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors — brand and core */
  --color-royal-blue: #336DFF;
  --color-main-blue: #2478FF;
  --color-secondary-blue: #002D9E;
  --color-dark-blue: #001343;
  --color-amber: #FFBE33;
  --color-ivory: #FFFBF4;
  --color-main-red: #B42224;
  --color-main-orange: #F37F2F;
  --color-black: #000000;
  --color-text-grey: #727272;
  --color-hint-green: #00834A;

  /* Colors — feedback */
  --color-emerald: #2ECC71;
  --color-tangerine: #FF8A3D;
  --color-coral-red: #E95656;

  /* Colors — button states */
  --color-button-green: #1FB84E;
  --color-button-green-hover: #4CD76C;
  --color-button-green-pressed: #297E3D;
  --color-disabled-fill: #A1A1A1;
  --color-disabled-text: #D1D1D1;
  --color-disabled-fill-stylized: #B2B3BD;
  --color-disabled-text-stylized: #DFDFDF;

  /* Gradients — signs (direction inferred) */
  --gradient-green-sign: linear-gradient(180deg, #136C39 2%, #29BF68 49%, #136C39 100%);
  --gradient-yellow-sign: linear-gradient(180deg, #FFAE00 2%, #FBCB39 49%, #FFAE00 100%);
  --gradient-red-sign: linear-gradient(180deg, #AF0414 0%, #E43D45 50%, #AF0414 100%);
  --gradient-blue-sign: linear-gradient(180deg, #001343 0%, #002581 48%, #001343 93%);
  --gradient-black-sign: linear-gradient(180deg, #000000 2%, #848484 49%, #000000 100%);
  --gradient-nav: linear-gradient(90deg, #001343 0%, #002581 48%, #001343 93%);

  /* Gradients — buttons (direction inferred) */
  --gradient-green-button: linear-gradient(180deg, #2FBF80 0%, #00834A 100%);
  --gradient-red-button: linear-gradient(270deg, #C9373C 0%, #9D0A0A 100%);
  --gradient-blue-button: linear-gradient(270deg, #2163FA 0%, #001E90 100%);
  --gradient-orange-button: linear-gradient(270deg, #FFB846 0%, #FA7500 100%);
  --gradient-pink-button: linear-gradient(270deg, #EC88BC 0%, #D60186 100%);

  /* Gradients — accents, plates, surfaces */
  --gradient-orange: linear-gradient(180deg, #F36800 0%, #EF9163 49%, #F36800 98%);
  --gradient-yellow: linear-gradient(180deg, #FDB422 0%, #FFE26B 50%, #FDB422 98%);
  --gradient-pink: linear-gradient(180deg, #E61F93 5%, #E88EB6 51%, #E61F93 97%);
  --gradient-light-blue: linear-gradient(180deg, #0476BB 0%, #6EAFE5 50%, #0476BB 97%);
  --gradient-purple: linear-gradient(180deg, #550868 0%, #9D4CB1 50%, #550868 98%);
  --gradient-title: linear-gradient(180deg, #FDC771 0%, #FEDEA3 50%, #FDC771 98%);
  --gradient-subtitle: linear-gradient(180deg, #FFF4C0 0%, #FFFFFF 50%, #FFF4C0 100%);
  --gradient-card: linear-gradient(180deg, #FFF3E2 0%, #FFFFFF 51%, #FFF3E2 98%);

  /* Gradients — scenery */
  --gradient-sky: linear-gradient(270deg, #0079E9 0%, rgba(0, 149, 255, 0) 100%);
  --gradient-sky-2: linear-gradient(270deg, #57B9FB 0%, rgba(0, 149, 255, 0.5) 100%);
  --gradient-grass: linear-gradient(270deg, #439F52 0%, #1F5F29 100%);
  --gradient-grass-2: linear-gradient(270deg, #439F52 0%, #359246 33%, #213C24 100%);
  --gradient-street: linear-gradient(180deg, #4A4744 0%, #A9A095 100%);

  /* Typography — families */
  --font-display: 'Fredoka One', ui-rounded, 'Nunito', system-ui, sans-serif;
  --font-body: 'Atkinson Hyperlegible', system-ui, 'Segoe UI', Arial, sans-serif;

  /* Typography — weights */
  --font-weight-regular: 400;
  --font-weight-bold: 700;

  /* Typography — desktop scale */
  --text-h1: 73px;   --leading-h1: 1.10;
  --text-h2: 53px;   --leading-h2: 1.23;
  --text-h3: 47px;   --leading-h3: 1.13;
  --text-h4: 36px;   --leading-h4: 1.28;
  --text-h5: 30px;   --leading-h5: 1.27;
  --text-h6: 24px;   --leading-h6: 1.33;
  --text-body: 24px; --leading-body: 1.42;
  --text-caption: 19px; --leading-caption: 1.26;

  /* Shape */
  --radius-button: 40px;
  --radius-card: 30px;
  --radius-panel: 20px;
  --stroke-button: 5px;
  --stroke-card: 1px;
  --stroke-card-outlined: 3px;
  --stroke-focus: 4px;
  --size-button-width: 218px;
  --size-button-height: 65px;

  /* Shadows */
  --shadow-hover: 0 2px 2px rgba(0, 0, 0, 0.25);
  --shadow-dragged: 4px 8px 10px rgba(0, 0, 0, 0.25);
}

/* Tablet scale (breakpoint not defined in the file; 1024px is an assumption) */
@media (max-width: 1024px) {
  :root {
    --text-h1: 58px; --leading-h1: 1.15;
    --text-h2: 46px; --leading-h2: 1.20;
    --text-h3: 37px; --leading-h3: 1.25;
    --text-h4: 30px; --leading-h4: 1.30;
    --text-h5: 24px; --leading-h5: 1.35;
    --text-h6: 19px; --leading-h6: 1.50;
    --text-body: 20px; --leading-body: 1.50;
    --text-caption: 16px; --leading-caption: 1.40;
  }
}

/* Phone scale (breakpoint not defined in the file; 640px is an assumption) */
@media (max-width: 640px) {
  :root {
    --text-h1: 52px; --leading-h1: 1.15;
    --text-h2: 42px; --leading-h2: 1.20;
    --text-h3: 33px; --leading-h3: 1.25;
    --text-h4: 27px; --leading-h4: 1.30;
    --text-h5: 21px; --leading-h5: 1.35;
    --text-h6: 17px; --leading-h6: 1.50;
    --text-body: 18px; --leading-body: 1.56;
    --text-caption: 14px; --leading-caption: 1.40;
  }
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-royal-blue: #336DFF;
  --color-main-blue: #2478FF;
  --color-secondary-blue: #002D9E;
  --color-dark-blue: #001343;
  --color-amber: #FFBE33;
  --color-ivory: #FFFBF4;
  --color-main-red: #B42224;
  --color-main-orange: #F37F2F;
  --color-text-grey: #727272;
  --color-hint-green: #00834A;
  --color-emerald: #2ECC71;
  --color-tangerine: #FF8A3D;
  --color-coral-red: #E95656;
  --color-button-green: #1FB84E;
  --color-button-green-hover: #4CD76C;
  --color-button-green-pressed: #297E3D;
  --color-disabled-fill: #A1A1A1;
  --color-disabled-text: #D1D1D1;

  /* Typography */
  --font-display: 'Fredoka One', ui-rounded, 'Nunito', system-ui, sans-serif;
  --font-body: 'Atkinson Hyperlegible', system-ui, 'Segoe UI', Arial, sans-serif;
  --text-h1: 73px;
  --text-h2: 53px;
  --text-h3: 47px;
  --text-h4: 36px;
  --text-h5: 30px;
  --text-h6: 24px;
  --text-body: 24px;
  --text-caption: 19px;

  /* Radius */
  --radius-button: 40px;
  --radius-card: 30px;
  --radius-panel: 20px;

  /* Shadows */
  --shadow-hover: 0 2px 2px rgba(0, 0, 0, 0.25);
  --shadow-dragged: 4px 8px 10px rgba(0, 0, 0, 0.25);
}
```

## Open Items

Things the Figma file does not settle, or where its pages disagree. Worth resolving before treating this as final.

1. **No spacing scale.** The file has no spacing variables or documented scale. Add one (a 4px or 8px base is typical) and replace the *inferred* padding values.
2. **No text styles.** The Typography page documents sizes but no Figma text styles exist, so type is not reusable or exportable as tokens. Only 2 colors are variables; everything else is paint styles.
3. **Blue mismatch.** The Colour page lists Royal Blue `#336DFF` for primary buttons, but the paint style MAIN BLUE is `#2478FF`. Decide which one is canonical.
4. **Green mismatch.** Emerald `#2ECC71` (feedback), Button Green `#1FB84E` (basic buttons), Hint `#00834A`, and the Green Button gradient (`#2FBF80 → #00834A`) are four related but unlinked greens.
5. **Body size mismatch.** The Typescale frames show body at 24 / 19 / 17px; the Fonts spec says 24 / 20 / 18px. Tablet and phone line heights differ too (Typescale 1.5 vs Fonts spec 1.42–1.56).
6. **Colour page labels.** Some hex labels on the Colour page do not match the actual paint styles (for example Blue Sign, Primary Grass, Secondary Sky, and Main Cream / Card / Black / Street show `#FF751F`). This document uses the paint style values.
7. **Contrast failures.** White labels on Button Green, hover green, Amber, Orange, Tangerine, and Emerald fail contrast (see Accessibility notes). This matters most for projected classroom screens.
8. **Not yet read.** The Icons page, the Landing Page, Facebook Assets, and the Low/High Fidelity sprint screens were not analyzed for this document, so iconography, the mascot/character style, spacing in real screens, and screen-level patterns are not covered. Gradient directions are inferred from swatches.
9. **Breakpoints.** The Desktop / Tablet / Phone scales exist but no breakpoint widths are defined; 1024px and 640px above are placeholders.
