import { debugLog, doSomethingOnDamageApply, MODULE_ID } from "./helpers/misc.js";
import { turnTokenOnAttack } from "./helpers/animation/turnTokenOnAttack.js";
import { shakeOnDamageToken } from "./helpers/animation/shakeOnDamageToken.js";
import { shakeScreen } from "./helpers/animation/shakeScreen.js";
import { generateRollScroll } from "./helpers/animation/generateRollScroll.js";
import { generateDamageScroll } from "./helpers/animation/generateDamageScroll.js";
import { getDamageList } from "./helpers/rollTerms.js";
import { injectConfig } from "./helpers/injectConfig.js";
import { createFinishingMoveAnimation } from "./helpers/animation/finishing-move.js";
import { createCritAnimation } from "./helpers/animation/crit-animation.js";
import { sendUpdateMessage } from "./helpers/tours/updateMessage.js";
import { createAPI } from "./helpers/api.js";

// HOOKS STUFF
Hooks.on("init", () => {
    Hooks.on("getSceneControlButtons", (controls, _b, _c) => {
        if (!game.user.isGM && !game.settings.get(MODULE_ID, "finishing-move.enabled-players")) return;
        let isFinishingMove = !!game.user.getFlag(MODULE_ID, "finishingMoveActive");
        controls
            .find((con) => con.name == "token")
            .tools.push({
                name: MODULE_ID,
                title: game.i18n.localize("pf2e-rpg-numbers.controls.finishing-move.name"),
                icon: "fas fa-message-captions",
                toggle: true,
                visible: game.settings.get(MODULE_ID, "finishing-move.enabled"),
                active: isFinishingMove,
                onClick: async (toggle) => {
                    game.user.setFlag(MODULE_ID, "finishingMoveActive", toggle);
                },
            });
    });
});

Hooks.on("ready", () => {
    console.log("PF2e RPG Numbers is starting");
    createAPI();
    Hooks.on("createChatMessage", async function (msg, _status, userid) {
        if (!game.settings.get(MODULE_ID, "enabled")) return;
        debugLog({
            msg,
        });
        if (game.user.id === userid) {
            const dat = getData(msg);
            //Finishing Moves
            finishingMove(dat);

            // RPG Numbers on Damage Roll
            damageRollNumbers(dat, msg);

            // RPG Numbers on Check Roll
            checkRollNumbers(dat, msg);

            // Rotate on Attack Roll
            rotateOnAttack(dat, msg);

            //On Damage Application
            onDamageApplication(dat);
        }
    });

    /**
     * TODO Add visual pop ups over characters who's modifiers to rolls mattered (IDK how feasible this is)
    Hooks.on("modifiersMatter", (data) => {
        console.log({ modifiers: data });
        if (!game.settings.get(MODULE_ID, "plus-one.enabled")) return;
        data?.significantModifiers?.forEach((mod) => {
            ui.notifications.info(
                `<b>${mod.name}</b> (<i>${mod.significance}</i>) ${mod.value > 0 ? "+" : "-"} ${mod.value} to ${
                    mod.appliedTo
                }`
            );
        });
    });*/

    injectConfig.quickInject([{ documentName: "Token" }], {
        moduleId: MODULE_ID,
        tab: {
            name: MODULE_ID,
            label: game.i18n.localize("pf2e-rpg-numbers.token-options.tab-label"),
            icon: "fas fa-dragon",
        },
        rotationOffset: {
            type: "number",
            label: game.i18n.localize("pf2e-rpg-numbers.token-options.rotation-offset.name"),
            notes: game.i18n.localize("pf2e-rpg-numbers.token-options.rotation-offset.hint"),
            default: 0,
        },
        fireEmblemImg: {
            type: "filepicker",
            label: game.i18n.localize("pf2e-rpg-numbers.token-options.fire-emblem-img.name"),
            notes: game.i18n.localize("pf2e-rpg-numbers.token-options.fire-emblem-img.hint"),
            default: "",
        },
        personaImg: {
            type: "filepicker",
            label: game.i18n.localize("pf2e-rpg-numbers.token-options.persona-img.name"),
            notes: game.i18n.localize("pf2e-rpg-numbers.token-options.persona-img.hint"),
            default: "",
        },
        critOffsetX: {
            type: "number",
            label: game.i18n.localize("pf2e-rpg-numbers.token-options.crit.offset-x.name"),
            notes: game.i18n.localize("pf2e-rpg-numbers.token-options.crit.offset-x.hint"),
            default: 0,
        },
        critOffsetY: {
            type: "number",
            label: game.i18n.localize("pf2e-rpg-numbers.token-options.crit.offset-y.name"),
            notes: game.i18n.localize("pf2e-rpg-numbers.token-options.crit.offset-y.hint"),
            default: 0,
        },
        critScale: {
            type: "number",
            label: game.i18n.localize("pf2e-rpg-numbers.token-options.crit.scale.name"),
            notes: game.i18n.localize("pf2e-rpg-numbers.token-options.crit.scale.hint"),
            default: 100,
        },
        critRotation: {
            type: "number",
            label: game.i18n.localize("pf2e-rpg-numbers.token-options.crit.rotation.name"),
            notes: game.i18n.localize("pf2e-rpg-numbers.token-options.crit.rotation.hint"),
            default: 0,
        },
        // previewCrit: {
        //     type: "custom",
        //     html: `<button id="critButton">Test Crit Animation</button>
        //     <script src="./modules/pf2e-rpg-numbers/scripts/helpers/testCrit.js">
        //     </script>`,
        // },
    });

    if (game.user.isGM) {
        sendUpdateMessage();
    }

    console.log("PF2e RPG Numbers is ready");
});

//createCritAnimation({ type: "custom", whisper: [game.user.id], token: token ?? game.user.character });

