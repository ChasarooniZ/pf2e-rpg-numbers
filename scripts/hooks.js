import { fromSoftwareDeath } from "./helpers/animation/text/fromSoftwareText.js";
import { eldenRingNounVerbed } from "./helpers/animation/text/fromSoftware/eldenRingNounVerbed.js";
import { burrow, burstBurrow } from "./helpers/animation/token/burstBurrow.js";
import { ActorSettingsConfigForm } from "./helpers/forms/actorSettingsForm.js";
import { getSetting, localize, MODULE_ID } from "./helpers/misc.js";
import { vsAnimation } from "./helpers/animation/text/vsAnimation.js";

/**
 * Handles pre-deletion actions for combat encounters.
 * @param {Object} encounter - The combat encounter object.
 * @param {*} _changed - Unused parameter.
 * @param {*} _userid - Unused parameter.
 */
export async function preDeleteCombat(encounter, _changed, _userid) {
    // Only proceed if the user is a GM
    if (!game.user.isGM) return;
    if (!getSetting("from-software.noun-verbed.enabled")) return;

    const xpNeeded = getSetting("from-software.noun-verbed.xp-threshold");

    // If xpNeeded is 0, trigger the animation and exit
    if (xpNeeded === 0) {
        eldenRingNounVerbed();
        return;
    }

    // Extract combatants from the encounter
    const combatants = encounter.combatants.map((c) => c?.token);

    // Calculate enemy and hazard levels
    const enemyLevels = getActorLevels(combatants, (t) => t?.disposition === CONST.TOKEN_DISPOSITIONS.HOSTILE);
    const hazardLevels = getActorLevels(combatants, (t) => t?.actor?.type === "hazard");

    // Get party members involved in the combat
    const partyMemberIDs = game.actors?.party?.members?.map((a) => a.uuid) ?? [];
    const partyCombatMembers = combatants.filter((t) => partyMemberIDs.includes(t?.actor?.uuid));

    // Calculate average party level
    const partyCombatLevel = calculateAverageLevel(partyCombatMembers);

    // Calculate XP
    const xp = game.pf2e.gm.calculateXP(partyCombatLevel, partyCombatMembers.length, enemyLevels, hazardLevels, {});

    // Trigger animation if conditions are met
    if ((xp?.xpPerPlayer ?? 0) >= xpNeeded) {
        eldenRingNounVerbed();
    }
}
export async function applyTokenStatusEffect(token, status, isAdded) {
    // Only proceed if the user is a GM
    if (!game.user.isGM) return;
    if (status == "dead" && isAdded && getSetting("from-software.death.enabled")) {
        const userId = game.users.find((c) => c?.character?.uuid == token?.actor?.uuid)?.id;
        if (userId) {
            fromSoftwareDeath({ users: [userId] });
        }
    }
}

export function getSceneControlButtons(controls, _b, _c) {
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
                        paragraph: localize("controls.finishing-move.toolclip.items.description.paragraph"),
                    },
                ],
            },
        });
}

/**
 * Extracts actor levels based on a filter condition.
 * @param {Array} combatants - Array of combatants.
 * @param {Function} filterCondition - Condition to filter combatants.
 * @returns {Array} Array of actor levels.
 */
function getActorLevels(combatants, filterCondition) {
    return combatants.filter(filterCondition).map((t) => t?.actor?.level ?? 0);
}

/**
 * Calculates the average level of party members.
 * @param {Array} partyMembers - Array of party members.
 * @returns {number} Average level rounded to the nearest integer.
 */
function calculateAverageLevel(partyMembers) {
    const totalLevel = partyMembers.reduce((sum, p) => sum + (p?.actor?.level ?? 0), 0);
    return Math.round(totalLevel / partyMembers.length);
}

export async function getActorSheetHeaderButtons(sheet, buttons) {
    if (getSetting("actor-settings.player-enabled") === false && !game.user.isGM) return;
    buttons.unshift({
        class: "rpg-numbers-actor-menu",
        icon: "fa-solid fa-dragon",
        label: localize("menu.actor-settings.label"),
        onclick: () => {
            new ActorSettingsConfigForm({ actor: sheet.actor }).render(true);
        },
    });
    return buttons;
}

export function getItemSheetHeaderButtons(itemSheet, menu) {
    if (!getSetting("finishing-move.enabled")) return;
    const item = itemSheet.item;

    // add RPG number header
    menu.unshift({
        class: "pf2e-rpg-numbers",
        icon: "fa-solid fa-dragon",
        label: localize("menu.actor-settings.label"),
        onclick: async (_ev, itemD = item) => {
            const existingValue = item.getFlag("pf2e-rpg-numbers", "finishing-move.name") || "";
            // Create and display the dialog box
            new Dialog({
                title: localize("menu.item.finishing-move.name"),
                content: `
                <form>
                    <div class="form-group">
                    <label for="finishing-move-name">${localize("menu.item.finishing-move.name")}</label>
                    <input type="text" id="finishing-move-name" name="finishingMoveName" value="${existingValue}" />
                    </div>
                </form>
                `,
                buttons: {
                    save: {
                        label: localize("menu.settings.buttons.footer.save"),
                        callback: async (html) => {
                            // Get the new value from the text input
                            const newValue = html.find("#finishing-move-name").val().trim();

                            // Save the new value to the module flag
                            await item.setFlag("pf2e-rpg-numbers", "finishing-move.name", newValue);

                            // Optionally, show a message or perform additional actions here
                            ui.notifications.info(
                                localize("display-text.notifications.finishing-move.settings.item.update", { newValue })
                            );
                        },
                    },
                    cancel: {
                        label: localize("menu.settings.buttons.footer.cancel"),
                    },
                },
                default: "save",
            }).render(true);
        },
    });
    return menu;
}

export async function preUpdateToken(token, changes, _misc, _id) {
    if (!token.visible) return;
    if (getSetting("burst-burrow.enabled"))
        burstBurrow({ elevationA: token.elevation, elevationB: changes.elevation, token });
    if (getSetting("burst-burrow.burrow-anim.enabled")) {
        const elevationDepth = getSetting("burst-burrow.burrow-anim.depth");
        if (
            (changes?.x !== undefined || changes?.y !== undefined) &&
            token.elevation < 0 &&
            token.elevation >= elevationDepth
        ) {
            const coord1 = { x: token.center.x, y: token.center.y };
            const coord2 = {
                x: changes?.x !== undefined ? changes?.x + token.object.width / 2 : token.center.x,
                y: changes?.y !== undefined ? changes?.y + token.object.height / 2 : token.center.y,
            };
            burrow(coord1, coord2, { token });
        }
    }
}

export function combatStart(encounter, _turn) {
    if (getSetting("vs.combat-start") && game.user.isGM) {
        vsAnimation();
    }
}
