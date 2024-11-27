import { getSetting, MODULE_ID, setSetting } from "../misc.js";

export class SettingsConfigForm extends FormApplication {
    // lots of other things...
    constructor(options) {
        super(options);
        this.options = foundry.utils.mergeObject(this.constructor.defaultOptions, options);
    }


    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['form'],
            popOut: true,
            template: `modules/pf2e-rpg-numbers/templates/settings/pf2e-rpg-settings-config.hbs`,
            id: 'pf2e-rpg-numbers-settings-form',
            title: 'Pf2e RPG #s Config Menu',
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".tabs", contentSelector: ".content", initial: "tab1" }]
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        // Add event listener for the Save button
        html.find('#pf2e-rpg-save').on('click', (event) => {
            event.preventDefault();
            this._processForm(html, false); // Pass 'false' Fto not submit the form, only save
        });
        html.find('#pf2e-rpg-submit').on('click', (event) => {
            event.preventDefault();
            this._processForm(html, true); // Pass 'true' to indicate form submission
        });
        html.find('#pf2e-rpg-cancel').on('click', (event) => {
            event.preventDefault();
            ui.notifications.warn(game.i18n.localize(`${MODULE_ID}.menu.settings.notification.cancel`));
            this.close(); // Close the form without saving
        });
    }

    getData() {
        return foundry.utils.mergeObject(super.getData(), { tabs });
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
