import { registerSetting } from "../helpers/misc.js";

export function registerDodgeOnMissSettings() {
    registerSetting({
        category: 'dodge-on-miss',
        id: 'dodge-on-miss.enabled',
        desc: 'enabled',
        scope: 'world',
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: 'dodge-on-miss',
        id: 'dodge-on-miss.duration',
        desc: 'duration',
        scope: 'world',
        config: false,
        default: 1.5,
        range: {
            min: 0,
            max: 3,
            step: 0.1,
        },
        type: Number,
    });

    registerSetting({
        category: 'dodge-on-miss',
        id: 'dodge-on-miss.distance',
        desc: 'distance',
        scope: 'world',
        config: false,
        default: 1,
        range: {
            min: 0,
            max: 3,
            step: 0.1,
        },
        type: Number,
    });

    registerSetting({
        category: 'dodge-on-miss',
        id: 'dodge-on-miss.delay',
        desc: 'delay',
        scope: 'world',
        config: false,
        default: 0,
        range: {
            min: 0,
            max: 5,
            step: 0.1,
        },
        type: Number,
    });

    registerSetting({
        category: 'dodge-on-miss',
        id: 'dodge-on-miss.type',
        desc: 'type',
        scope: 'world',
        config: false,
        default: game.modules.get("jb2a_patreon")?.active ? 'auto' : 'dodge',
        type: String,
        choices: ['auto', 'dodge', 'bounce-off'],
    });
}
