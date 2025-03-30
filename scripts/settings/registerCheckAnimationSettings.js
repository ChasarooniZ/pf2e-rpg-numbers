import { registerSetting } from "../helpers/misc.js";

export function registerCheckAnimationSettings() {
    registerSetting({
        category: "check-animations",
        id: "check-enabled",
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: "check-animations",
        id: "check-color-scheme",
        desc: "color-scheme",
        scope: "world",
        config: false,
        default: "default",
        type: String,
        choices: ["default", "dark"],
    });

    registerSetting({
        category: "check-animations",
        id: "check-outcome-result",
        desc: "outcome-result",
        scope: "world",
        config: false,
        default: "outcome-except-combat-crits",
        type: String,
        choices: ["numbers", "outcome-except-combat-crits", "outcome"],
    });

    registerSetting({
        category: "check-animations",
        id: "check-font-size",
        desc: "font-size",
        scope: "world",
        config: false,
        default: 30,
        type: Number,
    });

    registerSetting({
        category: "check-animations",
        id: "check-duration",
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

    registerSetting({
        category: "check-animations",
        id: "check-animations.sfx.enabled",
        desc: "sfx.enabled",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: "check-animations",
        id: "check-animations.sfx.check-or-attack",
        desc: "sfx.check-or-attack",
        scope: "world",
        config: false,
        default: !game?.modules?.get("pf2e-jb2a-macros")?.active ? "both" : "checks",
        type: String,
        choices: ["both", "attacks", "checks"],
    });

    registerSetting({
        category: "check-animations",
        id: "check-animations.sfx.options",
        desc: "sfx.options",
        scope: "world",
        config: false,
        default: "all",
        type: String,
        choices: ["none", "all", "success-or-fail", "crits-only"],
    });

    registerSetting({
        category: "check-animations",
        id: "check-animations.show-on-token-type",
        desc: "sfx.show-on-token-type",
        scope: "world",
        config: false,
        default: "pc+npc",
        type: String,
        choices: ["pc", "npc", "pc+npc"],
    });

    registerSetting({
        category: "check-animations",
        id: "check-animations.sfx.volume",
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

    registerSetting({
        category: "check-animations",
        id: "check-animations.sfx.file.criticalSuccess",
        desc: "sfx.file.criticalSuccess",
        scope: "world",
        config: false,
        default: "modules/pf2e-rpg-numbers/resources/sounds/checks/success_1.mp3",
        type: String,
        filePicker: "audio",
    });

    registerSetting({
        category: "check-animations",
        id: "check-animations.sfx.file.success",
        desc: "sfx.file.success",
        scope: "world",
        config: false,
        default: "modules/pf2e-rpg-numbers/resources/sounds/checks/correct-answer-tone.ogg",
        type: String,
        filePicker: "audio",
    });

    registerSetting({
        category: "check-animations",
        id: "check-animations.sfx.file.failure",
        desc: "sfx.file.failure",
        scope: "world",
        config: false,
        default: "modules/pf2e-rpg-numbers/resources/sounds/checks/Jpn_L_drum1.mp3",
        type: String,
        filePicker: "audio",
    });

    registerSetting({
        category: "check-animations",
        id: "check-animations.sfx.file.criticalFailure",
        desc: "sfx.file.criticalFailure",
        scope: "world",
        config: false,
        default: "modules/pf2e-rpg-numbers/resources/sounds/checks/negative-answer-lose.ogg",
        type: String,
        filePicker: "audio",
    });
}
