import { CRIT_OPTIONS } from "../animation/crit/const.js";
import { createTestCritAnimation } from "../animation/crit/critAnimation.js";
import { getTokenImage } from "../animation/token/shakeOnDamageToken.js";
import { DEFAULT_CRIT, DEFAULT_TOKEN } from "../library/migration.js";
import { getSetting } from "../misc.js";
import { MODULE_ID } from "../const.js";

const settingsConfig = {
    // home: {
    //     icon: "fa-dragon"
    // },
    critical: {
        icon: "fas fa-explosion",
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
                },
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
                },
            },
        },
        choices: {
            enabled: {
                default: "pf2e-rpg-numbers.menu.actor-settings.critical.enabled.choices.default",
                on: "pf2e-rpg-numbers.menu.actor-settings.critical.enabled.choices.on",
                off: "pf2e-rpg-numbers.menu.actor-settings.critical.enabled.choices.off",
            },
            type: CRIT_OPTIONS,
        },
    },
    token: {
        icon: "fas fa-circle-user",
        rotation: {
            offset: "token.rotation.offset",
        },
        dodgeOnMiss: {
            type: "token.dodgeOnMiss.type",
            choices: {
                type: {
                    default: "pf2e-rpg-numbers.menu.actor-settings.token.dodge-on-miss.type.choices.default",
                    dodge: "pf2e-rpg-numbers.menu.actor-settings.token.dodge-on-miss.type.choices.dodge",
                    "bounce-off": "pf2e-rpg-numbers.menu.actor-settings.token.dodge-on-miss.type.choices.bounce-off",
                },
            },
        },
    },
};
const tabList = Object.keys(settingsConfig);

