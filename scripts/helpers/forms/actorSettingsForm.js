import { getSetting, MODULE_ID, setSetting } from "../misc.js";

const settingsConfig = {
    home: {
        icon: "fa-dragon"
    },
    critical: {
        icon: "fa-explosion",
        tabs: {
            success: {
                base: {
                    enabled: "critical.success.base.enabled",
                    type: "critical.success.base.type",
                    art: "critical.success.base.art",
                    offset: {
                        x: "critical.success.base.offset.x",
                        y: "critical.success.base.offset.y",
                    },
                    color: "critical.success.base.color",
                    scale: "critical.success.base.scale",
                    rotation: "critical.success.base.rotation",
                    sfx: "critical.success.base.sfx",
                    volume: "critical.success.base.volume",
                },
                strike: {
                    enabled: "critical.success.strike.enabled",
                    type: "critical.success.strike.type",
                    art: "critical.success.strike.art",
                    offset: {
                        x: "critical.success.strike.offset.x",
                        y: "critical.success.strike.offset.y",
                    },
                    color: "critical.success.strike.color",
                    scale: "critical.success.strike.scale",
                    rotation: "critical.success.strike.rotation",
                    sfx: "critical.success.strike.sfx",
                    volume: "critical.success.strike.volume",
                },
                check: {
                    enabled: "critical.success.check.enabled",
                    type: "critical.success.check.type",
                    art: "critical.success.check.art",
                    offset: {
                        x: "critical.success.check.offset.x",
                        y: "critical.success.check.offset.y",
                    },
                    color: "critical.success.check.color",
                    scale: "critical.success.check.scale",
                    rotation: "critical.success.check.rotation",
                    sfx: "critical.success.check.sfx",
                    volume: "critical.success.check.volume",
                },
                save: {
                    enabled: "critical.success.save.enabled",
                    type: "critical.success.save.type",
                    art: "critical.success.save.art",
                    offset: {
                        x: "critical.success.save.offset.x",
                        y: "critical.success.save.offset.y",
                    },
                    color: "critical.success.save.color",
                    scale: "critical.success.save.scale",
                    rotation: "critical.success.save.rotation",
                    sfx: "critical.success.save.sfx",
                    volume: "critical.success.save.volume",
                }
            },
            failure: {
                base: {
                    enabled: "critical.failure.base.enabled",
                    type: "critical.failure.base.type",
                    art: "critical.failure.base.art",
                    offset: {
                        x: "critical.failure.base.offset.x",
                        y: "critical.failure.base.offset.y",
                    },
                    color: "critical.failure.base.color",
                    scale: "critical.failure.base.scale",
                    rotation: "critical.failure.base.rotation",
                    sfx: "critical.failure.base.sfx",
                    volume: "critical.failure.base.volume",
                },
                strike: {
                    enabled: "critical.failure.strike.enabled",
                    type: "critical.failure.strike.type",
                    art: "critical.failure.strike.art",
                    offset: {
                        x: "critical.failure.strike.offset.x",
                        y: "critical.failure.strike.offset.y",
                    },
                    color: "critical.failure.strike.color",
                    scale: "critical.failure.strike.scale",
                    rotation: "critical.failure.strike.rotation",
                    sfx: "critical.failure.strike.sfx",
                    volume: "critical.failure.strike.volume",
                },
                check: {
                    enabled: "critical.failure.check.enabled",
                    type: "critical.failure.check.type",
                    art: "critical.failure.check.art",
                    offset: {
                        x: "critical.failure.check.offset.x",
                        y: "critical.failure.check.offset.y",
                    },
                    color: "critical.failure.check.color",
                    scale: "critical.failure.check.scale",
                    rotation: "critical.failure.check.rotation",
                    sfx: "critical.failure.check.sfx",
                    volume: "critical.failure.check.volume",
                },
                save: {
                    enabled: "critical.failure.save.enabled",
                    type: "critical.failure.save.type",
                    art: "critical.failure.save.art",
                    offset: {
                        x: "critical.failure.save.offset.x",
                        y: "critical.failure.save.offset.y",
                    },
                    color: "critical.failure.save.color",
                    scale: "critical.failure.save.scale",
                    rotation: "critical.failure.save.rotation",
                    sfx: "critical.failure.save.sfx",
                    volume: "critical.failure.save.volume",
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
        rotateOnAttack: {
            rotation: true
        }
    }
};


export class ActorSettingsConfigForm extends FormApplication {
    // lots of other things...
    constructor(options) {
        super(options);
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
                    if (key === 'tabs') {
                        tabSettings[key] = this._getTabData(value)
                    } else if (typeof value === "object") {
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
        console.log({ tabs })

        return foundry.utils.mergeObject(super.getData(), { tabs });
    }

    _retrieveNestedSettings(settingGroup) {
        const result = {};
        for (const [key, value] of Object.entries(settingGroup)) {
            // if (typeof value === "string") {
            //     result[key] = handleChoicesSetting(value);
            // } else if (value.type === "number") {
            //     result[key] = getNumberSetting(value.path, value.range);
            // } else 
            if (key === 'tabs') {
                result[key] = this._getTabData(value)
            } else if (typeof value === "string" && value?.startsWith('pf2e-rpg-numbers.')) {
                result[key] = game.i18n.localize(value)
            } else if (typeof value === "object") {
                result[key] = this._retrieveNestedSettings(value);
            } else {
                result[key] = value;
            }
        }
        return result;
    }

    _getTabData(tabsData) {
        const tabs = {};
        for (const [key, value] of Object.entries(tabsData)) {
            tabs[key] = {
                id: key,
                label: game.i18n.localize(`${MODULE_ID}.menu.actor-settings.headers.${key}`),
                title: game.i18n.localize(`${MODULE_ID}.menu.actor-settings.headers.${key}`),
                icon: value.icon,
                [key]: true,
                settings: this._retrieveNestedSettings(value)
            };
        }
        return tabs
    }


    async _updateObject(event, formData) {
        // Expand the flat form data into a nested object structure

        // Debug log for inspecting the expanded form data
        //console.log("Expanded Form Data:", { expandedData, formData });
        //game.settings.set('myModuleName', 'myComplexSettingName', data);
    }

    async _processForm(html, submit = false) {
        // Collect the form data from all inputs in the form
        // const formData = new FormData(html[0].closest("form"));
        // const dataObject = {};

        // // Iterate over the form data and convert it to an object
        // formData.forEach((value, key) => {
        //     // Handle checkboxes separately to store booleans
        //     if (html.find(`[name="${key}"]`).attr("type") === "checkbox") {
        //         dataObject[key] = html.find(`[name="${key}"]`).prop("checked");
        //     } else {
        //         dataObject[key] = value;
        //     }
        // });

        // // Log the gathered form data for debugging purposes
        // console.log("Form Data:", dataObject);

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