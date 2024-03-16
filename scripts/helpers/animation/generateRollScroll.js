import { getVisibleUsers } from "../anim.js";

/**
 * Generates scrolling text for a Check
 * @param {{outcome: 'none' | 'criticalFailure' | 'failure' | 'success' | 'criticalSuccess', token: token, whisper: string[] roll: number | '', type: 'attack-roll'}} roll_deets
 */
export function generateRollScroll(roll_deets) {
    const fontSize = game.settings.get("pf2e-rpg-numbers", "check-font-size");
    const theme = game.settings.get("pf2e-rpg-numbers", "check-color-scheme");
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
    const style = {
        fill: colors[theme][roll_deets.outcome],
        fontSize: fontSize,
        align: "center",
        dropShadow: true,
        strokeThickness: 5,
    };
    const duration = game.settings.get("pf2e-rpg-numbers", "check-duration") * 1000;
    let text = roll_deets.roll;
    switch (game.settings.get("pf2e-rpg-numbers", "check-outcome-result")) {
        case "numbers":
            text = roll_deets.roll;
            break;
        case "outcome-except-combat-crits":
            if (roll_deets.type === "attack-roll" || roll_deets.outcome === "none") {
                text = roll_deets.roll;
            } else {
                text = game.i18n.localize(`pf2e-rpg-numbers.display-text.outcomes.${roll_deets.outcome}`);
            }
            break;
        case "outcome":
            if (roll_deets.outcome === "none") {
                text = roll_deets.roll;
            } else {
                text = game.i18n.localize(`pf2e-rpg-numbers.display-text.outcomes.${roll_deets.outcome}`);
            }
            break;
        default:
            break;
    }
    const seq = new Sequence();
    seq.effect()
        .atLocation(roll_deets.token, {
            offset: {
                y: -0.4 * roll_deets.token.texture.scaleY * roll_deets.token.width,
            },
            gridUnits: true,
        })
        .text(`${text}`, style)
        .anchor({
            x: 0.5,
            y: 0.8,
        })
        .duration(duration)
        .scaleIn(0.5, duration / 3)
        .fadeOut(duration / 3)
        .zIndex(2)
        .forUsers(
            getVisibleUsers(roll_deets.token).filter((player) => (roll_deets.whisper.length === 0 ? game.users.map((u) => u.id) : roll_deets.whisper).includes(player)
            )
        )
        .play();
}
