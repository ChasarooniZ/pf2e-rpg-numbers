import { MODULE_ID } from "../misc.js";

export function createFinishingMoveAnimation(text) {
    let textColor = "black";
    let textBorderColor = game.settings.get(MODULE_ID, "finishing-move.use-player-color") ? game.user.color : "red";
    let volume = game.settings.get(MODULE_ID, "finishing-move.sound-effect.volume") / 100;
    let sfx = game.settings.get(MODULE_ID, "finishing-move.sound-effect");
    const endDuration = game.settings.get(MODULE_ID, "finishing-move.duration.end");
    const delayDiff = game.settings.get(MODULE_ID, "finishing-move.duration.word");
    const sideBorderAmt = 0.15;
    const leftBorder = 1 - sideBorderAmt;
    const chatWidth = chat.offsetWidth;
    const quality = game.settings.get(MODULE_ID, "finishing-move.quality");
    const style = {
        fill: textColor,
        dropShadowColor: textBorderColor,
        dropShadowBlur: 10 * quality,
        dropShadowDistance: 0,
        dropShadow: true,
        fontFamily: "Impact, Charcoal, sans-serif",
        fontSize: 48 * quality,
        //fontWeight: "bold",
        strokeThickness: 2,
    };
    const seq = new Sequence();
    const words = text.split(" ");
    const moveAmt = (leftBorder - sideBorderAmt) / words.length;
    const totalDuration = words.length * delayDiff + endDuration;
    words.forEach((word, i) => {
        word = ` ${word} `;
        seq.effect()
            .text(word, style)
            .screenSpace()
            .screenSpaceAnchor({ x: sideBorderAmt + moveAmt * i + moveAmt / 2, y: 0.4 })
            .scale(1 / quality)
            .zIndex(2)
            .scaleIn(3, delayDiff, { ease: "easeOutCubic" })
            .screenSpaceScale({
                x: 1.0, // Scale on the effect's X scale
                y: 1.0, // Scale on the effect's Y scale
            })
            .delay(delayDiff * i)
            .duration(totalDuration - delayDiff * i)
            .sound()
            .file(sfx)
            .volume(volume)
            .delay(delayDiff * i);
    });
    seq.play();
    if (!game.settings.get(MODULE_ID, "finishing-move.keep-on")) {
        // Turns off after run
        document
            .querySelector(
                `li.control-tool.toggle[aria-label="${game.i18n.localize(
                    "pf2e-rpg-numbers.controls.finishing-move.name"
                )}"]`
            )
            .click();
    }
}
