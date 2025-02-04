import { getVisibleAndMsgVisibleUsers } from "../anim.js";
import { getSetting } from "../misc.js";

// Define constant colors outside the function to avoid recreating them on every call
const colors = {
    default: {
        none: "white",
        criticalFailure: "rgb(255, 0, 0)",
        failure: "rgb(255, 69, 0)",
        success: "rgb(0, 0, 255)",
        criticalSuccess: "rgb(0, 128, 0)",
    },
    dark: {
        none: "white",
        criticalFailure: "rgb(255, 0, 0)",
        failure: "rgb(255, 129, 0)",
        success: "rgb(0, 241, 255)",
        criticalSuccess: "rgb(107, 255, 0)",
    },
};

export async function generateRollScroll(roll_deets) {
    // Destructure frequently used variables
    const { outcome, token, roll, type } = roll_deets;
    const fontSize = getSetting("check-font-size");
    const theme = getSetting("check-color-scheme");
    const style = {
        fill: colors[theme][outcome],
        fontSize: fontSize,
        align: "center",
        dropShadow: true,
        strokeThickness: 5,
    };
    const duration = getSetting("check-duration") * 1000;
    let text;

    // Simplify text determination using a switch statement
    switch (getSetting("check-outcome-result")) {
        case "numbers":
            text = roll;
            break;
        case "outcome-except-combat-crits":
            text =
                type === "attack-roll" || outcome === "none"
                    ? roll
                    : game.i18n.localize(`pf2e-rpg-numbers.display-text.outcomes.${outcome}`);
            break;
        case "outcome":
            text = outcome === "none" ? roll : game.i18n.localize(`pf2e-rpg-numbers.display-text.outcomes.${outcome}`);
            break;
        default:
            break;
    }

    // Determine users to play for
    const usersToPlayFor = getVisibleAndMsgVisibleUsers(roll_deets);

    // Optimize stroke color calculation
    style.stroke =
        usersToPlayFor.length === 1 && game.users.some((u) => u.isGM && u.id === usersToPlayFor[0])
            ? "rgb(0, 100, 100)"
            : undefined;

    // Simplify sequence creation and animation
    const seq = new Sequence();
    seq.effect()
        .atLocation(token, { offset: { y: -0.4 * token.texture.scaleY * token.width }, gridUnits: true })
        .text(`${text}`, style)
        .anchor({ x: 0.5, y: 0.8 })
        .duration(duration)
        .scaleIn(0.5, duration / 3, { ease: "easeOutQuint" })
        .fadeOut(duration / 3)
        .zIndex(2)
        .forUsers(usersToPlayFor);

    // Simplify sound effect handling
    const seq_handled = (await handleSFX(outcome, type, seq, usersToPlayFor))
    await seq_handled.play();
}
async function handleSFX(outcome, type, seq, usersToPlayFor) {
    if (getSetting("check-animations.sfx.enabled") && outcome !== "none") {
        const isAttack = type === "attack-roll";
        const combatSetting = getSetting("check-animations.sfx.check-or-attack");
        if (combatSetting === "both" || combatSetting === (isAttack ? "attacks" : "checks")) {
            let ignoreSFX = false;
            switch (getSetting("check-animations.sfx.options")) {
                case "none":
                    ignoreSFX = true;
                    break;
                case "all":
                    ignoreSFX = false;
                    break;
                case "success-or-fail":
                    outcome = outcome.replace("success", "").toLowerCase();
                    break;
                case "crits-only":
                    ignoreSFX = outcome.startsWith("critical");
                    break;
            }
            if (!ignoreSFX) {
                let sfx = getSetting(`check-animations.sfx.file.${outcome}`)
                if (sfx.startsWith("[")) {
                    const sfxOptions = sfx.slice(1, -1).split(",").map(it => it.replace(/"/g, ""));
                    sfx = Sequencer.Helpers.random_array_element(sfxOptions);
                }
                await Sequencer.Preloader.preloadForClients(sfx);
                seq.sound()
                    .file(sfx)
                    .volume(getSetting("check-animations.sfx.volume") / 100)
                    .forUsers(usersToPlayFor);
            }
        }
    }
    return seq;
}
