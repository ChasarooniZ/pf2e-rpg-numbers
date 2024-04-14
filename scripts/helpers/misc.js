import { injectConfig } from "./injectConfig.js";

export const MODULE_ID = "pf2e-rpg-numbers";

export function debugLog(data, context = "") {
    if (getSetting("debug-mode")) console.log(`PF2E-RPG-#s: ${context}`, data);
}

export function getSetting(settingID) {
    return game.settings.get(MODULE_ID, settingID);
}

export function doSomethingOnDamageApply() {
    return (
        getSetting("shake-enabled") ||
        getSetting("dmg-shake-directional-enabled") ||
        getSetting("dmg-on-apply-or-roll") === "apply"
    );
}

export function localize(str) {
    return game.i18n.localize(`${MODULE_ID}.${str}`);
}

/**
 *
 * @param {*} settingID
 * @param {*} data {desc: "name + hint connection + choices"}
 */
export function registerSetting(settingID, data) {
    const settingData = {
        name: data.desc ? localize(`module-settings.${data.desc}.hint`) : "",
        hint: data.desc ? localize(`module-settings.${data.desc}.hint`) : "",
        scope: data.scope,
        config: data.config,
        default: data.default,
        type: data.type,
    };
    if (data.onChange) settingData.onChange = data.onChange;
    if (data.choices)
        settingData.choices = data.choices.reduce(
            (obj, current) => ({
                ...obj,
                [current]: localize(`module-settings.${data.desc}.choices.${current}`),
            }),
            {}
        );

    game.settings.register(MODULE_ID, settingID, settingData);
}
