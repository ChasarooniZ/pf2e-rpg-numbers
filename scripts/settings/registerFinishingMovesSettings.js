import { registerSetting } from "../helpers/misc.js";

export function registerFinishingMovesSettings() {
    registerSetting({
        category: 'finishing-move',
        id: 'finishing-move.enabled',
        desc: 'enabled',
        scope: 'world',
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: 'finishing-move',
        id: 'finishing-move.enabled-players',
        desc: 'enabled-players',
        scope: 'world',
        config: false,
        default: false,
        type: Boolean,
        requiresReload: true,
    });

    registerSetting({
        category: 'finishing-move',
        id: 'finishing-move.keep-on',
        desc: 'keep-on',
        scope: 'world',
        config: false,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: 'finishing-move',
        id: 'finishing-move.use-player-color',
        desc: 'use-player-color',
        scope: 'world',
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: 'finishing-move',
        id: 'finishing-move.quality',
        desc: 'quality',
        scope: 'world',
        config: false,
        default: 2,
        range: {
            min: 1,
            max: 5,
            step: 1,
        },
        type: Number,
    });

    registerSetting({
        category: 'finishing-move',
        id: 'finishing-move.sound-effect',
        desc: 'sound-effect',
        scope: 'world',
        config: false,
        type: String,
        default: 'modules/pf2e-rpg-numbers/resources/sounds/Deep_Impact_(Speedenza).ogg',
        filePicker: 'audio',
    });

    registerSetting({
        category: 'finishing-move',
        id: 'finishing-move.sound-effect.volume',
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
        category: 'finishing-move',
        id: 'finishing-move.duration.word',
        desc: 'duration.word',
        scope: 'world',
        config: false,
        default: 200,
        range: {
            min: 0,
            max: 2000,
            step: 25,
        },
        type: Number,
    });

    registerSetting({
        category: 'finishing-move',
        id: 'finishing-move.duration.end',
        desc: 'duration.end',
        scope: 'world',
        config: false,
        default: 1000,
        range: {
            min: 0,
            max: 5000,
            step: 25,
        },
        type: Number,
    });
}
