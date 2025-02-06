import { getSetting } from "../../../misc.js";

/**
 * Perform a critical hit animation resembling the style of Disgaea 7
 * This function creates an animated effect around the provided actor, displaying
 * an image moving across the screen along with other visual effects and sounds.
 *
 * @param {Actor} actor - The actor object around which the animation will be centered.
 * @param {User[]} users - An array of users who will see the animation.
 * @returns {void}
 */

export async function fullscreenCrit(actor, users, config) {
    const duration = getSetting("critical.duration") * 1000;
    const seq = new Sequence()
        //Mask + image
        .effect()
        .file(config.art, {
            antialiasing: 1
        })
        .screenSpace()
        .spriteRotation(config.rotation)
        .screenSpaceScale({
            x: 1,
            y: config.scale,
            fitY: true,    // Causes the effect to set its height to fit the height of the screen
            ratioX: true,  // If Y is scaled, setting this to true will preserve the width/height ratio
        })
        .screenSpacePosition({
            x: 0,
            y: 0
        })
        .screenSpaceAnchor({
            x: 0.5 + config?.offset?.x,
            y: 0.5 + config?.offset?.y
        })
        .screenSpaceAboveUI()
        .forUsers(users)

    if (!config.art.endsWith(".webm"))
        seq.duration(duration)

    //Sound
    seq.sound()
        .file(config.sfx)
        .fadeOutAudio(duration / 4)
        .volume(config.volume)
        .forUsers(users)
        .delay(config.delay)
        .play();
}