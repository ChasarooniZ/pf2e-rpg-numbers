---
layout: page
title: Target Dodges
id: target-dodges
previous_page: shake-on-damaged
next_page: token-damage-shake
---

When enabled, causes the token to activate a "dodge" animation on any attack that misses it.

## Settings

### Enable

---

Enable the feature

### Duration

---

**Default:** `1.5`

How long (in seconds) should the dodge animation last for

### Distance

---

**Default:** `1`

How far (in grid units) should the token dodge around

### Delay

---

**Default:** `0`

How long (in seconds) should the dodge animation be delayed

## Type

---

**Options**

-   **Auto** - _Automatically chooses an animation (see below for details)_
-   **Dodge** - _The token moves to dodge the attack_
-   **Bounce Off** - _The attack bounces off the token creating sparks [^1]_

Choose the type of "dodge" animation to use

#### Auto

Auto chooses a dodge animation as follows:

-   If you have a `Raised Shield` or have the `Shield` spell active
    -   **Bounce Off** with `blue` sparks
-   If your `Strength` mod > `Dexterity` mod
    -   **Bounce Off** with `yellow` sparks
-   Else
    -   Normal **Dodge**

### Scaling Includes Temp HP

---

When enabled, the scaling factors in Temporary Hit Points

### Enable for GM

---

When enabled, the GM to experiences screen shake for any actors and their tokens that don't have a player owner

## Actor Settings

## Type

---

**Options**

-   **—** - _Use default target dodge type settings_
-   **Dodge** - _The token moves to dodge the attack_
-   **Bounce Off** - _The attack bounces off the token creating sparks [^1]_

Choose the type of "dodge" animation to use for the actor overriding the world setting

---

## Notes

[^1]: This feature requires the [JB2a Patreon Module](https://www.patreon.com/JB2A)
