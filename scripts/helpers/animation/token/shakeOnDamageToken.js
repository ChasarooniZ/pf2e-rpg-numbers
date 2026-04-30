import { getTokenShakeScale } from "../../anim.js";

/**
 * Shakes a token to visualize damage
 * @param {string} actor_uuid - The UUID of the actor associated with the token
 * @param {number} dmg - The amount of damage taken
 */
export async function shakeOnDamageToken(actor_uuid, dmg) {
    if (!actor_uuid) return;

    const token = canvas.tokens.placeables.find((t) => t.actor.uuid === actor_uuid);
    if (!token) return;

    const [shakeDistancePercent, shakes, duration] = getTokenShakeScale(token, dmg);

    game.genga.api.token.shakeToken(token, shakeDistancePercent, shakes, duration);
}

/**
 * Gets the image source for the token
 * @param {Token} token - The token
 * @returns {string} The image source
 */
export function getTokenImage(token) {
    return token?.ring?.enabled
        ? (token?.ring?.subject?.texture ?? token?.texture?.src)
        : token?.texture?.src || "icons/svg/cowled.svg";
}
