import { getSetting } from "../../../misc.js";
import { getTextWidth } from "../fromSoftwareText.js";

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
    const users = options?.users ?? game.users.map((u) => u.id);

    const [partOne, partTwo] = [text.slice(0, text.length / 2), text.slice(text.length / 2)];
    const offset = getTextWidth(" ", `${fontSize}pt Lusitana-Regular`) * 0.4;

    const rect = { height: fontSize * 2, width: 4000 };
    const fadein = 500;

    return new Sequence()
        .sound()
        .file(sound)
        .delay(fadein / 2)
        .forUsers(users)
        .effect()
        .syncGroup("eldenRing.nounVerbed")
        .screenSpaceAboveUI()
        .duration(duration - 100)
        .fadeIn(fadein)
        .fadeOut(Math.max(fadein / 2, duration / 6))
        .screenSpace()
        .screenSpacePosition({ x: 0, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .shape("rectangle", {
            width: rect.width,
            height: rect.height,
            fillColor: "#000001",
            fillAlpha: 0.8,
            lineSize: 0,
            lineColor: "#FF0000",
            offset: { x: -rect.width / 2, y: -rect.height / 2 },
        })
        .filter("Blur", { strength: 1, blurY: 30, quality: 15, resolution: 4, kernelSize: 5 })
        .forUsers(users)
        .effect()
        .syncGroup("eldenRing.nounVerbed")
        .screenSpaceAboveUI()
        .duration(duration)
        .fadeIn(fadein)
        .fadeOut(Math.max(fadein / 2, duration / 6))
        .screenSpace()
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpacePosition({ x: offset, y: 0 })
        .text(partOne, {
            align: "left",
            dropShadow: true,
            dropShadowAlpha: 0.2,
            dropShadowAngle: 3.14,
            dropShadowColor: "#ffd042",
            dropShadowDistance: 13,
            fill: "#dcaf2d",
            fontFamily: "Lusitana-Regular",
            fontSize: fontSize,
            padding: 10,
            stroke: "#dcaf2d",
            anchor: { x: 1, y: 0.5 },
        })
        .forUsers(users)
        .effect()
        .syncGroup("eldenRing.nounVerbed")
        .screenSpaceAboveUI()
        .duration(duration)
        .fadeIn(fadein)
        .fadeOut(Math.max(fadein / 2, duration / 6))
        .screenSpace()
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpacePosition({ x: -offset, y: 0 })
        .text(partTwo, {
            align: "right",
            dropShadow: true,
            dropShadowAlpha: 0.2,
            dropShadowAngle: 0,
            dropShadowColor: "#ffd042",
            dropShadowDistance: 13,
            fill: "#dcaf2d",
            fontFamily: "Lusitana-Regular",
            fontSize: fontSize,
            padding: 10,
            stroke: "#dcaf2d",
            anchor: { x: 0, y: 0.5 },
        })
        .forUsers(users)
        .play();
}
