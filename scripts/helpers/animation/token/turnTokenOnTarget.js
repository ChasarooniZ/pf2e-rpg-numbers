import { MODULE_ID } from "../../const.js";
import { getTurnTime } from "./turnTokenOnAttack.js";


export async function turnTokensToTarget(tokens, target, doReturn = true) {
    if (tokens.length === 0 || !target) return;
    const seq = new Sequence({ moduleName: game.modules.get(MODULE_ID).title });

    for (const token of tokens) {
        const flag = token?.document?.getFlag(MODULE_ID, "previousAngle");
        const rotationOffset = token?.actor?.getFlag(MODULE_ID, "token")?.rotation?.offset ?? 0;
        const turnTime = getTurnTime(token);
        const angle = flag ?? token.rotation;
        if (Number.isNaN(Number(flag)) && doReturn)
            token.document.setFlag(MODULE_ID, "previousAngle", angle)
        seq
            // Rotate towards
            .animation()
            .on(token)
            .rotateTowards(target, { duration: turnTime, rotationOffset })
            .waitUntilFinished(turnTime * CONST.RETURN_DELAY_FACTOR)
            //Rotate Back
            .animation()
            .playIf(doReturn)
            .on(token)
            .rotateIn(angle, turnTime)
            .waitUntilFinished()
            //Unset flag
            .thenDo(async function () {
                token.document.unsetFlag(MODULE_ID, "previousAngle")
            })
    }
    seq.play();
}