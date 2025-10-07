import { createCritAnimation } from "./helpers/animation/crit/critAnimation.js";
import { createFinishingMoveAnimation } from "./helpers/animation/text/finishingMove.js";
import { generateDamageScroll } from "./helpers/animation/generateDamageScroll.js";
import { generateRollScroll } from "./helpers/animation/generateRollScroll.js";
import { shakeOnDamageToken } from "./helpers/animation/token/shakeOnDamageToken.js";
import { shakeScreen } from "./helpers/animation/shakeScreen.js";
import { shakeOnAttack } from "./helpers/animation/shakeScreenOnAttack.js";
import { turnTokenOnAttack } from "./helpers/animation/token/turnTokenOnAttack.js";
import { createAPI } from "./helpers/api.js";
import {
    debugLog,
    doSomethingOnDamageApply,
    //FinisherDialog,
    getSetting,
    waitForMessage,
} from "./helpers/misc.js";
import { MODULE_ID } from "./helpers/const.js";
import { getDamageList } from "./helpers/rollTerms.js";
import {
    applyTokenStatusEffect,
    combatStart,
    getActorSheetHeaderButtons,
    getItemSheetHeaderButtons,
    getSceneControlButtons,
    preDeleteCombat,
    preUpdateToken,
    targetToken,
} from "./hooks.js";
import { handleDodgeOnMiss } from "./helpers/animation/token/tokenDodgeOnMiss.js";
import { handleDarkestDungeonStress } from "./helpers/animation/token/darkestDungeonStress.js";
import { handleUpdateMessage } from "./updateMessage.js";
import { handleToolbeltTarget } from "./helpers/toolbeltHandlers.js";

// HOOKS STUFF
Hooks.on("init", () => {
    loadTemplates([
        `modules/${MODULE_ID}/templates/updateMessage.hbs`,
    ])
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
        handleMessage(msg, userid)
    });
    Hooks.on("preUpdateToken", preUpdateToken);
    Hooks.on("getActorSheetHeaderButtons", getActorSheetHeaderButtons);

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

    Hooks.on("getItemSheetHeaderButtons", getItemSheetHeaderButtons);
    Hooks.on("combatStart", combatStart);

    Hooks.on("targetToken", targetToken)

    // if (game.user.isGM) {
    //     const version = game.modules.get(MODULE_ID).version;
    //     const lastVersion = getSetting("last-version");
    //     handleUpdate(version, lastVersion);
    // }

    handleUpdateMessage();

    if (game?.toolbelt?.active) handleToolbeltTarget()

    console.log("PF2e RPG Numbers is ready");
});

/**
 * Extracts and structures data from a chat message for processing.
 * @param {object} msg - The chat message object
 * @returns {object} Object containing boolean flags and data about the message type and content
 * @returns {boolean} returns.isDamageRoll - Whether this is a damage roll message
 * @returns {boolean} returns.isCheckRoll - Whether this is a check roll message
 * @returns {boolean} returns.isAttackRoll - Whether this is an attack roll message
 * @returns {boolean} returns.isApplyDamage - Whether damage is being applied
 * @returns {boolean} returns.isAppliedHealing - Whether healing is being applied
 * @returns {object} returns.appliedDamage - Applied damage data from message flags
 * @returns {object} returns.item - Item information with name property
 */
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

/**
 * Determines if screen shake should occur on attack based on actor ownership and settings.
 * @param {object} actor - The actor performing the attack
 * @returns {boolean} Whether screen shake should be activated
 */
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

/**
 * Checks if token rotation on attack is enabled.
 * @returns {boolean} Whether rotation on attack is enabled
 */
function isRotateOnAttack() {
    return getSetting("rotate-on-attack");
}

function rotateOnAttack(msg) {
    turnTokenOnAttack(msg?.token?.object, msg?.target?.token?.object);
}

function isDodgeOnMiss(outcome) {
    return ["failure", "criticalFailure"].includes(outcome) && getSetting("dodge-on-miss.enabled");
}

