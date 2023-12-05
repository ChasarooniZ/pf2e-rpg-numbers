export function debugLog(data, context = "") {
    if (game.settings.get("pf2e-rpg-numbers", 'debug-mode'))
        console.log(`PF2E-RPG-#s: ${context}`, data);
}