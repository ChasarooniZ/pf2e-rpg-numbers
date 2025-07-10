import { getVisibleUsers } from "../../anim.js";
import { MS_TO_SEC, MODULE_ID } from "../../const.js";
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

const CONST = {
    BOUNCE: {
        ROTATION: { OPPOSITE: 180, OFFSET: 65 },
        ANCHOR: { BURST: { x: 0.1, y: 0.5 }, SPARK: { x: 0.9, y: 0.5 } },
        SIZE_MULT: { SPARK: 1.2 * 2 },
        DELAY_FINISH: { SPARK: -150 },
    },
    DODGE: {
        START_RAY: {
            x: 0,
            y: 0,
        },
        ANGLE: {
            ADJUST: {
                RADIANS: Math.PI / 2,
            },
        },
        DISTANCE: 0.6,
    },
};

const direction = () => Sequencer.Helpers.random_array_element([1, -1]);

/**
 * Dodge when attacked
 * @param {*} token Attack token
 * @param {*} target Defend Token
 */
async function dodgeOnMiss(token, target) {
    const distance = getSetting("dodge-on-miss.distance");
    const duration = getSetting("dodge-on-miss.duration") * MS_TO_SEC;
    const delay = getSetting("dodge-on-miss.delay") * MS_TO_SEC;
    const directionRay = new Ray(token.center, target.center);
    const { dx, dy } = Ray.fromAngle(
        CONST.DODGE.START_RAY.x,
        CONST.DODGE.START_RAY.y,
        directionRay.angle + CONST.DODGE.ANGLE.ADJUST.RADIANS,
        direction
    );
    const loopBody = { duration: duration / 2, gridUnits: true };
    const scale = (target.document.width + target.document.height) / 2;
    const rayDistance = Math.max(scale * CONST.DODGE.DISTANCE, 1) * distance;
    const position = { x: dx * rayDistance, y: dy * rayDistance };
    const users = getVisibleUsers(target);

    new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
        .animation()
        .delay(delay)
        .on(target)
        .opacity(0)
        .effect()
        .delay(delay)
        .atLocation(target)
        .file(getTokenImage(target?.document))
        .scale({ x: target?.document?.texture?.scaleX ?? 0, y: target?.document?.texture?.scaleY ?? 0 })
        .scaleToObject()
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
        .duration(duration)
        .forUsers(users)
        .waitUntilFinished(-200)
        .animation()
        .on(target)
        .waitUntilFinished()
        .opacity(1)
        .play({ preload: true });
}

async function bounceOffTarget(token, target, filter = {}) {
    const delay = getSetting("dodge-on-miss.delay") * MS_TO_SEC;
    const users = getVisibleUsers(target);

    new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
        //Burst FX
        .effect()
        .delay(delay)
        .atLocation(target)
        .rotateTowards(token, { rotationOffset: CONST.BOUNCE.ROTATION.OPPOSITE })
        .file("jb2a.impact.008.orange")
        .filter("ColorMatrix", filter)
        .scaleToObject()
        .anchor(CONST.ANCHOR.BURST)
        .mirrorX()
        .waitUntilFinished(CONST.DELAY_FINISH.SPARK)
        .forUsers(users)
        //Spark Left
        .effect()
        .atLocation(target)
        .file("jb2a.melee_generic.piercing.two_handed")
        .filter("ColorMatrix", filter)
        .rotateTowards(token, { rotationOffset: CONST.BOUNCE.ROTATION.OPPOSITE - CONST.BOUNCE.ROTATION.OFFSET })
        .scaleToObject(CONST.BOUNCE.SIZE_MULT.SPARK)
        .mirrorY()
        .spriteAnchor(CONST.ANCHOR.SPARK)
        .forUsers(users)
        //Spark Right
        .effect()
        .atLocation(target)
        .file("jb2a.melee_generic.piercing.two_handed")
        .filter("ColorMatrix", filter)
        .rotateTowards(token, { rotationOffset: CONST.BOUNCE.ROTATION.OPPOSITE + CONST.BOUNCE.ROTATION.OFFSET })
        .scaleToObject(CONST.BOUNCE.SIZE_MULT.SPARK)
        .spriteAnchor(CONST.ANCHOR.SPARK)
        .forUsers(users)
        .play({ preload: true });
}
