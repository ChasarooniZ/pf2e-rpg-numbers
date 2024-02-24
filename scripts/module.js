import { debugLog, doSomethingOnDamageApply, MODULE_ID } from "./helpers/misc.js"
import { generateDamageScroll, generateRollScroll, shakeScreen, shakeOnDamageToken, turnTokenOnAttack } from "./helpers/anim.js"
import { getDamageList } from "./helpers/rollTerms.js"
import { injectConfig } from "./helpers/injectConfig.js"
import { createFinishingMoveAnimation } from "./helpers/finishing-move.js"
import { sendUpdateChatMessage } from "./helpers/updateMessage.js"

// HOOKS STUFF
Hooks.on("init", () => {
    Hooks.on("getSceneControlButtons", (controls, b, c) => {
        if (!game.user.isGM) return;
        let isFinishingMove = game.user.getFlag(MODULE_ID, "finishingMoveActive");
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
                        game.user.setFlag(MODULE_ID, "finishingMoveActive", toggle)
                    } else {
                        game.user.setFlag(MODULE_ID, "finishingMoveActive", toggle)
                    }
                },
            });
    });
})

Hooks.on("ready", () => {
    console.log("PF2e RPG Numbers is starting");
    // sendUpdateChatMessage();
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
                appliedDamage: msg.flags.pf2e?.appliedDamage,
                item: {
                    name: msg?.item?.name ?? '',
                    actionCount: msg?.item?.system?.actions?.value,
                    actionType: msg.flags?.pf2e?.context?.type === "attack-roll" ? 'attack' : msg?.item?.system?.actionType?.value ?? msg?.item?.type,
                    isCantrip: msg?.item?.system?.traits?.value?.includes('cantrip'),
                    isPlayerCharacter: msg?.item?.actor?.hasPlayerOwner
                }
            }

            //Finishing Moves
            if (game.settings.get(MODULE_ID, 'finishing-move.enabled') &&isUseFinishingMove(dat.item)) {
                if (game.user.getFlag(MODULE_ID, "finishingMoveActive")) {
                    debugLog({
                        item: dat.item
                    }, "Finishing Move")
                    createFinishingMoveAnimation(dat.item.name);
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

    Hooks.on('modifiersMatter', (data) => {
        data.forEach((mod) => {
            ui.notifications.info(`<b>${mod.name}</b> (<i>${mod.significance}</i>) ${mod.value > 0 ? `+${mod.value}` : mod.value} to ${mod.appliedTo}`)
        })
    })

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


export function isUseFinishingMove(item) {
    const actionType = item.actionType;
    const actionCount = item.actionCount;
    const pcOrNPC = item.isPlayerCharacter ? 'pcs' : 'npcs';
    switch (actionType) {
        case 'action':
            switch (actionCount) {
                case 1:
                    return game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions`) && game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions.one`)
                case 2:
                    return game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions`) && game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions.two`)
                case 3:

                    return game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions`) && game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions.three`)
                default:
                    return false;
            }
        case 'reaction':
            return game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions`) && game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions.reaction`)
        case 'free':

            return game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions`) && game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions.free`)
        case 'spell':
            if (item.isCantrip) {
                return game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.spells`) && game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.spells.cantrips`);
            } else {
                return game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.spells`) && game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.spells.ranked`);
            }
        case 'attacks':
            return game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.attacks`);
        default:
            return false;
    }
}

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

