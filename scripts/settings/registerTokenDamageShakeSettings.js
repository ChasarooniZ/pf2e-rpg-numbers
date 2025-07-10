import { registerSetting } from "../helpers/misc.js";

export function registerTokenDamageShakeSettings() {
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
        id: "tok-shake-distance",
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

    registerSetting({
        category: "token-dmg-shake",
        id: "tok-shake-shakes",
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

    registerSetting({
        category: "token-dmg-shake",
        id: "tok-shake-duration",
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

    registerSetting({
        category: "token-dmg-shake",
        id: "tok-shake-scaling-type",
        desc: "scaling.type",
        scope: "world",
        config: false,
        default: "no",
        type: String,
        choices: ["no", "%-current-hp", "%-max-hp"],
    });
}
