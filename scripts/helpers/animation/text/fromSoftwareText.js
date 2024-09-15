import { getSetting } from "../../misc.js";

/**
 * Creates an Elden Ring-style "Noun Verbed" sequence.
 * @param {Object} options - Configuration options.
 * @param {string} [options.text] - The text to display.
 * @param {string} [options.sound] - The sound effect file path.
 * @param {number} [options.fontSize] - The font size for the text.
 * @param {number} [options.duration] - The duration of the sequence in seconds.
 * @returns {Promise<Sequence>} A promise that resolves to the played Sequence.
 */
export async function eldenRingNounVerbed(options = {}) {
    const text = (options.text ?? getSetting(`from-software.noun-verbed.text`)).toUpperCase();
    const sound = options.sound ?? getSetting(`from-software.noun-verbed.sound-effect`);
    const fontSize = options.fontSize ?? getSetting(`from-software.noun-verbed.font-size`);
    const duration = (options.duration ?? getSetting(`from-software.noun-verbed.duration`)) * 1000;
    const users = options?.users ?? game.users.map(u => u.id);

    const [partOne, partTwo] = [text.slice(0, text.length / 2), text.slice(text.length / 2)];
    const [partOneOffset, partTwoOffset] = [(getTextWidth(partOne, `${fontSize}pt Lusitana-Regular`)) / 2, (getTextWidth(partTwo, `${fontSize}pt Lusitana-Regular`)) / 2];

    const rect = { height: fontSize * 3, width: 4000 };
    const fadein = 500;

    return new Sequence()
        .sound().file(sound).delay(fadein / 2).forUsers(users)
        .effect().syncGroup("eldenRing.nounVerbed")
        .screenSpaceAboveUI().duration(duration - 100)
        .fadeIn(fadein).fadeOut(Math.max(fadein / 2, duration / 6))
        .screenSpace().screenSpacePosition({ x: 0, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .shape("rectangle", {
            width: rect.width, height: rect.height,
            fillColor: "#000001", fillAlpha: 0.8,
            lineSize: 0, lineColor: "#FF0000",
            offset: { x: -rect.width / 2, y: -rect.height / 2 }
        })
        .filter("Blur", { strength: 1, blurY: 30, quality: 15, resolution: 4, kernelSize: 5 }).forUsers(users)
        .effect().syncGroup("eldenRing.nounVerbed")
        .screenSpaceAboveUI().duration(duration)
        .fadeIn(fadein).fadeOut(Math.max(fadein / 2, duration / 6))
        .screenSpace().screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpacePosition({ x: -partOneOffset, y: 0 })
        .text(partOne, {
            align: "left", dropShadow: true, dropShadowAlpha: 0.2,
            dropShadowAngle: 3.14, dropShadowColor: "#ffd042", dropShadowDistance: 13,
            fill: "#dcaf2d", fontFamily: "Lusitana-Regular", fontSize: fontSize,
            padding: 10, stroke: "#dcaf2d"
        }).forUsers(users)
        .effect().syncGroup("eldenRing.nounVerbed")
        .screenSpaceAboveUI().duration(duration)
        .fadeIn(fadein).fadeOut(Math.max(fadein / 2, duration / 6))
        .screenSpace().screenSpacePosition({ x: partTwoOffset, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .text(partTwo, {
            align: "right", dropShadow: true, dropShadowAlpha: 0.2,
            dropShadowAngle: 0, dropShadowColor: "#ffd042", dropShadowDistance: 13,
            fill: "#dcaf2d", fontFamily: "Lusitana-Regular", fontSize: fontSize,
            padding: 10, stroke: "#dcaf2d"
        }).forUsers(users)
        .play();
}

/**
 * Creates an Elden Ring-style "Death" sequence.
 * @param {Object} options - Configuration options.
 * @param {string} [options.text] - The text to display.
 * @param {string} [options.sound] - The sound effect file path.
 * @param {number} [options.fontSize] - The font size for the text.
 * @param {number} [options.duration] - The duration of the sequence in seconds.
 * @returns {Promise<Sequence>} A promise that resolves to the played Sequence.
 */
export async function eldenRingDeath(options = {}) {
    const text = (options.text ?? getSetting(`from-software.death.text`)).toUpperCase();
    const sound = options.sound ?? getSetting(`from-software.death.sound-effect`);
    const fontSize = options.fontSize ?? getSetting(`from-software.death.font-size`);
    const duration = (options.duration ?? getSetting(`from-software.death.duration`)) * 1000;
    const users = options?.users ?? game.users.map(u => u.id);

    const rect = { height: fontSize * 3, width: 4000 };
    const fadein = 500;

    return new Sequence()
        .sound().file(sound).delay(fadein / 2).forUsers(users)
        .effect().syncGroup("eldenRing.death")
        .screenSpaceAboveUI().duration(duration)
        .fadeIn(fadein).fadeOut(Math.max(fadein / 2, duration / 6))
        .screenSpace().screenSpacePosition({ x: 0, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .shape("rectangle", {
            width: rect.width, height: rect.height,
            fillColor: "#000001", fillAlpha: 0.8,
            lineSize: 0, lineColor: "#FF0000",
            offset: { x: -rect.width / 2, y: -rect.height / 2 }
        })
        .filter("Blur", { strength: 1, blurY: 30, quality: 15, resolution: 4, kernelSize: 5 }).forUsers(users)
        .effect().syncGroup("eldenRing.death")
        .screenSpaceAboveUI().duration(duration + 100)
        .fadeIn(fadein).fadeOut(Math.max(fadein / 2, duration / 6))
        .screenSpace().screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .text(text, {
            fill: "#82101d",
            fontFamily: "Lusitana-Regular",
            fontSize: fontSize,
            padding: 10
        }).forUsers(users)
        .play();
}

function getTextWidth(text, font) {
    // if given, use cached canvas for better performance
    // else, create new canvas
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text + "||"); // The '||' adds a little bit of separation
    return metrics.width;
};