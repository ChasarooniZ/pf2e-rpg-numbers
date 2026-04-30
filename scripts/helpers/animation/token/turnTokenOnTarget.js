import { MODULE_ID, ROTATION } from "../../const.js";
import { getRotationOffset, getTurnTime } from "./turnTokenOnAttack.js";

export async function turnTokensToTarget(tokens, target, doReturn = true) {
    if (tokens.length === 0 || !target) return;

    if (doReturn) {
        for (const token of tokens) {
            game.genga.api.token.rotateToTarget(token, target?.center, getRotationOffset(token));
        }
    } else {
        const seq = new Sequence({ moduleName: game.modules.get(MODULE_ID).title });

        for (const token of tokens) {
            const rotationOffset = token?.actor?.getFlag(MODULE_ID, "token")?.rotation?.offset ?? 0;
            const turnTime = getTurnTime(token);
            seq
                .animation()
                .on(token)
                .rotateTowards(target, { duration: turnTime, rotationOffset });
        }
        seq.play();
    }
}
