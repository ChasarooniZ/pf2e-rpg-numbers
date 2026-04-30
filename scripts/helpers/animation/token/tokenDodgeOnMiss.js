import { MS_TO_SEC } from "../../const.js";
import { getSetting } from "../../misc.js";

export async function handleDodgeOnMiss(token, target) {
    const targetActor = target?.actor;
    const dodgeOnMissType = getSetting("dodge-on-miss.type");
    const tokenSetting = "default"; // 'default' | 'dodge' | 'bounce-off'
    if (tokenSetting !== "default") {
        if (tokenSetting === "dodge") {
            dodgeOnMiss(token, target);
        } else if (tokenSetting === "bounce-off") {
            bounceOffTarget(token, target);
        }
    } else if (dodgeOnMissType === "auto") {
        const raisedShield = targetActor?.armorClass?.modifiers.some((mod) => mod.slug === "raised-shield");
        const str = targetActor?.system?.abilities?.str?.mod;
        const dex = targetActor?.system?.abilities?.dex?.mod;

        if (raisedShield) {
            bounceOffTarget(token, target, COLOR_FILTER.BLUE);
        } else if (str > dex) {
            bounceOffTarget(token, target, COLOR_FILTER.YELLOW);
        } else {
            dodgeOnMiss(token, target);
        }
    } else if (dodgeOnMissType === "dodge") {
        dodgeOnMiss(token, target);
    } else if (dodgeOnMissType === "bounce-off") {
        bounceOffTarget(token, target);
    }
}

/**
 * Dodge when attacked
 * @param {*} token Attack token
 * @param {*} target Defend Token
 */
async function dodgeOnMiss(token, target) {
    game.genga.api.token.dodgeTarget(target, token?.center);
}

async function bounceOffTarget(token, target, filter = {}) {
    const delay = getSetting("dodge-on-miss.delay") * MS_TO_SEC;
    game.genga.api.token.bounceOffTarget(token, target, delay, filter);
}

const COLOR_FILTER = {
    YELLOW: {},
    BLUE: { hue: 150 },
};
