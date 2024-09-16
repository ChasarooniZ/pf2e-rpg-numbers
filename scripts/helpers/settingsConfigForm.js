import { getSetting } from "./misc";

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
            template: `modules/pf2e-rpg-numbers/templates/pf2e-rpg-settings-config.hbs`,
            id: 'pf2e-rpg-numbers-settings-form',
            title: 'Pf2e RPG #s Config Menu',
            width: 800,
            height: 'auto'
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
            settings: {
                enabled: getSetting("enabled"),
                dmgNumbers: {
                    enabled: getSetting("dmg-enabled"),
                    whenTo: getSetting("dmg-on-apply-or-roll"),
                    fontSize: getSetting("font-size"),
                    maxFontScale: getSetting("max-font-scale"),
                    fontSize: getSetting("font-size"),
                    topOffset: getSetting("top-offset"),
                    showTotal: getSetting("show-total"),
                    scaleType: getSetting("number-scale-type"),
                    split: getSetting("damage-split"),
                    duration: getSetting("duration"),
                    waitTime: getSetting("wait-time-between-numbers"),
                    onlyGM: getSetting("show-only-GM"),
                    scale: getSetting("animation-scale"),
                    jitter: getSetting("jitter"),
                },
                checkNumbers: {
                    enabled: getSetting("check-enabled"),
                    colorScheme: getSetting("check-color-scheme"),
                    showOutCome: getSetting("check-outcome-result"),
                    fontSize: getSetting("check-font-size"),
                    duration: getSetting("check-duration"),
                    sfx: {
                        enabled: getSetting("check-animations.sfx.enabled"),
                        checkOrAttack: getSetting("check-animations.sfx.check-or-attack"),
                        options: getSetting("check-animations.sfx.options"),
                        volume: getSetting("check-animations.sfx.volume"),
                        criticalSuccess: getSetting("check-animations.sfx.file.criticalSuccess"),
                        success: getSetting("check-animations.sfx.file.success"),
                        failure: getSetting("check-animations.sfx.file.failure"),
                        criticalFailure: getSetting("check-animations.sfx.file.criticalFailure"),
                    },
                },
                screenShake: {
                    onDamaged: {
                        enabled: getSetting("shake-enabled"),
                        duration: getSetting("shake-duration"),
                        maxIntensity: getSetting("shake-intensity-max"),
                        intensityScaling: getSetting("shake-intensity-type"),
                        intensityScalingIncludeTempHP: getSetting("shake-intensity-include-temp-hp"),
                        shakeGM: getSetting("shake-gm-enabled"),
                    },
                    onAttack: {
                        enabled: getSetting("shake-on-attack.enabled"),
                        showFor: getSetting("shake-on-attack.type"),
                    }
                },
                tokenShake: {
                    enabled: getSetting("dmg-shake-directional-enabled"),
                    distance: getSetting("tok-shake-distance"),
                    shakes: getSetting("tok-shake-shakes"),
                    duration: getSetting("tok-shake-duration"),
                    scaling: {
                        type: getSetting("tok-shake-scaling-type"),
                        distance: getSetting("tok-shake-scaling-distance"),
                        shakes: getSetting("tok-shake-scaling-shakes"),
                        duration: getSetting("tok-shake-scaling-duration"),
                    }
                },
                rotateOnAttack: {
                    enabled: getSetting("rotate-on-attack"),
                    duration: getSetting("rotate-on-attack.duration"),
                    scaleOnSize: getSetting("rotate-on-attack.scale-on-size"),
                },
                critical: {
                    critical: getSetting("critical.enabled"),
                    style: getSetting("critical.type"),
                    checksOrAttacks: getSetting("critical.show-on"),
                    pcOrNPC: getSetting("critical.show-on-token-type"),
                    defImage: getSetting("critical.default-img"),
                    duration: getSetting("critical.duration"),
                    sound: getSetting("critical.sound"),
                    volume: getSetting("critical.volume"),
                    delay: getSetting("critical.delay"),
                },
                finishingMove: {
                    enabled: getSetting("finishing-move.enabled"),
                    enabledPlayers: getSetting("finishing-move.enabled-players"),
                    keepOn: getSetting("finishing-move.keep-on"),
                    usePlayerColor: getSetting("finishing-move.use-player-color"),
                    quality: getSetting("finishing-move.quality"),
                    sound: getSetting("finishing-move.sound-effect"),
                    volume: getSetting("finishing-move.sound-effect.volume"),
                    duration: {
                        word: getSetting("finishing-move.duration.word"),
                        end: getSetting("finishing-move.duration.end"),
                    },
                },
                fromSoftware: {
                    eldenRing: {
                        nounVerbed: {
                            enabled: getSetting("from-software.nounVerbed.enabled"),
                            fontSize: getSetting("from-software.nounVerbed.font-size"),
                            sound: getSetting("from-software.nounVerbed.sound-effect"),
                            volume: getSetting("from-software.nounVerbed.sound-effect.volume"),
                            duration: getSetting("from-software.nounVerbed.duration"),
                            text: getSetting("text"),
                        },
                        death: {
                            enabled: getSetting("from-software.death.enabled"),
                            fontSize: getSetting("from-software.death.font-size"),
                            sound: getSetting("from-software.death.sound-effect"),
                            volume: getSetting("from-software.death.sound-effect.volume"),
                            duration: getSetting("from-software.death.duration"),
                            text: getSetting("from-software.death.text"),
                        }
                    }
                },
                debug: {
                    enabled: getSetting("debug-mode"),
                }
            },
            tabs: [
                {
                    id: "home",
                    label: "Home",
                    icon: "fa-dragon",
                    home: true
                },
                {
                    id: "rolls",
                    label: "Rolls",
                    icon: "fa-dice-d20",
                    rolls: true
                },
                {
                    id: "token",
                    label: "Token",
                    icon: "fa-circle-user",
                    token: true
                },
                {
                    id: "critical",
                    label: "Critical",
                    icon: "fa-explosion",
                    critical: true
                },
                {
                    id: "text",
                    label: "Text",
                    icon: "fa-message-captions",
                    text: true
                },
                {
                    id: "misc",
                    label: "Misc",
                    icon: "fa-gear",
                    misc: true
                },
            ]
        })
    }

    async _updateObject(event, formData) {
        const data = expandObject(formData);
        //game.settings.set('myModuleName', 'myComplexSettingName', data);
    }
}