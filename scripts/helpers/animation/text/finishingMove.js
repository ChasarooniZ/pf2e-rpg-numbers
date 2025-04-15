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
        keepOn: getSetting("finishing-move.keep-on")
    };

    const style = createTextStyle(settings);
    const seq = new Sequence();

    const lines = text.includes('|') ? text.split("|") : [text];
    const yPositions = calculateYPositions(lines.length);
    let wordsDone = 0;
    const totalWords = text.split(/[ |]/).length
    lines.forEach((line, index) => {
        createLine(line, seq, settings, style, yPositions[index], wordsDone, totalWords);
        wordsDone += line.split(" ").length;
    });

    seq.play({preload: true });

    if (!settings.keepOn) {
        toggleFinishingMoveControl();
    }
}

/**
 * Creates the style object for the text animation.
 * @param {Object} settings - The animation settings.
 * @returns {Object} The style object.
 */
function createTextStyle(settings) {
    const hsl = Color.fromString(settings.textBorderColor).hsl;
    console.log(hsl)
    hsl[2] = Math.min(1, hsl[2] + 0.25);
    return {
        fill: settings.textColor,
        dropShadowColor: settings.textBorderColor,
        dropShadowBlur: 10,
        dropShadowAlpha: 1,
        dropShadowDistance: 0,
        dropShadow: true,
        fontFamily: "Impact, Charcoal, sans-serif",
        fontSize: 100 * settings.quality,
        fontVariant: "small-caps",
        strokeThickness: 1,
        stroke: Color.fromHSL(hsl).css,
    };
}

/**
 * Calculates Y positions for the lines based on the number of lines.
 * @param {number} lineCount - The number of lines.
 * @returns {number[]} An array of Y positions for each line.
 */
function calculateYPositions(lineCount) {
    switch (lineCount) {
        case 1:
            return [0.4]; // Single line at y = 0.4
        case 2:
            return [0.4, 0.6]; // Two lines at y = 0.4 and y = 0.6
        case 3:
            return [0.3, 0.5, 0.7]; // Three lines at y = 0.3, 0.5, and 0.7
        case 4:
            return [0.2, 0.4, 0.6, 0.8]; // Four lines at y = 0.2, 0.4, 0.6, and 0.8
        default:
            throw new Error("Unsupported number of lines. Only supports up to 4 lines.");
    }
}

/**
 * Creates a line of animated text.
 * @param {string} text - The text to animate.
 * @param {Sequence} seq - The Sequence object.
 * @param {Object} settings - The animation settings.
 * @param {Object} style - The text style.
 * @param {number} yPosition - The vertical position for this line.
 * @param {number} wordsDone - The number of words already animated.
 */
function createLine(text, seq, settings, style, yPosition, wordsDone, totalWords) {
    const words = text.trim().split(" ");
    const sideBorderAmt = 0.15;
    const leftBorder = 1 - sideBorderAmt;
    const moveAmt = (leftBorder - sideBorderAmt) / words.length;
    const totalDuration = totalWords * settings.delayDiff + settings.endDuration;

    words.forEach((word, i) => {
        const delay = settings.delayDiff * (i + wordsDone);
        const duration = totalDuration - delay;
        const xPosition = sideBorderAmt + moveAmt * (i + 0.5);

        seq.effect()
            .zIndex(5)
            .syncGroup(`finishing-move-${text}`)
            .text(` ${word} `, style)
            .screenSpace()
            .screenSpaceAboveUI()
            .screenSpaceAnchor({ x: xPosition, y: yPosition })
            .scale(1 / settings.quality)
            .scaleIn(3, settings.delayDiff, { ease: "easeOutCubic" })
            .delay(delay)
            .duration(duration)
            .sound()
            .file(settings.sfx)
            .volume(settings.volume)
            .delay(delay);
    });
}

/**
 * Toggles the finishing move control in the UI.
 */
function toggleFinishingMoveControl() {
    const controlSelector = `li.control-tool.toggle[aria-label="${game.i18n.localize("pf2e-rpg-numbers.controls.finishing-move.name")}"]`;
    document.querySelector(controlSelector)?.click();
}
