---
layout: page
title: Shake Screen On Damaged
id: shake-on-damaged
---

When enabled, if a token who's actor you own is damaged your screen shakes.

## Settings

### Enable

---

Enable the feature

### Duration

---

**Default:** `250`

How long (in ms) should the screen shake for

### Intensity

---

**Default:** `35`

How intense should the screen shaking be

### Intensity Scaling

---

**Options**

-   **None** - _Just uses the intensity value_
-   **% Current HP** - _Scales intensity to `Intensity` times `Damage` divided by `Current Health`_
-   **% Max HP** - _Scales intensity to `Intensity` times `Damage` divided by `Max Health`_

### Scaling Includes Temp HP

---

When enabled, the scaling factors in Temporary Hit Points

### Enable for GM

---

When enabled, the GM to experiences screen shake for any actors and their tokens that don't have a player owner
