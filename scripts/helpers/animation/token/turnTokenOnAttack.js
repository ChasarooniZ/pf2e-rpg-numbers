import { gengaAPI, getSetting } from "../../misc.js";
import { MODULE_ID } from "../../const.js";

/**
 * Turns token towards target when attacking
 * @param {*} token Attack token that will turn
 * @param {*} target Person they are attacking
 */
export async function turnTokenOnAttack(token, target) {
    if (!token || !target || token === target) return;
    gengaAPI().token.rotateToTarget(token, target?.center, getRotationOffset(token) - 90);
}

export function getRotationOffset(token) {
    return (
        token?.actor?.getFlag(MODULE_ID, "token")?.rotation?.offset ?? getSetting("rotate-on-attack.default-rotation")
    );
}
