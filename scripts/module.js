import { createCritAnimation } from "./helpers/animation/crit/critAnimation.js";
import { createFinishingMoveAnimation } from "./helpers/animation/text/finishingMove.js";
import { generateDamageScroll } from "./helpers/animation/generateDamageScroll.js";
import { generateRollScroll } from "./helpers/animation/generateRollScroll.js";
import { shakeOnDamageToken } from "./helpers/animation/shakeOnDamageToken.js";
import { shakeScreen } from "./helpers/animation/shakeScreen.js";
import { shakeOnAttack } from "./helpers/animation/shakeScreenOnAttack.js";
import { turnTokenOnAttack } from "./helpers/animation/turnTokenOnAttack.js";
import { createAPI } from "./helpers/api.js";
import {
    debugLog,
    doSomethingOnDamageApply,
    //FinisherDialog,
    getSetting,
    handleDiceSoNice,
    MODULE_ID
} from "./helpers/misc.js";
import { getDamageList } from "./helpers/rollTerms.js";
import { setupTokenMenu } from "./helpers/UI/tokenUI.js";
import { applyTokenStatusEffect, getSceneControlButtons, preDeleteCombat } from "./hooks.js";

// HOOKS STUFF
Hooks.on("init", () => {
    Hooks.on("getSceneControlButtons", getSceneControlButtons);
});

Hooks.on("ready", () => {
    console.log("PF2e RPG Numbers is starting");
    createAPI();
    // Noun Verbed Elden Ring
    Hooks.on("preDeleteCombat", preDeleteCombat);
    // You died Elden Ring
    Hooks.on("applyTokenStatusEffect", applyTokenStatusEffect);
    Hooks.on("createChatMessage", async function (msg, _status, userid) {
        if (game.user.id === userid) {
            if (!getSetting("enabled")) return;
            debugLog({
                msg,
            });
            const dat = getData(msg);
            //Finishing Moves
            finishingMove(dat, msg);

            // RPG Numbers on Damage Roll
            damageRollNumbers(dat, msg);

            // RPG Numbers on Check Roll
            checkRollNumbers(dat, msg);

            //Attack Roll Stuff
            if (dat.isAttackRoll) {
                // Rotate on Attack Roll
                if (isRotateOnAttack()) handleDiceSoNice(rotateOnAttack, [msg], msg);
                if (isShakeOnAttack(msg.token.actor))
                    handleDiceSoNice(shakeOnAttack, [msg.token, msg.flags.pf2e.context.outcome], msg);
            }

            //On Damage Application
            onDamageApplication(dat, msg);

        }
    });

    /**
     * TODO Add visual pop ups over characters who's modifiers to rolls mattered (IDK how feasible this is)
    Hooks.on("modifiersMatter", (data) => {
        console.log({ modifiers: data });
        if (!getSetting("plus-one.enabled")) return;
        data?.significantModifiers?.forEach((mod) => {
            ui.notifications.info(
                `<b>${mod.name}</b> (<i>${mod.significance}</i>) ${mod.value > 0 ? "+" : "-"} ${mod.value} to ${
                    mod.appliedTo
                }`
            );
        });
    });*/

    // Hooks.on("getActorSheetHeaderButtons", function (characterSheet, menu) {
    //     if (!getSetting("finishing-move.enabled")) return;
    //     const actor = characterSheet.actor;
    //     // add RPG number header
    //     menu.unshift({
    //         class: "pf2e-rpg-numbers",
    //         icon: "fa-solid fa-dragon",
    //         label: "RPG #s",
    //         onclick: async (_ev, actorD = actor) => {
    //             new FinisherDialog(actor).render(true);
    //         },
    //     });
    //     return menu;
    // });

    Hooks.on("getItemSheetHeaderButtons", function (itemSheet, menu) {
        if (!getSetting("finishing-move.enabled")) return;
        const item = itemSheet.item;

        // add RPG number header
        menu.unshift({
            class: "pf2e-rpg-numbers",
            icon: "fa-solid fa-dragon",
            label: "RPG #s",
            onclick: async (_ev, itemD = item) => {
                //console.log({ ev, itemD });
                const existingValue = item.getFlag("pf2e-rpg-numbers", "finishing-move.name") || "";
                // Create and display the dialog box
                new Dialog({
                    title: "Finishing Move Name",
                    content: `
                    <form>
                        <div class="form-group">
                        <label for="finishing-move-name">Finishing Move Name</label>
                        <input type="text" id="finishing-move-name" name="finishingMoveName" value="${existingValue}" />
                        </div>
                    </form>
                    `,
                    buttons: {
                        save: {
                            label: "Save Settings",
                            callback: async (html) => {
                                // Get the new value from the text input
                                const newValue = html.find("#finishing-move-name").val().trim();

                                // Save the new value to the module flag
                                await item.setFlag("pf2e-rpg-numbers", "finishing-move.name", newValue);

                                // Optionally, show a message or perform additional actions here
                                ui.notifications.info(`Finishing Move Name updated to: ${newValue}`);
                            },
                        },
                        cancel: {
                            label: "Cancel",
                        },
                    },
                    default: "save",
                }).render(true);
            },
        });
        return menu;
    });

    setupTokenMenu();

    if (game.user.isGM) {
        //sendUpdateMessage();
    }

    console.log("PF2e RPG Numbers is ready");
});

