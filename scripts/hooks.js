import { eldenRingNounVerbed, fromSoftwareDeath } from "./helpers/animation/text/fromSoftwareText.js";
import { getSetting, localize, MODULE_ID } from "./helpers/misc.js";

/**
 * Handles pre-deletion actions for combat encounters.
 * @param {Object} encounter - The combat encounter object.
 * @param {*} _changed - Unused parameter.
 * @param {*} _userid - Unused parameter.
 */
export async function preDeleteCombat(encounter, _changed, _userid) {
    // Only proceed if the user is a GM
    if (!game.user.isGM) return;
    if (!getSetting('from-software.noun-verbed.enabled')) return;

    
    const xpNeeded = getSetting('from-software.noun-verbed.xp-threshold');

    // If xpNeeded is 0, trigger the animation and exit
    if (xpNeeded === 0) {
        await eldenRingNounVerbed();
        return;
    }

    // Extract combatants from the encounter
    const combatants = encounter.combatants.map(c => c?.token);

    // Calculate enemy and hazard levels
    const enemyLevels = getActorLevels(combatants, t => t?.disposition === CONST.TOKEN_DISPOSITIONS.HOSTILE);
    const hazardLevels = getActorLevels(combatants, t => t?.actor?.type === 'hazard');

    // Get party members involved in the combat
    const partyMemberIDs = game.actors?.party?.members?.map(a => a.uuid) ?? [];
    const partyCombatMembers = combatants.filter(t => partyMemberIDs.includes(t?.actor?.uuid));

    // Calculate average party level
    const partyCombatLevel = calculateAverageLevel(partyCombatMembers);

    // Calculate XP
    const xp = game.pf2e.gm.calculateXP(partyCombatLevel, partyCombatMembers.length, enemyLevels, hazardLevels, {});

    // Trigger animation if conditions are met
    if ((xp?.xpPerPlayer ?? 0) >= xpNeeded) {
        await eldenRingNounVerbed();
    }
}
export async function applyTokenStatusEffect(token, status, isAdded) {
    // Only proceed if the user is a GM
    if (!game.user.isGM) return;
    if (status == 'dead' && isAdded && getSetting('from-software.death.enabled')) {
        const userId = game.users.find(c => c?.character?.uuid == token?.actor?.uuid)?.id
        if (userId) {
            await fromSoftwareDeath({ users: [userId] })
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
                        paragraph: localize("controls.finishing-move.toolclip.items.description.paragraph"
                        ),
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
    return combatants.filter(filterCondition).map(t => t?.actor?.level ?? 0);
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