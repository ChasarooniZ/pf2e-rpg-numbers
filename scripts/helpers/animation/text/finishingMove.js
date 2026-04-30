import { getSetting } from "../../misc.js";

/**
 * Creates a finishing move animation with text and sound effects.
 * @param {string} text - The text to animate, can include '|' for multiple lines.
 */
export async function createFinishingMoveAnimation(text) {
    const settings = {
        textColor: "black",
        textBorderColor: getSetting("finishing-move.use-player-color") ? game.user.color.css : "red",
        volume: getSetting("finishing-move.sound-effect.volume") / 100,
        sfx: getSetting("finishing-move.sound-effect"),
        endDuration: getSetting("finishing-move.duration.end"),
        delayDiff: getSetting("finishing-move.duration.word"),
        quality: getSetting("finishing-move.quality"),
    };

    game.genga.api.text.finishingMove.BBB(text, settings);

    if (!getSetting("finishing-move.keep-on")) {
        toggleFinishingMoveControl();
    }
}

/**
 * Toggles the finishing move control in the UI.
 */
function toggleFinishingMoveControl() {
    const controlSelector = `li.control-tool.toggle[aria-label="${game.i18n.localize("pf2e-rpg-numbers.controls.finishing-move.name")}"]`;
    document.querySelector(controlSelector)?.click();
}
