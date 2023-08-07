export default class Settings {
    static get fontSize() {
        return game.settings.get("pf2e-rpg-numbers", "fontSize");
    }
    static get maxFontScale() {
        return game.settings.get("pf2e-rpg-numbers", "maxFontScale");
    }
    static get topOffset() {
        return game.settings.get("pf2e-rpg-numbers", "topOffset");
    }
    static register() {

        game.settings.register("pf2e-rpg-numbers", "fontSize", {
            name: game.i18n.localize("pf2e-rpg-numbers.module-settings.fontSize.name"),
            hint: game.i18n.localize("pf2e-rpg-numbers.module-settings.fontSize.hint"),
            scope: "world",
            config: true,
            default: 20,
            type: Number,
        });
        game.settings.register("pf2e-rpg-numbers", "maxFontScale", {
            name: game.i18n.localize("pf2e-rpg-numbers.module-settings.maxFontScale.name"),
            hint: game.i18n.localize("pf2e-rpg-numbers.module-settings.maxFontScale.hint"),
            scope: "world",
            config: true,
            default: 3,
            type: Number,
        });
        game.settings.register("pf2e-rpg-numbers", "topOffset", {
            name: game.i18n.localize("pf2e-rpg-numbers.module-settings.topOffset.name"),
            hint: game.i18n.localize("pf2e-rpg-numbers.module-settings.topOffset.hint"),
            scope: "world",
            config: true,
            default: 25,
            type: Number,
        });
    }

}