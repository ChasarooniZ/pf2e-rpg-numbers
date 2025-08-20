import { KOFI_MESSAGE, MODULE_ID, NEW_FEATURE_BY_VERSION } from "../const.js";
import { getSetting, setSetting } from "../misc.js";

const settingsConfig = {
    home: {
        icon: "fas fa-dragon",
        enabled: "enabled",
        "actor-settings": {
            "player-enabled": "actor-settings.player-enabled",
        },
    },
    rolls: {
        icon: "fas fa-dice-d20",
        "dmg-numbers": {
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
            jitter: { path: "jitter", type: "number", range: { min: 0, max: 1, step: 0.05 } },
        },
        "check-animations": {
            enabled: "check-enabled",
            colorScheme: "check-color-scheme",
            showOutcome: "check-outcome-result",
            fontSize: "check-font-size",
            duration: { path: "check-duration", type: "number", range: { min: 0, max: 10, step: 0.1 } },
            sfx: {
                enabled: "check-animations.sfx.enabled",
                checkOrAttack: "check-animations.sfx.check-or-attack",
                options: "check-animations.sfx.options",
                pcOrNPC: "check-animations.sfx.show-on-token-type",
                volume: { path: "check-animations.sfx.volume", type: "number", range: { min: 0, max: 100, step: 1 } },
                file: {
                    criticalSuccess: "check-animations.sfx.file.criticalSuccess",
                    success: "check-animations.sfx.file.success",
                    failure: "check-animations.sfx.file.failure",
                    criticalFailure: "check-animations.sfx.file.criticalFailure",
                },
            },
        }
    },
    token: {
        icon: "fas fa-circle-user",
        burstBurrow: {
            enabled: "burst-burrow.enabled",
            duration: { path: "burst-burrow.duration", type: "number", range: { min: 0, max: 300, step: 0.1 } },
            persistent: "burst-burrow.persistent",
            sizeMultiplier: {
                path: "burst-burrow.size-multiplier",
                type: "number",
                range: { min: 0, max: 3, step: 0.1 },
            },
            burrowAnimation: {
                enabled: "burst-burrow.burrow-anim.enabled",
                depth: {
                    path: "burst-burrow.burrow-anim.depth",
                    type: "number",
                    range: { min: -100, max: 0, step: 1 },
                },
            },
        },
        tokenShake: {
            enabled: "dmg-shake-directional-enabled",
            distance: { path: "tok-shake-distance", type: "number", range: { min: 1, max: 100, step: 1 } },
            shakes: { path: "tok-shake-shakes", type: "number", range: { min: 1, max: 20, step: 1 } },
            duration: { path: "tok-shake-duration", type: "number", range: { min: 0, max: 2000, step: 10 } },
            scaling: {
                type: "tok-shake-scaling-type",
            },
        },
        rotateOnAttack: {
            enabled: "rotate-on-attack",
            duration: { path: "rotate-on-attack.duration", type: "number", range: { min: 0, max: 2, step: 0.1 } },
            scaleOnSize: "rotate-on-attack.scale-on-size",
            defaultRotation: {
                path: "rotate-on-attack.default-rotation",
                type: "number",
                range: { min: -360, max: 360, step: 1 },
            },
        },
        rotateOnTarget: {
            enabled: "rotate-on-target.enabled",
            return: "rotate-on-target.return"
        },
        screenShake: {
            onDamaged: {
                enabled: "shake-enabled",
                duration: { path: "shake-duration", type: "number", range: { min: 0, max: 2000, step: 10 } },
                maxIntensity: { path: "shake-intensity-max", type: "number", range: { min: 1, max: 100, step: 1 } },
                intensityScaling: "shake-intensity-type",
                intensityScalingIncludeTempHP: "shake-intensity-include-temp-hp",
                shakeGM: "shake-gm-enabled",
            },
            onAttack: {
                enabled: "shake-on-attack.enabled",
                showFor: "shake-on-attack.type",
            },
        },
        dodgeOnMiss: {
            enabled: "dodge-on-miss.enabled",
            duration: { path: "dodge-on-miss.duration", type: "number", range: { min: 0, max: 3, step: 0.1 } },
            distance: { path: "dodge-on-miss.distance", type: "number", range: { min: 0, max: 3, step: 0.1 } },
            delay: { path: "dodge-on-miss.delay", type: "number", range: { min: 0, max: 3, step: 0.1 } },
            type: "dodge-on-miss.type",
        },
        darkestDungeon: {
            stress: {
                enabled: "darkest-dungeon.stress.enabled",
                includeTarget: "darkest-dungeon.stress.include-target",
                duration: { path: "darkest-dungeon.stress.duration", type: "number", range: { min: 0, max: 10, step: 0.1 } },
                delayPerToken: { path: "darkest-dungeon.stress.delay-per-token", type: "number", range: { min: 0, max: 1000, step: 1 } },
                volume: { path: "darkest-dungeon.stress.volume", type: "number", range: { min: 0, max: 100, step: 5 } },
                friendly: {
                    skill: {
                        crit: "darkest-dungeon.stress.friendly.skill.crit",
                        critFail: "darkest-dungeon.stress.friendly.skill.crit-fail"
                    },
                    save: {
                        crit: "darkest-dungeon.stress.friendly.save.crit",
                        critFail: "darkest-dungeon.stress.friendly.save.crit-fail"
                    },
                    attack: {
                        crit: "darkest-dungeon.stress.friendly.attack.crit",
                        critFail: "darkest-dungeon.stress.friendly.attack.crit-fail"
                    },
                },
                hostile: {
                    skill: {
                        crit: "darkest-dungeon.stress.hostile.skill.crit",
                        critFail: "darkest-dungeon.stress.hostile.skill.crit-fail"
                    },
                    save: {
                        crit: "darkest-dungeon.stress.hostile.save.crit",
                        critFail: "darkest-dungeon.stress.hostile.save.crit-fail"
                    },
                    attack: {
                        crit: "darkest-dungeon.stress.hostile.attack.crit",
                        critFail: "darkest-dungeon.stress.hostile.attack.crit-fail"
                    },
                }
            }
        },
    },
    critical: {
        icon: "fas fa-explosion",
        critical: {
            enabled: "critical.enabled",
            style: "critical.type",
            checksOrAttacks: "critical.show-on",
            pcOrNPC: "critical.show-on-token-type",
            defaultImageType: "critical.default-img",
            duration: { path: "critical.duration", type: "number", range: { min: 0, max: 10, step: 0.1 } },
            sound: "critical.sound",
            volume: { path: "critical.volume", type: "number", range: { min: 0, max: 100, step: 1 } },
            delay: "critical.delay",
        },
    },
    text: {
        icon: "fas fa-message-captions",
        finishingMove: {
            enabled: "finishing-move.enabled",
            playerEnabled: "finishing-move.enabled-players",
            keepOn: "finishing-move.keep-on",
            usePlayerColor: "finishing-move.use-player-color",
            quality: { path: "finishing-move.quality", type: "number", range: { min: 1, max: 5, step: 1 } },
            sound: "finishing-move.sound-effect",
            volume: {
                path: "finishing-move.sound-effect.volume",
                type: "number",
                range: { min: 1, max: 100, step: 1 },
            },
            duration: {
                word: { path: "finishing-move.duration.word", type: "number", range: { min: 0, max: 2000, step: 25 } },
                end: { path: "finishing-move.duration.end", type: "number", range: { min: 0, max: 5000, step: 25 } },
            },
        },
        fromSoftware: {
            eldenRing: {
                nounVerbed: {
                    enabled: "from-software.noun-verbed.enabled",
                    xpThreshold: "from-software.noun-verbed.xp-threshold",
                    fontSize: {
                        path: "from-software.noun-verbed.font-size",
                        type: "number",
                        range: { min: 1, max: 150, step: 1 },
                    },
                    sound: "from-software.noun-verbed.sound-effect",
                    volume: {
                        path: "from-software.noun-verbed.sound-effect.volume",
                        type: "number",
                        range: { min: 1, max: 100, step: 1 },
                    },
                    duration: {
                        path: "from-software.noun-verbed.duration",
                        type: "number",
                        range: { min: 0, max: 12, step: 0.1 },
                    },
                    text: "from-software.noun-verbed.text",
                },
                death: {
                    enabled: "from-software.death.enabled",
                    fontSize: {
                        path: "from-software.death.font-size",
                        type: "number",
                        range: { min: 1, max: 150, step: 1 },
                    },
                    sound: "from-software.death.sound-effect",
                    volume: {
                        path: "from-software.death.sound-effect.volume",
                        type: "number",
                        range: { min: 1, max: 100, step: 1 },
                    },
                    duration: {
                        path: "from-software.death.duration",
                        type: "number",
                        range: { min: 0, max: 12, step: 0.1 },
                    },
                    text: "from-software.death.text",
                    type: "from-software.death.type",
                },
            },
        },
        vs: {
            combatStart: "vs.combat-start",
            showName: "vs.show-name",
            duration: { path: "vs.duration", type: "number", range: { min: 0, max: 20, step: 0.25 } },
        },
    },
};

