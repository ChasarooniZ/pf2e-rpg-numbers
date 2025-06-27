import { getVisibleAndMsgVisibleUsers } from "../../anim.js";
import { getSetting, localize, MODULE_ID } from "../../misc.js";
import { getTokenImage } from "../token/shakeOnDamageToken.js";

/**
 * Creates a critical animation based on the provided roll details.
 * @param {object} rollDeets - The details of the roll triggering the animation.
 * @param {string} [critType=getSetting("critical.type")] - The type of critical animation to display.
 * @returns {void}
 */
export function createCritAnimation(rollDeets, critType, isSuccess = true) {
    const imgData = getImageData(rollDeets);
    if (!imgData) return;

    const config = getAnimationConfig({ actor: rollDeets.token?.actor, type: rollDeets?.type, isSuccess });

    if (shouldCancelCriticalHit(rollDeets, config?.enabled)) return;
    const users = getEligibleUsers(rollDeets);

    let type;

    if (critType) {
        type = critType;
    } else if (config?.type !== "default") {
        type = config?.type ?? getSetting("critical.type");
    } else {
        type = isSuccess ? getSetting("critical.type") : null;
    }

    config.scale *= imgData.scale;
    config.art = config.art || imgData.img;
    config.sfx = config.sfx || (isSuccess ? getSetting("critical.sound") : "");
    config.duration = getSetting("critical.duration") * 1000;

    //Cancels animation based on config or imgData
    if (
        !((imgData?.showForToken && config.enabled !== "off") || config.enabled === "on") ||
        type === null ||
        (!isSuccess && config.enabled !== "on")
    ) {
        return;
    }
    displayCritAnimation(type, rollDeets.token?.actor, users, config);
}

export function createTestCritAnimation(data) {
    const { userID, succFail, section, settings, actor } = data;

    const config = getAnimationConfig({ flags: settings, type: section, isSuccess: succFail === "success" });

    const type = config?.type !== "default" ? config?.type ?? getSetting("critical.type") : getSetting("critical.type");

    if (config.type === "default" && succFail === "failure") {
        ui.notifications.error(localize("display-text.notifications.critical.failure.error"));
        return;
    }
    const shouldUseToken = shouldUseTokenImage(actor.type, getSetting("critical.default-img"));

    if (shouldUseToken) {
        config.scale *=
            ((actor.prototypeToken?.texture?.scaleX ?? 1) + (actor.prototypeToken?.texture?.scaleY ?? 1)) / 2;
    }
    if (!config.art) {
        config.art = shouldUseToken ? getTokenImage(actor.prototypeToken) : actor?.img;
    }
    config.sfx = config.sfx || (succFail === "success" ? getSetting("critical.sound") : "");
    config.duration = getSetting("critical.duration") * 1000;

    displayCritAnimation(type, actor, [userID], config);
}

/**
 * Determines if the critical hit animation should be canceled.
 * @param {object} rollDeets - The details of the roll.
 * @returns {boolean} True if the animation should be canceled, false otherwise.
 */
function shouldCancelCriticalHit(rollDeets, isEnabled) {
    if (isEnabled) return false;
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
        imgData.img = getTokenImage(rollDeets?.token);
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
    const flags = config?.flags
        ? config.flags
        : {
              critical: config.actor.getFlag("pf2e-rpg-numbers", "critical"),
              token: config.actor.getFlag("pf2e-rpg-numbers", "token"),
          };

    const successOrFail = config.isSuccess ? "success" : "failure";

    const data = {
        delay: getSetting("critical.delay") * 1000,
        offset: { x: 0, y: 0 },
        sfx: config.isSuccess ? getSetting("critical.sound") : "",
        volume: getSetting("critical.volume") / 100,
    };
    let result = {};

    if (config?.flags) {
        result = getCritActorSettings(data, successOrFail, flags, config?.type);
    } else {
        switch (config?.type) {
            case "perception-check":
            case "skill-check":
                result = getCritActorSettings(data, successOrFail, flags, "checks");
                break;
            case "attack-roll":
                result = getCritActorSettings(data, successOrFail, flags, "strikes");
                break;
            case "saving-throw":
                result = getCritActorSettings(data, successOrFail, flags, "saves");
                break;
            default:
                result = getCritActorSettings(data, successOrFail, flags);
                break;
        }
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
 * @param {object} actor - The actor object.
 * @param {string[]} users - The list of eligible user IDs.
 * @param {object} config - The animation configuration.
 */
function displayCritAnimation(critType, actor, users, config) {
    switch (critType) {
        case "disgaea-7":
            game.genga.api.crit.disgaea7(actor, users, config);
            break;
        case "fire-emblem":
            game.genga.api.crit.fireEmblemAwakening(actor, users, config);
            break;
        case "fullscreen":
            game.genga.api.crit.fullscreen(actor, users, config);
            break;
        case "persona":
            game.genga.api.crit.persona5(actor, users, config);
            break;
        default:
            ui.notifications.error(`PF2e RPG #s: Unrecognized crit animation type: ${crit - type}`);
            console.error(`PF2e RPG #s: Unrecognized crit animation type: ${crit - type}`);
            break;
    }
}

function getCritActorSettings(data, successOrFail, flags, type = "default") {
    const result = { ...data };
    const typeSpecificSettings = flags?.critical?.[successOrFail]?.[type];
    const baseSettings = flags?.critical?.[successOrFail]?.default;

    result.art = typeSpecificSettings?.art || baseSettings?.art || "";
    result.enabled =
        typeSpecificSettings?.enabled === "default" ? baseSettings?.enabled : typeSpecificSettings?.enabled;
    result.offset.x = (typeSpecificSettings?.offset?.x || (baseSettings?.offset?.x ?? 0)) / 100;
    result.offset.y = (typeSpecificSettings?.offset?.y || (baseSettings?.offset?.y ?? 0)) / 100;
    result.rotation = typeSpecificSettings?.rotation || (baseSettings?.rotation ?? 0);
    result.scale = typeSpecificSettings?.scale === 1 ? baseSettings?.scale ?? 1 : typeSpecificSettings?.scale ?? 1;
    result.sfx = typeSpecificSettings?.sfx || baseSettings?.sfx || "";
    result.type = typeSpecificSettings?.type === "default" ? baseSettings?.type : typeSpecificSettings?.type;

    const volume =
        (typeSpecificSettings?.volume === 100 ? baseSettings?.volume ?? 100 : typeSpecificSettings?.volume) ?? 100;
    result.volume = (volume * result.volume) / 100;

    return result;
}
