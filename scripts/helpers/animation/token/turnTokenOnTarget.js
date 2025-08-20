import { MODULE_ID } from "../../const.js";

export async function turnTokensToTarget(tokens, target) {
    const seq = new Sequence({ moduleName: game.modules.get(MODULE_ID).title });
    const turnTime = 0.5 * MS_TO_SEC

    for (const token of tokens) {
        const flag = token?.document?.getFlag(MODULE_ID, currentRotation);
        const rotationOffset = token?.actor?.getFlag(MODULE_ID, "token")?.rotation?.offset ?? CONST.DEFAULT_ROTATION_OFFSET;
        const angle = token.rotation;

        if (Number.isNaN(flag)) {
            seq
                .thenDo(async function () {
                    token.document.setFlag(MODULE_ID, "currentRotation", angle)
                })
                .animation()
                .on(token)
                .rotateTowards(target, { duration: turnTime, ease: "easeOutCubic", rotationOffset })
                .waitUntilFinished(turnTime)
                .thenDo(async function () {
                    token.document.unsetFlag(MODULE_ID, "currentRotation")
                })
                .animation()
                .on(token)
                .rotateIn(angle, turnTime, { ease: "easeInCubic" })
        }
    }
    seq.play();
}