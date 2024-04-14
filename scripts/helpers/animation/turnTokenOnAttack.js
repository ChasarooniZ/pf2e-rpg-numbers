/**
 * Turns token towards target when attacking
 * @param {*} token Attack token that will turn
 * @param {*} target Person they are attacking
 */

export function turnTokenOnAttack(token, target) {
    if (!token || !target || token === target) return;
    const angle = token.angle;
    const rotationOffset = token.document.flags?.["pf2e-rpg-numbers"]?.rotationOffset ?? 0;
    new Sequence()
        .animation()
        .on(token)
        .rotateTowards(target, { duration: 500, ease: "easeInCubic", rotationOffset })
        .waitUntilFinished(250)
        .animation()
        .on(token)
        .rotateIn(angle, 500, { ease: "easeOutCubic" })
        .play();
}
