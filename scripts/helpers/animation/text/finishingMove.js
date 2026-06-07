import { MODULE_ID } from "../../const.js";
import { getSetting, localize } from "../../misc.js";

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

    // TODO Add an option to right click to set the item's Finishing Move Text

    // TODO add an autohighlight for some scenarios IE:
    // Critical Hit, Someone critically fails your save, Highest Rank Spell slot (if slotted), 3 action activites?

    // TODO also add an option to choose whether or not the finishing move also triggers your critical hit

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
            window: { title: "pf2e-rpg-numbers.menu.finishing-move.activate.title" },
            content: `
      <input name="guess" type="string" autofocus placeholder="${localize("menu.finishing-move.activate.custom")}" />
    <div>
      <strong>${localize("menu.finishing-move.activate.recent-items")}</strong>
      ${itemHTML}
    </div>`,
            ok: {
                label: "pf2e-rpg-numbers.menu.finishing-move.activate.button",
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
