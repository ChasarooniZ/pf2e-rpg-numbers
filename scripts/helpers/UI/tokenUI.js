// export function registerSheetButton() {
// //TODO Update and fix
//     const trustedUsersOnly = utils.setting("RESTRICT_TO_TRUSTED");
//     if (trustedUsersOnly && !game.user.isTrusted) return;

import { injectConfig } from "../injectConfig.js";
import { localize, MODULE_ID } from "../misc.js";

//     /**
//      * Character sheets
//      */
//     const pcSheetNames = Object.values(CONFIG.Actor.sheetClasses.character)
//       .map((sheetClass) => sheetClass.cls)
//       .map((sheet) => sheet.name);

//     pcSheetNames.forEach((sheetName) => {
//       Hooks.on("render" + sheetName, (app, html, data) => {
//         // only for GMs or the owner of this character
//         if (!data.owner || !data.actor) return;
//         if (!game.user.can("ACTOR_CREATE")) return;

//         const button = $(`<a class="pf2e-rpg-numbers-open" title="PF2e RPG Numbers"><i class="fas fa-teeth-open"></i> PF2e RPG Numbers</a>`);

//         button.click(() => {
//           if (game.user.can("ACTOR_CREATE")) {
//             const muncher = new PathmuncherImporter(PathmuncherImporter.defaultOptions, data.actor);
//             muncher.render(true);
//           } else {
//             ui.notifications.warn(game.i18n.localize(`${CONSTANTS.FLAG_NAME}.Notifications.CreateActorPermission`), { permanent: true });
//           }
//         });

//         html.closest('.app').find('.pf2e-rpg-numbers-open').remove();
//         let titleElement = html.closest('.app').find('.window-title');
//         if (!app._minimized) button.insertAfter(titleElement);
//       });
//     });

//   }

export function setupTokenMenu() {
    injectConfig.quickInject([{ documentName: "Token" }], {
        moduleId: MODULE_ID,
        tab: {
            name: MODULE_ID,
            label: localize("token-options.tab-label"),
            icon: "fas fa-dragon",
        },
        rotationOffset: {
            type: "number",
            label: localize("token-options.rotation-offset.name"),
            notes: localize("token-options.rotation-offset.hint"),
            default: 0,
        },
        fireEmblemImg: {
            type: "filepicker",
            label: localize("token-options.fire-emblem-img.name"),
            notes: localize("token-options.fire-emblem-img.hint"),
            default: "",
        },
        personaImg: {
            type: "filepicker",
            label: localize("token-options.persona-img.name"),
            notes: localize("token-options.persona-img.hint"),
            default: "",
        },
        critOffsetX: {
            type: "number",
            label: localize("token-options.crit.offset-x.name"),
            notes: localize("token-options.crit.offset-x.hint"),
            default: 0,
        },
        critOffsetY: {
            type: "number",
            label: localize("token-options.crit.offset-y.name"),
            notes: localize("token-options.crit.offset-y.hint"),
            default: 0,
        },
        critScale: {
            type: "number",
            label: localize("token-options.crit.scale.name"),
            notes: localize("token-options.crit.scale.hint"),
            default: 100,
        },
        critRotation: {
            type: "number",
            label: localize("token-options.crit.rotation.name"),
            notes: localize("token-options.crit.rotation.hint"),
            default: 0,
        },
        critSFX: {
            type: "filepicker.audio",
            label: localize("token-options.crit.sfx.name"),
            notes: localize("token-options.crit.sfx.hint"),
            default: "",
        },
    });
}
