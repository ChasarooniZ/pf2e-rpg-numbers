import { getSetting, MODULE_ID, registerSetting } from "./helpers/misc.js";

Hooks.on("init", () => {
    const debouncedReload = foundry.utils.debounce(() => window.location.reload(), 100);
    const setUserFlag = (flag, value) => game.user.setFlag(MODULE_ID, flag, value);
    Hooks.on("renderSettingsConfig", renderSettingsConfig);

    registerSetting("enabled", {
        desc: "enabled",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    registerSetting("dmg-enabled", {
        desc: "dmg-numbers.enabled",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    registerSetting("dmg-on-apply-or-roll", {
        desc: "dmg-numbers.on-apply-or-roll",
        scope: "world",
        config: true,
        default: "roll",
        type: String,
        choices: ["apply", "roll"],
    });

    registerSetting("font-size", {
        desc: "dmg-numbers.font-size",
        scope: "world",
        config: true,
        default: 20,
        type: Number,
    });

    registerSetting("max-font-scale", {
        desc: "dmg-numbers.max-font-scale",
        scope: "world",
        config: true,
        default: 3,
        type: Number,
    });

    registerSetting("top-offset", {
        desc: "dmg-numbers.top-offset",
        scope: "world",
        config: true,
        default: -25,
        range: {
            min: -100,
            max: 100,
            step: 5,
        },
        type: Number,
    });

    registerSetting("show-total", {
        desc: "dmg-numbers.show-total",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    registerSetting("number-scale-type", {
        desc: "dmg-numbers.number-scale-type",
        scope: "world",
        config: true,
        default: "percentMaxHealth",
        type: String,
        choices: ["percentRemainingHealth", "percentMaxHealth", "none"],
    });

    registerSetting("damage-split", {
        desc: "dmg-numbers.damage-split",
        scope: "world",
        config: true,
        default: "by-damage-type",
        type: String,
        choices: ["none", "by-damage-type", "all"],
    });

    registerSetting("duration", {
        desc: "dmg-numbers.duration",
        scope: "world",
        config: true,
        default: 2,
        range: {
            min: 0,
            max: 10,
            step: 0.1,
        },
        type: Number,
    });
    registerSetting("wait-time-between-numbers", {
        desc: "dmg-numbers.wait-time-between-numbers",
        scope: "world",
        config: true,
        default: 100,
        range: {
            min: 0,
            max: 1000,
            step: 1,
        },
        type: Number,
    });

    registerSetting("show-only-GM", {
        desc: "dmg-numbers.show-only-GM",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    registerSetting("animation-scale", {
        desc: "dmg-numbers.animation-scale",
        scope: "world",
        config: true,
        default: 1,
        range: {
            min: 0,
            max: 2,
            step: 0.05,
        },
        type: Number,
    });

    registerSetting("jitter", {
        desc: "dmg-numbers.jitter",
        scope: "world",
        config: true,
        default: 0,
        range: {
            min: 0,
            max: 1,
            step: 0.05,
        },
        type: Number,
    });

    registerSetting("check-enabled", {
        desc: "check-animations.enabled",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    registerSetting("check-color-scheme", {
        desc: "check-animations.color-scheme",
        scope: "world",
        config: true,
        default: "default",
        type: String,
        choices: ["default", "dark"],
    });

    registerSetting("check-outcome-result", {
        desc: "check-animations.outcome-result",
        scope: "world",
        config: true,
        default: "outcome-except-combat-crits",
        type: String,
        choices: ["numbers", "outcome-except-combat-crits", "outcome"],
    });

    registerSetting("check-font-size", {
        desc: "check-animations.font-size",
        scope: "world",
        config: true,
        default: 30,
        type: Number,
    });

    registerSetting("check-duration", {
        desc: "check-animations.duration",
        scope: "world",
        config: true,
        default: 2,
        range: {
            min: 0,
            max: 10,
            step: 0.1,
        },
        type: Number,
    });

    registerSetting("shake-enabled", {
        desc: "screen-shake.enabled",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    registerSetting("shake-duration", {
        desc: "screen-shake.duration",
        scope: "world",
        config: true,
        default: 250,
        range: {
            min: 0,
            max: 2000,
            step: 10,
        },
        type: Number,
    });

    registerSetting("shake-intensity-max", {
        desc: "screen-shake.intensity-max",
        scope: "world",
        config: true,
        default: 35,
        range: {
            min: 1,
            max: 100,
            step: 1,
        },
        type: Number,
    });

    registerSetting("shake-intensity-type", {
        desc: "screen-shake.intensity-type",
        scope: "world",
        config: true,
        default: "%-current-hp",
        type: String,
        choices: ["max", "%-current-hp", "%-max-hp"],
    });

    registerSetting("shake-intensity-include-temp-hp", {
        desc: "screen-shake.intensity-include-temp-hp",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    registerSetting("shake-gm-enabled", {
        desc: "screen-shake.gm-enabled",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    registerSetting("dmg-shake-directional-enabled", {
        desc: "token-dmg-shake.enabled",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    registerSetting("tok-shake-distance", {
        desc: "token-dmg-shake.distance",
        scope: "world",
        config: true,
        default: 20,
        range: {
            min: 1,
            max: 100,
            step: 1,
        },
        type: Number,
    });

    registerSetting("tok-shake-shakes", {
        desc: "token-dmg-shake.shakes",
        scope: "world",
        config: true,
        default: 7,
        range: {
            min: 1,
            max: 20,
            step: 1,
        },
        type: Number,
    });

    registerSetting("tok-shake-duration", {
        desc: "token-dmg-shake.duration",
        scope: "world",
        config: true,
        default: 500,
        range: {
            min: 0,
            max: 2000,
            step: 10,
        },
        type: Number,
    });

    registerSetting("tok-shake-scaling-type", {
        desc: "token-dmg-shake.scaling.type",
        scope: "world",
        config: true,
        default: "no",
        type: String,
        choices: ["no", "%-current-hp", "%-max-hp"],
    });

    registerSetting("tok-shake-scaling-distance", {
        desc: "token-dmg-shake.scaling.distance",
        scope: "world",
        config: true,
        default: "no",
        type: String,
        choices: ["no", "max", "mid"],
    });

    registerSetting("tok-shake-scaling-shakes", {
        desc: "token-dmg-shake.scaling.shakes",
        scope: "world",
        config: true,
        default: "no",
        type: String,
        choices: ["no", "max", "mid"],
    });

    registerSetting("tok-shake-scaling-duration", {
        desc: "token-dmg-shake.scaling.duration",
        scope: "world",
        config: true,
        default: "no",
        type: String,
        choices: ["no", "max", "mid"],
    });

    registerSetting("rotate-on-attack", {
        desc: "rotate-on-attack.enabled",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
        onChange: debouncedReload,
    });

    //Critical Hit
    registerSetting("critical.enabled", {
        desc: "critical.enabled",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    registerSetting("critical.player-enabled", {
        desc: "critical.player-enabled",
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
        onChange: setUserFlag(critPlayerEnabled, getSetting("critical.player-enabled")),
    });

    registerSetting("critical.type", {
        desc: "critical.type",
        scope: "world",
        config: true,
        default: "persona",
        type: String,
        choices: {
            ["persona"]: "persona",
            ["fire-emblem"]: "fire-emblem",
        },
    });

    registerSetting("critical.show-on", {
        desc: "critical.show-on",
        scope: "world",
        config: true,
        default: "attacks",
        type: String,
        choices: {
            ["attacks"]: "attacks",
            ["checks"]: "checks",
            ["both"]: "both",
        },
    });

    registerSetting("critical.show-on-token-type", {
        desc: "critical.show-on-token-type",
        scope: "world",
        config: true,
        default: "pc+npc",
        type: String,
        choices: {
            ["pc"]: "pc",
            ["npc"]: "npc",
            ["pc+npc"]: "pc+npc",
        },
    });

    registerSetting("critical.default-img", {
        desc: "critical.default-img",
        scope: "world",
        config: true,
        default: "pc-tok-npc-tok",
        type: String,
        choices: {
            ["pc-tok-npc-tok"]: "pc-tok-npc-tok",
            ["pc-act-npc-act"]: "pc-act-npc-act",
            ["pc-tok-npc-act"]: "pc-tok-npc-act",
            ["pc-act-npc-tok"]: "pc-act-npc-tok",
        },
    });

    registerSetting("critical.duration", {
        desc: "critical.duration",
        scope: "world",
        config: true,
        default: 1.5,
        type: Number,
    });

    registerSetting("critical.sound", {
        desc: "critical.sound",
        scope: "world",
        config: true,
        default: "modules/pf2e-rpg-numbers/resources/sounds/swoosh-universfield.mp3",
        type: String,
        filePicker: "audio",
    });

    registerSetting("critical.volume", {
        desc: "critical.volume",
        scope: "world",
        config: true,
        default: 50,
        range: {
            min: 1,
            max: 100,
            step: 1,
        },
        type: Number,
    });

    registerSetting("critical.delay", {
        desc: "critical.delay",
        scope: "world",
        config: true,
        default: 0,
        type: Number,
    });

    //Finishing Move
    registerSetting("finishing-move.enabled", {
        desc: "finishing-move.enabled",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    registerSetting("finishing-move.enabled-players", {
        desc: "finishing-move.enabled-players",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: debouncedReload,
    });

    registerSetting("finishing-move.keep-on", {
        desc: "finishing-move.keep-on",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    registerSetting("finishing-move.use-player-color", {
        desc: "finishing-move.use-player-color",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    registerSetting("finishing-move.quality", {
        desc: "finishing-move.quality",
        scope: "world",
        config: true,
        default: 2,
        range: {
            min: 1,
            max: 5,
            step: 1,
        },
        type: Number,
    });

    registerSetting("finishing-move.sound-effect", {
        desc: "finishing-move.sound-effect",
        scope: "world",
        config: true,
        type: String,
        default: "modules/pf2e-rpg-numbers/resources/sounds/Deep_Impact_(Speedenza).ogg",
        filePicker: "audio",
    });

    registerSetting("finishing-move.sound-effect.volume", {
        desc: "finishing-move.sound-effect.volume",
        scope: "world",
        config: true,
        default: 40,
        range: {
            min: 1,
            max: 100,
            step: 1,
        },
        type: Number,
    });

    registerSetting("finishing-move.duration.word", {
        desc: "finishing-move.duration.word",
        scope: "world",
        config: true,
        default: 200,
        range: {
            min: 0,
            max: 2000,
            step: 25,
        },
        type: Number,
    });

    registerSetting("finishing-move.duration.end", {
        desc: "finishing-move.duration.end",
        scope: "world",
        config: true,
        default: 1000,
        range: {
            min: 0,
            max: 5000,
            step: 25,
        },
        type: Number,
    });

    registerSetting("debug-mode", {
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
});

/**
 * Credit tok PF2e Token Action HUD for the code on this to reference, helped a tooon
 * @param {} _
 * @param {*} html
 */
export function renderSettingsConfig(_, html) {
    const tab = html.find(`.tab[data-tab=${MODULE_ID}]`);

    function beforeGroup(key, name, dom = "h3") {
        const localized = game.i18n.localize(`pf2e-rpg-numbers.module-settings.headers.${key}`);
        tab.find(`[name="${MODULE_ID}.${name}"]`).closest(".form-group").before(`<${dom}>${localized}</${dom}>`);
    }

    beforeGroup("dmg-numbers", "dmg-enabled");
    beforeGroup("check-animations", "check-enabled");
    beforeGroup("screen-shake", "shake-enabled");
    beforeGroup("token-dmg-shake.title", "dmg-shake-directional-enabled");
    beforeGroup("token-dmg-shake.scaling", "tok-shake-scaling-type", "h4");
    beforeGroup("rotate-on-attack", "rotate-on-attack");
    beforeGroup("critical", "critical.enabled");
    beforeGroup("finishing-move.title", "finishing-move.enabled");
    beforeGroup("finishing-move.pcs", "finishing-move.show-for.pcs", "h4");
    beforeGroup("finishing-move.npcs", "finishing-move.show-for.npcs", "h4");
    //TODO beforeGroup("plus-one", "plus-one.enabled")

    beforeGroup("debug", "debug-mode");
}
