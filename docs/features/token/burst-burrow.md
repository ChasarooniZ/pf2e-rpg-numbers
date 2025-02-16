---
layout: page
title: Burst Burrow
id: burst-burrow
permalink: /feature/token/burst-burrow
previous_page: check-and-attack-numbers
next_page: rotate-on-attack
---
This Feature adds burst and burrowing animations to tokens when they go above or below ground.

In general the toke needs to have burrowing speed, and the setting needs to be enabled, and the token needs to either go below 0, or from a negative number to 0 or above.

*Note: Requires JB2A Patreon to use*

The effect can be seen here:


https://github.com/user-attachments/assets/089b4df5-0492-49db-8193-0de60f4510af



## Settings
### Enabled Burst/Burrow
Enables feature when true
### Hole Duration
**Default:** `10`

How long in seconds should the hole made by burrowing or emerging last.
### Make Hole Persistent
**Default:** `false`

If enabled the hole will persistn. To remove holes that are persistent you'll need to go to the sequencer tab and manually end the effect.
### Animation Size Multiplier
**Default `1`

The size the animation should be, setting it to `0.5` would be 50% of the size, and 2 would be 200% of the size.

_Note: The animation size scales off the size of the token triggering the animation_

### Ignore Burrow Speed
** Default** `false`

If enabled the token will create the animation even if it doesn't have burrow speed

_Note: The token will still need to meet the elevation change prerequisites_