//createCritAnimation({ type: "custom", whisper: [game.user.id], token: token ?? game.user.character });

function getData(msg) {
    return {
        isDamageRoll: msg.isDamageRoll,
        isCheckRoll: msg.isCheckRoll,
        isAttackRoll: msg.flags?.pf2e?.context?.type === "attack-roll",
        isApplyDamage: !!msg.flags?.pf2e?.appliedDamage,
        isAppliedHealing: msg.flags?.pf2e?.appliedDamage?.isHealing,
        appliedDamage: msg.flags.pf2e?.appliedDamage,
        item: {
            name: msg?.item?.name ?? "",
        },
    };
}

function onDamageApplication(dat, msg) {
    if (dat.isApplyDamage && doSomethingOnDamageApply()) {
        const dmg = dat.appliedDamage.updates.find((u) => u.path === "system.attributes.hp.value")?.value;
        if (dmg) {
            activateShakeToken(dat, dmg);
            if (getSetting("shake-enabled") && !dat.isAppliedHealing) shakeScreen(dat.appliedDamage.uuid, dmg);
            activateOnApplyDamageScroll(dat, dmg, msg);
        }
    }
}

function activateOnApplyDamageScroll(dat, dmg, msg) {
    if (getSetting("dmg-enabled") && getSetting("dmg-on-apply-or-roll") === "apply")
        generateDamageScroll(
            [{ type: dat.isAppliedHealing ? "healing" : "bleed", value: dat.isAppliedHealing ? -dmg : dmg }],
            canvas.tokens.placeables.filter((tok) => tok.actor.uuid === dat.appliedDamage.uuid).map((t) => t.id),
            msg
        );
}

function activateShakeToken(dat, dmg) {
    if (getSetting("dmg-shake-directional-enabled") && !dat.isAppliedHealing)
        shakeOnDamageToken(dat.appliedDamage?.uuid, dmg);
}

function isShakeOnAttack(actor) {
    if (!getSetting("shake-on-attack.enabled")) return false;
    const isPlayerOwned = actor.hasPlayerOwner;
    switch (getSetting("shake-on-attack.type")) {
        case "gm":
            return !isPlayerOwned;
        case "players":
            return isPlayerOwned;
        case "both":
        default:
            return true;
    }
}

function isRotateOnAttack() {
    return getSetting("rotate-on-attack");
}
function rotateOnAttack(msg) {
    turnTokenOnAttack(msg?.token?.object, msg?.target?.token?.object);
}

function checkRollNumbers(dat, msg) {
    const doChecks = getSetting("check-enabled");
    const doCrits = getSetting("critical.enabled");
    if (dat.isCheckRoll && (doChecks || doCrits)) {
        const roll_deets = {
            outcome: msg.flags.pf2e.context.outcome ?? "none",
            token: msg.token,
            whisper: msg.whisper,
            roll: msg.rolls[0]?.total ?? "",
            type: msg.flags.pf2e.context.type,
        };
        if (doChecks) handleDiceSoNice(generateRollScroll, [roll_deets], msg);
        if (doCrits && roll_deets.outcome === "criticalSuccess")
            handleDiceSoNice(createCritAnimation, [roll_deets], msg);
    }
}

function damageRollNumbers(dat, msg) {
    if (dat.isDamageRoll && getSetting("dmg-enabled") && getSetting("dmg-on-apply-or-roll") === "roll") {
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
        handleDiceSoNice(generateDamageScroll, [dmg_list, targets, msg], msg);
    }
}

function finishingMove(dat, msg) {
    if (getSetting("finishing-move.enabled") && game.user.getFlag(MODULE_ID, "finishingMoveActive")) {
        debugLog(
            {
                item: dat.item,
            },
            "Finishing Move"
        );
        const name = msg?.item?.getFlag(MODULE_ID, "finishing-move.name") || dat.item.name;
        createFinishingMoveAnimation(name);
    }
}

/**
 * Extracts target IDs from a message object.
 * @param {object} msg - The message object containing target information.
 * @returns {string[]} An array of target IDs.
 */
export function getTargetList(msg) {
    const pf2eTargetDamage = msg.flags?.["pf2e-target-damage"]?.targets;
    if (pf2eTargetDamage) {
        return pf2eTargetDamage.map((t) => t.id);
    }

    const pf2eToolbeltTargets = msg.flags?.["pf2e-toolbelt"]?.targetHelper?.targets;
    if (pf2eToolbeltTargets) {
        return pf2eToolbeltTargets.map((t) => t.split(".").pop());
    }

    // No pf2e target damage module
    const tok = msg?.target?.token?.id ?? msg?.token?.id;
    return tok ? [tok] : [];
}

export function createUpdateMessage() {
    ChatMessage.create({
        content: chatContent,
        whisper: ChatMessage.getWhisperRecipients("GM"),
    });
}