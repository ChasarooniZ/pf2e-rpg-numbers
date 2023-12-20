import { debugLog } from "./helpers/misc.js"
import { generateDamageScroll, generateRollScroll, shakeScreen, damageShakeRollDamage, shakeOnDamageToken } from "./helpers/anim.js"
import { getDamageList } from "./helpers/trollTerms.js"

// HOOKS STUFF
Hooks.on("ready", () => {
    console.log("PF2e RPG Numbers is starting");
    //ui.notifications.notify("PF2e RPG Numbers is ready")
    // game.RPGNumbers = new RPGNumbers();
    Hooks.on("createChatMessage", async function (msg, status, id) {
        if (!game.settings.get("pf2e-rpg-numbers", 'enabled')) return;
        debugLog({
            msg
        })
        if (game.user.isGM) {
            if (msg.isDamageRoll && game.settings.get("pf2e-rpg-numbers", 'dmg-enabled')) {
                const dmg_list = getDamageList(msg.rolls);
                const targets = getTargetList(msg);
                debugLog({
                    targets,
                    dmg_list
                })
                generateDamageScroll(dmg_list, targets);
            }
            if (msg.isCheckRoll && game.settings.get("pf2e-rpg-numbers", 'check-enabled')) {
                const roll_deets = {
                    outcome: msg.flags.pf2e.context.outcome ?? 'none',
                    token: msg.token,
                    whisper: msg.whisper,
                    roll: msg.rolls[0]?.total ?? '',
                    type: msg.flags.pf2e.context.type
                }
                generateRollScroll(roll_deets);
            }
            // if (msg.isDamageRoll && game.settings.get("pf2e-rpg-numbers", 'dmg-shake-directional-enabled')) {
            //     const targets = getTargetList(msg);
            //     damageShakeRollDamage(msg.token, targets);
            // }
            if (!!msg.flags?.pf2e?.appliedDamage && !msg.flags?.pf2e?.appliedDamage?.isHealing && game.settings.get("pf2e-rpg-numbers", 'dmg-shake-directional-enabled')) {
                shakeOnDamageToken(msg.token)
            }
            if (!!msg.flags?.pf2e?.appliedDamage && !msg.flags?.pf2e?.appliedDamage?.isHealing && game.settings.get("pf2e-rpg-numbers", 'shake-enabled')) {
                let dmg = msg.flags.pf2e.appliedDamage.updates.find(u => u.path === "system.attributes.hp.value")?.value;
                if (dmg)
                    shakeScreen(msg.flags.pf2e.appliedDamage.uuid, dmg)
            }
        }
    });

    console.log("PF2e RPG Numbers is ready");
})


export function getTargetList(msg) {
    if (msg.flags?.["pf2e-target-damage"]?.targets) {
        return msg.flags['pf2e-target-damage'].targets.map(t => t.id);
    } else if (msg.flags?.["pf2e-toolbelt"]?.target?.targets) {
        return msg.flags?.["pf2e-toolbelt"].target.targets.map(t => t.token.split(".").pop());
    } else { // No pf2e target damage module
        return [msg?.target?.token?.id ?? msg.token.id];
    }
}

