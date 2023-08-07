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
    game.settings.register("pf2e-rpg-numbers", "jitter", {
        name: game.i18n.localize("pf2e-rpg-numbers.module-settings.jitter.name"),
        hint: game.i18n.localize("pf2e-rpg-numbers.module-settings.jitter.hint"),
        scope: "world",
        config: true,
        default: 0.5,
        range: {
          min: 0,
          max: 1,
          step: 0.05
        },
        type: Number,
    });

    game.settings.register("pf2e-rpg-numbers", "number-scale-type", {
        name: game.i18n.localize("pf2e-rpg-numbers.module-settings.number-scale-type.name"),
        hint: game.i18n.localize("pf2e-rpg-numbers.module-settings.number-scale-type.hint"),
        scope: "world",
        config: true,
        default: "percentMaxHealth",
        type: String,
        choices: {
            ["percentRemainingHealth"]: game.i18n.localize("pf2e-rpg-numbers.module-settings.number-scale-type.choices.percent-remaining-health"),
            ["percentMaxHealth"]: game.i18n.localize("pf2e-rpg-numbers.module-settings.number-scale-type.choices.percent-max-health"),
            ["none"]: game.i18n.localize("pf2e-rpg-numbers.module-settings.number-scale-type.choices.none"),
        },
    });

});