/**
 * Processes and displays check roll results with optional critical animations.
 * @param {object} dat - Data object from getData() containing roll information
 * @param {object} msg - The chat message object
 */
export function checkRollNumbers(dat, msg) {
    const doChecks = getSetting("check-enabled");
    const doCrits =
        shouldDoCrits(
            msg?.token?.actor?.getFlag("pf2e-rpg-numbers", "critical"),
            msg?.flags?.pf2e?.context?.outcome ?? "none"
        ) && msg?.flags?.pf2e?.context?.type !== "flat-check";
    //const doCritFailures = getSetting("critical.failure.enabled");
    if (dat.isCheckRoll && (doChecks || doCrits)) {
        const roll_deets = {
            outcome: msg?.flags?.pf2e?.context?.outcome ?? "none",
            token: msg.token,
            whisper: msg.whisper,
            roll: msg.rolls[0]?.total ?? "",
            type: msg.flags.pf2e.context.type,
            target: msg?.flags?.pf2e?.context?.target,
        };
        if (doChecks) {
            generateRollScroll(roll_deets);
        }
        if (doCrits && roll_deets.outcome === "criticalSuccess") {
            createCritAnimation(roll_deets, "", true);
        }
        if (roll_deets.outcome === "criticalFailure") {
            createCritAnimation(roll_deets, "", false);
        }
    }
}

/**
 * Processes damage roll results and generates damage scroll animations.
 * @param {object} dat - Data object from getData() containing damage roll info
 * @param {object} msg - The chat message object
 */
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
        waitForMessage(msg.id).then(() => generateDamageScroll(dmg_list, targets, msg));
    }
}

/**
 * Handles finishing move animations when the finishing move flag is active.
 * @param {object} dat - Data object from getData() containing item information
 * @param {object} msg - The chat message object
 */
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

/**
 * Creates an update message in chat for GM recipients.
 */
export function createUpdateMessage(chatContent) {
    ChatMessage.create({
        content: chatContent,
        whisper: ChatMessage.getWhisperRecipients("GM"),
    });
}

/**
 * Determines if critical animations should be displayed based on actor flags and outcome.
 * @param {object} actorFlags - Actor-specific critical animation flags
 * @param {string} outcome - The roll outcome ("criticalSuccess", "criticalFailure", etc.)
 * @returns {boolean} Whether critical animations should be shown
 */

function shouldDoCrits(actorFlags, outcome) {
    const succFail =
        (outcome === "criticalSuccess" && "success") || (outcome === "criticalFailure" && "failure") || "none";
    if (succFail === "none") return false;
    return (
        (actorFlags?.[succFail] && Object.values(actorFlags?.[succFail])?.find((i) => i.enabled === "on")) ||
        getSetting("critical.enabled")
    );
}


export async function handleMessage(msg, userid, dontWait = false) {
    if (game.user.id === userid) {
        if (!getSetting("enabled")) return;
        debugLog({
            msg,
        });
        const dat = getData(msg);
        //Finishing Moves
        finishingMove(dat, msg);

        waitForMessage(msg.id, 250, 120, dontWait).then(() => {
            // RPG Numbers on Damage Roll
            damageRollNumbers(dat, msg);

            // RPG Numbers on Check Roll
            checkRollNumbers(dat, msg);

            handleDarkestDungeonStress(msg)

            //Attack Roll Stuff
            if (dat.isAttackRoll) {
                // Rotate on Attack Roll
                if (isRotateOnAttack()) {
                    rotateOnAttack(msg);
                }
                if (isShakeOnAttack(msg.token.actor)) {
                    shakeOnAttack(msg.token, msg.flags.pf2e.context.outcome);
                }

                if (msg?.token && msg?.target?.token && isDodgeOnMiss(msg.flags.pf2e.context?.outcome ?? "none")) {
                    handleDodgeOnMiss(msg?.token?.object, msg?.target?.token?.object);
                }
            }

            //On Damage Application
            onDamageApplication(dat, msg);
        });
    }
}