function getData(msg) {
    return {
        isDamageRoll: msg.isDamageRoll,
        isCheckRoll: msg.isCheckRoll,
        isAttackRoll: msg.flags?.pf2e?.context?.type === "attack-roll",
        isApplyDamage: !!msg.flags?.pf2e?.appliedDamage && !msg.flags?.pf2e?.appliedDamage?.isHealing,
        appliedDamage: msg.flags.pf2e?.appliedDamage,
        item: {
            name: msg?.item?.name ?? "",
            actionCount: msg?.item?.system?.actions?.value,
            actionType:
                msg.flags?.pf2e?.context?.type === "attack-roll"
                    ? "attack"
                    : msg?.item?.system?.actionType?.value ?? msg?.item?.type,
            isCantrip: msg?.item?.system?.traits?.value?.includes("cantrip"),
            isPlayerCharacter: msg?.item?.actor?.hasPlayerOwner,
        },
    };
}

function onDamageApplication(dat) {
    if (dat.isApplyDamage && doSomethingOnDamageApply) {
        const dmg = dat.appliedDamage.updates.find((u) => u.path === "system.attributes.hp.value")?.value;
        if (dmg) {
            if (game.settings.get(MODULE_ID, "dmg-shake-directional-enabled"))
                shakeOnDamageToken(dat.appliedDamage?.uuid, dmg);
            if (game.settings.get(MODULE_ID, "shake-enabled")) shakeScreen(dat.appliedDamage.uuid, dmg);
            if (game.settings.get(MODULE_ID, "dmg-on-apply-or-roll") === "apply")
                generateDamageScroll(
                    [{ type: "none", value: dmg }],
                    canvas.tokens.placeables.filter((tok) => tok.actor.uuid === dat.appliedDamage.uuid).map((t) => t.id)
                );
        }
    }
}

function rotateOnAttack(dat, msg) {
    if (dat.isAttackRoll && game.settings.get(MODULE_ID, "rotate-on-attack")) {
        turnTokenOnAttack(msg?.token?.object, msg?.target?.token?.object);
    }
}

function checkRollNumbers(dat, msg) {
    const doChecks = game.settings.get(MODULE_ID, "check-enabled");
    const doCrits = game.settings.get(MODULE_ID, "critical.enabled");
    if (dat.isCheckRoll && (doChecks || doCrits)) {
        const roll_deets = {
            outcome: msg.flags.pf2e.context.outcome ?? "none",
            token: msg.token,
            whisper: msg.whisper,
            roll: msg.rolls[0]?.total ?? "",
            type: msg.flags.pf2e.context.type,
        };
        if (doChecks) generateRollScroll(roll_deets);
        if (doCrits && roll_deets.outcome === "criticalSuccess") createCritAnimation(roll_deets);
    }
}

function damageRollNumbers(dat, msg) {
    if (
        dat.isDamageRoll &&
        game.settings.get(MODULE_ID, "dmg-enabled") &&
        game.settings.get(MODULE_ID, "dmg-on-apply-or-roll") === "roll"
    ) {
        const dmg_list = getDamageList(msg.rolls);
        const targets = getTargetList(msg);
        debugLog(
            {
                msg,
                targets,
                dmg_list,
            },
            "Damage: "
        );
        generateDamageScroll(dmg_list, targets);
    }
}

function finishingMove(dat) {
    if (game.settings.get(MODULE_ID, "finishing-move.enabled") && game.user.getFlag(MODULE_ID, "finishingMoveActive")) {
        debugLog(
            {
                item: dat.item,
            },
            "Finishing Move"
        );
        createFinishingMoveAnimation(dat.item.name);
    }
}

// export function isUseFinishingMove(item) {
//     const actionType = item.actionType;
//     const actionCount = item.actionCount;
//     const pcOrNPC = item.isPlayerCharacter ? "pcs" : "npcs";
//     switch (actionType) {
//         case "action":
//             switch (actionCount) {
//                 case 1:
//                     return (
//                         game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions`) &&
//                         game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions.one`)
//                     );
//                 case 2:
//                     return (
//                         game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions`) &&
//                         game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions.two`)
//                     );
//                 case 3:
//                     return (
//                         game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions`) &&
//                         game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions.three`)
//                     );
//                 default:
//                     return false;
//             }
//         case "reaction":
//             return (
//                 game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions`) &&
//                 game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions.reaction`)
//             );
//         case "free":
//             return (
//                 game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions`) &&
//                 game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.actions.free`)
//             );
//         case "spell":
//             if (item.isCantrip) {
//                 return (
//                     game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.spells`) &&
//                     game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.spells.cantrips`)
//                 );
//             } else {
//                 return (
//                     game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.spells`) &&
//                     game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.spells.ranked`)
//                 );
//             }
//         case "attacks":
//             return game.settings.get(MODULE_ID, `finishing-move.${pcOrNPC}.show-on.attacks`);
//         default:
//             return false;
//     }
// }

/**
 * Extracts target IDs from a message object.
 * @param {object} msg - The message object containing target information.
 * @returns {string[]} An array of target IDs.
 */
export function getTargetList(msg) {
    if (msg.flags?.["pf2e-target-damage"]?.targets) {
        return msg.flags["pf2e-target-damage"].targets.map((t) => t.id);
    } else if (msg.flags?.["pf2e-toolbelt"]?.target?.targets) {
        return msg.flags?.["pf2e-toolbelt"].target.targets.map((t) => t.token.split(".").pop());
    } else {
        // No pf2e target damage module
        return [msg?.target?.token?.id ?? msg.token.id];
    }
}

export function createUpdateMessage() {
    ChatMessage.create({
        content: chatContent,
        whisper: ChatMessage.getWhisperRecipients("GM"),
    });
}
