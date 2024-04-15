import { getVisibleAndMsgVisibleUsers } from "../../anim.js";
import { getSetting, MODULE_ID } from "../../misc.js";
import { fireEmblemCrit } from "./fireEmblemCrit.js";
import { personaCrit } from "./personaCrit.js";

/**
 * Creates a critical animation based on the provided roll details.
 * @param {object} roll_deets - The details of the roll triggering the animation.
 * @param {string} [critType=getSetting("critical.type")] - The type of critical animation to display.
 * @returns {void}
 */
export function createCritAnimation(roll_deets, critType = getSetting("critical.type")) {
    //TODO add option for default color
    const isAttack = roll_deets.type === "attack-roll";
    const showOn = getSetting("critical.show-on");
    if (roll_deets.type !== "custom" && ((showOn === "checks" && isAttack) || (showOn === "attacks" && !isAttack)))
        return;

    const enabledTokenType = getSetting("critical.show-on-token-type");
    const defaultImgType = getSetting("critical.default-img");
    const actorType = roll_deets.token.actor.type;
    const imgData = {
        img: "icons/svg/cowled.svg",
        xScale: 1,
        yScale: 1,
        xOffset: 0,
        yOffset: 0,
        isToken: true,
    };

    if (
        roll_deets.type === "custom" ||
        (actorType === "character" && enabledTokenType !== "npc") ||
        (actorType !== "character" && enabledTokenType !== "pc")
    ) {
        if (actorType === "character" ? defaultImgType?.startsWith("pc-tok") : defaultImgType?.includes("npc-tok")) {
            // Token
            imgData.img = roll_deets?.token?.texture?.src;
            imgData.xScale = roll_deets?.token?.texture?.scaleX ?? 1;
            imgData.yScale = roll_deets?.token?.texture?.scaleY ?? 1;
        } else {
            // actor
            imgData.img = roll_deets?.token?.actor?.img;
            imgData.isToken = false;
        }
    } else {
        return;
    }
    const config = {
        delay: getSetting("critical.delay") * 1000,
        sfx: getSetting("critical.sound"),
        volume: roll_deets?.token?.flags?.["pf2e-rpg-numbers"]?.["critSFX"] || getSetting("critical.volume") / 100,
    };

    const users = getVisibleAndMsgVisibleUsers(roll_deets).filter(
        (uID) => game.users.get(uID).getFlag(MODULE_ID, "critEnabled") !== false
    );
    switch (critType) {
        case "persona":
            personaCrit(roll_deets.token, users, imgData, config);
            break;
        case "fire-emblem":
            fireEmblemCrit(roll_deets.token, users, imgData, config);
            break;
        default:
            return;
    }
}
