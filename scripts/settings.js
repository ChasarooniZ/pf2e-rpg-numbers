import { localize, MODULE_ID, registerSetting } from "./helpers/misc.js";
import { SettingsConfigForm } from "./helpers/forms/settingsConfigForm.js";

Hooks.on("init", () => {
    loadTemplates([
        `modules/pf2e-rpg-numbers/templates/settings/pf2e-rpg-settings-config.hbs`,
        'modules/pf2e-rpg-numbers/templates/settings/tabs/home.hbs',
        'modules/pf2e-rpg-numbers/templates/settings/tabs/critical.hbs',
        'modules/pf2e-rpg-numbers/templates/settings/tabs/misc.hbs',
        'modules/pf2e-rpg-numbers/templates/settings/tabs/rolls.hbs',
        'modules/pf2e-rpg-numbers/templates/settings/tabs/text.hbs',
        'modules/pf2e-rpg-numbers/templates/settings/tabs/token.hbs'
    ])
    Hooks.on("renderSettingsConfig", renderSettingsConfig);
    //TODO finalize this
    // game.settings.registerMenu(mod, 'settingsMenu', {
    //     name: game.i18n.localize("CCSS.settings.settingsMenu.name"),
    //     label: game.i18n.localize("CCSS.settings.settingsMenu.label"),
    //     icon: "fas fa-wrench",
    //     type: SettingsForm,
    //     restricted: false
    // });
    game.settings.registerMenu(MODULE_ID, "pf2eRPGSettingsMenu", {
        name: "PF2e RPG Settings",
        label: "PF2e RPG Settings",      // The text label used in the button
        hint: "Settings for the PF2e RPG settings",
        icon: "fas fa-dragon",               // A Font Awesome icon used in the submenu button
        type: SettingsConfigForm,   // A FormApplication subclass
        restricted: true                   // Restrict this submenu to gamemaster only?
    });

    registerSetting("", "enabled", {
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting("dmg-numbers", "dmg-enabled", {
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting("dmg-numbers", "dmg-on-apply-or-roll", {
        desc: "on-apply-or-roll",
        scope: "world",
        config: false,
        default: "roll",
        type: String,
        choices: ["apply", "roll"],
    });

    registerSetting("dmg-numbers", "font-size", {
        desc: "font-size",
        scope: "world",
        config: false,
        default: 20,
        type: Number,
    });

    registerSetting("dmg-numbers", "max-font-scale", {
        desc: "max-font-scale",
        scope: "world",
        config: false,
        default: 3,
        type: Number,
    });

    registerSetting("dmg-numbers", "top-offset", {
        desc: "top-offset",
        scope: "world",
        config: false,
        default: -25,
        range: {
            min: -100,
            max: 100,
            step: 5,
        },
        type: Number,
    });

    registerSetting("dmg-numbers", "show-total", {
        desc: "show-total",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting("dmg-numbers", "number-scale-type", {
        desc: "number-scale-type",
        scope: "world",
        config: false,
        default: "percentMaxHealth",
        type: String,
        choices: ["percentRemainingHealth", "percentMaxHealth", "none"],
    });

    registerSetting("dmg-numbers", "damage-split", {
        desc: "damage-split",
        scope: "world",
        config: false,
        default: "by-damage-type",
        type: String,
        choices: ["none", "by-damage-type", "all"],
    });

    registerSetting("dmg-numbers", "duration", {
        desc: "duration",
        scope: "world",
        config: false,
        default: 2,
        range: {
            min: 0,
            max: 10,
            step: 0.1,
        },
        type: Number,
    });
    registerSetting("dmg-numbers", "wait-time-between-numbers", {
        desc: "wait-time-between-numbers",
        scope: "world",
        config: false,
        default: 100,
        range: {
            min: 0,
            max: 1000,
            step: 1,
        },
        type: Number,
    });

    registerSetting("dmg-numbers", "show-only-GM", {
        desc: "show-only-GM",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting("dmg-numbers", "animation-scale", {
        desc: "animation-scale",
        scope: "world",
        config: false,
        default: 1,
        range: {
            min: 0,
            max: 2,
            step: 0.05,
        },
        type: Number,
    });

    registerSetting("dmg-numbers", "jitter", {
        desc: "jitter",
        scope: "world",
        config: false,
        default: 0,
        range: {
            min: 0,
            max: 1,
            step: 0.05,
        },
        type: Number,
    });

    //Check Animation Settings
    registerSetting("check-animations", "check-enabled", {
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting("check-animations", "check-color-scheme", {
        desc: "color-scheme",
        scope: "world",
        config: false,
        default: "default",
        type: String,
        choices: ["default", "dark"],
    });

    registerSetting("check-animations", "check-outcome-result", {
        desc: "outcome-result",
        scope: "world",
        config: false,
        default: "outcome-except-combat-crits",
        type: String,
        choices: ["numbers", "outcome-except-combat-crits", "outcome"],
    });

    registerSetting("check-animations", "check-font-size", {
        desc: "font-size",
        scope: "world",
        config: false,
        default: 30,
        type: Number,
    });

    registerSetting("check-animations", "check-duration", {
        desc: "duration",
        scope: "world",
        config: false,
        default: 2,
        range: {
            min: 0,
            max: 10,
            step: 0.1,
        },
        type: Number,
    });

    //Check SFX
    registerSetting("check-animations", "check-animations.sfx.enabled", {
        desc: "sfx.enabled",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting("check-animations", "check-animations.sfx.check-or-attack", {
        desc: "sfx.check-or-attack",
        scope: "world",
        config: false,
        default: !game?.modules?.get("pf2e-jb2a-macros")?.active ? "both" : "checks",
        type: String,
        choices: ["both", "attacks", "checks"],
    });

    registerSetting("check-animations", "check-animations.sfx.options", {
        desc: "sfx.options",
        scope: "world",
        config: false,
        default: "all",
        type: String,
        choices: ["none", "all", "success-or-fail", "crits-only"],
    });

    registerSetting("check-animations", "check-animations.sfx.volume", {
        desc: "sfx.volume",
        scope: "world",
        config: false,
        default: 50,
        range: {
            min: 0,
            max: 100,
            step: 1,
        },
        type: Number,
    });

    registerSetting("check-animations", "check-animations.sfx.file.criticalSuccess", {
        desc: "sfx.file.criticalSuccess",
        scope: "world",
        config: false,
        default: "modules/pf2e-rpg-numbers/resources/sounds/checks/success_1.mp3",
        type: String,
        filePicker: "audio",
    });

    registerSetting("check-animations", "check-animations.sfx.file.success", {
        desc: "sfx.file.success",
        scope: "world",
        config: false,
        default: "modules/pf2e-rpg-numbers/resources/sounds/checks/correct-answer-tone.ogg",
        type: String,
        filePicker: "audio",
    });

    registerSetting("check-animations", "check-animations.sfx.file.failure", {
        desc: "sfx.file.failure",
        scope: "world",
        config: false,
        default: "modules/pf2e-rpg-numbers/resources/sounds/checks/Jpn_L_drum1.mp3",
        type: String,
        filePicker: "audio",
    });

    registerSetting("check-animations", "check-animations.sfx.file.criticalFailure", {
        desc: "sfx.file.criticalFailure",
        scope: "world",
        config: false,
        default: "modules/pf2e-rpg-numbers/resources/sounds/checks/negative-answer-lose.ogg",
        type: String,
        filePicker: "audio",
    });

    //Screen Shake Settings
    registerSetting("screen-shake", "shake-enabled", {
        desc: "enabled",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting("screen-shake", "shake-duration", {
        desc: "duration",
        scope: "world",
        config: false,
        default: 250,
        range: {
            min: 0,
            max: 2000,
            step: 10,
        },
        type: Number,
    });

    registerSetting("screen-shake", "shake-intensity-max", {
        desc: "intensity-max",
        scope: "world",
        config: false,
        default: 35,
        range: {
            min: 1,
            max: 100,
            step: 1,
        },
        type: Number,
    });

    registerSetting("screen-shake", "shake-intensity-type", {
        desc: "intensity-type",
        scope: "world",
        config: false,
        default: "%-current-hp",
        type: String,
        choices: ["max", "%-current-hp", "%-max-hp"],
    });

    registerSetting("screen-shake", "shake-intensity-include-temp-hp", {
        desc: "intensity-include-temp-hp",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting("screen-shake", "shake-gm-enabled", {
        desc: "gm-enabled",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    //Token Damage Shake
    registerSetting("token-dmg-shake", "dmg-shake-directional-enabled", {
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting("token-dmg-shake", "tok-shake-distance", {
        desc: "distance",
        scope: "world",
        config: false,
        default: 20,
        range: {
            min: 1,
            max: 100,
            step: 1,
        },
        type: Number,
    });

    registerSetting("token-dmg-shake", "tok-shake-shakes", {
        desc: "shakes",
        scope: "world",
        config: false,
        default: 7,
        range: {
            min: 1,
            max: 20,
            step: 1,
        },
        type: Number,
    });

    registerSetting("token-dmg-shake", "tok-shake-duration", {
        desc: "duration",
        scope: "world",
        config: false,
        default: 500,
        range: {
            min: 0,
            max: 2000,
            step: 10,
        },
        type: Number,
    });

    registerSetting("token-dmg-shake", "tok-shake-scaling-type", {
        desc: "scaling.type",
        scope: "world",
        config: false,
        default: "no",
        type: String,
        choices: ["no", "%-current-hp", "%-max-hp"],
    });

    registerSetting("token-dmg-shake", "tok-shake-scaling-distance", {
        desc: "scaling.distance",
        scope: "world",
        config: false,
        default: "no",
        type: String,
        choices: ["no", "max", "mid"],
    });

    registerSetting("token-dmg-shake", "tok-shake-scaling-shakes", {
        desc: "scaling.shakes",
        scope: "world",
        config: false,
        default: "no",
        type: String,
        choices: ["no", "max", "mid"],
    });

    registerSetting("token-dmg-shake", "tok-shake-scaling-duration", {
        desc: "scaling.duration",
        scope: "world",
        config: false,
        default: "no",
        type: String,
        choices: ["no", "max", "mid"],
    });

    //Shake Screen on attack
    registerSetting("shake-on-attack", "shake-on-attack.enabled", {
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting("shake-on-attack", "shake-on-attack.type", {
        desc: "type",
        scope: "world",
        config: false,
        default: false,
        type: String,
        choices: ["both", "gm", "players"],
    });

    //Rotate on Attack
    registerSetting("rotate-on-attack", "rotate-on-attack", {
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
        requiresReload: true,
    });

    registerSetting("rotate-on-attack", "rotate-on-attack.duration", {
        desc: "duration",
        scope: "world",
        config: false,
        default: 0.5,
        range: {
            min: 0,
            max: 2,
            step: 0.1,
        },
        type: Number,
    });

    registerSetting("rotate-on-attack", "rotate-on-attack.scale-on-size", {
        desc: "scale-on-size",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    //Critical Hit
    registerSetting("critical", "critical.enabled", {
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    //TODO keep in normal settings
    registerSetting("critical", "critical.player-enabled", {
        desc: "player-enabled",
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
        onChange: (value) => {
            game.user.setFlag(MODULE_ID, "critEnabled", value);
        },
    });

    registerSetting("critical", "critical.type", {
        desc: "type",
        scope: "world",
        config: false,
        default: "persona",
        type: String,
        choices: ["persona", "fire-emblem"],
    });

    registerSetting("critical", "critical.show-on", {
        desc: "show-on",
        scope: "world",
        config: false,
        default: "attacks",
        type: String,
        choices: ["attacks", "checks", "both"],
    });

    registerSetting("critical", "critical.show-on-token-type", {
        desc: "show-on-token-type",
        scope: "world",
        config: false,
        default: "pc+npc",
        type: String,
        choices: ["pc", "npc", "pc+npc"],
    });

    registerSetting("critical", "critical.default-img", {
        desc: "default-img",
        scope: "world",
        config: false,
        default: "pc-tok-npc-tok",
        type: String,
        choices: ["pc-tok-npc-tok", "pc-act-npc-act", "pc-tok-npc-act", "pc-act-npc-tok"],
    });

    registerSetting("critical", "critical.duration", {
        desc: "duration",
        scope: "world",
        config: false,
        default: 1.5,
        range: {
            min: 0,
            max: 10,
            step: 0.1,
        },
        type: Number,
    });

    registerSetting("critical", "critical.sound", {
        desc: "sound",
        scope: "world",
        config: false,
        default: "modules/pf2e-rpg-numbers/resources/sounds/swoosh-universfield.mp3",
        type: String,
        filePicker: "audio",
    });

    registerSetting("critical", "critical.volume", {
        desc: "volume",
        scope: "world",
        config: false,
        default: 50,
        range: {
            min: 0,
            max: 100,
            step: 1,
        },
        type: Number,
    });

    registerSetting("critical", "critical.delay", {
        desc: "delay",
        scope: "world",
        config: false,
        default: 0,
        type: Number,
    });

    //Finishing Move
    registerSetting("finishing-move", "finishing-move.enabled", {
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting("finishing-move", "finishing-move.enabled-players", {
        desc: "enabled-players",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
        requiresReload: true,
    });

    registerSetting("finishing-move", "finishing-move.keep-on", {
        desc: "keep-on",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting("finishing-move", "finishing-move.use-player-color", {
        desc: "use-player-color",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting("finishing-move", "finishing-move.quality", {
        desc: "quality",
        scope: "world",
        config: false,
        default: 2,
        range: {
            min: 1,
            max: 5,
            step: 1,
        },
        type: Number,
    });

    registerSetting("finishing-move", "finishing-move.sound-effect", {
        desc: "sound-effect",
        scope: "world",
        config: false,
        type: String,
        default: "modules/pf2e-rpg-numbers/resources/sounds/Deep_Impact_(Speedenza).ogg",
        filePicker: "audio",
    });

    registerSetting("finishing-move", "finishing-move.sound-effect.volume", {
        desc: "sound-effect.volume",
        scope: "world",
        config: false,
        default: 40,
        range: {
            min: 0,
            max: 100,
            step: 1,
        },
        type: Number,
    });

    registerSetting("finishing-move", "finishing-move.duration.word", {
        desc: "duration.word",
        scope: "world",
        config: false,
        default: 200,
        range: {
            min: 0,
            max: 2000,
            step: 25,
        },
        type: Number,
    });

    registerSetting("finishing-move", "finishing-move.duration.end", {
        desc: "duration.end",
        scope: "world",
        config: false,
        default: 1000,
        range: {
            min: 0,
            max: 5000,
            step: 25,
        },
        type: Number,
    });

    //From Software Text
    const fromSoftOptions = ["noun-verbed", "death"];
    // Noun Verbed
    fromSoftOptions.forEach(option => {
        registerSetting(`from-software.${option}`, `from-software.${option}.enabled`, {
            desc: "enabled",
            scope: "world",
            config: false,
            default: false,
            type: Boolean,
        });
        if (option === 'death') {
            registerSetting(`from-software.${option}`, `from-software.${option}.type`, {
                desc: "type",
                scope: "world",
                config: false,
                default: 'elden-ring',
                type: String,
                choices: ["elden-ring", 'sekiro']
            });
        }

        if (option === 'noun-verbed') {
            registerSetting(`from-software.noun-verbed`, `from-software.noun-verbed.xp-threshold`, {
                desc: "xp-threshold",
                scope: "world",
                config: false,
                default: 120,
                type: Number,
            });
        }
        registerSetting(`from-software.${option}`, `from-software.${option}.font-size`, {
            desc: "font-size",
            scope: "world",
            config: false,
            default: 52,
            range: {
                min: 1,
                max: 150,
                step: 1,
            },
            type: Number,
        });

        registerSetting(`from-software.${option}`, `from-software.${option}.sound-effect`, {
            desc: "sound-effect",
            scope: "world",
            config: false,
            type: String,
            default: option === 'death' ? "modules/pf2e-rpg-numbers/resources/sounds/eldenRingDeath.ogg" : "modules/pf2e-rpg-numbers/resources/sounds/eldenRingVictoryReverb.ogg",
            filePicker: "audio",
        });

        registerSetting(`from-software.${option}`, `from-software.${option}.sound-effect.volume`, {
            desc: "sound-effect.volume",
            scope: "world",
            config: false,
            default: 40,
            range: {
                min: 0,
                max: 100,
                step: 1,
            },
            type: Number,
        });

        registerSetting(`from-software.${option}`, `from-software.${option}.duration`, {
            desc: "duration",
            scope: "world",
            config: false,
            default: 6.5,
            range: {
                min: 0,
                max: 12,
                step: 0.1,
            },
            type: Number,
        });

        registerSetting(`from-software.${option}`, `from-software.${option}.text`, {
            desc: "text",
            scope: "world",
            config: false,
            default: option === 'death' ? 'You Died' : 'Enemy Felled',
            type: String,
        });
    })


    registerSetting("", "debug-mode", {
        desc: "debug-mode",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register("pf2e-rpg-numbers", "last-version", {
        scope: "world",
        config: false,
        default: "0.0.0",
        type: String,
    });

    game.keybindings.register(MODULE_ID, "activateFinishingMove", {
        name: localize("keybinds.activate-finishing-move.name"),
        hint: localize("keybinds.activate-finishing-move.hint"),
        editable: [
            {
                key: "Q",
                modifiers: ["Shift"],
            },
        ],
        onDown: () => {
            if (!game.user.getFlag(MODULE_ID, "finishingMoveActive")) {
                document
                    .querySelector(
                        `li.control-tool.toggle[aria-label="${game.i18n.localize(
                            "pf2e-rpg-numbers.controls.finishing-move.name"
                        )}"]`
                    )
                    .click();
            }
        },
        onUp: () => { },
        restricted: false,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
    });
});


/**
 * Credit to PF2e Token Action HUD for the code on this to reference, helped a tooon
 * @param {} _
 * @param {*} html
 */
export function renderSettingsConfig(_, html) {
    // Find the tab related to the module
    const moduleTab = html.find(`.tab[data-tab=${MODULE_ID}]`);

    // Helper function to add settings groups before a specified key
    function addSettingsGroup(headerKey, settingID, elementType = "h3") {
        // Retrieve the localized name for the setting
        const localizedName = game.i18n.localize(`pf2e-rpg-numbers.module-settings.headers.${headerKey}`);
        // Find the target element and add the localized name before it
        moduleTab
            .find(`[name="${MODULE_ID}.${settingID}"]`)
            .closest(".form-group")
            .before(`<${elementType}>${localizedName}</${elementType}>`);
    }

    // Adding settings groups for various options
    addSettingsGroup("dmg-numbers", "dmg-enabled");
    addSettingsGroup("check-animations", "check-enabled");
    addSettingsGroup("screen-shake", "shake-enabled");
    addSettingsGroup("shake-on-attack", "shake-on-attack.enabled");
    addSettingsGroup("finishing-move.title", "finishing-move.enabled");
    addSettingsGroup("token-dmg-shake.title", "dmg-shake-directional-enabled");
    addSettingsGroup("token-dmg-shake.scaling", "tok-shake-scaling-type", "h4");
    addSettingsGroup("rotate-on-attack", "rotate-on-attack");
    addSettingsGroup("critical", "critical.enabled");
    addSettingsGroup("fromSoftware.elden-ring.title", 'from-software.noun-verbed.enabled');
    addSettingsGroup("fromSoftware.elden-ring.noun-verbed", 'from-software.noun-verbed.enabled', 'h4');
    addSettingsGroup("fromSoftware.elden-ring.death", 'from-software.death.enabled', 'h4')

    // Adding settings group for debug mode
    addSettingsGroup("debug", "debug-mode");
}