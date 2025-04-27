import { MODULE_ID } from "../misc.js";

export async function shakeOnAttack(token, outcome) {
    let strength = 10;
    if (["success", "criticalSuccess"].includes(outcome)) {
        if (outcome === "criticalSuccess") {
            strength *= 2;
        }
        const gmID = game.users.activeGM.id;
        let userToShake = [gmID];
        const actor = token.actor;
        if (actor.hasPlayerOwner) {
            userToShake = Object.entries(actor.ownership)
                .filter((perm) => perm[1] === 3 && perm[0] !== gmID)
                .map((p) => p[0]);
        }
        new Sequence({moduleName: game.modules.get(MODULE_ID).title})
            .canvasPan()
            .shake({ duration: 250, strength })
            .forUsers(userToShake)
            .play({ preload: true });
    }
}
