import { getSetting } from "../../misc.js";
import { eldenRingDeath } from "./fromSoftware/eldenRingDeath.js";
import { sekiroDeath } from "./fromSoftware/sekiroDeath.js";

/**
 * Creates an From Software-style "Death" sequence.
 * @param {Object} options - Configuration options.
 * @param {string} [options.type] - The type of death text to display
 * @param {string} [options.text] - The text to display.
 * @param {string} [options.sound] - The sound effect file path.
 * @param {number} [options.fontSize] - The font size for the text.
 * @param {number} [options.duration] - The duration of the sequence in seconds.
 * @returns {Promise<Sequence>} A promise that resolves to the played Sequence.
 */
export async function fromSoftwareDeath(options = {}) {
    const type = options?.type ? options.type : getSetting(`from-software.death.type`);

    switch (type) {
        case "elden-ring":
            eldenRingDeath(options);
            break;
        case "sekiro":
            sekiroDeath(options);
            break;
        default:
            console.error(`Invalid From Software death ${type}`);
    }
}

export function getTextWidth(text, font) {
    // if given, use cached canvas for better performance
    // else, create new canvas
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text + ""); // The '|||' adds a little bit of separation
    return metrics.width;
}
