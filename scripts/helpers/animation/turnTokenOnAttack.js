/**
 * Turns token towards target when attacking
 * @param {*} token Attack token that will turn
 * @param {*} target Person they are attacking
 */

import { getSetting } from "../misc.js";

export async function turnTokenOnAttack(token, target) {
    if (!token || !target || token === target) return;
    const angle = token.angle;
    const rotationOffset = token.document.flags?.["pf2e-rpg-numbers"]?.rotationOffset ?? 0;
    const tokWxH = (token.document.height + token.document.width)/2;
    const baseTurnTime = getSetting("rotate-on-attack.duration") * 1000;
    const scaleTurnTime = getSetting("rotate-on-attack.scale-on-size");
    const turnTime = scaleTurnTime ? baseTurnTime * (1 + ((tokWxH - 1) / 2)) : baseTurnTime;

    await new Sequence()
        .animation()
        .on(token)
        .rotateTowards(target, { duration: turnTime, ease: "easeOutCubic", rotationOffset })
        .waitUntilFinished(turnTime/2)
        .animation()
        .on(token)
        .rotateIn(angle, turnTime, { ease: "easeInCubic" })
        .play();
}
