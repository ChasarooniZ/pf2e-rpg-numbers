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
