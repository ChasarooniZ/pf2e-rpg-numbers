//const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
export const MODULE_ID = "pf2e-rpg-numbers";

export function debugLog(data, context = "") {
    if (getSetting("debug-mode")) console.log(`PF2E-RPG-#s: ${context}`, data);
}

export function getSetting(settingID) {
    return game.settings.get(MODULE_ID, settingID);
}

export function setSetting(settingID, value) {
    return game.settings.set(MODULE_ID, settingID, value);
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
            Hooks.off("diceSoNiceRollComplete", hookId);
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
 * @param {string} settingsCat Category of Setting
 * @param {string} settingID ID of the settings
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

// export class FinisherDialog extends ApplicationV2 {
//     static DEFAULT_OPTIONS = {
//         id: "pf2e-rpg-numbers-actor",
//         tag: "form", //use for form
//         form: {
//             handler: FinisherDialog.myFormHandler,
//             submitOnChange: false,
//             closeOnSubmit: true,
//         },
//         position: {
//             width: 640,
//             height: "auto",
//         },
//         window: {
//             icon: "fas fa-gear", // You can now add an icon to the header
//             title: "FOO.form.title",
//             contentClasses: ["standard-form"],
//         },
//     };
//     static PARTS = {
//         foo: {
//             template: "modules/pf2e-rpg-numbers/templates/actor-finisher.html",
//         },
//         footer: {
//             template: "templates/generic/form-footer.hbs",
//         },
//     };

//     get title() {
//         return `PF2e RPG #s: Actor Config`;
//     }

//     /**
//      * Process form submission for the sheet
//      * @this {MyApplication}                      The handler is called with the application as its bound scope
//      * @param {SubmitEvent} event                   The originating form submission event
//      * @param {HTMLFormElement} form                The form element that was submitted
//      * @param {FormDataExtended} formData           Processed data for the submitted form
//      * @returns {Promise<void>}
//      */
//     static async myFormHandler(_event, _form, formData) {
//         // Do things with the returned FormData

//         const items = [];
//         const color = formData.get("color");

//         for (const [key, value] of formData.entries()) {
//             if (key.startsWith("predicate.")) {
//                 const index = key.split(".")[1];
//                 items[index] = items[index] || {};
//                 items[index].predicate = value;
//             } else if (key.startsWith("onlyCrit.")) {
//                 const index = key.split(".")[1];
//                 items[index] = items[index] || {};
//                 items[index].onlyCrit = formData.get(key) === "on";
//             } else if (key.startsWith("finisherText.")) {
//                 const index = key.split(".")[1];
//                 items[index] = items[index] || {};
//                 items[index].finisherText = value;
//             }
//         }

//         const finisherData = {
//             color: color,
//             items: items.filter((item) => item !== null),
//         };

//         await this.actor.setFlag(MODULE_ID, "finisherData", finisherData);
//     }
//     constructor(actor, options = {}) {
//         super(options);
//         this.actor = actor;
//     }

//     static get defaultOptions() {
//         return mergeObject(super.defaultOptions, {
//             id: "finisher-dialog",
//             title: "Finisher Settings",
//             template: "modules/pf2e-rpg-numbers/templates/actor-finisher.html",
//             width: 600,
//             submitOnChange: false,
//             closeOnSubmit: true,
//         });
//     }

//     _prepareContext(actor) {
//         const finisherData = actor.getFlag(MODULE_ID, "finisherData") || { color: "#000000", items: [] };
//         return {
//             color: finisherData.color,
//             items: finisherData.items,
//             actor,
//             buttons: [{ type: "submit", icon: "fa-solid fa-save", label: "SETTINGS.Save" }],
//         };
//     }

//     _onRender(_context, _options) {
//         this.element.find(".add-row").on("click", this._onAddRow.bind(this));
//         this.element.on("click", ".delete-row", this._onDeleteRow.bind(this));
//     }

//     _onAddRow(event) {
//         const items = this.element.find(".finisher-item").length;
//         const newRow = `
//           <div class="form-group finisher-item">
//             <input type="text" name="predicate.${items}" value="" placeholder="Predicate">
//             <input type="checkbox" name="onlyCrit.${items}">
//             <input type="text" name="finisherText.${items}" value="" placeholder="Finisher Text">
//             <button type="button" class="delete-row">Delete</button>
//           </div>
//         `;
//         this.element.find(".finisher-items").append(newRow);
//     }

//     async _onDeleteRow(event) {
//         event.preventDefault();
//         let r = await Dialog.confirm({title: "Delete Row of Finishing Moves", content: "Are you sure you want to delete this row?"});
//         if (r) {
//             event.target.closest(".finisher-item").remove();
//         }
//     }
// }

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
