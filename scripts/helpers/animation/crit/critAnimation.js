import { getVisibleAndMsgVisibleUsers } from "../../anim.js";
import { getSetting, MODULE_ID } from "../../misc.js";
import { getTokenImage } from "../shakeOnDamageToken.js";
import { fireEmblemCrit } from "./fireEmblemCrit.js";
import { personaCrit } from "./personaCrit.js";

/**
 * Creates a critical animation based on the provided roll details.
 * @param {object} rollDeets - The details of the roll triggering the animation.
 * @param {string} [critType=getSetting("critical.type")] - The type of critical animation to display.
 * @returns {void}
 */
export function createCritAnimation(rollDeets, critType, isSuccess = true) {
    if (shouldCancelCriticalHit(rollDeets)) return;

    const imgData = getImageData(rollDeets);
    if (!imgData) return;

    const config = getAnimationConfig({ actor: rollDeets.token?.actor, rollDeets, isSuccess });
    const users = getEligibleUsers(rollDeets);

    const type = critType || (config?.type !== 'default' ? (config?.type ?? getSetting("critical.type")) : getSetting("critical.type"));

    config.scale *= imgData.scale;
    config.art = config.art || imgData.img;
    config.sfx = config.sfx || getSetting('critical.sound');

    //Cancels animation based on config or imgData
    if (!(imgData?.showForToken && config.enabled !== 'off' || config.enabled === 'on')) {
        return;
    }
    displayCritAnimation(type, rollDeets.token, users, config);
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

    const imgData = {
        img: "icons/svg/cowled.svg",
        scale: 1,
        showForToken: shouldDisplayForTokenType(rollDeets, enabledTokenType, actorType),
    };

    if (shouldUseTokenImage(actorType, defaultImgType)) {
        imgData.img = getTokenImage(rollDeets?.token?.object);
        imgData.scale = ((rollDeets?.token?.texture?.scaleX ?? 1) + (rollDeets?.token?.texture?.scaleY ?? 1)) / 2;
    } else {
        imgData.img = rollDeets?.token?.actor?.img;
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
    const flags = {
        critical: config.actor.getFlag('pf2e-rpg-numbers', 'critical'),
        token: config.actor.getFlag('pf2e-rpg-numbers', 'token'),
    }

    //{ actor: rollDeets.token?.actor, rollDeets, isSuccess}
    const successOrFail = config.isSuccess ? 'success' : 'failure';

    const data = {
        delay: getSetting("critical.delay") * 1000,
        offset: { x: 0, y: 0 },
        sfx: getSetting("critical.sound"),
        volume: getSetting("critical.volume") / 100,
    };
    let result = {};

    switch (config?.rollDeets?.type) {
        case 'perception-check':
        case 'skill-check':
            result = getCritActorSettings(data, successOrFail, flags, 'checks')
            break;
        case 'attack-roll':
            result = getCritActorSettings(data, successOrFail, flags, 'strikes')
            break;
        case 'saving-throw':
            result = getCritActorSettings(data, successOrFail, flags, 'saves')
            break;
        default:
            result = getCritActorSettings(data, successOrFail, flags)
            break;
    }

    return result;
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



function getCritActorSettings(data, successOrFail, flags, type = 'default') {
    const result = { ...data };
    const checks = flags?.critical?.[type]?.[successOrFail];
    const defaultValues = flags?.critical?.default?.[successOrFail];

    result.art = checks?.art || defaultValues?.art || '';
    result.enabled = checks?.enabled === 'default' ? defaultValues?.enabled : checks?.enabled;
    result.offset.x = checks?.offset?.x || (defaultValues?.offset?.x ?? 0);
    result.offset.y = checks?.offset?.y || (defaultValues?.offset?.y ?? 0);
    result.rotation = checks?.rotation || (defaultValues?.rotation ?? 0)
    result.scale = checks?.scale === 1 ? defaultValues?.scale ?? 1 : checks?.scale;
    result.sfx = checks?.sfx || defaultValues?.sfx || '';
    result.type = checks?.type === 'default' ? defaultValues?.type : checks?.type;

    const volume = checks?.volume === 100 ? defaultValues?.volume ?? 100 : checks?.volume;
    result.volume = (volume * result.volume) / 100;

    return result;
}
