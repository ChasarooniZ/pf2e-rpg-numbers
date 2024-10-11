import { getSetting } from "../../misc.js";

/**
 * Perform a critical hit animation resembling the style of Disgaea 7.
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

export async function fireEmblemCrit(token, users, imgData, config) {
    const screenWidth = window.screen.availWidth;
    const scaleFactor = 0.35;
    const windowHeight = screen.height / 10;
    const padding = windowHeight / 10;
    const rectangleHeight = windowHeight + padding * 2;
    const imageUrl = token.flags?.["pf2e-rpg-numbers"]?.fireEmblemImg || imgData.img;
    const duration = getSetting("critical.duration") * 1000;
    const soundUrl = config.sfx;
    const volumeLevel = config.volume;

    if (!!token.flags?.["pf2e-rpg-numbers"]?.fireEmblemImg && imgData.isToken) {
        imgData.xScale = 1;
        imgData.yScale = 1;
    }

    const scaleFactorHalf = (imgData.yScale + imgData.xScale) / 2;
    await Sequencer.Preloader.preloadForClients([imageUrl, soundUrl]);
    const height = window.screen.availHeight;

    const duration = 2000;
    const widthPercent = 0.175;

    const img = token.document.flags?.["pf2e-rpg-numbers"]?.personaImg || token?.document?.texture?.src || token?.actor?.img || "icons/svg/cowled.svg";

    const imga = new Image();
    imga.src = img;
    imga.onload = ({
        target
    }) => {
        const imgWidth = target.width;
        const imgHeight = target.height;
        new Sequence()
            //BG start
            .effect()
            .shape("rectangle", {
                //isMask: true,
                width: screenWidth * widthPercent,
                height: height,
                fillColor: "#ffffff",
                fillAlpha: 1,
            })
            .screenSpace()
            .screenSpacePosition({
                x: 0,
                y: 0
            })
            .screenSpaceAnchor({
                x: 0.05,
                y: 0
            })
            .fadeIn(250)
            .animateProperty("spriteContainer", "position.y", { from: -height, to: 0, duration: 500, ease: "easeOutBack" })
            .duration(500)
            .screenSpaceAboveUI()
            .zIndex(-2)
            //BG end
            .effect()
            .shape("rectangle", {
                //isMask: true,
                width: screenWidth * widthPercent,
                height: height,
                fillColor: game.user.color.css,
                fillAlpha: 1,
            })
            .screenSpace()
            .screenSpacePosition({
                x: 0,
                y: 0
            })
            .screenSpaceAnchor({
                x: 0.05,
                y: 0
            })
            .opacity(0.5)
            .fadeIn(500, { ease: "easeOutQuint" })
            .animateProperty("spriteContainer", "scale.x", { from: 1, to: 0, duration: 500, fromEnd: true })
            .animateProperty("spriteContainer", "position.x", { from: 0, to: screenWidth * widthPercent / 2, duration: 500, fromEnd: true })
            .screenSpaceAboveUI()
            .zIndex(-1)
            .delay(450)
            .duration(duration - 450)
            //Mask
            .effect()
            .file(img, {
                antialiasing: 1
            })
            .scale(height / imgHeight * 0.75)
            .spriteOffset({ x: screenWidth * widthPercent / 2, y: imgHeight / 4 })
            .zIndex(0)
            .shape("rectangle", {
                isMask: true,
                width: screenWidth * widthPercent,
                height: height * 2,
                offset: { x: 0, y: -height },
            })
            .animateProperty("sprite", "position.y", { from: -height, to: 0, duration: 500, ease: "easeOutBack" })
            .animateProperty("spriteContainer", "scale.x", { from: 1, to: 0, duration: 500, fromEnd: true })
            .animateProperty("spriteContainer", "position.x", { from: 0, to: screenWidth * widthPercent / 2, duration: 500, fromEnd: true })
            .screenSpace()
            /*.screenSpaceScale({
        x: 1.0,         // Scale on the effect's X scale
        y: 2.0,         // Scale on the effect's Y scale
        fitX: false,    // Causes the effect to set its width to fit the width of the screen
        fitY: true,    // Causes the effect to set its height to fit the height of the screen
        ratioX: true,  // If Y is scaled, setting this to true will preserve the width/height ratio
        ratioY: false   // If X is scaled, setting this to true will preserve the height/width ratio
    })*/
            .screenSpacePosition({
                x: 0,
                y: 0
            })
            .screenSpaceAnchor({
                x: 0.05,
                y: 0.5
            })
            .screenSpaceAboveUI()
            .duration(duration)
            .play();
    }
}
