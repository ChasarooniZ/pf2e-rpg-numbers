import { checkRollNumbers, handleMessage } from "../module.js"
import { DEGREES_OF_SUCCESS } from "./const.js";

export function handleToolbeltTarget() {
    Hooks.on("pf2e-toolbelt.rollSave", async ({
        roll, message, rollMessage, target, data
    }) => {
        handleMessage(rollMessage, rollMessage?.user?.id ?? game.user.id, true)
    })
    Hooks.on("pf2e-toolbelt.rerollSave", async ({
        oldRoll, newRoll, keptRoll, message, target, data
    }) => {
        if (newRoll.roller.id !== game.user.id) return;
        const dat = { isCheckRoll: true }

        const msg = {
            token: target,
            old: {
                actor: target.actor,
            },
            rolls: [
                newRoll
            ],
            whisper: message.whisper,
            flags: {
                pf2e: {
                    context: {
                        outcome: DEGREES_OF_SUCCESS[newRoll?.options?.degreeOfSuccess ?? 4],
                        type: newRoll?.options?.type
                    }
                },
            }
        }

        checkRollNumbers(dat, msg)
    })
}