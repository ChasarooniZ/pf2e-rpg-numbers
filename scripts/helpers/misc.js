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

export function getUserColor(user) {
    const [r,g,b] = user.color.rgb.map(color => color * 255);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
 }

/**
 *
 * @param {*} settingID
 * @param {*} data {desc: "name + hint connection + choices"}
 */
export function registerSetting(settingCat, settingID, data) {
    const category = settingCat ? `${settingCat}.` : "";
    const settingData = {
        name: data.desc ? localize(`module-settings.${category}${data.desc}.name`) : "",
        hint: data.desc ? localize(`module-settings.${category}${data.desc}.hint`) : "",
        scope: data.scope,
        config: data.config,
        default: data.default,
        type: data.type,
    };
    if (data.requiresReload) settingData.requiresReload = data.requiresReload;
    if (data.filePicker) settingData.filePicker = data.filePicker;
    if (data.choices)
        settingData.choices = data.choices.reduce(
            (obj, current) => ({
                ...obj,
                [current]: localize(`module-settings.${category}${data.desc}.choices.${current}`),
            }),
            {}
        );

    game.settings.register(MODULE_ID, settingID, settingData);
}

function transformData(dataArray) {
    const result = {};

    for (const item of dataArray) {
        const keys = item.key.split(".");
        let temp = result;

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (i === keys.length - 1) {
                temp[key] = item.value;
            } else {
                if (!temp[key]) {
                    temp[key] = {};
                }
                temp = temp[key];
            }
        }
    }

    return { settings: result };
}

// export function exportDebugInfo() {
//     const settingsInfo = [...game.settings.settings.values()]
//         .filter((val) => val.namespace === "pf2e-rpg-numbers")
//         .map((v) => ({ key: v.key, value: game.settings.get(v.namespace, v.key) }));
//     const settingsJSON = transformData(settingsInfo);
//     settingsJSON.modulesEnabled = {
//         sequencer: game.modules.get("sequencer").active,
//         "token-magic": game.modules.get("tokenmagic").active,
//     };
//     const name = `pf2e-rpg-numbers_DEBUG_(${new Intl.DateTimeFormat("en-GB", {
//         dateStyle: "long",
//         timeStyle: "short",
//         timeZone: "America/Chicago",
//     }).format(new Date())})`;
//     saveDataToFile(JSON.stringify(settingsJSON, null, 2), "json", `${name}.json`);
// }
