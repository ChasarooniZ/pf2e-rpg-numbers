import { registerSetting } from "../helpers/misc.js";

export function registerRotateSettings() {
    // Rotate on Attack
    registerSetting({
        category: "rotate-on-attack",
        id: "rotate-on-attack",
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: "rotate-on-attack",
        id: "rotate-on-attack.duration",
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

    registerSetting({
        category: "rotate-on-attack",
        id: "rotate-on-attack.scale-on-size",
        desc: "scale-on-size",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    // Rotate on Target
    registerSetting({
        category: "rotate-on-target",
        id: "rotate-on-target.enabled",
        desc: "enabled",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: "rotate-on-target",
        id: "rotate-on-target.return",
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });
}
