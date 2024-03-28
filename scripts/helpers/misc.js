import { injectConfig } from "./injectConfig.js";

export const MODULE_ID = "pf2e-rpg-numbers";

export function debugLog(data, context = "") {
    if (game.settings.get("pf2e-rpg-numbers", "debug-mode")) console.log(`PF2E-RPG-#s: ${context}`, data);
}

export function doSomethingOnDamageApply() {
    return (
        game.settings.get(MODULE_ID, "shake-enabled") ||
        game.settings.get(MODULE_ID, "dmg-shake-directional-enabled") ||
        game.settings.get(MODULE_ID, "dmg-on-apply-or-roll") === "apply"
    );
}

export function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param key
 * @returns {*}
 */
export function getSetting(key) {
    return game.settings.get(MODULE_ID, key);
}

export function setSetting(key, value) {
    if (value === undefined) {
        throw new Error("setSetting | value must not be undefined!");
    }
    return game.settings.set(MODULE_ID, key, value);
}

export function registerSetting(key, localize_key)

export function localize(context, key) {
    return game.i18n.localize(`${MODULE_ID}.${context}.${key}`)
}