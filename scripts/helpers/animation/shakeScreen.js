/**
 * Shakes the screen based on damage taken and settings
 * @param {*} uuid Uuid of token that took damage
 * @param {*} damage Amount of damage taken
 * @returns
 */
export function shakeScreen(uuid, damage) {
    const actor = fromUuidSync(uuid);
    if (!actor.hasPlayerOwner && !game.settings.get("pf2e-rpg-numbers", "shake-gm-enabled")) return;
    const gmID = game.users.activeGM.id;
    const hp = actor.system.attributes.hp;
    const shakeType = game.settings.get("pf2e-rpg-numbers", "shake-intensity-type");
    const max = game.settings.get("pf2e-rpg-numbers", "shake-intensity-max");
    const includeTempHP = game.settings.get("pf2e-rpg-numbers", "shake-intensity-include-temp-hp");
    let shake_amt = 0;
    switch (shakeType) {
        case "max":
            shake_amt = max;
            break;
        case "%-current-hp":
            shake_amt = max * (damage / (hp.value + damage + (includeTempHP ? hp.temp : 0)));
            break;
        case "%-max-hp":
            shake_amt = max * (damage / (hp.max + (includeTempHP ? hp.temp : 0)));
            break;
    }
    if (!isFinite("Infinity")) shake_amt = max;
    let userToShake;
    if (actor.hasPlayerOwner) {
        userToShake = Object.entries(actor.ownership)
            .filter((perm) => perm[1] === 3 && perm[0] !== gmID)
            .map((p) => p[0]);
    } else {
        userToShake = [gmID];
    }
    new Sequence().canvasPan().shake({ duration: 250, strength: shake_amt }).forUsers(userToShake).play();
}
