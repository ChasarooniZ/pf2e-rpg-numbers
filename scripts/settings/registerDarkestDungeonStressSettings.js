import { registerSetting } from "../helpers/misc.js";

export function registerDarkestDungeonStressSettings() {
    registerSetting({
        category: "darkest-dungeon.stress",
        id: "darkest-dungeon.stress.enabled",
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: "darkest-dungeon.stress",
        id: "darkest-dungeon.stress.include-target",
        desc: "include-target",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    for (const disposition of ['friendly', 'hostile']) {
        for (const type of ["skill", 'save', 'attack']) {
            for (const outcome of ['crit', 'crit-fail']) {
                registerSetting({
                    category: "darkest-dungeon.stress",
                    id: `darkest-dungeon.stress.${disposition}.${outcome}`,
                    desc: `${disposition}.${type}.${outcome}`,
                    scope: "world",
                    config: false,
                    default: true,
                    type: Boolean,
                });
            }
        }
    }

    registerSetting({
        category: "darkest-dungeon.stress",
        id: "darkest-dungeon.stress.duration",
        desc: "duration",
        scope: "world",
        config: false,
        default: 1.5,
        range: {
            min: 0,
            max: 10,
            step: 0.1,
        },
        type: Number,
    });

    registerSetting({
        category: "darkest-dungeon.stress",
        id: "darkest-dungeon.stress.delay-per-token",
        desc: "delay-per-token",
        scope: "world",
        config: false,
        default: 150,
        range: {
            min: 0,
            max: 1000,
            step: 1,
        },
        type: Number,
    });

    registerSetting({
        category: "darkest-dungeon.stress",
        id: "darkest-dungeon.stress.volume",
        desc: "volume",
        scope: "world",
        config: false,
        default: 70,
        range: {
            min: 0,
            max: 100,
            step: 1,
        },
        type: Number,
    });
}
