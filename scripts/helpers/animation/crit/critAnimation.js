import { getVisibleAndMsgVisibleUsers } from "../../anim.js";
import { getSetting, MODULE_ID } from "../../misc.js";
import { fireEmblemCrit } from "./fireEmblemCrit.js";
import { personaCrit } from "./personaCrit.js";

/**
 * Creates a critical animation based on the provided roll details.
 * @param {object} rollDeets - The details of the roll triggering the animation.
 * @param {string} [critType=getSetting("critical.type")] - The type of critical animation to display.
 * @returns {void}
 */
export function createCritAnimation(rollDeets, critType = getSetting("critical.type")) {
    if (shouldCancelCriticalHit(rollDeets)) return;

    const imgData = getImageData(rollDeets);
    if (!imgData) return;

    const config = getAnimationConfig({ token: rollDeets.token });
    const users = getEligibleUsers(rollDeets);

    displayCritAnimation(critType, rollDeets.token, users, imgData, config);
}

/**
 * Determines if the critical hit animation should be canceled.
 * @param {object} rollDeets - The details of the roll.
 * @returns {boolean} True if the animation should be canceled, false otherwise.
 */
function shouldCancelCriticalHit(rollDeets) {
    const isAttack = rollDeets.type === "attack-roll";
    const showOn = getSetting("critical.show-on");
    return rollDeets.type !== "custom" && ((showOn === "checks" && isAttack) || (showOn === "attacks" && !isAttack));
}

/**
 * Retrieves the image data for the animation.
 * @param {object} rollDeets - The details of the roll.
 * @returns {object|null} The image data object or null if not applicable.
 */
function getImageData(rollDeets) {
    const enabledTokenType = getSetting("critical.show-on-token-type");
    const defaultImgType = getSetting("critical.default-img");
    const actorType = rollDeets.token.actor.type;

    if (!shouldDisplayForTokenType(rollDeets, enabledTokenType, actorType)) {
        return null;
    }

    const imgData = {
        img: "icons/svg/cowled.svg",
        xScale: 1,
        yScale: 1,
        xOffset: 0,
        yOffset: 0,
        isToken: true,
    };

    if (shouldUseTokenImage(actorType, defaultImgType)) {
        imgData.img = rollDeets?.token?.texture?.src;
        imgData.xScale = rollDeets?.token?.texture?.scaleX ?? 1;
        imgData.yScale = rollDeets?.token?.texture?.scaleY ?? 1;
    } else {
        imgData.img = rollDeets?.token?.actor?.img;
        imgData.isToken = false;
    }

    return imgData;
}

/**
 * Determines if the animation should be displayed for the given token type.
 * @param {object} rollDeets - The details of the roll.
 * @param {string} enabledTokenType - The enabled token type setting.
 * @param {string} actorType - The type of the actor.
 * @returns {boolean} True if the animation should be displayed, false otherwise.
 */
function shouldDisplayForTokenType(rollDeets, enabledTokenType, actorType) {
    return (
        rollDeets.type === "custom" ||
        (actorType === "character" && enabledTokenType !== "npc") ||
        (actorType !== "character" && enabledTokenType !== "pc")
    );
}

/**
 * Determines if the token image should be used.
 * @param {string} actorType - The type of the actor.
 * @param {string} defaultImgType - The default image type setting.
 * @returns {boolean} True if the token image should be used, false otherwise.
 */
function shouldUseTokenImage(actorType, defaultImgType) {
    return actorType === "character" ? defaultImgType?.startsWith("pc-tok") : defaultImgType?.includes("npc-tok");
}

/**
 * Retrieves the animation configuration.
 * @returns {object} The animation configuration object.
 */
function getAnimationConfig(config) {
    return {
        delay: getSetting("critical.delay") * 1000,
        sfx: !!config?.token?.getFlag(MODULE_ID, 'critSFX') ? config?.token?.getFlag(MODULE_ID, 'critSFX') : getSetting("critical.sound"),
        volume: getSetting("critical.volume") / 100,
    };
}

/**
 * Retrieves the list of eligible users for the animation.
 * @param {object} rollDeets - The details of the roll.
 * @returns {string[]} An array of eligible user IDs.
 */
function getEligibleUsers(rollDeets) {
    return getVisibleAndMsgVisibleUsers(rollDeets).filter(
        (uID) => game.users.get(uID).getFlag(MODULE_ID, "critEnabled") !== false
    );
}

/**
 * Displays the critical hit animation based on the specified type.
 * @param {string} critType - The type of critical animation to display.
 * @param {object} token - The token object.
 * @param {string[]} users - The list of eligible user IDs.
 * @param {object} imgData - The image data for the animation.
 * @param {object} config - The animation configuration.
 */
function displayCritAnimation(critType, token, users, imgData, config) {
    switch (critType) {
        case "persona":
            personaCrit(token, users, imgData, config);
            break;
        case "fire-emblem":
            fireEmblemCrit(token, users, imgData, config);
            break;
        default:
            break;
    }
}
