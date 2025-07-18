import { getTokenShakeScale, getVisibleUsers } from "../../anim.js";
import { MODULE_ID } from "../../const.js";

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
    const usersToPlayFor = getVisibleUsers(token);

    if (game.modules.get("tokenmagic")?.active) {
        shakeWithTokenMagic(token, shakeDistancePercent, shakes, duration);
    } else {
        shakeWithSequencer(token, shakeDistancePercent, shakes, duration, usersToPlayFor);
    }
}

/**
 * Shakes the token using the TokenMagic module
 * @param {Token} token - The token to shake
 * @param {number} shakeDistancePercent - The shake distance as a percentage
 * @param {number} shakes - The number of shakes
 * @param {number} duration - The total duration of the shake effect
 */
async function shakeWithTokenMagic(token, shakeDistancePercent, shakes, duration) {
    const params = [
        {
            filterType: "transform",
            filterId: "tokenShake",
            autoDestroy: true,
            animated: {
                translationX: {
                    animType: "sinOscillation",
                    val1: -shakeDistancePercent,
                    val2: +shakeDistancePercent,
                    loopDuration: duration / shakes,
                    loops: shakes,
                },
            },
        },
    ];
    TokenMagic.addFilters(token, params);
}

/**
 * Shakes the token using the Sequencer library
 * @param {Token} token - The token to shake
 * @param {number} shakeDistancePercent - The shake distance as a percentage
 * @param {number} shakes - The number of shakes
 * @param {number} duration - The total duration of the shake effect
 * @param {User[]} usersToPlayFor - The users who should see the effect
 */
async function shakeWithSequencer(token, shakeDistancePercent, shakes, duration, usersToPlayFor) {
    const movAmount = shakeDistancePercent * token.w;
    const values = generateShakeValues(shakes, movAmount);
    const iterationDuration = duration / values.length;

    new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
        .animation()
        .on(token)
        .opacity(0)
        .effect()
        .atLocation(token)
        .file(getTokenImage(token?.document))
        .scale({ x: token.document.texture.scaleX, y: token.document.texture.scaleY })
        .scaleToObject()
        .loopProperty("spriteContainer", "position.x", {
            values,
            duration: iterationDuration,
            ease: "easeInOutSine",
            pingPong: true,
        })
        .duration(duration)
        .forUsers(usersToPlayFor)
        .waitUntilFinished(-200)
        .animation()
        .on(token)
        .opacity(1)
        .play({ preload: true });
}

/**
 * Generates an array of shake values
 * @param {number} shakes - The number of shakes
 * @param {number} movAmount - The movement amount
 * @returns {number[]} An array of shake values
 */
function generateShakeValues(shakes, movAmount) {
    let values = [0];
    for (let i = 0; i < shakes; i++) {
        const mod = i % 2 ? 1 : -1;
        values = values.concat([mod * movAmount, 0]);
    }
    return values;
}

/**
 * Gets the image source for the token
 * @param {Token} token - The token
 * @returns {string} The image source
 */
export function getTokenImage(token) {
    return token?.ring?.enabled
        ? token?.ring?.subject?.texture ?? token?.texture?.src
        : token?.texture?.src || "icons/svg/cowled.svg";
}
