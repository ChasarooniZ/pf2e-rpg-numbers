import { registerSetting } from "../helpers/misc.js";

export function registerTokenMotionSettings() {
    // Rotate on Attack
    registerSetting({
        category: "rotate-on-attack",
        id: "rotate-on-attack",
        desc: "enabled",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: "rotate-on-attack",
        id: "rotate-on-attack.default-rotation",
        desc: "default-rotation",
        scope: "world",
        config: false,
        default: 90,
        range: {
            min: -360,
            max: 360,
            step: 1,
        },
        type: Number,
    });

    // Bounce on Attack
    registerSetting({
        category: "bounce-on-attack",
        id: "bounce-on-attack",
        desc: "enabled",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: "token-dmg-shake",
        id: "dmg-shake-directional-enabled",
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: "token-dmg-shake",
        id: "tok-shake-scaling-type",
        desc: "scaling.type",
        scope: "world",
        config: false,
        default: "%-max-hp",
        type: String,
        choices: ["no", "%-current-hp", "%-max-hp"],
    });
}
