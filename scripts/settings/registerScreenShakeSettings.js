import { registerSetting } from "../helpers/misc.js";

export function registerScreenShakeSettings() {
    registerSetting({
        category: 'screen-shake',
        id: 'shake-enabled',
        desc: 'enabled',
        scope: 'world',
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: 'screen-shake',
        id: 'shake-duration',
        desc: 'duration',
        scope: 'world',
        config: false,
        default: 250,
        range: {
            min: 0,
            max: 2000,
            step: 10,
        },
        type: Number,
    });

    registerSetting({
        category: 'screen-shake',
        id: 'shake-intensity-max',
        desc: 'intensity-max',
        scope: 'world',
        config: false,
        default: 35,
        range: {
            min: 1,
            max: 100,
            step: 1,
        },
        type: Number,
    });

    registerSetting({
        category: 'screen-shake',
        id: 'shake-intensity-type',
        desc: 'intensity-type',
        scope: 'world',
        config: false,
        default: '%-current-hp',
        type: String,
        choices: ['max', '%-current-hp', '%-max-hp'],
    });

    registerSetting({
        category: 'screen-shake',
        id: 'shake-intensity-include-temp-hp',
        desc: 'intensity-include-temp-hp',
        scope: 'world',
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: 'screen-shake',
        id: 'shake-gm-enabled',
        desc: 'gm-enabled',
        scope: 'world',
        config: false,
        default: false,
        type: Boolean,
    });
}
