const CRIT_TRANSLATION_PATH = "pf2e-rpg-numbers.module-settings.critical.type.choices.";

export const CRIT_OPTIONS = {
    "darkest-dungeon-crisis": CRIT_TRANSLATION_PATH + "darkest-dungeon-crisis",
    "darkest-dungeon-virtue": CRIT_TRANSLATION_PATH + "darkest-dungeon-virtue",
    default: CRIT_TRANSLATION_PATH + "default",
    "fire-emblem": CRIT_TRANSLATION_PATH + "fire-emblem",
    persona: CRIT_TRANSLATION_PATH + "persona",
    "disgaea-7": CRIT_TRANSLATION_PATH + "disgaea-7",
    fullscreen: CRIT_TRANSLATION_PATH + "fullscreen",
};

export const CRIT_OPTIONS_LABELS = Object.keys(CRIT_OPTIONS).filter((key) => key !== "default");
