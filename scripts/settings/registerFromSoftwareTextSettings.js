import { registerSetting } from "../helpers/misc.js";

export function registerFromSoftwareTextSettings() {
    const fromSoftOptions = ['noun-verbed', 'death'];
    // Noun Verbed
    fromSoftOptions.forEach(option => {
        registerSetting({
            category: `from-software.${option}`,
            id: `from-software.${option}.enabled`,
            desc: 'enabled',
            scope: 'world',
            config: false,
            default: false,
            type: Boolean,
        });
        if (option === 'death') {
            registerSetting({
                category: `from-software.${option}`,
                id: `from-software.${option}.type`,
                desc: 'type',
                scope: 'world',
                config: false,
                default: 'elden-ring',
                type: String,
                choices: ['elden-ring', 'sekiro'],
            });
        }

        if (option === 'noun-verbed') {
            registerSetting({
                category: `from-software.noun-verbed`,
                id: `from-software.noun-verbed.xp-threshold`,
                desc: 'xp-threshold',
                scope: 'world',
                config: false,
                default: 120,
                type: Number,
            });
        }
        registerSetting({
            category: `from-software.${option}`,
            id: `from-software.${option}.font-size`,
            desc: 'font-size',
            scope: 'world',
            config: false,
            default: 52,
            range: {
                min: 1,
                max: 150,
                step: 1,
            },
            type: Number,
        });

        registerSetting({
            category: `from-software.${option}`,
            id: `from-software.${option}.sound-effect`,
            desc: 'sound-effect',
            scope: 'world',
            config: false,
            type: String,
            default: option === 'death'
                ? 'modules/pf2e-rpg-numbers/resources/sounds/eldenRingDeath.ogg'
                : 'modules/pf2e-rpg-numbers/resources/sounds/eldenRingVictoryReverb.ogg',
            filePicker: 'audio',
        });

        registerSetting({
            category: `from-software.${option}`,
            id: `from-software.${option}.sound-effect.volume`,
            desc: 'sound-effect.volume',
            scope: 'world',
            config: false,
            default: 40,
            range: {
                min: 0,
                max: 100,
                step: 1,
            },
            type: Number,
        });

        registerSetting({
            category: `from-software.${option}`,
            id: `from-software.${option}.duration`,
            desc: 'duration',
            scope: 'world',
            config: false,
            default: 6.5,
            range: {
                min: 0,
                max: 12,
                step: 0.1,
            },
            type: Number,
        });

        registerSetting({
            category: `from-software.${option}`,
            id: `from-software.${option}.text`,
            desc: 'text',
            scope: 'world',
            config: false,
            default: option === 'death' ? 'You Died' : 'Enemy Felled',
            type: String,
        });
    });
}
