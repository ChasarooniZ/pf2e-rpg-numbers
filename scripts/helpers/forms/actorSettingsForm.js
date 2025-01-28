
import { DEFAULT_CRIT, DEFAULT_TOKEN } from "../library/migration.js";
import { getSetting, MODULE_ID, setSetting } from "../misc.js";

const settingsConfig = {
    // home: {
    //     icon: "fa-dragon"
    // },
    critical: {
        icon: "fa-explosion",
        tabs: {
            success: {
                default: {
                    enabled: "critical.default.success.enabled",
                    type: "critical.default.success.type",
                    art: "critical.default.success.art",
                    offset: {
                        x: "critical.default.success.offset.x",
                        y: "critical.default.success.offset.y",
                    },
                    color: "critical.default.success.color",
                    scale: "critical.default.success.scale",
                    rotation: "critical.default.success.rotation",
                    sfx: "critical.default.success.sfx",
                    volume: "critical.default.success.volume",
                },
                strike: {
                    enabled: "critical.strikes.success.enabled",
                    type: "critical.strikes.success.type",
                    art: "critical.strikes.success.art",
                    offset: {
                        x: "critical.strikes.success.offset.x",
                        y: "critical.strikes.success.offset.y",
                    },
                    color: "critical.strikes.success.color",
                    scale: "critical.strikes.success.scale",
                    rotation: "critical.strikes.success.rotation",
                    sfx: "critical.strikes.success.sfx",
                    volume: "critical.strikes.success.volume",
                },
                check: {
                    enabled: "critical.checks.success.enabled",
                    type: "critical.checks.success.type",
                    art: "critical.checks.success.art",
                    offset: {
                        x: "critical.checks.success.offset.x",
                        y: "critical.checks.success.offset.y",
                    },
                    color: "critical.checks.success.color",
                    scale: "critical.checks.success.scale",
                    rotation: "critical.checks.success.rotation",
                    sfx: "critical.checks.success.sfx",
                    volume: "critical.checks.success.volume",
                },
                save: {
                    enabled: "critical.saves.success.enabled",
                    type: "critical.saves.success.type",
                    art: "critical.saves.success.art",
                    offset: {
                        x: "critical.saves.success.offset.x",
                        y: "critical.saves.success.offset.y",
                    },
                    color: "critical.saves.success.color",
                    scale: "critical.saves.success.scale",
                    rotation: "critical.saves.success.rotation",
                    sfx: "critical.saves.success.sfx",
                    volume: "critical.saves.success.volume",
                }
            },
            failure: {
                default: {
                    enabled: "critical.default.failure.enabled",
                    type: "critical.default.failure.type",
                    art: "critical.default.failure.art",
                    offset: {
                        x: "critical.default.failure.offset.x",
                        y: "critical.default.failure.offset.y",
                    },
                    color: "critical.default.failure.color",
                    scale: "critical.default.failure.scale",
                    rotation: "critical.default.failure.rotation",
                    sfx: "critical.default.failure.sfx",
                    volume: "critical.default.failure.volume",
                },
                strike: {
                    enabled: "critical.strikes.failure.enabled",
                    type: "critical.strikes.failure.type",
                    art: "critical.strikes.failure.art",
                    offset: {
                        x: "critical.strikes.failure.offset.x",
                        y: "critical.strikes.failure.offset.y",
                    },
                    color: "critical.strikes.failure.color",
                    scale: "critical.strikes.failure.scale",
                    rotation: "critical.strikes.failure.rotation",
                    sfx: "critical.strikes.failure.sfx",
                    volume: "critical.strikes.failure.volume",
                },
                check: {
                    enabled: "critical.checks.failure.enabled",
                    type: "critical.checks.failure.type",
                    art: "critical.checks.failure.art",
                    offset: {
                        x: "critical.checks.failure.offset.x",
                        y: "critical.checks.failure.offset.y",
                    },
                    color: "critical.checks.failure.color",
                    scale: "critical.checks.failure.scale",
                    rotation: "critical.checks.failure.rotation",
                    sfx: "critical.checks.failure.sfx",
                    volume: "critical.checks.failure.volume",
                },
                save: {
                    enabled: "critical.saves.failure.enabled",
                    type: "critical.saves.failure.type",
                    art: "critical.saves.failure.art",
                    offset: {
                        x: "critical.saves.failure.offset.x",
                        y: "critical.saves.failure.offset.y",
                    },
                    color: "critical.saves.failure.color",
                    scale: "critical.saves.failure.scale",
                    rotation: "critical.saves.failure.rotation",
                    sfx: "critical.saves.failure.sfx",
                    volume: "critical.saves.failure.volume",
                }
            }
        },
        choices: {
            enabled: {
                default: "pf2e-rpg-numbers.menu.actor-settings.critical.enabled.choices.default",
                on: "pf2e-rpg-numbers.menu.actor-settings.critical.enabled.choices.on",
                off: "pf2e-rpg-numbers.menu.actor-settings.critical.enabled.choices.off",
            },
            type: {
                default: "pf2e-rpg-numbers.menu.actor-settings.critical.type.choices.default",
                "fire-emblem": "pf2e-rpg-numbers.menu.actor-settings.critical.type.choices.fire-emblem",
                persona: "pf2e-rpg-numbers.menu.actor-settings.critical.type.choices.persona",
            }
        }
    },
    token: {
        icon: "fa-circle-user",
        rotation: {
            offset: 'token.rotation.offset'
        }
    }
};
const tabList = Object.keys(settingsConfig);


