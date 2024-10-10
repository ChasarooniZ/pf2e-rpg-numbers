import { getSetting, MODULE_ID, setSetting } from "../misc.js";

const settingsConfig = {
    home: {
        icon: "fa-dragon",
        enabled: "enabled"
    },
    rolls: {
        icon: "fa-dice-d20",
        'dmg-numbers': {
            enabled: "dmg-enabled",
            whenTo: "dmg-on-apply-or-roll",
            fontSize: "font-size",
            maxFontScale: "max-font-scale",
            topOffset: { path: "top-offset", type: "number", range: { min: -100, max: 100, step: 5 } },
            showTotal: "show-total",
            scaleType: "number-scale-type",
            split: "damage-split",
            duration: { path: "duration", type: "number", range: { min: 0, max: 10, step: 0.1 } },
            waitTime: { path: "wait-time-between-numbers", type: "number", range: { min: 0, max: 1000, step: 1 } },
            onlyGM: "show-only-GM",
            scale: { path: "animation-scale", type: "number", range: { min: 0, max: 2, step: 0.05 } },
            jitter: { path: "jitter", type: "number", range: { min: 0, max: 1, step: 0.05 } }
        },
        'check-animations': {
            enabled: "check-enabled",
            colorScheme: "check-color-scheme",
            showOutcome: "check-outcome-result",
            fontSize: "check-font-size",
            duration: { path: "check-duration", type: "number", range: { min: 0, max: 10, step: 0.1 } },
            sfx: {
                enabled: "check-animations.sfx.enabled",
                checkOrAttack: "check-animations.sfx.check-or-attack",
                options: "check-animations.sfx.options",
                volume: { path: "check-animations.sfx.volume", type: "number", range: { min: 0, max: 100, step: 1 } },
                file: {
                    criticalSuccess: "check-animations.sfx.file.criticalSuccess",
                    success: "check-animations.sfx.file.success",
                    failure: "check-animations.sfx.file.failure",
                    criticalFailure: "check-animations.sfx.file.criticalFailure"
                }
            }
        }
    },
    token: {
        icon: "fa-circle-user",
        tokenShake: {
            enabled: "dmg-shake-directional-enabled",
            distance: { path: "tok-shake-distance", type: "number", range: { min: 1, max: 100, step: 1 } },
            shakes: { path: "tok-shake-shakes", type: "number", range: { min: 1, max: 20, step: 1 } },
            duration: { path: "tok-shake-duration", type: "number", range: { min: 0, max: 2000, step: 10 } },
            scaling: {
                type: "tok-shake-scaling-type",
                distance: "tok-shake-scaling-distance",
                shakes: "tok-shake-scaling-shakes",
                duration: "tok-shake-scaling-duration"
            }
        },
        rotateOnAttack: {
            enabled: "rotate-on-attack",
            duration: { path: "rotate-on-attack.duration", type: "number", range: { min: 0, max: 2, step: 0.1 } },
            scaleOnSize: "rotate-on-attack.scale-on-size"
        },
        screenShake: {
            onDamaged: {
                enabled: "shake-enabled",
                duration: { path: "shake-duration", type: "number", range: { min: 0, max: 2000, step: 10 } },
                maxIntensity: { path: "shake-intensity-max", type: "number", range: { min: 1, max: 100, step: 1 } },
                intensityScaling: "shake-intensity-type",
                intensityScalingIncludeTempHP: "shake-intensity-include-temp-hp",
                shakeGM: "shake-gm-enabled"
            },
            onAttack: {
                enabled: "shake-on-attack.enabled",
                showFor: "shake-on-attack.type"
            }
        }
    },
    critical: {
        icon: "fa-explosion",
        critical: {
            enabled: "critical.enabled",
            style: "critical.type",
            checksOrAttacks: "critical.show-on",
            pcOrNPC: "critical.show-on-token-type",
            defaultImageType: "critical.default-img",
            duration: { path: "critical.duration", type: "number", range: { min: 0, max: 10, step: 0.1 } },
            sound: "critical.sound",
            volume: { path: "critical.volume", type: "number", range: { min: 0, max: 100, step: 1 } },
            delay: "critical.delay"
        }
    },
    text: {
        icon: "fa-message-captions",
        finishingMove: {
            enabled: "finishing-move.enabled",
            keepOn: "finishing-move.keep-on",
            usePlayerColor: "finishing-move.use-player-color",
            quality: { path: "finishing-move.quality", type: "number", range: { min: 1, max: 5, step: 1 } },
            sound: "finishing-move.sound-effect",
            volume: { path: "finishing-move.sound-effect.volume", type: "number", range: { min: 1, max: 100, step: 1 } },
            duration: {
                word: { path: "finishing-move.duration.word", type: "number", range: { min: 0, max: 2000, step: 25 } },
                end: { path: "finishing-move.duration.end", type: "number", range: { min: 0, max: 5000, step: 25 } }
            }
        },
        fromSoftware: {
            eldenRing: {
                nounVerbed: {
                    enabled: "from-software.noun-verbed.enabled",
                    xpThreshold: "from-software.noun-verbed.xp-threshold",
                    fontSize: { path: "from-software.noun-verbed.font-size", type: "number", range: { min: 1, max: 150, step: 1 } },
                    sound: "from-software.noun-verbed.sound-effect",
                    volume: { path: "from-software.noun-verbed.sound-effect.volume", type: "number", range: { min: 1, max: 100, step: 1 } },
                    duration: { path: "from-software.noun-verbed.duration", type: "number", range: { min: 0, max: 12, step: 0.1 } },
                    text: "from-software.noun-verbed.text"
                },
                death: {
                    enabled: "from-software.death.enabled",
                    fontSize: { path: "from-software.death.font-size", type: "number", range: { min: 1, max: 150, step: 1 } },
                    sound: "from-software.death.sound-effect",
                    volume: { path: "from-software.death.sound-effect.volume", type: "number", range: { min: 1, max: 100, step: 1 } },
                    duration: { path: "from-software.death.duration", type: "number", range: { min: 0, max: 12, step: 0.1 } },
                    text: "from-software.death.text",
                    type: "from-software.death.type",
                }
            }
        }
    }
};


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
        html.find('#pf2e-rpg-import').on('click', (event) => {
            game.pf2eRPGNumbers.settings.import();
            this.close(); // Close the form without saving
        });
        html.find('#pf2e-rpg-export').on('click', (event) => {
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