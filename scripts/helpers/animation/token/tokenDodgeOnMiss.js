/**
 * Turns token towards target when attacking
 * @param {*} token Attack token that will turn
 * @param {*} target Person they are attacking
 */

import { getVisibleUsers } from "../../anim.js";
import { getSetting } from "../../misc.js";

export async function dodgeOnMiss(token, target) {
    const distance = getSetting("dodge-on-miss.distance");
    const duration = getSetting("dodge-on-miss.duration") * 1000;
    const delay = getSetting("dodge-on-miss.delay") * 1000;
    const directionRay = new Ray(token.center, target.center);
    const { dx, dy } = Ray.fromAngle(0, 0, directionRay.angle + (Math.PI / 2), Sequencer.Helpers.random_array_element([1, -1]));
    const loopBody = { duration: duration / 2, gridUnits: true };
    const scale = (target.document.width + target.document.height) / 2;
    const rayDistance = Math.max(scale * 0.6, 1) * distance;
    const position = { x: dx * rayDistance, y: dy * rayDistance };
    const users = getVisibleUsers(target);


    new Sequence()
        .animation().delay(delay).on(target).forUsers(users).opacity(0)
        .effect()
        .delay(delay)
        .copySprite(target)
        .scale({ x: scaleX, y: scaleY })
        .animateProperty("spriteContainer", "position.x", {
            from: 0,
            to: position.x,
            ease: "easeOutQuint",
            ...loopBody
        })
        .animateProperty("spriteContainer", "position.x", {
            from: 0,
            to: -position.x,
            ease: "easeOutCubic",
            fromEnd: true,
            ...loopBody
        })
        .animateProperty("spriteContainer", "position.y", {
            from: 0,
            to: position.y,
            ease: "easeOutQuint",
            ...loopBody
        })
        .animateProperty("spriteContainer", "position.y", {
            from: 0,
            to: -position.y,
            ease: "easeOutCubic",
            fromEnd: true,
            ...loopBody
        })
        .waitUntilFinished(-200)
        .duration(duration)
        .forUsers(users)
        .animation().on(target).waitUntilFinished().forUsers(users).opacity(1)
        .play()
}