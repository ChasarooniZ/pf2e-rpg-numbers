import { getSetting } from "../../misc.js";

/**
 * Perform a critical hit animation resembling the style of Fire Emblem.
 * This function creates an animated effect around the provided token, displaying
 * an image moving across the screen along with other visual effects and sounds.
 *
 * @param {Token} token - The token object around which the animation will be centered.
 * @param {User[]} users - An array of users who will see the animation.
 * @param {Object} imgData - An object containing image data, including image URL and scaling information.
 * @param {string} imgData.img - The URL of the image to be displayed in the animation.
 * @param {number} imgData.xScale - The horizontal scaling factor of the image.
 * @param {number} imgData.yScale - The vertical scaling factor of the image.
 * @returns {void}
 */

export function fireEmblemCrit(token, users, imgData, config) {
    const screenWidth = window.screen.availWidth;
    const scaleFactor = 0.35;
    const distance = scaleFactor * screenWidth;
    const windowHeight = screen.height / 10;
    const padding = windowHeight / 10;
    const rectangleHeight = windowHeight + padding * 2;
    const windowWidth = screen.width;
    const imageUrl = token.flags?.["pf2e-rpg-numbers"]?.fireEmblemImg || imgData.img;
    const duration = getSetting("critical.duration") * 1000;
    const soundUrl = config.sfx;
    const volumeLevel = config.volume;

    if (!!token.flags?.["pf2e-rpg-numbers"]?.fireEmblemImg && imgData.isToken) {
        imgData.xScale = 1;
        imgData.yScale = 1;
    }

    const scaleFactorHalf = (imgData.yScale + imgData.xScale) / 2;

    new Sequence()
        .effect()
        .shape("rectangle", {
            lineSize: 0,
            width: windowWidth,
            height: rectangleHeight,
            fillColor: game.user.color,
            fillAlpha: 1,
            name: "feCritA",
        })
        .opacity(0.7)
        .duration(duration)
        .animateProperty("shapes.feCritA", "scale.y", { from: 1, to: 0.6, duration: duration, ease: "easeInCubic" })
        .animateProperty("shapes.feCritA", "position.y", {
            from: 0,
            to: (rectangleHeight * 0.4) / 2,
            duration: duration,
            ease: "easeInCubic",
        })
        .screenSpace()
        .screenSpacePosition({ x: 0, y: -rectangleHeight / 2 })
        .screenSpaceAnchor({ x: 0, y: 0.5 })
        .forUsers(users)
        .delay(config.delay)

        .effect()
        .file(imageUrl)
        .animateProperty("sprite", "position.x", {
            from: -distance / (2 * scaleFactorHalf),
            to: distance,
            duration: duration,
            ease: "easeInBack",
        })
        .scale(0.3)
        .screenSpace()
        .screenSpaceScale({
            x: 0.2 * imgData.xScale,
            y: 0.2 * imgData.yScale,
            fitX: false,
            fitY: true,
            ratioX: true,
            ratioY: false,
        })
        .duration(duration)
        .scale(1)
        .size(windowHeight)
        .forUsers(users)
        .delay(config.delay)

        .sound()
        .file(soundUrl)
        .fadeOutAudio(duration / 4)
        .volume(volumeLevel)
        .forUsers(users)
        .delay(config.delay)
        .play();
}
