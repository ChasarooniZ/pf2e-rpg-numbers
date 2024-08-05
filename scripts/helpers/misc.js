import { injectConfig } from "./injectConfig.js";

export const MODULE_ID = "pf2e-rpg-numbers";

export function debugLog(data, context = "") {
    if (getSetting("debug-mode")) console.log(`PF2E-RPG-#s: ${context}`, data);
}

export function getSetting(settingID) {
    return game.settings.get(MODULE_ID, settingID);
}

export function doSomethingOnDamageApply() {
    return (
        getSetting("shake-enabled") ||
        getSetting("dmg-shake-directional-enabled") ||
        getSetting("dmg-on-apply-or-roll") === "apply"
    );
}

export function handleDiceSoNice(func, params, msg = null) {
    if (
        game.modules.get("dice-so-nice")?.active &&
        !game.settings.get("dice-so-nice", "immediatelyDisplayChatMessages") &&
        msg?.rolls?.find((roll) => roll.dice.length > 0)
    ) {
        const hookId = Hooks.on("diceSoNiceRollComplete", (id) => {
            if (id === msg.id || msg === null) {
                func(...params);
                disableHook();
            }
        });
        function disableHook() {
            Hooks.off("createChatMessage", hookId);
        }
    } else {
        func(...params);
    }
}

export function localize(str) {
    return game.i18n.localize(`${MODULE_ID}.${str}`);
}

/**
 *
 * @param {*} settingID
 * @param {*} data {desc: "name + hint connection + choices"}
 */
export function registerSetting(settingCat, settingID, data) {
    const category = settingCat ? `${settingCat}.` : "";
    const settingData = {
        name: data.desc ? localize(`module-settings.${category}${data.desc}.name`) : "",
        hint: data.desc ? localize(`module-settings.${category}${data.desc}.hint`) : "",
        scope: data.scope,
        config: data.config,
        default: data.default,
        type: data.type,
    };
    if (data.requiresReload) settingData.requiresReload = data.requiresReload;
    if (data.filePicker) settingData.filePicker = data.filePicker;
    if (data.choices)
        settingData.choices = data.choices.reduce(
            (obj, current) => ({
                ...obj,
                [current]: localize(`module-settings.${category}${data.desc}.choices.${current}`),
            }),
            {}
        );

    game.settings.register(MODULE_ID, settingID, settingData);
}

function transformData(dataArray) {
    const result = {};

    for (const item of dataArray) {
        const keys = item.key.split(".");
        let temp = result;

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (i === keys.length - 1) {
                temp[key] = item.value;
            } else {
                if (!temp[key]) {
                    temp[key] = {};
                }
                temp = temp[key];
            }
        }
    }

    return { settings: result };
}

export class FinisherDialog extends FormApplication {
    constructor(actor, options = {}) {
        super(actor, options);
        this.actor = actor;
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "finisher-dialog",
            title: "Finisher Settings",
            template: "modules/pf2e-rpg-numbers/templates/actor-finisher.html",
            width: 600,
            closeOnSubmit: true,
        });
    }

    async getData() {
        const data = super.getData();
        const finisherData = this.actor.getFlag(MODULE_ID, "finisherData") || { color: "#000000", items: [] };
        data.color = finisherData.color;
        data.items = finisherData.items;
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find(".add-row").click(this._onAddRow.bind(this));
        html.find(".delete-row").click(this._onDeleteRow.bind(this));
    }

    async _updateObject(event, formData) {
        const items = [];
        for (let i = 0; i < formData["predicate"].length; i++) {
            items.push({
                predicate: formData["predicate"][i],
                onlyCrit: formData["onlyCrit"][i],
                finisherText: formData["finisherText"][i],
            });
        }
        const finisherData = {
            color: formData["color"],
            items: items,
        };
        await this.actor.setFlag(MODULE_ID, "finisherData", finisherData);
    }

    _onAddRow(event) {
        event.preventDefault();
        const items = this.element.find(".finisher-item").length;
        const newRow = $(`
        <div class="form-group finisher-item">
          <input type="text" name="predicate.${items}" value="" placeholder="Predicate">
          <input type="checkbox" name="onlyCrit.${items}">
          <input type="text" name="finisherText.${items}" value="" placeholder="Finisher Text">
          <button type="button" class="delete-row">Delete</button>
        </div>
      `);
        newRow.find(".delete-row").click(this._onDeleteRow.bind(this));
        this.element.find(".finisher-items").append(newRow);
    }

    _onDeleteRow(event) {
        event.preventDefault();
        if (confirm("Are you sure you want to delete this row?")) {
            $(event.currentTarget).closest(".finisher-item").remove();
        }
    }
}

// export function exportDebugInfo() {
//     const settingsInfo = [...game.settings.settings.values()]
//         .filter((val) => val.namespace === "pf2e-rpg-numbers")
//         .map((v) => ({ key: v.key, value: game.settings.get(v.namespace, v.key) }));
//     const settingsJSON = transformData(settingsInfo);
//     settingsJSON.modulesEnabled = {
//         sequencer: game.modules.get("sequencer").active,
//         "token-magic": game.modules.get("tokenmagic").active,
//     };
//     const name = `pf2e-rpg-numbers_DEBUG_(${new Intl.DateTimeFormat("en-GB", {
//         dateStyle: "long",
//         timeStyle: "short",
//         timeZone: "America/Chicago",
//     }).format(new Date())})`;
//     saveDataToFile(JSON.stringify(settingsJSON, null, 2), "json", `${name}.json`);
// }
