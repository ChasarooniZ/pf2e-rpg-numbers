---
layout: page
title: Critical Animations
id: critical
permalink: feature/critical/critical
previous_page: about
next_page: damage-numbers
---

Cool animations to play on Critical Success (and some for failures).

#### Preview

<video controls>
  <source src="../videos/critical-persona-5.mp4" type="video/mp4">
</video>

## Setting

### Enabled

---

Enables the feature

### Animation Type

---

**Options**

<div class="video-container">
  <div class="video-column">
    <video controls>
      <source src="../videos/critical-persona-5.mp4" type="video/mp4">
    </video>
    <p class="caption">Persona 5</p>
  </div>
  <div class="video-column">
    <video controls>
      <source src="../videos/critical-fire-emblem-awakening.mp4" type="video/mp4">
    </video>
    <p class="caption">Fire Emblem: Awakening</p>
  </div>
  <div class="video-column">
    <video controls>
      <source src="../videos/critical-disgaea-7.mp4" type="video/mp4">
    </video>
    <p class="caption">Disgaea 7</p>
  </div>
</div>
<div class="video-container">
  <div class="video-column">
    <video controls>
      <source src="../videos/critical-fullscreen.mp4" type="video/mp4">
    </video>
    <p class="caption">Fullscreen</p>
  </div>
  <div class="video-column">
  </div>
  <div class="video-column">
  </div>
</div>

Choose type of critical animation to play (this can be configured more specifically in the actor settings)

### Show On

---

**Options**

-   **Attacks** - _Show criticals for Attacks_
-   **Checks** - _Show criticals for Checks_
-   **Everyone** - _Show criticals for all rolls_

What type of rolls to show checks for

### Show For these actors

---

**Options**

-   **PCs** - _Show criticals for Player Characters_
-   **NPCs** - _Show criticals for Non Player Characters_
-   **PCs & NPCs** - _Show criticals for all characters_

Show animation on selected type of actor (this can be overrode in the actor settings)

### Default Image

**Options**

-   **PCs: Actor \| NPCs: Actor**
-   **PCs: Actor \| NPCs: Token**
-   **PCs: Token \| NPCs: Actor**
-   **PCs: Token \| NPCs: Token**

What to source the image as by default

### Duration

---

**Default:** `1.5`

How long should the animation play for (in seconds)

### Sound

---

**Default:** `modules/pf2e-rpg-numbers/resources/sounds/swoosh-universfield.mp3`

Choose the sound effect to play with the critical animation

### Volume

---

**Default:** `50`

Volume level to set for the sound effect

### Delay

---

**Default:** `0`

How long to delay before playing the critical animation (in seconds)

## Player Setting

### Enable - For You

---

**Default:** `true`

You can toggle this off to disable this animation

## Actor Settings

### Types

-   **Critical Success**
    -   This allows you to override the world critical settings
-   **Critical Failure**
    -   This allows you to set critical failure animations for your specific actor (this is currently the only way to have them in this module)

#### Roll Categories

-   **Default** - Base to override (Will fall back to this if one of the other other categories isn't defined and is rolled)
-   **Strikes** - Attacks to override settings for
-   **Checks** - Check rolls to override settings for
-   **Saves** - Save rolls to override settings for

### Settings in each Type + Category combo

_Note. These override the less specific setting (IE Default overrides World, and then say Strikes overrides Default_

#### Override Enabled

---

**Options**

-   **—** _Use default setting_
-   **On** _Override to enable this critical_
-   **Off** _Override to disable this critical_

Allows you to override whether a critical is shown for this actor and category

#### Override Crit Type

---

**Options**

-   **—** _Use default type_
-   _See other options in the [Animation Type](#animation-type) section_

Allows you to override the crit type

#### Art

---

Set this to override the critical art used

#### X Offset

---

Offset (as a % of the screen size)

-   +X = ➡ Right
-   -X = ⬅ Left
-

#### Y Offset

---

Offset (as a % of the screen size)

-   +Y = ⬇ Down
-   -Y = ⬆ Up

#### Rotation

---

Allows you to rotate the critical art

#### SFX

---

**Default:** `modules/pf2e-rpg-numbers/resources/sounds/swoosh-universfield.mp3`

Choose the sound effect to play with the critical animation

#### Volume

---

**Default:** `50`

Volume level to set for the sound effect
