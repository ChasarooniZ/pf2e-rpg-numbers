
import { migrateActorTokenSettings } from "../library/migration.js";
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
                    enabled: "critical.success.default.enabled",
                    type: "critical.success.default.type",
                    art: "critical.success.default.art",
                    offset: {
                        x: "critical.success.default.offset.x",
                        y: "critical.success.default.offset.y",
                    },
                    color: "critical.success.default.color",
                    scale: "critical.success.default.scale",
                    rotation: "critical.success.default.rotation",
                    sfx: "critical.success.default.sfx",
                    volume: "critical.success.default.volume",
                },
                strikes: {
                    enabled: "critical.success.strikes.enabled",
                    type: "critical.success.strikes.type",
                    art: "critical.success.strikes.art",
                    offset: {
                        x: "critical.success.strikes.offset.x",
                        y: "critical.success.strikes.offset.y",
                    },
                    color: "critical.success.strikes.color",
                    scale: "critical.success.strikes.scale",
                    rotation: "critical.success.strikes.rotation",
                    sfx: "critical.success.strikes.sfx",
                    volume: "critical.success.strikes.volume",
                },
                checks: {
                    enabled: "critical.success.checks.enabled",
                    type: "critical.success.checks.type",
                    art: "critical.success.checks.art",
                    offset: {
                        x: "critical.success.checks.offset.x",
                        y: "critical.success.checks.offset.y",
                    },
                    color: "critical.success.checks.color",
                    scale: "critical.success.checks.scale",
                    rotation: "critical.success.checks.rotation",
                    sfx: "critical.success.checks.sfx",
                    volume: "critical.success.checks.volume",
                },
                saves: {
                    enabled: "critical.success.saves.enabled",
                    type: "critical.success.saves.type",
                    art: "critical.success.saves.art",
                    offset: {
                        x: "critical.success.saves.offset.x",
                        y: "critical.success.saves.offset.y",
                    },
                    color: "critical.success.saves.color",
                    scale: "critical.success.saves.scale",
                    rotation: "critical.success.saves.rotation",
                    sfx: "critical.success.saves.sfx",
                    volume: "critical.success.saves.volume",
                }
            },
            failure: {
                default: {
                    enabled: "critical.failure.default.enabled",
                    type: "critical.failure.default.type",
                    art: "critical.failure.default.art",
                    offset: {
                        x: "critical.failure.default.offset.x",
                        y: "critical.failure.default.offset.y",
                    },
                    color: "critical.failure.default.color",
                    scale: "critical.failure.default.scale",
                    rotation: "critical.failure.default.rotation",
                    sfx: "critical.failure.default.sfx",
                    volume: "critical.failure.default.volume",
                },
                strikes: {
                    enabled: "critical.failure.strikes.enabled",
                    type: "critical.failure.strikes.type",
                    art: "critical.failure.strikes.art",
                    offset: {
                        x: "critical.failure.strikes.offset.x",
                        y: "critical.failure.strikes.offset.y",
                    },
                    color: "critical.failure.strikes.color",
                    scale: "critical.failure.strikes.scale",
                    rotation: "critical.failure.strikes.rotation",
                    sfx: "critical.failure.strikes.sfx",
                    volume: "critical.failure.strikes.volume",
                },
                checks: {
                    enabled: "critical.failure.checks.enabled",
                    type: "critical.failure.checks.type",
                    art: "critical.failure.checks.art",
                    offset: {
                        x: "critical.failure.checks.offset.x",
                        y: "critical.failure.checks.offset.y",
                    },
                    color: "critical.failure.checks.color",
                    scale: "critical.failure.checks.scale",
                    rotation: "critical.failure.checks.rotation",
                    sfx: "critical.failure.checks.sfx",
                    volume: "critical.failure.checks.volume",
                },
                saves: {
                    enabled: "critical.failure.saves.enabled",
                    type: "critical.failure.saves.type",
                    art: "critical.failure.saves.art",
                    offset: {
                        x: "critical.failure.saves.offset.x",
                        y: "critical.failure.saves.offset.y",
                    },
                    color: "critical.failure.saves.color",
                    scale: "critical.failure.saves.scale",
                    rotation: "critical.failure.saves.rotation",
                    sfx: "critical.failure.saves.sfx",
                    volume: "critical.failure.saves.volume",
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
        if (submit) {
            // If submitting, call _updateObject to store the data
            await this.saveSettings(formattedObject);
            ui.notifications.info(game.i18n.localize(`${MODULE_ID}.menu.settings.notification.submit`));
            this.close();
        } else {
            // If saving, call _updateObject to store the data
            await this.saveSettings(formattedObject);
            ui.notifications.info(game.i18n.localize(`${MODULE_ID}.menu.settings.notification.save`));
        }
    }

    async saveSettings(data) {
        const settings = data.settings;
        const crit = critProcessHelper(settings.critical, {
            default: DEFAULT_CRIT,
            checks: DEFAULT_CRIT,
            saves: DEFAULT_CRIT,
            strikes: DEFAULT_CRIT
        })
        await this.options?.actor?.setFlag(MODULE_ID, 'critical', crit)

        const token = DEFAULT_TOKEN;
        token.rotation.offset = Number(settings.token.rotation.offset) ?? 0;

        await this.options?.actor?.setFlag(MODULE_ID, 'token', token)
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
        await migrateActorTokenSettings(actor)
    }
    if (!flagIDs.includes('token')) {
        await actor.setFlag(MODULE_ID, 'token', DEFAULT_TOKEN)
    }
    return true;
}

function critProcessHelper(data, result) {
    const types = ['checks', 'default', 'saves', 'strikes']
    const succFail = ['success', 'failure'];

    // Create a deep copy of the result object
    const res = JSON.parse(JSON.stringify(result));

    for (const type of types) {
        for (const state of succFail) {
            res[state][type] = {
                art: data[state][type].art,
                enabled: data[state][type].default,
                offset: {
                    x: isNaN(Number(data[state][type].offset.x)) ? 0 : Number(data[state][type].offset.x),
                    y: isNaN(Number(data[state][type].offset.y)) ? 0 : Number(data[state][type].offset.y),
                },
                rotation: isNaN(Number(data[state][type].rotation)) ? 0 : Number(data[state][type].rotation),
                scale: isNaN(Number(data[state][type].scale)) ? 1 : Number(data[state][type].scale),
                sfx: data[state][type].sfx,
                type: data[state][type].type,
                volume: isNaN(Number(data[state][type].volume)) ? 100 : Number(data[state][type].volume),
            }
        }
    }
    return res;
}
