import { MODULE_ID } from "../misc.js";

export function importSettings() {
    // Create a dialog to input JSON and upload a file
    new Dialog({
        title: game.i18n.localize(`${MODULE_ID}.menu.import.title`),
        content: `
        <form>
          <div class="form-group">
            <label for="file-input">${game.i18n.localize(`${MODULE_ID}.menu.import.content`)}</label>
            <input type="file" id="file-input" name="file-input" accept=".json">
          </div>
        </form>
      `,
        buttons: {
            import: {
                icon: '<i class="fas fa-check"></i>',
                label: game.i18n.localize(`${MODULE_ID}.menu.import.buttons.import`),
                callback: async (html) => {
                    const fileInput = html.find('[name="file-input"]')[0].files[0];
                    if (!fileInput) return;

                    // Parse JSON from file
                    try {
                        const fileContent = await fileInput.text();
                        const jsonObject = JSON.parse(fileContent);

                        jsonObject.settings.forEach(([key, value]) => {
                            game.settings.set(MODULE_ID, key, value);
                        });
                        console.log("Imported PF2e RPG # Data:", jsonObject);
                        ui.notifications.info(
                            game.i18n.localize(`${MODULE_ID}.menu.import.notification.success`)
                        );
                    } catch (error) {
                        console.error("Invalid JSON file for PF2e RPG Numbers:", error);
                        ui.notifications.error(
                            game.i18n.localize(`${MODULE_ID}.menu.import.notification.failure`)
                        );
                    }
                },
            },
            cancel: {
                icon: '<i class="fas fa-times"></i>',
                label: game.i18n.localize(`${MODULE_ID}.menu.import.buttons.cancel`),
            },
        },
        default: "import",
    }).render(true);
}