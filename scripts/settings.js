import { localize, MODULE_ID, registerSetting } from "./helpers/misc.js";
import { SettingsConfigForm } from "./helpers/forms/settingsConfigForm.js";
import { registerScreenShakeSettings } from "./settings/registerScreenShakeSettings.js";
import { registerDmgNumbersSettings } from "./settings/registerDmgNumbersSettings.js";
import { registerTokenDamageShakeSettings } from "./settings/registerTokenDamageShakeSettings.js";
import { registerCheckAnimationSettings } from "./settings/registerCheckAnimationSettings.js";
import { registerShakeScreenOnAttackSettings } from "./settings/registerShakeScreenOnAttackSettings.js";
import { registerRotateOnAttackSettings } from "./settings/registerRotateOnAttackSettings.js";
import { registerDodgeOnMissSettings } from "./settings/registerDodgeOnMissSettings.js";
import { registerCriticalSettings } from "./settings/registerCriticalSettings.js";
import { registerFinishingMovesSettings } from "./settings/registerFinishingMovesSettings.js";
import { registerFromSoftwareTextSettings } from "./settings/registerFromSoftwareTextSettings.js";
import { registerBurstBurrowSettings } from "./settings/registerBurstBurrowSettings.js";
import { registerVersusSettings } from "./settings/registerVersusSettings.js";

Hooks.on("init", () => {
    loadTemplates([
        //Module
        `modules/pf2e-rpg-numbers/templates/settings/pf2e-rpg-settings-config.hbs`,
        "modules/pf2e-rpg-numbers/templates/settings/tabs/home.hbs",
        "modules/pf2e-rpg-numbers/templates/settings/tabs/critical.hbs",
        "modules/pf2e-rpg-numbers/templates/settings/tabs/misc.hbs",
        "modules/pf2e-rpg-numbers/templates/settings/tabs/rolls.hbs",
        "modules/pf2e-rpg-numbers/templates/settings/tabs/text.hbs",
        "modules/pf2e-rpg-numbers/templates/settings/tabs/token.hbs",
        //Actor
        "modules/pf2e-rpg-numbers/templates/actor-settings/actor-settings.hbs",
        "modules/pf2e-rpg-numbers/templates/actor-settings/tabs/home.hbs",
        "modules/pf2e-rpg-numbers/templates/actor-settings/tabs/token.hbs",
        "modules/pf2e-rpg-numbers/templates/actor-settings/tabs/critical/critical.hbs",
        "modules/pf2e-rpg-numbers/templates/actor-settings/tabs/critical/critical-section.hbs",
        "modules/pf2e-rpg-numbers/templates/actor-settings/tabs/critical/critical-tab.hbs",
    ]);

    game.settings.registerMenu(MODULE_ID, "pf2eRPGSettingsMenu", {
        name: "PF2e RPG Settings",
        label: "PF2e RPG Settings", // The text label used in the button
        hint: "Settings for the PF2e RPG settings",
        icon: "fas fa-dragon", // A Font Awesome icon used in the submenu button
        type: SettingsConfigForm, // A FormApplication subclass
        restricted: true, // Restrict this submenu to gamemaster only?
        height: 600,
    });

    registerSetting({
        id: "enabled",
        desc: "enabled",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
    });

    registerSetting({
        category: "actor-settings",
        id: "actor-settings.player-enabled",
        desc: "player-enabled",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
    });

    registerBurstBurrowSettings();

    registerCheckAnimationSettings();

    registerCriticalSettings();

    registerDodgeOnMissSettings();

    registerDmgNumbersSettings();

    registerFinishingMovesSettings();

    registerFromSoftwareTextSettings();

    registerRotateOnAttackSettings();

    registerScreenShakeSettings();

    registerShakeScreenOnAttackSettings();

    registerTokenDamageShakeSettings();

    registerVersusSettings();

    registerSetting({
        category: "actor-settings",
        id: "actor-settings.hide-button-text",
        desc: "hide-button-text",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: "",
        id: "debug-mode",
        desc: "debug-mode",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    registerSetting({
        category: "",
        id: "last-version",
        desc: "last-version",
        scope: "world",
        config: false,
        default: "0.0.0",
        type: String,
    });

    game.keybindings.register(MODULE_ID, "activateFinishingMove", {
        name: localize("keybinds.activate-finishing-move.name"),
        hint: localize("keybinds.activate-finishing-move.hint"),
        editable: [
            {
                key: "KeyQ",
                modifiers: ["Shift"],
            },
        ],
        onDown: () => {
            if (!game.user.getFlag(MODULE_ID, "finishingMoveActive")) {
                document
                    .querySelector(
                        `li.control-tool.toggle[aria-label="${game.i18n.localize(
                            "pf2e-rpg-numbers.controls.finishing-move.name"
                        )}"]`
                    )
                    .click();
            }
        },
        onUp: () => { },
        restricted: false,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
    });
    game.keybindings.register(MODULE_ID, "activateCriticalAnimation", {
        name: localize("keybinds.activate-critical.success.name"),
        hint: localize("keybinds.activate-critical.success.hint"),
        editable: [
            {
                key: "KeyZ",
                modifiers: ["Shift", "Alt"],
            },
        ],
        onDown: () => {
            const token = canvas.tokens.controlled[0];
            if (token) {
                game.pf2eRPGNumbers.critAnimation.generate(token);
            } else {
                ui.notifications.error("You must have a token selected");
            }
        },
        onUp: () => { },
        restricted: false,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
    });
});
