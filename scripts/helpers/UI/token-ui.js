// export function registerSheetButton() {
// //TODO Update and fix
//     const trustedUsersOnly = utils.setting("RESTRICT_TO_TRUSTED");
//     if (trustedUsersOnly && !game.user.isTrusted) return;
  
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
