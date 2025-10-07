import { CRIT_OPTIONS_LABELS } from "../helpers/animation/crit/const.js";
import { registerSetting } from "../helpers/misc.js";
import { MODULE_ID } from "../helpers/const.js";

export function registerCriticalSettings() {
    registerSetting({
        category: "critical",
        id: "critical.enabled",
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: "critical",
        id: "critical.bypass-immunity",
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: "critical",
        id: "critical.player-enabled",
        desc: "player-enabled",
        scope: "player",
        config: true,
        default: true,
        type: Boolean,
        onChange: (value) => {
            game.user.setFlag(MODULE_ID, "critEnabled", value);
        },
    });

    registerSetting({
        category: "critical",
        id: "critical.type",
        desc: "type",
        scope: "world",
        config: false,
        default: "persona",
        type: String,
        choices: CRIT_OPTIONS_LABELS,
    });

    registerSetting({
        category: "critical",
        id: "critical.show-on",
        desc: "show-on",
        scope: "world",
        config: false,
        default: "attacks",
        type: String,
        choices: ["attacks", "checks", "both"],
    });

    registerSetting({
        category: "critical",
        id: "critical.show-on-token-type",
        desc: "show-on-token-type",
        scope: "world",
        config: false,
        default: "pc+npc",
        type: String,
        choices: ["pc", "npc", "pc+npc"],
    });

    registerSetting({
        category: "critical",
        id: "critical.default-img",
        desc: "default-img",
        scope: "world",
        config: false,
        default: "pc-tok-npc-tok",
        type: String,
        choices: ["pc-tok-npc-tok", "pc-act-npc-act", "pc-tok-npc-act", "pc-act-npc-tok"],
    });

    registerSetting({
        category: "critical",
        id: "critical.duration",
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

    registerSetting({
        category: "critical",
        id: "critical.sound",
        desc: "sound",
        scope: "world",
        config: false,
        default: "modules/pf2e-rpg-numbers/resources/sounds/swoosh-universfield.mp3",
        type: String,
        filePicker: "audio",
    });

    registerSetting({
        category: "critical",
        id: "critical.volume",
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

    registerSetting({
        category: "critical",
        id: "critical.delay",
        desc: "delay",
        scope: "world",
        config: false,
        default: 0,
        type: Number,
    });

    // Burst or Burrow
    registerSetting({
        category: "critical",
        id: "critical.volume",
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

    registerSetting({
        category: "critical",
        id: "critical.delay",
        desc: "delay",
        scope: "world",
        config: false,
        default: 0,
        type: Number,
    });
}
