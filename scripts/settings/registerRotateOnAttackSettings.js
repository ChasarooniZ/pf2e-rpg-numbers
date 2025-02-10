import { registerSetting } from "../helpers/misc.js";

export function registerRotateOnAttackSettings() {
    registerSetting({
        category: 'rotate-on-attack',
        id: 'rotate-on-attack',
        desc: 'enabled',
        scope: 'world',
        config: false,
        default: true,
        type: Boolean,
        requiresReload: true,
    });

    registerSetting({
        category: 'rotate-on-attack',
        id: 'rotate-on-attack.duration',
        desc: 'duration',
        scope: 'world',
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
        category: 'rotate-on-attack',
        id: 'rotate-on-attack.scale-on-size',
        desc: 'scale-on-size',
        scope: 'world',
        config: false,
        default: false,
        type: Boolean,
    });
}
