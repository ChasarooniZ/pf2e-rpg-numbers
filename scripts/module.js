import { debugLog, doSomethingOnDamageApply, getSetting, localize, MODULE_ID } from "./helpers/misc.js";
import { turnTokenOnAttack } from "./helpers/animation/turnTokenOnAttack.js";
import { shakeOnDamageToken } from "./helpers/animation/shakeOnDamageToken.js";
import { shakeScreen } from "./helpers/animation/shakeScreen.js";
import { generateRollScroll } from "./helpers/animation/generateRollScroll.js";
import { generateDamageScroll } from "./helpers/animation/generateDamageScroll.js";
import { getDamageList } from "./helpers/rollTerms.js";
import { injectConfig } from "./helpers/injectConfig.js";
import { createFinishingMoveAnimation } from "./helpers/animation/finishing-move.js";
import { createCritAnimation } from "./helpers/animation/crit/crit-animation.js";
import { sendUpdateMessage } from "./helpers/tours/updateMessage.js";
import { createAPI } from "./helpers/api.js";

// HOOKS STUFF
Hooks.on("init", () => {
    Hooks.on("getSceneControlButtons", (controls, _b, _c) => {
        if (!game.user.isGM && !getSetting("finishing-move.enabled-players")) return;
        let isFinishingMove = !!game.user.getFlag(MODULE_ID, "finishingMoveActive");
        controls
            .find((con) => con.name == "token")
            .tools.push({
                name: MODULE_ID,
                title: localize("controls.finishing-move.name"),
                icon: "fas fa-message-captions",
                toggle: true,
                visible: getSetting("finishing-move.enabled"),
                active: isFinishingMove,
                onClick: async (toggle) => {
                    game.user.setFlag(MODULE_ID, "finishingMoveActive", toggle);
                },
                toolclip: {
                    src: "modules/pf2e-rpg-numbers/resources/videos/finishing-move-toolclip.webm",
                    heading: localize("controls.finishing-move.toolclip.heading"),
                    items: [
                        {
                            paragraph: game.i18n.localize(
                                "pf2e-rpg-numbers.controls.finishing-move.toolclip.items.description.paragraph"
                            ),
                        },
                    ],
                },
            });
    });
});

Hooks.on("ready", () => {
    console.log("PF2e RPG Numbers is starting");
    createAPI();
    Hooks.on("createChatMessage", async function (msg, _status, userid) {
        if (!getSetting("enabled")) return;
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
            if (isRotateOnAttack(dat)) rotateOnAttack(msg);

            //On Damage Application
            onDamageApplication(dat);

            basicActionAnimations(msg);
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

    setupTokenMenu();

    if (game.user.isGM) {
        //sendUpdateMessage();
    }

    console.log("PF2e RPG Numbers is ready");
});

function setupTokenMenu() {
    injectConfig.quickInject([{ documentName: "Token" }], {
        moduleId: MODULE_ID,
        tab: {
            name: MODULE_ID,
            label: localize("token-options.tab-label"),
            icon: "fas fa-dragon",
        },
        rotationOffset: {
            type: "number",
            label: localize("token-options.rotation-offset.name"),
            notes: localize("token-options.rotation-offset.hint"),
            default: 0,
        },
        fireEmblemImg: {
            type: "filepicker",
            label: localize("token-options.fire-emblem-img.name"),
            notes: localize("token-options.fire-emblem-img.hint"),
            default: "",
        },
        personaImg: {
            type: "filepicker",
            label: localize("token-options.persona-img.name"),
            notes: localize("token-options.persona-img.hint"),
            default: "",
        },
        critOffsetX: {
            type: "number",
            label: localize("token-options.crit.offset-x.name"),
            notes: localize("token-options.crit.offset-x.hint"),
            default: 0,
        },
        critOffsetY: {
            type: "number",
            label: localize("token-options.crit.offset-y.name"),
            notes: localize("token-options.crit.offset-y.hint"),
            default: 0,
        },
        critScale: {
            type: "number",
            label: localize("token-options.crit.scale.name"),
            notes: localize("token-options.crit.scale.hint"),
            default: 100,
        },
        critRotation: {
            type: "number",
            label: localize("token-options.crit.rotation.name"),
            notes: localize("token-options.crit.rotation.hint"),
            default: 0,
        },
        critSFX: {
            type: "filepicker.audio",
            label: localize("token-options.crit.sfx.name"),
            notes: localize("token-options.crit.sfx.hint"),
            default: "",
        },
    });
}

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

function onDamageApplication(dat) {
    if (dat.isApplyDamage && doSomethingOnDamageApply) {
        const dmg = dat.appliedDamage.updates.find((u) => u.path === "system.attributes.hp.value")?.value;
        if (dmg) {
            activateShakeToken(dat, dmg);
            if (getSetting("shake-enabled") && !dat.isAppliedHealing) shakeScreen(dat.appliedDamage.uuid, dmg);
            activateOnApplyDamageScroll(dat, dmg);
        }
    }
}

function activateOnApplyDamageScroll(dat, dmg) {
    if (getSetting("dmg-enabled") && getSetting("dmg-on-apply-or-roll") === "apply")
        generateDamageScroll(
            [{ type: dat.isAppliedHealing ? "healing" : "bleed", value: dat.isAppliedHealing ? -dmg : dmg }],
            canvas.tokens.placeables.filter((tok) => tok.actor.uuid === dat.appliedDamage.uuid).map((t) => t.id)
        );
}

function activateShakeToken(dat, dmg) {
    if (getSetting("dmg-shake-directional-enabled") && !dat.isAppliedHealing)
        shakeOnDamageToken(dat.appliedDamage?.uuid, dmg);
}

function isRotateOnAttack(dat) {
    return dat.isAttackRoll && getSetting("rotate-on-attack");
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
        if (doChecks) generateRollScroll(roll_deets);
        if (doCrits && roll_deets.outcome === "criticalSuccess") createCritAnimation(roll_deets);
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
        generateDamageScroll(dmg_list, targets);
    }
}

function finishingMove(dat) {
    if (getSetting("finishing-move.enabled") && game.user.getFlag(MODULE_ID, "finishingMoveActive")) {
        debugLog(
            {
                item: dat.item,
            },
            "Finishing Move"
        );
        createFinishingMoveAnimation(dat.item.name);
    }
}

function basicActionAnimations(msg) {
    if (getSetting("basic-action.enabled")) {
        createBasicActionAnimation(msg);
    }
}

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
