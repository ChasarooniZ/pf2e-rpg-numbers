import { getSetting } from "../../misc.js";
import { MODULE_ID, MS_TO_SEC } from "../../const.js";

const CONST = {
    DEFAULT_ROTATION_OFFSET: 0,
    SIZE_SCALE_FACTOR: 0.5,
    RETURN_DELAY_FACTOR: 0.5,
};

/**
 * Turns token towards target when attacking
 * @param {*} token Attack token that will turn
 * @param {*} target Person they are attacking
 */
export async function turnTokenOnAttack(token, target) {
    if (!token || !target || token === target) return;
    const angle = token.angle;
    const rotationOffset = token?.actor?.getFlag(MODULE_ID, "token")?.rotation?.offset ?? CONST.DEFAULT_ROTATION_OFFSET;
    const tokenSize = (token.document.height + token.document.width) / 2;
    const baseTurnTime = getSetting("rotate-on-attack.duration") * MS_TO_SEC;
    const turnTimeScale = getSetting("rotate-on-attack.scale-on-size")
        ? 1 + (tokenSize - 1) * CONST.SIZE_SCALE_FACTOR
        : 1;
    const turnTime = baseTurnTime * turnTimeScale;

    new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
        .animation()
        .on(token)
        .rotateTowards(target, { duration: turnTime, ease: "easeOutCubic", rotationOffset })
        .waitUntilFinished(turnTime * CONST.RETURN_DELAY_FACTOR)
        .animation()
        .on(token)
        .rotateIn(angle, turnTime, { ease: "easeInCubic" })
        .play({ preload: true });
}
