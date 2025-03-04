import { getVisibleUsers } from "../../anim.js";
import { getSetting } from "../../misc.js";
import { getTokenImage } from "./shakeOnDamageToken.js";

const COLOR_FILTER = {
    YELLOW: {},
    BLUE: { hue: 150 },
};

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
    } else if (dodgeOnMissType !== "auto") {
        if (dodgeOnMissType === "dodge") {
            dodgeOnMiss(token, target);
        } else if (dodgeOnMissType === "bounce-off") {
            bounceOffTarget(token, target);
        }
    } else {
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
    }
}

/**
 * Dodge when attacked
 * @param {*} token Attack token
 * @param {*} target Defend Token
 */
async function dodgeOnMiss(token, target) {
    const distance = getSetting("dodge-on-miss.distance");
    const duration = getSetting("dodge-on-miss.duration") * 1000;
    const delay = getSetting("dodge-on-miss.delay") * 1000;
    const directionRay = new Ray(token.center, target.center);
    const { dx, dy } = Ray.fromAngle(
        0,
        0,
        directionRay.angle + Math.PI / 2,
        Sequencer.Helpers.random_array_element([1, -1])
    );
    const loopBody = { duration: duration / 2, gridUnits: true };
    const scale = (target.document.width + target.document.height) / 2;
    const rayDistance = Math.max(scale * 0.6, 1) * distance;
    const position = { x: dx * rayDistance, y: dy * rayDistance };
    const users = getVisibleUsers(target);

    new Sequence()
        .animation()
        .delay(delay)
        .on(target)
        .opacity(0)
        .effect()
        .delay(delay)
        .atLocation(target)
        .file(getTokenImage(target?.document))
        .scale({ x: target?.document?.texture?.scaleX ?? 0, y: target?.document?.texture?.scaleY ?? 0 })
        .scaleToObject(1)
        .animateProperty("spriteContainer", "position.x", {
            from: 0,
            to: position.x,
            ease: "easeOutQuint",
            ...loopBody,
        })
        .animateProperty("spriteContainer", "position.x", {
            from: 0,
            to: -position.x,
            ease: "easeOutCubic",
            fromEnd: true,
            ...loopBody,
        })
        .animateProperty("spriteContainer", "position.y", {
            from: 0,
            to: position.y,
            ease: "easeOutQuint",
            ...loopBody,
        })
        .animateProperty("spriteContainer", "position.y", {
            from: 0,
            to: -position.y,
            ease: "easeOutCubic",
            fromEnd: true,
            ...loopBody,
        })
        .waitUntilFinished(-200)
        .duration(duration)
        .forUsers(users)
        .animation()
        .on(target)
        .waitUntilFinished()
        .opacity(1)
        .play();
}

async function bounceOffTarget(token, target, filter = {}) {
    const delay = getSetting("dodge-on-miss.delay") * 1000;
    const users = getVisibleUsers(target);
    const sizeMultiplier = 1.2;

    new Sequence()
        .effect() //Burst FX
        .delay(delay)
        .atLocation(target)
        .rotateTowards(token, { rotationOffset: 180 })
        .file("jb2a.impact.008.orange")
        .filter("ColorMatrix", filter)
        .scaleToObject(1)
        .anchor({ x: 0.1, y: 0.5 })
        .mirrorX()
        .waitUntilFinished(-150)
        .forUsers(users)
        .effect()
        .atLocation(target)
        .file("jb2a.melee_generic.piercing.two_handed")
        .filter("ColorMatrix", filter)
        .rotateTowards(token, { rotationOffset: 180 - 65 })
        .scaleToObject(1 * 2)
        .mirrorY()
        .spriteAnchor({ x: 0.9, y: 0.5 })
        .forUsers(users)
        .effect()
        .atLocation(target)
        .file("jb2a.melee_generic.piercing.two_handed")
        .filter("ColorMatrix", filter)
        .rotateTowards(token, { rotationOffset: 180 + 65 })
        .scaleToObject(sizeMultiplier * 2)
        .spriteAnchor({ x: 0.9, y: 0.5 })
        .forUsers(users)
        .play();
}
