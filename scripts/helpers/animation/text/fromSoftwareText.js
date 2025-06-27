import { getSetting } from "../../misc.js";

/**
 * Creates a From Software-style "Death" sequence.
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

    const final_options = {
        ...options,
        text: options.text ?? getSetting(`from-software.death.text`),
        sound: options.sound ?? getSetting(`from-software.death.sound-effect`),
        fontSize: options.fontSize ?? getSetting(`from-software.death.font-size`),
        duration: options.duration ?? getSetting(`from-software.death.duration`),
    };

    switch (type) {
        case "elden-ring":
            game.genga.api.fromSoftware.death.eldenRing(final_options);
            break;
        case "sekiro":
            game.genga.api.fromSoftware.death.sekiro(final_options);
            break;
        default:
            console.error(`Invalid From Software death ${type}`);
    }
}

/**
 * Creates an Elden Ring-style "Noun Verbed" sequence.
 * @param {Object} options - Configuration options.
 * @param {string} [options.text] - The text to display.
 * @param {string} [options.sound] - The sound effect file path.
 * @param {number} [options.fontSize] - The font size for the text.
 * @param {number} [options.duration] - The duration of the sequence in seconds.
 * @returns {Promise<Sequence>} A promise that resolves to the played Sequence.
 */
export async function fromSoftwareNounVerbed(options = {}) {
    const type = "elden-ring"; //options?.type ? options.type : getSetting(`from-software.noun-verbed.type`);

    const final_options = {
        ...options,
        text: options.text ?? getSetting(`from-software.noun-verbed.text`),
        sound: options.sound ?? getSetting(`from-software.noun-verbed.sound-effect`),
        fontSize: options.fontSize ?? getSetting(`from-software.noun-verbed.font-size`),
        duration: options.duration ?? getSetting(`from-software.noun-verbed.duration`),
    };

    switch (type) {
        case "elden-ring":
            game.genga.api.fromSoftware.nounVerbed.eldenRing(final_options);
            break;
        default:
            console.error(`Invalid From Software Elden Ring ${type}`);
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