export class ActorSettingsConfigForm extends FormApplication {
    // lots of other things...
    constructor(options) {
        super(options);
        checkAndSetDefaultActorFlagIfNotExist(options.actor)
        this.options = foundry.utils.mergeObject(this.constructor.defaultOptions, options);
    }


    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['form'],
            popOut: true,
            template: `modules/pf2e-rpg-numbers/templates/actor-settings/actor-settings.hbs`,
            id: 'pf2e-rpg-numbers-actor-settings-form',
            title: 'Pf2e RPG #s Actor Config Menu',
            width: 800,
            height: 600,
            tabs: [{ navSelector: ".tabs", contentSelector: ".content", initial: "tab1" }]
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        // Add event listener for the Save button
        html.find('#pf2e-rpg-save-actor').on('click', (event) => {
            event.preventDefault();
            this._processForm(html, false); // Pass 'false' Fto not submit the form, only save
        });
        html.find('#pf2e-rpg-submit-actor').on('click', (event) => {
            event.preventDefault();
            this._processForm(html, true); // Pass 'true' to indicate form submission
        });
        html.find('#pf2e-rpg-cancel-actor').on('click', (event) => {
            event.preventDefault();
            ui.notifications.warn(game.i18n.localize(`${MODULE_ID}.menu.settings.notification.cancel`));
            this.close(); // Close the form without saving
        });
        html.find('#pf2e-rpg-import-actor').on('click', (event) => {
            game.pf2eRPGNumbers.settings.import();
            this.close(); // Close the form without saving
        });
        html.find('#pf2e-rpg-export-actor').on('click', (event) => {
            game.pf2eRPGNumbers.settings.export();
        });
    }

    getData() {
        const tabs = Object.keys(settingsConfig).map(tab => {
            const settings = settingsConfig[tab];
            const tabSettings = {};
            for (const [key, value] of Object.entries(settings)) {
                if (key !== 'icon') {
                    if (typeof value === "object") {
                        tabSettings[key] = this._retrieveNestedSettings(value);
                    } else {
                        tabSettings[key] = value;
                    }
                }
            }
            return {
                id: tab,
                label: game.i18n.localize(`${MODULE_ID}.menu.settings.tabs.${tab}`),
                title: game.i18n.localize(`${MODULE_ID}.menu.settings.tabs.${tab}`),
                icon: settingsConfig[tab].icon,
                [tab]: true,
                settings: tabSettings
            };
        });
        console.log({ tabs, actor: this?.options?.actor })

        return foundry.utils.mergeObject(super.getData(), { tabs, actor: this.options?.actor });
    }

    _retrieveNestedSettings(settingGroup) {
        const result = {};
        for (const [key, value] of Object.entries(settingGroup)) {
            // if (typeof value === "string") {
            //     result[key] = handleChoicesSetting(value);
            // } else if (value.type === "number") {
            //     result[key] = getNumberSetting(value.path, value.range);
            // } else 
            if (typeof value === "string" && value?.startsWith('pf2e-rpg-numbers.')) {
                result[key] = game.i18n.localize(value)
            } else if (typeof value === "string" && tabList.includes(value.match(/^([^.]*)/)?.[0] ?? '')) {
                result[key] = this.getVariable(value)
            } else if (typeof value === "object") {
                result[key] = this._retrieveNestedSettings(value);
            } else {
                result[key] = value;
            }
        }
        return result;
    }

    async _updateObject(event, formData) {
        // Expand the flat form data into a nested object structure

        // Debug log for inspecting the expanded form data
        //console.log("Expanded Form Data:", { expandedData, formData });
        //game.settings.set('myModuleName', 'myComplexSettingName', data);
    }

    async _processForm(html, submit = false) {
        // Collect the form data from all inputs in the form
        const formData = new FormData(html[0].closest("form"));
        const dataObject = {};

        // // Iterate over the form data and convert it to an object
        formData.forEach((value, key) => {
            // Handle checkboxes separately to store booleans
            if (html.find(`[name="${key}"]`).attr("type") === "checkbox") {
                dataObject[key] = html.find(`[name="${key}"]`).prop("checked");
            } else {
                dataObject[key] = value;
            }
        });

        // // Log the gathered form data for debugging purposes
        const formattedObject = foundry.utils.expandObject(dataObject);
        console.log("Form Data:", formattedObject);

        // // Handle saving or submitting
        // if (submit) {
        //     // If submitting, call _updateObject to store the data
        //     await this.saveSettings(foundry.utils.expandObject(dataObject));
        //     ui.notifications.info(game.i18n.localize(`${MODULE_ID}.menu.settings.notification.submit`));
        //     this.close();
        // } else {
        //     // If saving, call _updateObject to store the data
        //     await this.saveSettings(foundry.utils.expandObject(dataObject));
        //     ui.notifications.info(game.i18n.localize(`${MODULE_ID}.menu.settings.notification.save`));
        // }
    }

    async saveSettings(data) {
        //     const settings = data.settings;

        //     const updateSetting = (settingKey, settingValue) => {
        //         const currentValue = getSetting(settingKey);
        //         if (typeof currentValue === "boolean") {
        //             settingValue = !!settingValue;
        //         }
        //         if (currentValue !== settingValue) {
        //             setSetting(settingKey, settingValue);
        //         }
        //     };

        //     const processSettings = (settingGroup, dataGroup) => {
        //         for (const [key, settingPathOrGroup] of Object.entries(settingGroup)) {
        //             if (key !== 'icon') {
        //                 if (typeof settingPathOrGroup === "string") {
        //                     updateSetting(settingPathOrGroup, dataGroup[key]);
        //                 } else if (settingPathOrGroup?.type === "number") {
        //                     updateSetting(settingPathOrGroup.path, dataGroup[key]);
        //                 } else if (typeof settingPathOrGroup === "object") {
        //                     processSettings(settingPathOrGroup, dataGroup[key]);
        //                 }
        //             }
        //         }
        //     };

        //     for (const [tabKey, tabSettings] of Object.entries(settingsConfig)) {
        //         processSettings(tabSettings, settings);
        //     }
    }
    getVariable(path) {
        const [flag, ...remaining] = path.split(".");
        const remain = remaining.join(".")
        const obj = this.options.actor.getFlag(MODULE_ID, flag); // TODO make actor defined here
        return getNestedProperty(obj, remain)
    }


}

