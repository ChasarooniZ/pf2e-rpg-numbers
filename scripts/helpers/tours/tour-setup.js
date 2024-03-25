export const TOUR_BASICS = {
    namespace: "pf2e-rpg-numbers",
    id: "basic-tour",
    title: "PF2e RPG Numbers",
    steps: [],
};
export const TOURS = {
    //Basic Tour
    "11.9.0": {
        first: true,
        steps: [
            {
                selector: '[data-tab="settings"]',
                title: "RPG Numbers",
                content:
                    "Welcome to PF2E RPG Numbers, I will be walking you through some of the setup and configuration as well as the features'",
                action: "click",
            },
            {
                selector: '[data-action="configure"]',
                title: "Update Messages",
                content:
                    "In the future on major updates, a tour just like this will show up in order to walk you through the steps",
                action: "click",
            },
            {
                title: "Settings",
                selector: '[data-tab="pf2e-rpg-numbers"]',
                content: "Here are the settings for all configuration for this module",
                action: "click",
            },
            {
                title: "Settings 2",
                selector: "section.tab.category.active",
                content: "Now going to go through the settings",
            },
            {
                selector: '[data-settings-key="pf2e-rpg-numbers.enabled"]',
                title: "Module - Enabled",
                content: "Toggle this to enable/disable module",
                action: "scrollIntoView",
            },
            {
                selector: '[data-settings-key="pf2e-rpg-numbers.dmg-enabled"]',
                title: "Damage Numbers",
                content: "Toggle this to enable/disable numbers popping up when damage numbers are rolled.",
                action: "scrollIntoView",
            },
            {
                selector: '[data-settings-key="pf2e-rpg-numbers.dmg-on-apply-or-roll"]',
                title: "Damage Numbers - Type",
                content: "This setting allows you to show the damage on roll, or on apply",
                action: "scrollIntoView",
            },
            {
                selector: '[data-settings-key="pf2e-rpg-numbers.check-enabled"]',
                title: "Checks - Enabled",
                content: "Toggle this to enable/disable check/attack results",
                action: "scrollIntoView",
            },
            {
                selector: '[data-settings-key="pf2e-rpg-numbers.check-outcome-result"]',
                title: "Checks - What to show",
                content: "This setting can change what is shown, and whether or not to show result or amt",
                action: "scrollIntoView",
            },
            {
                selector: '[data-settings-key="pf2e-rpg-numbers.shake-enabled"]',
                title: "Screen Shake - Enabled",
                content:
                    "Toggle this to enable/disable shaking the screen for the person who owns the token when it takes damage",
                action: "scrollIntoView",
            },
            {
                selector: '[data-settings-key="pf2e-rpg-numbers.dmg-shake-directional-enabled"]',
                title: "Token Shake - Enabled",
                content: "Toggle this to enable/disable shaking a token when it takes damage",
                action: "scrollIntoView",
            },
            {
                selector: '[data-settings-key="pf2e-rpg-numbers.rotate-on-attack"]',
                title: "Rotate on Attack - Enabled",
                content:
                    "Toggle this to enable/disable tokens rotating to wards who they attack, and rotating back. NOTE: You can edit the token setting rotation offset to have to rotate a different part of the token towards their target.",
                action: "scrollIntoView",
            },
            {
                selector: '[data-settings-key="pf2e-rpg-numbers.critical.enabled"]',
                title: "Critical Animation - Enabled",
                content:
                    "Toggle this to enable/disable Critical Hit Animation Effects (NOTE: You can edit the token setting to set the visual that shows)",
                action: "scrollIntoView",
            },
            {
                selector: '[data-settings-key="pf2e-rpg-numbers.critical.type"]',
                title: "Critical Animation - Type",
                content: "Use this to select the critical animation type",
                action: "scrollIntoView",
            },
            {
                selector: '[data-settings-key="pf2e-rpg-numbers.finishing-move.enabled"]',
                title: "Finishing Moves - Enabled",
                content:
                    "Toggle this to enable/disable the finishing moves Animation, which displays text across the screen in a cool format when toggled",
                action: "scrollIntoView",
            },
            {
                selector: '[data-tool="pf2e-rpg-numbers"]',
                title: "Finishing Moves Toggle",
                content:
                    "Toggle control for finishing moves, if nothing is highlighted here, you need to enable and reload to see the control which looks like a chat message in Token Controls.",
            },
            {
                selector: "section.tab.category.active",
                title: "End of Tour",
                content: "And that's the end of our tour, hope it was insightful",
            },
        ],
    },
};

export const TOUR_LIST = Object.keys(TOURS);