export class ActorSettingsConfigForm extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.api.ApplicationV2
) {
    constructor(options = {}) {
        super(options);
        this.rotationTouched = false;
    }

    static DEFAULT_OPTIONS = {
        id: "pf2e-rpg-numbers-actor-settings-form",
        form: {
            handler: ActorSettingsConfigForm.#onSubmit,
            closeOnSubmit: true,
        },
        popOut: true,
        position: {
            width: 800,
            height: "auto",
        },
        tag: "form",
        window: {
            icon: "fas fa-dragon",
            title: "pf2e-rpg-numbers.menu.actor-settings.title",
            contentClasses: ["standard-form", "flexcol"],
            controls: [
                {
                    action: "kofi",
                    label: "Support Me :P",
                    icon: "fa-solid fa-mug-hot fa-beat-fade",
                    onClick: () => window.open("https://ko-fi.com/chasarooni", "_blank"),
                },
            ],
        },
        tabs: [{ navSelector: ".tabs", contentSelector: ".content", initial: "tab1" }],
        actions: {
            save: ActorSettingsConfigForm.save,
            submit: ActorSettingsConfigForm.submit,
            cancel: ActorSettingsConfigForm.cancel,
            import: ActorSettingsConfigForm.import,
            export: ActorSettingsConfigForm.export,
        },
    };

    static async save() {
        this._processForm(false); // Pass 'false' Fto not submit the form, only save
    }

    static async submit() {
        this._processForm(true); // Pass 'true' to indicate form submission
    }

    static async cancel() {
        ui.notifications.warn(game.i18n.localize(`${MODULE_ID}.menu.settings.notification.cancel`));
        this.close(); // Close the form without saving
    }

    static async import() {
        game.pf2eRPGNumbers.settings.import();
        this.close();
    }

    static async export() {
        game.pf2eRPGNumbers.settings.export();
    }

    get title() {
        return "Pf2e RPG #s Actor Config Menu";
    }

    static PARTS = {
        tabs: {
            // Foundry-provided generic template
            template: "templates/generic/tab-navigation.hbs",
        },
        main: {
            template: "./modules/pf2e-rpg-numbers/templates/actor-settings/actor-settings.hbs",
            scrollable: [".tab.critical", ".tab.token"],
            classes: ["pf2e-rpg-actor-config-form", "form"],
        },
        footer: {
            template: "templates/generic/form-footer.hbs",
        },
    };

    _onRender(context, options) {
        // Add event listener for the Save button
        for (const state of ["success", "failure"]) {
            for (const type of ["checks", "default", "saves", "strikes"]) {
                this.element.querySelector(`#critical-test-${state}-${type}`).addEventListener("click", (event) => {
                    event.preventDefault();
                    const type = $(event.currentTarget).data("type");
                    const section = $(event.target).data("section");
                    const formData = this.getFormData(context).settings;
                    formData.critical = critProcessHelper(formData.critical, JSON.parse(JSON.stringify(DEFAULT_CRIT)));
                    console.log({ type, section, event });
                    createTestCritAnimation({
                        userID: game.user.id,
                        succFail: type,
                        section,
                        settings: formData,
                        actor: this.options.actor,
                    });
                });
            }
        }
        // // Token Rotation Code
        const img = this.element.querySelector("#angle-image");
        const canvasEl = this.element.querySelector("#angle-canvas");
        const container = this.element.querySelector("angle-image-container");
        const input = this.element.querySelector('input[name="settings.token.rotation.offset"]');
        const ctx = canvasEl.getContext("2d");
        function drawIndicator(angle) {
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
            const width = canvasEl.width;
            const height = canvasEl.height;
            const centerX = width / 2;
            const centerY = height / 2;
            // Convert angle (0 = down) to radians
            const radians = ((360 - angle + 90) * Math.PI) / 180;
            // Draw line from center outward
            const edgeX = centerX + Math.cos(radians) * centerX;
            const edgeY = centerY + Math.sin(radians) * centerY;
            ctx.strokeStyle = "red";
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(edgeX, edgeY);
            ctx.stroke();
        }
        img.addEventListener("load", () => {
            drawIndicator(parseInt(input.value) || 0);
        });
        img.addEventListener("click", (event) => {
            const rect = canvasEl.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const centerX = width / 2;
            const centerY = height / 2;
            const clickX = event.offsetX;
            const clickY = event.offsetY;
            const dx = clickX - centerX;
            const dy = clickY - centerY;
            let angle = Math.atan2(dy, dx) * (180 / Math.PI);
            // Convert to new system where 0° is down
            angle = (360 - angle + 90) % 360;
            angle = Math.round(angle / 5) * 5;
            input.value = angle;
            drawIndicator(angle);
            this.rotationTouched = true; // Mark as touched
        });
        input.addEventListener("change", () => {
            let angle = parseInt(input.value, 10);
            if (isNaN(angle)) {
                angle = 0; // Default to 0 if invalid input
            } else if (angle > 359) {
                angle = angle % 360;
            } else if (angle < 0) {
                angle = angle + Math.ceil(Math.abs(angle / 360)) * 360;
            }
            input.value = angle;
            drawIndicator(angle);
            this.rotationTouched = true; // Mark as touched
        });
    }

    _prepareContext(options) {
        checkAndSetDefaultActorFlagIfNotExist(this?.options?.actor);
        const tabs = Object.keys(settingsConfig).reduce((acc, tab) => {
            const settings = settingsConfig[tab];
            const tabSettings = {};
            for (const [key, value] of Object.entries(settings)) {
                if (key !== "icon") {
                    if (typeof value === "object" && key !== "choices") {
                        tabSettings[key] = this._retrieveNestedSettings(value);
                    } else {
                        tabSettings[key] = value;
                    }
                }
            }
            if (tab === "token") tabSettings.tokenImg = getTokenImage(this.options?.actor?.prototypeToken);
            acc[tab] = {
                id: tab,
                cssClass: tab === "critical" ? "active" : "",
                group: "primary",
                label: `${MODULE_ID}.menu.settings.tabs.${tab}`,
                icon: settingsConfig[tab].icon,
                settings: tabSettings,
            };
            return acc;
        }, {});

        const data = {
            tabs,
            actor: this.options?.actor,
            tokenImg: getTokenImage(this.options?.actor?.prototypeToken),
            buttons: [
                { type: "save", action: "save", icon: "fa-solid fa-save", label: "SETTINGS.Save" },
                {
                    type: "submit",
                    action: "submit",
                    icon: "fa-solid fa-floppy-disk-circle-arrow-right",
                    label: "pf2e-rpg-numbers.menu.settings.buttons.footer.submit",
                },
                {
                    type: "cancel",
                    action: "cancel",
                    icon: "fa-solid fa-xmark",
                    label: "pf2e-rpg-numbers.menu.settings.buttons.footer.cancel",
                },
            ],
        };
        console.log(data);

        return data;
    }

    _retrieveNestedSettings(settingGroup) {
        const result = {};
        for (const [key, value] of Object.entries(settingGroup)) {
            // if (typeof value === "string") {
            //     result[key] = handleChoicesSetting(value);
            // } else if (value.type === "number") {
            //     result[key] = getNumberSetting(value.path, value.range);
            // } else
            if (typeof value === "string" && value?.startsWith("pf2e-rpg-numbers.")) {
                result[key] = game.i18n.localize(value);
            } else if (typeof value === "string" && tabList.includes(value.match(/^([^.]*)/)?.[0] ?? "")) {
                result[key] = this.getVariable(value);
            } else if (typeof value === "object") {
                result[key] = this._retrieveNestedSettings(value);
            } else {
                result[key] = value;
            }
        }
        return result;
    }

    static async #onSubmit(event, form, formData) {
        const settings = foundry.utils.expandObject(formData.object);

        await this.saveSettings(settings);
    }

    async _processForm(submit = false) {
        const html = this.element;
        const formattedObject = this.getFormData(html);

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
        const crit = critProcessHelper(settings.critical, JSON.parse(JSON.stringify(DEFAULT_CRIT)));
        await this.options?.actor?.setFlag(MODULE_ID, "critical", crit);

        const token = DEFAULT_TOKEN;
        if (this.rotationTouched) {
            token.rotation.offset =
                Number(settings.token.rotation.offset) || getSetting("rotate-on-attack.default-rotation");
        } else if (Number(settings.token.rotation.offset) === getSetting("rotate-on-attack.default-rotation")) {
            delete token.rotation.offset;
        }

        await this.options?.actor?.setFlag(MODULE_ID, "token", token);
    }

    getVariable(path) {
        const [flag, ...remaining] = path.split(".");
        const remain = remaining.join(".");
        const obj = this.options.actor.getFlag(MODULE_ID, flag);
        const backupObj = getDefaultVariable(flag);

        return getNestedProperty(obj, remain) ?? getNestedProperty(backupObj, remain);
    }

    getFormData() {
        // Collect the form data from all inputs in the form
        const formData = new foundry.applications.ux.FormDataExtended(this.form).object;

        // // Log the gathered form data for debugging purposes
        const formattedObject = foundry.utils.expandObject(formData);
        console.log("Form Data RPG#s:", formattedObject);
        return formattedObject;
    }
}

