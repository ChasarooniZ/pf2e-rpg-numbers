import { registerSetting } from "../helpers/misc.js";

export function registerRotateSettings() {
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
}
