import { getSetting } from "./misc.js";

/**
 *
 * @param {*} dmg_list
 * @returns Type of damage taken that is the highest
 */
export function findTypeWithLargestTotal(dmg_list) {
    const typeMap = dmg_list.reduce((acc, { type, value }) => {
        acc[type] = (acc[type] || 0) + value;
        return acc;
    }, {});

    return Object.keys(typeMap).reduce((maxType, type) => (typeMap[type] > typeMap[maxType] ? type : maxType));
}

/**
 * How much to scale the font off of (1 = 100% of default font size)
 * @param {*} scaleType Type of scaling to use
 * @param {*} dmg How much damage was dealt (to know how big to scale it)
 * @param {*} tok Token this is affecting (to know how big to scale it)
 * @returns scale of font, 1 = 100% of original size
 */
export function getFontScale(scaleType, dmg, tok) {
    const maxFontScale = getSetting("max-font-scale");
    let scale = maxFontScale - 1;
    if (scaleType === "percentMaxHealth") {
        scale *= dmg / (tok.actor.system.attributes.hp.max + tok.actor.system.attributes.hp.temp);
    }
    if (scaleType === "percentRemainingHealth") {
        scale *= dmg / (tok.actor.system.attributes.hp.value + tok.actor.system.attributes.hp.temp);
    }
    if (scaleType === "none") {
        return 1;
    }
    return Math.max(1, Math.min(scale + 1, maxFontScale));
}

/**
 * Get all users that can see the token
 * @param {*} tok Token trying to be seen
 * @returns Returns list of user ids that can see the token
 */
export function getVisibleUsers(tok) {
    let list = game.users.filter((u) => u.isGM).map((u) => u.id);
    if (tok?.document) {
        tok = tok.document;
    }
    if (!tok?.hidden) {
        // check vision if pf2e perception active
        if (game.modules.get("pf2e-perception")?.active) {
            let cantSee = [];
            for (const key in tok?.flags?.["pf2e-perception"]) {
                if (["undetected", "unnoticed"].includes(tok?.flags?.["pf2e-perception"]?.[key]?.visibility)) {
                    cantSee.push(canvas.tokens.get(key)?.actor?.uuid);
                }
            }
            list = list.concat(
                game.users.players.filter((u) => !cantSee.includes(u?.character?.uuid)).map((u) => u.id)
            );
        } else {
            list = game.users.map((u) => u.id);
        }
    }
    return list;
}

//WIP?
// export function damageShakeRollDamage(token, targets) {
//     targets.forEach((target) => {
//         const default_shake = target === token || !token;
//         const { x: tok_x, y: tok_y, w: tok_width } = target;
//         let ray = new Ray(token, target);
//         const shake_distance = 0.2;
//         let ray_projection_amt = (tok_width / ray.distance) * shake_distance;
//         const shakes = 7;
//         const seq = new Sequence();
//         for (let i = 0; i < shakes; i++) {
//             const sign = i % 2 === 0 ? 1 : -1;
//             let details = ray.project(1 + sign * ray_projection_amt);
//             if (default_shake) details = { x: tok_x + tok_width * shake_distance * sign, y: tok_y };
//             details.ease = "easeInOutSine";
//             seq.animation().waitUntilFinished(10).on(target).moveSpeed(10).moveTowards(details);
//         }

//         seq.animation()
//             .waitUntilFinished()
//             .on(target)
//             .moveSpeed(10)
//             .moveTowards({ x: tok_x, y: tok_y, ease: "easeInOutSine" })
//             .play();
//     });
// }

export function getTokenShakeScale(token, dmg) {
    const result = ["distance", "shakes", "duration"];
    let values = {
        distance: getSetting("tok-shake-distance") / 100,
        shakes: getSetting("tok-shake-shakes"),
        duration: getSetting("tok-shake-duration"),
    };
    const scaleType = getSetting("tok-shake-scaling-type");
    const hp = token.actor.system.attributes.hp;
    let scale = 1;
    switch (scaleType) {
        case "nothing":
            break;
        case "%-current-hp":
            scale = dmg / (hp.value + dmg + hp.temp);
            break;
        case "%-max-hp":
            scale = dmg / (hp.max + hp.temp);
            break;
        default:
            break;
    }

    return result.map((it) => {
        let scaling_option = getSetting(`tok-shake-scaling-${it}`);
        let val = values[it];
        switch (scaling_option) {
            case "no":
                return val;
            case "max":
                return val * scale;
            case "mid":
                return val * scale * 2;
            default:
                return val;
        }
    });
}

export function getVisibleAndMsgVisibleUsers(roll_deets) {
    return getVisibleUsers(roll_deets.token).filter((player) =>
        roll_deets.whisper.length === 0 ? true : roll_deets.whisper.includes(player)
    );
}

export function getMultiVisibleAndMsgVisible(tokens, msgWhispers) {
    let users = getVisibleUsers(tokens[0]);
    let allButFirstToken = tokens.slice(1);
    for (const t of allButFirstToken) {
        if (users.length === 0) break;
        users.filter((u) => getVisibleUsers(t).includes(u));
        if (users.length === 0) break;
    }
    return users.filter((player) => (msgWhispers.length === 0 ? true : msgWhispers.includes(player)));
}
