import { registerSetting } from "../helpers/misc";

export function registerDmgNumbersSettings() {
    registerSetting({
        category: 'dmg-numbers',
        id: 'dmg-enabled',
        desc: 'enabled',
        scope: 'world',
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: 'dmg-numbers',
        id: 'dmg-on-apply-or-roll',
        desc: 'on-apply-or-roll',
        scope: 'world',
        config: false,
        default: 'roll',
        type: String,
        choices: ['apply', 'roll'],
    });

    registerSetting({
        category: 'dmg-numbers',
        id: 'font-size',
        desc: 'font-size',
        scope: 'world',
        config: false,
        default: 20,
        type: Number,
    });

    registerSetting({
        category: 'dmg-numbers',
        id: 'max-font-scale',
        desc: 'max-font-scale',
        scope: 'world',
        config: false,
        default: 3,
        type: Number,
    });

    registerSetting({
        category: 'dmg-numbers',
        id: 'top-offset',
        desc: 'top-offset',
        scope: 'world',
        config: false,
        default: -25,
        range: {
            min: -100,
            max: 100,
            step: 5,
        },
        type: Number,
    });

    registerSetting({
        category: 'dmg-numbers',
        id: 'show-total',
        desc: 'show-total',
        scope: 'world',
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: 'dmg-numbers',
        id: 'number-scale-type',
        desc: 'number-scale-type',
        scope: 'world',
        config: false,
        default: 'percentMaxHealth',
        type: String,
        choices: ['percentRemainingHealth', 'percentMaxHealth', 'none'],
    });

    registerSetting({
        category: 'dmg-numbers',
        id: 'damage-split',
        desc: 'damage-split',
        scope: 'world',
        config: false,
        default: 'by-damage-type',
        type: String,
        choices: ['none', 'by-damage-type', 'all'],
    });

    registerSetting({
        category: 'dmg-numbers',
        id: 'duration',
        desc: 'duration',
        scope: 'world',
        config: false,
        default: 2,
        range: {
            min: 0,
            max: 10,
            step: 0.1,
        },
        type: Number,
    });

    registerSetting({
        category: 'dmg-numbers',
        id: 'wait-time-between-numbers',
        desc: 'wait-time-between-numbers',
        scope: 'world',
        config: false,
        default: 100,
        range: {
            min: 0,
            max: 1000,
            step: 1,
        },
        type: Number,
    });

    registerSetting({
        category: 'dmg-numbers',
        id: 'show-only-GM',
        desc: 'show-only-GM',
        scope: 'world',
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: 'dmg-numbers',
        id: 'animation-scale',
        desc: 'animation-scale',
        scope: 'world',
        config: false,
        default: 1,
        range: {
            min: 0,
            max: 2,
            step: 0.05,
        },
        type: Number,
    });

    registerSetting({
        category: 'dmg-numbers',
        id: 'jitter',
        desc: 'jitter',
        scope: 'world',
        config: false,
        default: 0,
        range: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    });
}
