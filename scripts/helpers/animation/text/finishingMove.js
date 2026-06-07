import { MODULE_ID } from "../../const.js";
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

export async function finishingMoveDialog() {
    const items = game.messages.contents
        .filter((msg) => msg.isOwner && msg?.item)
        .map((msg) => ({
            name: msg?.item?.name,
            img: msg?.item?.img,
            label: msg?.item?.getFlag(MODULE_ID, "finishing-move.name") || msg?.item?.name,
        }))
        .reverse()
        .slice(0, 5);

    const itemHTML = items
        .map(
            (item, cnt) => `
        <div class="finishing-move-dialog-item">
            <input type="radio" id="${item.name}" name="section" value="${item.name}" ${cnt === 0 ? "checked" : ""} />
            <img src="${item.img}" data-tooltip="${item.name}" />
            <label for="${item.name}">${item.label}</label>
        </div>`
        )
        .join("");

    let guess;
    try {
        guess = await foundry.applications.api.DialogV2.prompt({
            window: { title: "Finishing Move" },
            content: `
      <input name="guess" type="string" autofocus placeholder="Enter custom finishing move..." />
    <div>
      <strong>Recent Items (for finishing moves)</strong>
      ${itemHTML}
    </div>`,
            ok: {
                label: "Show Finishing Move",
                callback: (event, button, dialog) => button.form.elements,
            },
        });
    } catch {
        console.log("Finishing Move Failed.");
        return;
    }

    const manual = guess?.guess?.value;
    const selected = guess?.section?.value;

    game.pf2eRPGNumbers.finishingMove.generate(manual || selected);
}