function getNestedProperty(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}


function handleChoicesSetting(settingPath) {
    const choices = game.settings.settings.get(MODULE_ID + "." + settingPath)?.choices;
    const value = getSetting(settingPath);
    if (choices) {

        return { choices, value }
    }
    return value
}

function getNumberSetting(settingPath, range) {
    const ret = { value: getSetting(settingPath) };
    if (range) ret.range = range;
    return ret;
}

function updateIfChanged(settingID, newValue) {
    const currentValue = getSetting(settingID);
    if (typeof currentValue == "boolean") {
        newValue = !!newValue;
    }
    if (currentValue !== newValue) {
        setSetting(settingID, newValue);
    }
}

async function checkAndSetDefaultActorFlagIfNotExist(actor) {
    const flags = actor?.flags?.[MODULE_ID];
    const flagIDs = flags ? Object?.keys(flags) : [];
    if (!flagIDs.includes('critical')) {
        await actor.setFlag(MODULE_ID, 'critical', {
            default: DEFAULT_CRIT,
            checks: DEFAULT_CRIT,
            saves: DEFAULT_CRIT,
            strikes: DEFAULT_CRIT
        })
    }
    if (!flagIDs.includes('token')) {
        await actor.setFlag(MODULE_ID, 'token', DEFAULT_TOKEN)
    }
}