export class SettingsConfigForm extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.api.ApplicationV2
) {
    // lots of other things...
    constructor(options) {
        super(options);
    }

    static DEFAULT_OPTIONS = {
        id: "pf2e-rpg-numbers-settings-form",
        form: {
            handler: SettingsConfigForm.#onSubmit,
            closeOnSubmit: true,
        },
        popOut: true,
        position: {
            width: 600,
            height: 600,
        },
        tag: "form",
        window: {
            icon: "fas fa-dragon",
            title: "pf2e-rpg-numbers.menu.settings.title",
            contentClasses: ["standard-form", "flexcol"],
            controls: [
                {
                    action: "kofi",
                    label: KOFI_MESSAGE[Math.floor(Math.random() * KOFI_MESSAGE.length)],
                    icon: "fa-solid fa-mug-hot fa-beat-fade",
                    onClick: () => window.open("https://ko-fi.com/chasarooni", "_blank"),
                },
            ],
        },
        tabs: [{ navSelector: ".tabs", contentSelector: ".content", initial: "tab1" }],
        actions: {
            save: SettingsConfigForm.save,
            submit: SettingsConfigForm.submit,
            cancel: SettingsConfigForm.cancel,
            import: SettingsConfigForm.import,
            export: SettingsConfigForm.export,
        },
    };

    static PARTS = {
        tabs: {
            // Foundry-provided generic template
            template: "templates/generic/tab-navigation.hbs",
        },
        main: {
            template: "./modules/pf2e-rpg-numbers/templates/settings/pf2e-rpg-settings-config.hbs",
            scrollable: [".tab.critical", ".tab.token"],
            classes: ["pf2e-rpg-numbers-main", "pf2e-rpg-config-form"],
        },
        footer: {
            template: "templates/generic/form-footer.hbs",
            // classes: ["rpg-numbers-footer"]
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

    _onRender(context, options) {
        // This should be placed in your Dialog's activateListeners method or after rendering.
        const links = this.element.querySelectorAll(".toc-link");
        for (const link of links) {
            link.addEventListener("click", function (event) {
                const tabName = $(this).data("tab");
                const targetId = $(this).data("target");

                // Activate the correct tab (assuming Foundry's Tabs API)
                const tab = $("form#pf2e-rpg-numbers-settings-form").find(".tabs").find(`a[data-tab="${tabName}"]`)?.[0]
                if (tab) {
                    tab.click()
                }

                // Wait for the tab to become active before scrolling
                setTimeout(() => {
                    const target = $(".pf2e-rpg-config-form").find(`h4#${targetId}`)?.[0];
                    if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }, 400); // Adjust timeout if needed for your tab system

            });
        }
    }

    _prepareContext(options) {
        const tabs = Object.keys(settingsConfig).reduce((acc, tab) => {
            const settings = settingsConfig[tab];
            const tabSettings = {};
            if (settings && typeof settings === "object") {
                for (const [key, value] of Object.entries(settings)) {
                    if (key !== "icon") {
                        if (typeof value === "string") {
                            tabSettings[key] = getSetting(value);
                        } else if (value.type === "number") {
                            tabSettings[key] = getNumberSetting(value?.path, value?.range);
                        } else if (typeof value === "object") {
                            tabSettings[key] = this._retrieveNestedSettings(value);
                        }
                    }
                }
            }
            acc[tab] = {
                id: tab,
                cssClass: tab === "home" ? "active" : "",
                label: game.i18n.localize(`${MODULE_ID}.menu.settings.tabs.${tab}`),
                group: "primary",
                icon: settingsConfig[tab].icon,
                [tab]: true,
                settings: tabSettings,
            };

            return acc;
        }, {});
        console.log({ tabs });

        const disabled = {
            burstBurrow: !Sequencer.Database.getPathsUnder("jb2a.burrow.out").length,
        };

        let newFeatures = getSetting('new-features');
        const currentVersion = game.modules.get(MODULE_ID).version;
        if (foundry.utils.isNewerVersion(currentVersion, newFeatures?.version ?? 0)) {
            newFeatures = NEW_FEATURE_BY_VERSION?.[currentVersion] ?? {};
            newFeatures.version = currentVersion;
            setSetting('new-features');
        }

        // Menu SFX
        new Sequence()
            .sound()
            .file("modules/pf2e-rpg-numbers/resources/sounds/ui/fantasy-1/SkywardHero_UI_1_Open.ogg")
            .volume(0.25)
            .play({ local: true })

        return {
            tabs,
            version: game?.modules?.get(MODULE_ID)?.version,
            disabled,
            new: newFeatures,
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

    static async #onSubmit(event, form, formData) {
        const settings = foundry.utils.expandObject(formData.object);

        await this.saveSettings(settings);
    }

    async _processForm(submit = false) {
        const html = this.element;
        const formattedObject = this.getFormData(html);

        // Handle saving or submitting
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

    getFormData() {
        // Collect the form data from all inputs in the form
        const formData = new foundry.applications.ux.FormDataExtended(this.form).object;

        // // Log the gathered form data for debugging purposes
        const formattedObject = foundry.utils.expandObject(formData);
        console.log("Form Data RPG#s:", formattedObject);
        return formattedObject;
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
                if (key !== "icon") {
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
        return { choices, value };
    }
    return value;
}

function getNumberSetting(settingPath, range) {
    const ret = { value: Number(getSetting(settingPath)) };
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
