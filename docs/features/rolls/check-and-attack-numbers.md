---
layout: page
title: Check & Attack Numbers
id: check-and-attack-numbers
previous_page: damage-numbers
next_page: burst-burrow
---

Causes numbers (and optionally text) to appear when you make a check, attack, or save

**Note** for rolls made privately they will only show for the relevant parties and will be indicated as such by the style

## Settings

### Enabled

---

Enable the feature

### Color theme

---

Select color theme of the text

### Display as

---

**Options**

-   **Number Result** - _Just display the total number rolled_
-   **Outcome w/o Combat Crits** - _Display the outcome text, excluding critical success/failures while in combat_
-   **Outcome** - _Display outcome text (Critical Success, Success, etc.)_

What type of text to show (Note if the outcome is hidden or there is no DC attached to the check it will display just a number)

### Font Size

---

**Default:** `30`

How large should the animation font be

### Duration

---

**Default:** `2`

How long the check animation shows (in seconds)

### SFX Settings

#### Enable Check SFX

---

When enabled sounds will play for each check outcome type

#### SFX Play on these Rolls

---

**Options**

-   **Everything** - _Play on Attacks and Checks_
-   **Attacks Only** - _Only play on attacks_
-   **Checks Only** - _Only play on checks_

Decides what types of rolls to play sfx on

#### Play for

---

**Options**

-   **None** - _No Sfx_
-   **All** - _SFX for each outcome type_
-   **Success or Fail** - _Play one of SFX for all degrees of success, and one SFX for all degrees of failure_
-   **Crits Only** - _Play SFX only on criticals_

#### Volume

---

**Default:** `50`

How loud should the SFX be by percentage

#### Critical Success SFX

---

**Default:** `modules/pf2e-rpg-numbers/resources/sounds/checks/success_1.mp3`

Sound effect for Critical Success, also will accept either of the following 2 formats

-   **Wildcard Format** - `path/to/audio/abc*.ogg`
-   **Array Format** - `["audio1.mp3","audio-2.ogg"]` etc.

#### Success SFX

---

**Default:** `modules/pf2e-rpg-numbers/resources/sounds/checks/correct-answer-tone.ogg`

Sound effect for Success, also will accept either of the following 2 formats

-   **Wildcard Format** - `path/to/audio/abc*.ogg`
-   **Array Format** - `["audio1.mp3","audio-2.ogg"]` etc.

#### Failure SFX

---

**Default:** `modules/pf2e-rpg-numbers/resources/sounds/checks/Jpn_L_drum1.mp3`

Sound effect for Failure, also will accept either of the following 2 formats

-   **Wildcard Format** - `path/to/audio/abc*.ogg`
-   **Array Format** - `["audio1.mp3","audio-2.ogg"]` etc.

#### Critical Failure SFX

---

**Default:** `modules/pf2e-rpg-numbers/resources/sounds/checks/negative-answer-lose.ogg`

Sound effect for Critical Failure, also will accept either of the following 2 formats

-   **Wildcard Format** - `path/to/audio/abc*.ogg`
-   **Array Format** - `["audio1.mp3","audio-2.ogg"]` etc.
