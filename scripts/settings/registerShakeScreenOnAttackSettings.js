import { registerSetting } from "../helpers/misc.js";

export function registerShakeScreenOnAttackSettings() {
    registerSetting({
        category: 'shake-on-attack',
        id: 'shake-on-attack.enabled',
        desc: 'enabled',
        scope: 'world',
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: 'shake-on-attack',
        id: 'shake-on-attack.type',
        desc: 'type',
        scope: 'world',
        config: false,
        default: false,
        type: String,
        choices: ['both', 'gm', 'players'],
    });
}
