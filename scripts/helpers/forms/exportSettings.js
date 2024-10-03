import { MODULE_ID } from "../misc.js";

export function exportSettings() {
    const data = {
        name: "PF2e RPG Settings Export",
        version: game.modules.get(MODULE_ID).version,
        // Get all setting keys
        settings: Array.from(game.settings.settings.keys()),
    };
    data.settings = data.settings.filter((key) => key.startsWith(MODULE_ID));

    // Map the filtered keys to an array of [key, value] pairs
    data.settings = data.settings.map((key) => {
        const settingKey = key.replace(`${MODULE_ID}.`, "");
        return [settingKey, game.settings.get(MODULE_ID, settingKey)];
    });

    saveDataToFile(
        JSON.stringify(data),
        "json",
        `pf2e-rpg-settings-(${new Date().toDateInputString()}).json`
    );
}