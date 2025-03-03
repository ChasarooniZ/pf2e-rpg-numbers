import { registerSetting } from "../helpers/misc.js";

export function registerBurstBurrowSettings() {
    registerSetting({
        category: 'burst-burrow',
        id: 'burst-burrow.enabled',
        desc: 'enabled',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: 'burst-burrow',
        id: 'burst-burrow.duration',
        desc: 'duration',
        scope: 'world',
        config: false,
        default: 10,
        range: {
            min: 0,
            max: 300,
            step: 0.1,
        },
        type: Number,
    });

    registerSetting({
        category: 'burst-burrow',
        id: 'burst-burrow.persistent',
        desc: 'persistent',
        scope: 'world',
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: 'burst-burrow',
        id: 'burst-burrow.size-multiplier',
        desc: 'size-multiplier',
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
        category: 'burst-burrow',
        id: 'burst-burrow.ignore-speed',
        desc: 'ignore-speed',
        scope: 'world',
        config: false,
        default: false,
        type: Boolean,
    });
    
    registerSetting({
        category: 'burst-burrow',
        id: 'burst-burrow.burrow-anim.enabled',
        desc: 'enabled',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
    });

    // registerSetting({
    //     category: 'burst-burrow',
    //     id: 'burst-burrow.sound',
    //     desc: 'sound',
    //     scope: 'world',
    //     config: false,
    //     default: 'modules/pf2e-rpg-numbers/resources/sounds/swoosh-universfield.mp3',
    //     type: String,
    //     filePicker: 'audio',
    // });

    // registerSetting({
    //     category: 'burst-burrow',
    //     id: 'burst-burrow.volume',
    //     desc: 'volume',
    //     scope: 'world',
    //     config: false,
    //     default: 50,
    //     range: {
    //         min: 0,
    //         max: 100,
    //         step: 1,
    //     },
    //     type: Number,
    // });
}
