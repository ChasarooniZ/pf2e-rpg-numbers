Hooks.on("init", () => {

    game.settings.register("pf2e-rpg-numbers", "font-size", {
        name: game.i18n.localize("pf2e-rpg-numbers.module-settings.font-size.name"),
        hint: game.i18n.localize("pf2e-rpg-numbers.module-settings.font-size.hint"),
        scope: "world",
        config: true,
        default: 20,
        type: Number,
    });
    game.settings.register("pf2e-rpg-numbers", "max-font-scale", {
        name: game.i18n.localize("pf2e-rpg-numbers.module-settings.max-font-scale.name"),
        hint: game.i18n.localize("pf2e-rpg-numbers.module-settings.max-font-scale.hint"),
        scope: "world",
        config: true,
        default: 3,
        type: Number,
    });
    game.settings.register("pf2e-rpg-numbers", "top-offset", {
        name: game.i18n.localize("pf2e-rpg-numbers.module-settings.top-offset.name"),
        hint: game.i18n.localize("pf2e-rpg-numbers.module-settings.top-offset.hint"),
        scope: "world",
        config: true,
        default: 25,
        type: Number,
    });

});