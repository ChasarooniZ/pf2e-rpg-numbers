import { getSetting } from "../../misc.js";
import { MODULE_ID, MS_TO_SEC, ROTATION } from "../../const.js";
import { turnTokensToTarget } from "./turnTokenOnTarget.js";

/**
 * Turns token towards target when attacking
 * @param {*} token Attack token that will turn
 * @param {*} target Person they are attacking
 */
export async function turnTokenOnAttack(token, target) {
    if (!token || !target || token === target) return;
    turnTokensToTarget([token], target)
}


export function getTurnTime(token) {
    const tokenSize = (token.document.height + token.document.width) / 2;
    const baseTurnTime = getSetting("rotate-on-attack.duration") * MS_TO_SEC;
    const turnTimeScale = getSetting("rotate-on-attack.scale-on-size")
        ? 1 + (tokenSize - 1) * ROTATION.SIZE_SCALE_FACTOR
        : 1;
    return baseTurnTime * turnTimeScale;
}

export function getRotationOffset(token) {
    return token?.actor?.getFlag(MODULE_ID, "token")?.rotation?.offset ?? getSetting("rotate-on-attack.default-rotation");
}