---
layout: page
title: API
id: api
permalink: /api
---

## `damageNumbers`

### `generate`

Generates damage scrolling text for a passed-in list of damage values.

#### Parameters

-   `dmgList`: Array of objects containing damage type and value.
-   `targetIDs`: Array of target token IDs.

#### Example

```js
game.pf2eRPGNumbers.damageNumbers.generate([{type:'bludgeoning', value:'32'}], [game.user.character?.id]}]);
```

### `getDamageList`

Extracts the damage list from a message.

#### Parameters

-   `msg`: Message object containing rolls.

#### Example

```js
game.pf2eRPGNumbers.damageNumbers.getDamageList(msg);
```

## `finishingMove`

### `generate`

Generates a finishing move animation.

#### Parameters

-   `text`: Text to display in the finishing move animation.

#### Example

```js
game.pf2eRPGNumbers.finishingMove.generate("Levin Ballet 10000");
```

## `rollNumbers`

### `generate`

Generates scrolling text for a roll.

#### Parameters

-   `roll`: Object containing roll details.
-   `whisper`: Array of user IDs to whisper the roll to. (default: [])
-   `type`: Type of roll (default: "attack-roll").
-   `outcome`: Outcome of the roll (default: "none").
-   `token`: Token object.

#### Example

```js
game.pf2eRPGNumbers.rollNumbers.generate({ roll: new Roll("1d20").roll(), token: game.user.character.token });
```

## `critAnimation`

### `generate`

Creates a critical animation based on the provided roll details.

#### Parameters

-   `token`: Token object triggering the animation.
-   `critType`: Type of critical animation to display (default: "persona") ("persona" | "fire-emblem").

#### Example

```js
game.pf2eRPGNumbers.critAnimation.generate(game.user.character.token, "fire-emblem");
```

## `turnTokenAttack`

### `generate`

Performs a token attack animation.

#### Parameters

-   `tokenObject`: Object representing the attacking token.
-   `targetTokenObject`: Object representing the target token.

#### Example

```js
game.pf2eRPGNumbers.critAnimation.generate(game.user.character.token, game.user.targets.first());
```
