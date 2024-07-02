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
    //TODO add option for default color
    if (cancelCriticalHit(rollDeets)) return;

    const enabledTokenType = getSetting("critical.show-on-token-type");
    const defaultImgType = getSetting("critical.default-img");
    const actorType = rollDeets.token.actor.type;
    const imgData = {
        img: "icons/svg/cowled.svg",
        xScale: 1,
        yScale: 1,
        xOffset: 0,
        yOffset: 0,
        isToken: true,
    };

    if (
        rollDeets.type === "custom" ||
        (actorType === "character" && enabledTokenType !== "npc") ||
        (actorType !== "character" && enabledTokenType !== "pc")
    ) {
        if (actorType === "character" ? defaultImgType?.startsWith("pc-tok") : defaultImgType?.includes("npc-tok")) {
            // Token
            imgData.img = rollDeets?.token?.texture?.src;
            imgData.xScale = rollDeets?.token?.texture?.scaleX ?? 1;
            imgData.yScale = rollDeets?.token?.texture?.scaleY ?? 1;
        } else {
            // actor
            imgData.img = rollDeets?.token?.actor?.img;
            imgData.isToken = false;
        }
    } else {
        return;
    }
    const config = {
        delay: getSetting("critical.delay") * 1000,
        sfx: rollDeets?.token?.flags?.["pf2e-rpg-numbers"]?.["critSFX"] || getSetting("critical.sound"),
        volume: getSetting("critical.volume") / 100,
    };

    const users = getVisibleAndMsgVisibleUsers(rollDeets).filter(
        (uID) => game.users.get(uID).getFlag(MODULE_ID, "critEnabled") !== false
    );
    switch (critType) {
        case "persona":
            personaCrit(rollDeets.token, users, imgData, config);
            break;
        case "fire-emblem":
            fireEmblemCrit(rollDeets.token, users, imgData, config);
            break;
        default:
            return;
    }
}

function cancelCriticalHit(rollDeets) {
    const isAttack = rollDeets.type === "attack-roll";
    const showOn = getSetting("critical.show-on");
    return rollDeets.type !== "custom" && ((showOn === "checks" && isAttack) || (showOn === "attacks" && !isAttack));
}