function getNestedProperty(obj, path) {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

function getDefaultVariable(flag) {
    switch (flag) {
        case "critical":
            return DEFAULT_CRIT;
        case "token": {
            let ret = DEFAULT_TOKEN;
            ret.rotation.offset = getSetting("rotate-on-attack.default-rotation");
            return ret;
        }
        default:
            return null;
    }
}

async function checkAndSetDefaultActorFlagIfNotExist(actor) {
    const flags = actor?.flags?.[MODULE_ID];
    const flagIDs = flags ? Object?.keys(flags) : [];
    if (!flagIDs.includes("critical")) {
        await actor.setFlag(MODULE_ID, "critical", DEFAULT_CRIT);
    }
    if (!flagIDs.includes("token")) {
        await actor.setFlag(MODULE_ID, "token", DEFAULT_TOKEN);
    }
    return true;
}

function critProcessHelper(data, result) {
    const types = ["checks", "default", "saves", "strikes"];
    const succFail = ["success", "failure"];

    // Create a deep copy of the result object
    const res = JSON.parse(JSON.stringify(result));

    for (const state of succFail) {
        for (const type of types) {
            res[state][type] = critSettingsFormatted(data, state, type);
        }
    }
    return res;
}
function critSettingsFormatted(data, state, type) {
    return {
        art: data[state][type].art,
        enabled: data[state][type].enabled,
        offset: {
            x: isNaN(Number(data[state][type].offset.x)) ? 0 : Number(data[state][type].offset.x),
            y: isNaN(Number(data[state][type].offset.y)) ? 0 : Number(data[state][type].offset.y),
        },
        rotation: isNaN(Number(data[state][type].rotation)) ? 0 : Number(data[state][type].rotation),
        scale: isNaN(Number(data[state][type].scale)) ? 1 : Number(data[state][type].scale),
        sfx: data[state][type].sfx,
        type: data[state][type].type,
        volume: isNaN(Number(data[state][type].volume)) ? 100 : Number(data[state][type].volume),
    };
}
