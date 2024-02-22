import { debugLog, doSomethingOnDamageApply, MODULE_ID } from "./helpers/misc.js"
import { generateDamageScroll, generateRollScroll, shakeScreen, shakeOnDamageToken, turnTokenOnAttack } from "./helpers/anim.js"
import { getDamageList } from "./helpers/rollTerms.js"
import { injectConfig } from "./helpers/injectConfig.js"

// HOOKS STUFF
Hooks.on("ready", () => {
    console.log("PF2e RPG Numbers is starting");
    //ui.notifications.notify("PF2e RPG Numbers is ready")
    // game.RPGNumbers = new RPGNumbers();
    Hooks.on("createChatMessage", async function (msg, status, userid) {
        if (!game.settings.get(MODULE_ID, 'enabled')) return;
        debugLog({
            msg
        })
        if (game.user.id === userid) {
            const dat = {
                isDamageRoll: msg.isDamageRoll,
                isCheckRoll: msg.isCheckRoll,
                isAttackRoll: msg.flags?.pf2e?.context?.type === "attack-roll",
                isApplyDamage: !!msg.flags?.pf2e?.appliedDamage && !msg.flags?.pf2e?.appliedDamage?.isHealing,
                appliedDamage: msg.flags.pf2e.appliedDamage,
                actionType: msg.flags.pf2e.origin.type,
                itemName: msg?.item?.name ?? ''
            }

            //Finishing Moves
            if (dat.actionType === 'action' && game.settings.get(MODULE_ID, 'finishing-move.enabled')) {
                if (canvas.scene.getFlag(MODULE_ID, "finishingMoveActive")) {
                    debugLog({
                        itemName: dat.itemName,
                        actionType: dat.actionType
                    })
                    createFinishingMoveAnimation(dat.itemName);
                }
            }

            // RPG Numbers on Damage Roll
            if (dat.isDamageRoll
                && game.settings.get(MODULE_ID, 'dmg-enabled')
                && game.settings.get(MODULE_ID, 'dmg-on-apply-or-roll') === 'roll'
            ) {
                const dmg_list = getDamageList(msg.rolls);
                const targets = getTargetList(msg);
                debugLog({
                    targets,
                    dmg_list
                })
                generateDamageScroll(dmg_list, targets);
            }

            // RPG Numbers on Check Roll
            if (dat.isCheckRoll && game.settings.get(MODULE_ID, 'check-enabled')) {
                const roll_deets = {
                    outcome: msg.flags.pf2e.context.outcome ?? 'none',
                    token: msg.token,
                    whisper: msg.whisper,
                    roll: msg.rolls[0]?.total ?? '',
                    type: msg.flags.pf2e.context.type
                }
                generateRollScroll(roll_deets);
            }
            // if (msg.isDamageRoll && game.settings.get(MODULE_ID, 'dmg-shake-directional-enabled')) {
            //     const targets = getTargetList(msg);
            //     damageShakeRollDamage(msg.token, targets);
            // }

            // RPG Numbers on Attack Roll
            if (dat.isAttackRoll && game.settings.get(MODULE_ID, 'rotate-on-attack')) {
                turnTokenOnAttack(msg?.token?.object, msg?.target?.token?.object);
            }
            //On Damage Application
            if (dat.isApplyDamage && doSomethingOnDamageApply) {
                const dmg = dat.appliedDamage.updates.find(u => u.path === "system.attributes.hp.value")?.value;
                if (dmg) {
                    if (game.settings.get(MODULE_ID, 'dmg-shake-directional-enabled'))
                        shakeOnDamageToken(dat.appliedDamage?.uuid, dmg)
                    if (game.settings.get(MODULE_ID, 'shake-enabled'))
                        shakeScreen(dat.appliedDamage.uuid, dmg)
                    if (game.settings.get(MODULE_ID, 'dmg-on-apply-or-roll') === 'apply')
                        generateDamageScroll(
                            [{ type: 'none', value: dmg }],
                            canvas.tokens.placeables.filter(tok => tok.actor.uuid === dat.appliedDamage.uuid).map(t => t.id))
                }
            }
        }
    });
    if (game.user.isGM) {
        Hooks.on("getSceneControlButtons", (controls, b, c) => {
            if (!canvas.scene) return;
            let isFinishingMove = canvas.scene.getFlag(MODULE_ID, "finishingMoveActive");
            controls
                .find((c) => c.name == "token")
                .tools.push({
                    name: MODULE_ID,
                    title: game.i18n.localize("pf2e-rpg-numbers.controls.finishing-move.name"),
                    icon: "fas fa-message-captions",
                    toggle: true,
                    visible: game.user.isGM,
                    active: isFinishingMove,
                    onClick: async (toggle) => {
                        if (toggle) {
                            canvas.scene.setFlag(MODULE_ID, "finishingMoveActive", toggle)
                        } else {
                            canvas.scene.setFlag(MODULE_ID, "finishingMoveActive", toggle)
                        }
                    },
                });
        });
    }

    if (game.settings.get(MODULE_ID, 'rotate-on-attack')) {
        injectConfig.quickInject([{ documentName: "Token" }],
            {
                moduleId: MODULE_ID,
                tab: {
                    name: MODULE_ID,
                    label: game.i18n.localize("pf2e-rpg-numbers.token-options.tab-label"),
                    icon: "fas fa-dragon"
                },
                "rotationOffset": {
                    type: "number",
                    label: game.i18n.localize("pf2e-rpg-numbers.token-options.rotation-offset.name"),
                    notes: game.i18n.localize("pf2e-rpg-numbers.token-options.rotation-offset.hint"),
                    default: 0,
                }
            }
        );
    }
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

export function createUpdateMessage() {
    ChatMessage.create({
        content: chatContent,
        whisper: ChatMessage.getWhisperRecipients("GM"),
    });
}

