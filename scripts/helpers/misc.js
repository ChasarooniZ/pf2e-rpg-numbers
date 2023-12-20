import { injectConfig } from "./injectConfig.js";

export const MODULE_ID = 'pf2e-rpg-numbers';

export function debugLog(data, context = "") {
    if (game.settings.get("pf2e-rpg-numbers", 'debug-mode'))
        console.log(`PF2E-RPG-#s: ${context}`, data);
}

/**
 * Handler called when token configuration window is opened. Injects custom form html and deals
 * with updating token.
 * @category GMOnly
 * @function
 * @async
 * @param {TokenConfig} tokenConfig
 * @param {JQuery} html
 */
 export async function renderTokenConfigHandler(tokenConfig, html) {
    injectConfig.quickInject([{documentName: "Token"}],
    {
        moduleId: MODULE_ID,
        inject: `.tab[data-tab="character"]`,
        "rotationOffset": {
            type: "number",
            label: game.i18n.localize("pf2e-rpg-numbers.options.rotationOffset"),
            default: 0,
            min: 0,
            max: 360,
        }
    });
	// const posTab = html.find(`.tab[data-tab="character"]`);

	// if (tokenConfig.options.sheetConfig) {
	// 	var rotationOffset = tokenConfig.object.getFlag(MODULE_ID, "rotationOffset") || "0";
	// } else {
	// 	rotationOffset = tokenConfig.token.flags?.[MODULE_ID]?.rotationOffset || "0";
	// }
	// let data = {
	// 	rotationOffset: rotationOffset,
	// };

	// const insertHTML = await renderTemplate("modules/" + MODULE_ID + "/templates/token-config.html", data);
	// posTab.append(insertHTML);
}