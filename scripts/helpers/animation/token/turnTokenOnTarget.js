import { MODULE_ID, MS_TO_SEC } from "../../const.js";

export async function turnTokensToTarget(tokens, target) {
    const seq = new Sequence({ moduleName: game.modules.get(MODULE_ID).title });
    const turnTime = 0.5 * MS_TO_SEC

    for (const token of tokens) {
        const flag = token?.document?.getFlag(MODULE_ID, "currentRotation");
        const rotationOffset = token?.actor?.getFlag(MODULE_ID, "token")?.rotation?.offset ?? 0;
        const angle = flag ?? token.rotation;
        if (Number.isNaN(Number(flag)))
            token.document.setFlag(MODULE_ID, "currentRotation", angle)
        seq
            .animation()
            .on(token)
            .rotateTowards(target, { duration: turnTime, ease: "easeOutCubic", rotationOffset })
            .waitUntilFinished(turnTime)
            .animation()
            .on(token)
            .rotateIn(angle, turnTime, { ease: "easeInCubic" })
            .waitUntilFinished()
            .thenDo(async function () {
                token.document.unsetFlag(MODULE_ID, "currentRotation")
            })
    }
    seq.play();
}