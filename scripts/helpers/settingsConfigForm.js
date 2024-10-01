import { getSetting, MODULE_ID } from "./misc.js";

export class SettingsConfigForm extends FormApplication {
    // lots of other things...
    constructor(options) {
        super(options);
        this.options = foundry.utils.mergeObject(this.constructor.defaultOptions, options);
    }


    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
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
                {
                    id: "misc",
                    label: "Misc",
                    icon: "fa-gear",
                    misc: true,
                    settings: {
                        debug: {
                            enabled: getSetting("debug-mode"),
                        }
                    },
                },
            ]
        })
    }

    async _updateObject(event, formData) {
        const data = expandObject(formData);
        //game.settings.set('myModuleName', 'myComplexSettingName', data);
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