import { getVisibleUsers, getFontScale, findTypeWithLargestTotal } from "../anim.js";

//TODO settings on visuals (colors)
//TODO settings on size etc.
//TODO add scaling based on size
/**
 * Generates damage scrolling text for a passed in list of damage values
 * @param {{type: string, value: string}[]} dmg_list list of type and value
 * @param {string[]} targets list of token ids
 */
export function generateDamageScroll(dmg_list, targets) {
    const fontSize = game.settings.get("pf2e-rpg-numbers", "font-size");
    const jitter = game.settings.get("pf2e-rpg-numbers", "jitter");
    const colors = {
        bludgeoning: "0x3c3c3c",
        piercing: "0x3c3c3c",
        slashing: "0x3c3c3c",
        acid: "0x007300",
        bleed: "0x99001a",
        chaotic: "0xa600a6",
        cold: "0x2f2fa6",
        electricity: "darkgoldenrod",
        evil: "indigo",
        fire: "0xa62f00",
        force: "0x6300aa",
        good: "0x9d730a",
        lawful: "0x402600",
        mental: "midnightblue",
        poison: "0x5b7332",
        sonic: "darkcyan",
        spirit: "0x5a5585",
        vitality: "0xffffe0",
        void: "0x00001f",
        "": "0xffffff",
        precision: "0xf5bf03",
    };
    const style = {
        fill: "white",
        fontSize: fontSize,
        align: "center",
        dropShadow: true,
        strokeThickness: 5,
    };
    const duration = game.settings.get("pf2e-rpg-numbers", "duration") * 1000;
    const anim_scale = game.settings.get("pf2e-rpg-numbers", "animation-scale");
    const wait_time = game.settings.get("pf2e-rpg-numbers", "wait-time-between-numbers") - duration;
    const onlyGM = game.settings.get("pf2e-rpg-numbers", "show-only-GM");

    for (const target_id of targets) {
        const tok = game.canvas.tokens.get(target_id);
        const size = tok.document.texture.scaleY * tok.document.width;
        const topOffset = size * (game.settings.get("pf2e-rpg-numbers", "top-offset") / 100);
        const usersToPlayFor = onlyGM ? game.users.filter((u) => u.isGM).map((u) => u.id) : getVisibleUsers(tok);

        const dmg_list_filtered = dmg_list.filter((d) => d.value > 0);
        const seq = new Sequence();

        if (game.settings.get("pf2e-rpg-numbers", "show-total")) {
            const tot = dmg_list.reduce((tot_dmg, curr_dmg) => tot_dmg + curr_dmg.value, 0);
            style.fontSize = fontSize * getFontScale("percentMaxHealth", tot, tok) * 1.1;
            style.fill = colors[findTypeWithLargestTotal(dmg_list)] ?? "white";
            seq.effect()
                .atLocation(tok, {
                    offset: {
                        y: topOffset,
                    },
                    gridUnits: true,
                })
                .text(`${tot}`, style)
                .anchor({
                    x: 0.5,
                    y: 0.8,
                })
                .duration(duration)
                .scaleIn(0.5, duration / 3)
                .fadeOut(duration / 3)
                .zIndex(2)
                .forUsers(usersToPlayFor);
        }

        for (const dmg of dmg_list_filtered) {
            const xMod = Math.round(Math.random()) * 2 - 1;
            style.fontSize = fontSize * getFontScale("percentMaxHealth", dmg.value, tok);
            style.fill = colors[dmg.type] ?? "white";
            seq.effect()
                .atLocation(tok, {
                    offset: {
                        y: topOffset,
                    },
                    gridUnits: true,
                    randomOffset: jitter,
                })
                .text(`${dmg.value}`, style)
                .anchor({
                    x: 0.5,
                    y: 0.8,
                })
                .duration(duration)
                .waitUntilFinished(wait_time)
                .scaleIn(0.5, duration / 3)
                .animateProperty("sprite", "position.x", {
                    from: 0,
                    to: ((size * xMod) / 2) * anim_scale,
                    ease: "easeOutSine",
                    duration: duration,
                    gridUnits: true,
                })
                .loopProperty("sprite", "position.y", {
                    from: 0,
                    to: (-size / 4) * anim_scale,
                    duration: duration / 2,
                    gridUnits: true,
                    pingPong: true,
                })
                .fadeOut(duration / 3)
                .forUsers(usersToPlayFor);
        }

        seq.play();
    }
}
