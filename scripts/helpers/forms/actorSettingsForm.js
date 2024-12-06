import { getSetting, MODULE_ID, setSetting } from "../misc.js";

const settingsConfig = {
    home: {
        icon: "fa-dragon"
    },
    critical: {
        icon: "fa-explosion",
        critical: {
            default: {
                
            }
        }
    },
    token: {
        icon: "fa-circle-user",
        rotateOnAttack: {
            rotation: 
        }
    }
};


export class TokenSettingsConfigForm extends FormApplication {
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
            width: 600,
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
                    if (typeof value === "string") {
                        tabSettings[key] = getSetting(value);
                    } else if (value.type === "number") {
                        tabSettings[key] = getNumberSetting(value?.path, value?.range);
                    } else if (typeof value === "object") {
                        tabSettings[key] = this._retrieveNestedSettings(value);
                    }
                }
            }
            return {
                id: tab,
                label: game.i18n.localize(`${MODULE_ID}.menu.settings.tabs.${tab}`),
                icon: settingsConfig[tab].icon,
                [tab]: true,
                settings: tabSettings
            };
        });

        return foundry.utils.mergeObject(super.getData(), { tabs });
    }

    _retrieveNestedSettings(settingGroup) {
        const result = {};
        for (const [key, value] of Object.entries(settingGroup)) {
            if (typeof value === "string") {
                result[key] = handleChoicesSetting(value);
            } else if (value.type === "number") {
                result[key] = getNumberSetting(value.path, value.range);
            } else if (typeof value === "object") {
                result[key] = this._retrieveNestedSettings(value);
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

        // Iterate over the form data and convert it to an object
        formData.forEach((value, key) => {
            // Handle checkboxes separately to store booleans
            if (html.find(`[name="${key}"]`).attr("type") === "checkbox") {
                dataObject[key] = html.find(`[name="${key}"]`).prop("checked");
            } else {
                dataObject[key] = value;
            }
        });

        // Log the gathered form data for debugging purposes
        console.log("Form Data:", dataObject);

        // Handle saving or submitting
        if (submit) {
            // If submitting, call _updateObject to store the data
            await this.saveSettings(foundry.utils.expandObject(dataObject));
            ui.notifications.info(game.i18n.localize(`${MODULE_ID}.menu.settings.notification.submit`));
            this.close();
        } else {
            // If saving, call _updateObject to store the data
            await this.saveSettings(foundry.utils.expandObject(dataObject));
            ui.notifications.info(game.i18n.localize(`${MODULE_ID}.menu.settings.notification.save`));
        }
    }

    async saveSettings(data) {
        const settings = data.settings;

        const updateSetting = (settingKey, settingValue) => {
            const currentValue = getSetting(settingKey);
            if (typeof currentValue === "boolean") {
                settingValue = !!settingValue;
            }
            if (currentValue !== settingValue) {
                setSetting(settingKey, settingValue);
            }
        };

        const processSettings = (settingGroup, dataGroup) => {
            for (const [key, settingPathOrGroup] of Object.entries(settingGroup)) {
                if (key !== 'icon') {
                    if (typeof settingPathOrGroup === "string") {
                        updateSetting(settingPathOrGroup, dataGroup[key]);
                    } else if (settingPathOrGroup?.type === "number") {
                        updateSetting(settingPathOrGroup.path, dataGroup[key]);
                    } else if (typeof settingPathOrGroup === "object") {
                        processSettings(settingPathOrGroup, dataGroup[key]);
                    }
                }
            }
        };

        for (const [tabKey, tabSettings] of Object.entries(settingsConfig)) {
            processSettings(tabSettings, settings);
        }
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