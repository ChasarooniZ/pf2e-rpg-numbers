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
            this._processForm(html, false); // Pass 'false' to not submit the form, only save
        });
        html.find('#pf2e-rpg-submit').on('click', (event) => {
            event.preventDefault();
            this._processForm(html, true); // Pass 'true' to indicate form submission
        });
        html.find('#pf2e-rpg-cancel').on('click', (event) => {
            event.preventDefault();
            ui.notifications.warn("Settings menu closed without saving");
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
        //game.settings.get('myModuleName', 'myComplexSettingName')
        /*return {
            placeholder: true
        };*/
        return foundry.utils.mergeObject(super.getData(), {
            tabs: [
                {
                    id: "home",
                    label: "Home",
                    icon: "fa-dragon",
                    home: true,
                    settings: {
                        enabled: getSetting("enabled")
                    }
                },
                {
                    id: "rolls",
                    label: "Rolls",
                    icon: "fa-dice-d20",
                    rolls: true,
                    settings: {
                        'dmg-numbers': {
                            enabled: getSetting("dmg-enabled"),
                            whenTo: getChoicesSetting("dmg-on-apply-or-roll"),
                            fontSize: getSetting("font-size"),
                            maxFontScale: getSetting("max-font-scale"),
                            topOffset: getNumberSetting("top-offset", {
                                min: -100,
                                max: 100,
                                step: 5,
                            }),
                            showTotal: getSetting("show-total"),
                            scaleType: getChoicesSetting("number-scale-type"),
                            split: getChoicesSetting("damage-split"),
                            duration: getNumberSetting("duration", {
                                min: 0,
                                max: 10,
                                step: 0.1,
                            }),
                            waitTime: getNumberSetting("wait-time-between-numbers", {
                                min: 0,
                                max: 1000,
                                step: 1,
                            }),
                            onlyGM: getSetting("show-only-GM"),
                            scale: getNumberSetting("animation-scale", {
                                min: 0,
                                max: 2,
                                step: 0.05,
                            }),
                            jitter: getNumberSetting("jitter", {
                                min: 0,
                                max: 1,
                                step: 0.05,
                            }),
                        },
                        'check-animations': {
                            enabled: getSetting("check-enabled"),
                            colorScheme: getChoicesSetting("check-color-scheme"),
                            showOutcome: getChoicesSetting("check-outcome-result"),
                            fontSize: getSetting("check-font-size"),
                            duration: getNumberSetting("check-duration", {
                                min: 0,
                                max: 10,
                                step: 0.1,
                            }),
                            sfx: {
                                enabled: getSetting("check-animations.sfx.enabled"),
                                checkOrAttack: getChoicesSetting("check-animations.sfx.check-or-attack"),
                                options: getChoicesSetting("check-animations.sfx.options"),
                                volume: getNumberSetting("check-animations.sfx.volume", {
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                }),
                                file: {
                                    criticalSuccess: getSetting("check-animations.sfx.file.criticalSuccess"),
                                    success: getSetting("check-animations.sfx.file.success"),
                                    failure: getSetting("check-animations.sfx.file.failure"),
                                    criticalFailure: getSetting("check-animations.sfx.file.criticalFailure"),
                                }
                            },
                        },
                    }
                },
                {
                    id: "token",
                    label: "Token",
                    icon: "fa-circle-user",
                    token: true,
                    settings: {
                        tokenShake: {
                            enabled: getSetting("dmg-shake-directional-enabled"),
                            distance: getNumberSetting("tok-shake-distance", {
                                min: 1,
                                max: 100,
                                step: 1,
                            }),
                            shakes: getNumberSetting("tok-shake-shakes", {
                                min: 1,
                                max: 20,
                                step: 1,
                            }),
                            duration: getNumberSetting("tok-shake-duration", {
                                min: 0,
                                max: 2000,
                                step: 10,
                            }),
                            scaling: {
                                type: getChoicesSetting("tok-shake-scaling-type"),
                                distance: getChoicesSetting("tok-shake-scaling-distance"),
                                shakes: getChoicesSetting("tok-shake-scaling-shakes"),
                                duration: getChoicesSetting("tok-shake-scaling-duration"),
                            }
                        },
                        rotateOnAttack: {
                            enabled: getSetting("rotate-on-attack"),
                            duration: getNumberSetting("rotate-on-attack.duration", {
                                min: 0,
                                max: 2,
                                step: 0.1,
                            }),
                            scaleOnSize: getSetting("rotate-on-attack.scale-on-size"),
                        },
                        screenShake: {
                            onDamaged: {
                                enabled: getSetting("shake-enabled"),
                                duration: getNumberSetting("shake-duration", {
                                    min: 0,
                                    max: 2000,
                                    step: 10,
                                }),
                                maxIntensity: getNumberSetting("shake-intensity-max", {
                                    min: 1,
                                    max: 100,
                                    step: 1,
                                }),
                                intensityScaling: getChoicesSetting("shake-intensity-type"),
                                intensityScalingIncludeTempHP: getSetting("shake-intensity-include-temp-hp"),
                                shakeGM: getSetting("shake-gm-enabled"),
                            },
                            onAttack: {
                                enabled: getSetting("shake-on-attack.enabled"),
                                showFor: getChoicesSetting("shake-on-attack.type"),
                            }
                        },
                    }
                },
                {
                    id: "critical",
                    label: "Critical",
                    icon: "fa-explosion",
                    critical: true,
                    settings: {
                        critical: {
                            enabled: getSetting("critical.enabled"),
                            style: getChoicesSetting("critical.type"),
                            checksOrAttacks: getChoicesSetting("critical.show-on"),
                            pcOrNPC: getChoicesSetting("critical.show-on-token-type"),
                            defaultImageType: getChoicesSetting("critical.default-img"),
                            duration: getNumberSetting("critical.duration",
                                {
                                    min: 0,
                                    max: 10,
                                    step: 0.1,
                                }),
                            sound: getSetting("critical.sound"),
                            volume: getNumberSetting("critical.volume", {
                                min: 0,
                                max: 100,
                                step: 1,
                            }),
                            delay: getSetting("critical.delay"),
                        },
                    }
                },
                {
                    id: "text",
                    label: "Text",
                    icon: "fa-message-captions",
                    text: true,
                    settings: {
                        finishingMove: {
                            enabled: getSetting("finishing-move.enabled"),
                            //enabledPlayers: getSetting("finishing-move.enabled-players"),
                            keepOn: getSetting("finishing-move.keep-on"),
                            usePlayerColor: getSetting("finishing-move.use-player-color"),
                            quality: getNumberSetting("finishing-move.quality", {
                                min: 1,
                                max: 5,
                                step: 1,
                            }),
                            sound: getSetting("finishing-move.sound-effect"),
                            volume: getNumberSetting("finishing-move.sound-effect.volume", {
                                min: 1,
                                max: 100,
                                step: 1,
                            }),
                            duration: {
                                word: getNumberSetting("finishing-move.duration.word", {
                                    min: 0,
                                    max: 2000,
                                    step: 25,
                                }),
                                end: getNumberSetting("finishing-move.duration.end", {
                                    min: 0,
                                    max: 5000,
                                    step: 25,
                                }),
                            },
                        },
                        fromSoftware: {
                            eldenRing: {
                                nounVerbed: {
                                    enabled: getSetting("from-software.noun-verbed.enabled"),
                                    xpThreshold: getSetting("from-software.noun-verbed.xp-threshold"),
                                    fontSize: getNumberSetting("from-software.noun-verbed.font-size", {
                                        min: 1,
                                        max: 150,
                                        step: 1,
                                    }),
                                    sound: getSetting("from-software.noun-verbed.sound-effect"),
                                    volume: getNumberSetting("from-software.noun-verbed.sound-effect.volume", {
                                        min: 1,
                                        max: 100,
                                        step: 1,
                                    }),
                                    duration: getNumberSetting("from-software.noun-verbed.duration", {
                                        min: 0,
                                        max: 12,
                                        step: 0.1,
                                    }),
                                    text: getSetting("from-software.noun-verbed.text"),
                                },
                                death: {
                                    enabled: getSetting("from-software.death.enabled"),
                                    fontSize: getNumberSetting("from-software.death.font-size", {
                                        min: 1,
                                        max: 150,
                                        step: 1,
                                    }),
                                    sound: getSetting("from-software.death.sound-effect"),
                                    volume: getNumberSetting("from-software.death.sound-effect.volume", {
                                        min: 1,
                                        max: 100,
                                        step: 1,
                                    }),
                                    duration: getNumberSetting("from-software.death.duration", {
                                        min: 0,
                                        max: 12,
                                        step: 0.1,
                                    }),
                                    text: getSetting("from-software.death.text"),
                                }
                            }
                        },
                    }
                },
                // {
                //     id: "misc",
                //     label: "Misc",
                //     icon: "fa-gear",
                //     misc: true,
                //     settings: {
                //         debug: {
                //             enabled: getSetting("debug-mode"),
                //         }
                //     },
                // },
            ]
        })
    }

    async _updateObject(event, formData) {
        // Expand the flat form data into a nested object structure

        // Debug log for inspecting the expanded form data
        console.log("Expanded Form Data:", { expandedData, formData });
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
                dataObject[key] = html.find(`[name="${key}"]`).is(":checked");
            } else {
                dataObject[key] = value;
            }
        });

        // Log the gathered form data for debugging purposes
        console.log("Form Data:", dataObject);

        // Handle saving or submitting
        if (submit) {
            // If submitting, call _updateObject to store the data
            await this.saveSettings(dataObject);
            ui.notifications.info("Settings submitted successfully!");
            this.close();
        } else {
            // If saving, call _updateObject to store the data
            await this.saveSettings(dataObject);
            ui.notifications.info("Settings saved successfully!");
        }
    }
    async saveSettings(data) {
        const expandedData = expandObject(data);
        const settings = expandedData.settings;

        // Home settings
        updateIfChanged("enabled", settings.enabled);

        // Rolls: dmg-numbers settings
        const dmgNumbers = settings['dmg-numbers'];
        updateIfChanged("dmg-enabled", dmgNumbers.enabled);
        updateIfChanged("dmg-on-apply-or-roll", dmgNumbers.whenTo);
        updateIfChanged("font-size", dmgNumbers.fontSize);
        updateIfChanged("max-font-scale", dmgNumbers.maxFontScale);
        updateIfChanged("top-offset", dmgNumbers.topOffset);
        updateIfChanged("show-total", dmgNumbers.showTotal);
        updateIfChanged("number-scale-type", dmgNumbers.scaleType);
        updateIfChanged("damage-split", dmgNumbers.split);
        updateIfChanged("duration", dmgNumbers.duration);
        updateIfChanged("wait-time-between-numbers", dmgNumbers.waitTime);
        updateIfChanged("show-only-GM", dmgNumbers.onlyGM);
        updateIfChanged("animation-scale", dmgNumbers.scale);
        updateIfChanged("jitter", dmgNumbers.jitter);

        // Rolls: check-animations settings
        const checkAnimations = settings['check-animations'];
        updateIfChanged("check-enabled", checkAnimations.enabled);
        updateIfChanged("check-color-scheme", checkAnimations.colorScheme);
        updateIfChanged("check-outcome-result", checkAnimations.showOutcome);
        updateIfChanged("check-font-size", checkAnimations.fontSize);
        updateIfChanged("check-duration", checkAnimations.duration);
        updateIfChanged("check-animations.sfx.enabled", checkAnimations.sfx.enabled);
        updateIfChanged("check-animations.sfx.check-or-attack", checkAnimations.sfx.checkOrAttack);
        updateIfChanged("check-animations.sfx.options", checkAnimations.sfx.options);
        updateIfChanged("check-animations.sfx.volume", checkAnimations.sfx.volume);
        updateIfChanged("check-animations.sfx.file.criticalSuccess", checkAnimations.sfx.file.criticalSuccess);
        updateIfChanged("check-animations.sfx.file.success", checkAnimations.sfx.file.success);
        updateIfChanged("check-animations.sfx.file.failure", checkAnimations.sfx.file.failure);
        updateIfChanged("check-animations.sfx.file.criticalFailure", checkAnimations.sfx.file.criticalFailure);

        // Token: tokenShake settings
        const tokenShake = settings.tokenShake;
        updateIfChanged("dmg-shake-directional-enabled", tokenShake.enabled);
        updateIfChanged("tok-shake-distance", tokenShake.distance);
        updateIfChanged("tok-shake-shakes", tokenShake.shakes);
        updateIfChanged("tok-shake-duration", tokenShake.duration);
        updateIfChanged("tok-shake-scaling-type", tokenShake.scaling.type);
        updateIfChanged("tok-shake-scaling-distance", tokenShake.scaling.distance);
        updateIfChanged("tok-shake-scaling-shakes", tokenShake.scaling.shakes);
        updateIfChanged("tok-shake-scaling-duration", tokenShake.scaling.duration);

        // Token: rotateOnAttack settings
        const rotateOnAttack = settings.rotateOnAttack;
        updateIfChanged("rotate-on-attack", rotateOnAttack.enabled);
        updateIfChanged("rotate-on-attack.duration", rotateOnAttack.duration);
        updateIfChanged("rotate-on-attack.scale-on-size", rotateOnAttack.scaleOnSize);

        // Token: screenShake settings
        const screenShake = settings.screenShake;
        updateIfChanged("shake-enabled", screenShake.onDamaged.enabled);
        updateIfChanged("shake-duration", screenShake.onDamaged.duration);
        updateIfChanged("shake-intensity-max", screenShake.onDamaged.maxIntensity);
        updateIfChanged("shake-intensity-type", screenShake.onDamaged.intensityScaling);
        updateIfChanged("shake-intensity-include-temp-hp", screenShake.onDamaged.intensityScalingIncludeTempHP);
        updateIfChanged("shake-gm-enabled", screenShake.onDamaged.shakeGM);
        updateIfChanged("shake-on-attack.enabled", screenShake.onAttack.enabled);
        updateIfChanged("shake-on-attack.type", screenShake.onAttack.showFor);

        // Critical settings
        const critical = settings.critical;
        updateIfChanged("critical.enabled", critical.enabled);
        updateIfChanged("critical.type", critical.style);
        updateIfChanged("critical.show-on", critical.checksOrAttacks);
        updateIfChanged("critical.show-on-token-type", critical.pcOrNPC);
        updateIfChanged("critical.default-img", critical.defaultImageType);
        updateIfChanged("critical.duration", critical.duration);
        updateIfChanged("critical.sound", critical.sound);
        updateIfChanged("critical.volume", critical.volume);
        updateIfChanged("critical.delay", critical.delay);

        // Text: finishingMove settings
        const finishingMove = settings.finishingMove;
        updateIfChanged("finishing-move.enabled", finishingMove.enabled);
        updateIfChanged("finishing-move.keep-on", finishingMove.keepOn);
        updateIfChanged("finishing-move.use-player-color", finishingMove.usePlayerColor);
        updateIfChanged("finishing-move.quality", finishingMove.quality);
        updateIfChanged("finishing-move.sound-effect", finishingMove.sound);
        updateIfChanged("finishing-move.sound-effect.volume", finishingMove.volume);
        updateIfChanged("finishing-move.duration.word", finishingMove.duration.word);
        updateIfChanged("finishing-move.duration.end", finishingMove.duration.end);

        // Text: fromSoftware settings
        const fromSoftware = settings.fromSoftware;
        const eldenRing = fromSoftware.eldenRing;
        updateIfChanged("from-software.noun-verbed.enabled", eldenRing.nounVerbed.enabled);
        updateIfChanged("from-software.noun-verbed.xp-threshold", eldenRing.nounVerbed.xpThreshold);
        updateIfChanged("from-software.noun-verbed.font-size", eldenRing.nounVerbed.fontSize);
        updateIfChanged("from-software.noun-verbed.sound-effect", eldenRing.nounVerbed.sound);
        updateIfChanged("from-software.noun-verbed.sound-effect.volume", eldenRing.nounVerbed.volume);
        updateIfChanged("from-software.noun-verbed.duration", eldenRing.nounVerbed.duration);
        updateIfChanged("from-software.noun-verbed.text", eldenRing.nounVerbed.text);
        updateIfChanged("from-software.death.enabled", eldenRing.death.enabled);
        updateIfChanged("from-software.death.font-size", eldenRing.death.fontSize);
        updateIfChanged("from-software.death.sound-effect", eldenRing.death.sound);
        updateIfChanged("from-software.death.sound-effect.volume", eldenRing.death.volume);
        updateIfChanged("from-software.death.duration", eldenRing.death.duration);
        updateIfChanged("from-software.death.text", eldenRing.death.text);

        // Misc: debug settings
        // const debug = settings.debug;
        // updateIfChanged("debug-mode", debug.enabled);
    }

}

function getChoicesSetting(settingPath) {
    const choices = game.settings.settings.get(MODULE_ID + "." + settingPath)?.choices;
    const value = getSetting(settingPath);
    return { choices, value }
}

function getNumberSetting(settingPath, range) {
    const ret = { value: getSetting(settingPath) };
    if (range) ret.range = range;
    return ret;
}

function updateIfChanged(settingID, newValue) {
    const currentValue = getSetting(settingID);
    if (currentValue !== newValue) {
        setSetting(settingID, newValue);
    }
}