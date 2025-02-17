---
layout: page
title: Burst Burrow
id: burst-burrow
previous_page: check-and-attack-numbers
next_page: rotate-on-attack
---

This Feature adds burst and burrowing animations to tokens when they go above or below ground.[^JB2A+]

In general the toke needs to have burrowing speed, and the setting needs to be enabled, and the token needs to either go below 0, or from a negative number to 0 or above.

#### Preview

<video controls>
  <source src="../../videos/burst-burrow.mp4" type="video/mp4">
</video>

## Settings

### Enabled Burst/Burrow

---

Enables feature when true

### Hole Duration

---

**Default:** `10`

How long in seconds should the hole made by burrowing or emerging last.

### Make Hole Persistent

---

**Default:** `false`

If enabled the hole will persistn. To remove holes that are persistent you'll need to go to the sequencer tab and manually end the effect.

### Animation Size Multiplier

---

**Default:** `1`

The size the animation should be, setting it to `0.5` would be **50%** of the size, and `2` would be **200%** of the size.

_Note: The animation size scales off the size of the token triggering the animation_

### Ignore Burrow Speed

---

**Default:** `false`

If enabled the token will create the animation even if it doesn't have burrow speed

_Note: The token will still need to meet the elevation change prerequisites_

[^JB2A+]: This feature requires the [JB2a Patreon Module](https://www.patreon.com/JB2A)