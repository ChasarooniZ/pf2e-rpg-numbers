import { getSetting} from "../../misc.js";

export async function createFinishingMoveAnimation(text) {
    let textColor = "black";
    let textBorderColor = getSetting("finishing-move.use-player-color") ? game.user.color.css : "red";
    let volume = getSetting("finishing-move.sound-effect.volume") / 100;
    let sfx = getSetting("finishing-move.sound-effect");
    const endDuration = getSetting("finishing-move.duration.end");
    const delayDiff = getSetting("finishing-move.duration.word");
    const sideBorderAmt = 0.15;
    const leftBorder = 1 - sideBorderAmt;
    const chatWidth = chat.offsetWidth;
    const quality = getSetting("finishing-move.quality");
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
    await Sequencer.Preloader.preloadForClients(sfx);
    words.forEach((word, i) => {
        word = ` ${word} `;
        seq.effect()
            .zIndex(5)
            .syncGroup(`finishing-move-${text}`)
            .text(word, style)
            .screenSpace()
            .screenSpaceAboveUI()
            .screenSpaceAnchor({ x: sideBorderAmt + moveAmt * i + moveAmt / 2, y: 0.4 })
            .scale(1 / quality)
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
    await seq.play();
    if (!getSetting("finishing-move.keep-on")) {
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
