import { registerSetting } from "../helpers/misc.js";

export function registerVersusSettings() {
    registerSetting({
        category: "vs",
        id: "vs.combat-start",
        desc: "combat-start",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: "vs",
        id: "vs.show-name",
        desc: "show-name",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: "vs",
        id: "vs.duration",
        desc: "duration",
        scope: "world",
        config: false,
        default: 6,
        type: Number,
    });
}
