import { eldenRingDeath, eldenRingNounVerbed } from "./helpers/animation/text/fromSoftwareText.js";
import { getSetting } from "./helpers/misc.js";

/**
 * Handles pre-deletion actions for combat encounters.
 * @param {Object} encounter - The combat encounter object.
 * @param {*} _changed - Unused parameter.
 * @param {*} _userid - Unused parameter.
 */
export async function preDeleteCombat(encounter, _changed, _userid) {
    // Only proceed if the user is a GM
    if (!game.user.isGM) return;

    const xpNeeded = getSetting('from-software.noun-verbed.text');

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
    if (getSetting('from-software.noun-verbed.enable') && xp >= xpNeeded) {
        await eldenRingNounVerbed();
    }
}
export async function applyTokenStatusEffect(token, status, isAdd) {
    if (status == 'dead' && isAdded && getSetting('from-software.death.enable')) {
        const userId = game.users.find(c => c?.character?.uuid == token?.actor?.uuid)?.id
        if (userId) {
            await eldenRingDeath({ users: [userId] })
        }
    }
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