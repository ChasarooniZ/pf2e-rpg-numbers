import { eldenRingNounVerbed } from "./helpers/animation/text/fromSoftwareText.js";
import { getSetting } from "./helpers/misc.js";

export async function preDeleteCombat(encounter, _changed, _userid) {
    if (!game.user.isGM) return;
    const xpNeeded = getSetting('from-software.noun-verbed.text');
    if (xpNeeded === 0) {
        await eldenRingNounVerbed();
        return;
    }
    const combatants = encounter.combatants.map(c => c?.token);
    const enemyLevels = combatants.filter(t => t?.disposition === CONST.TOKEN_DISPOSITIONS.HOSTILE).map(t => t?.actor?.level ?? 0);
    const hazardLevels = combatants.filter(t => t?.actor?.type === 'hazard').map(t => t?.actor?.level ?? 0);
    const partyMemberIDs = game.actors?.party?.members?.map(a => a.uuid) ?? [];
    const partyCombatMembers = combatants.filter(t => partyMemberIDs.includes(t?.actor?.uuid));
    const partyCombatLevel = Math.round(partyCombatMembers.map(p => p?.actor?.level ?? 0).reduce((a, b) => a + b) / partyCombatMembers.length);
    const xp = game.pf2e.gm.calculateXP(partyCombatLevel, partyCombatMembers.length, enemyLevels, hazardLevels, {})
    if (getSetting('from-software.noun-verbed.enable') && xp >= xpNeeded) {
        await eldenRingNounVerbed();
    }
}