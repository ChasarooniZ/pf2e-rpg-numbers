import { getFontScale, findTypeWithLargestTotal, getVisibleAndMsgVisibleUsers } from "../anim.js";
import { getSetting } from "../misc.js";

/**
 * Generates damage scrolling text for a passed in list of damage values
 * @param {{type: string, value: string}[]} dmg_list list of type and value
 * @param {string[]} targets list of token ids
 */
export async function generateDamageScroll(dmg_list, targets, msg) {
    const settings = {
        fontSize: getSetting("font-size"),
        jitter: getSetting("jitter"),
        duration: getSetting("duration") * 1000,
        animScale: getSetting("animation-scale"),
        waitTime: getSetting("wait-time-between-numbers") - getSetting("duration") * 1000,
        onlyGM: getSetting("show-only-GM"),
        topOffsetPercentage: getSetting("top-offset") / 100,
        showTotal: getSetting("show-total"),
    };

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
        healing: "lightgreen",
        sonic: "darkcyan",
        spirit: "0x5a5585",
        vitality: "0xffffe0",
        void: "0x00001f",
        "": "0xffffff",
        precision: "0xf5bf03",
    };

    const style = {
        fill: "white",
        fontSize: settings.fontSize,
        align: "center",
        dropShadow: true,
        strokeThickness: 5,
    };

    const seq = new Sequence();

    for (const target_id of targets) {
        const tok = game.canvas.tokens.get(target_id);
        const size = tok.document.texture.scaleY * tok.document.width;
        const topOffset = size * settings.topOffsetPercentage;
        const usersToPlayFor = settings.onlyGM
            ? game.users.filter((u) => u.isGM).map((u) => u.id)
            : getVisibleAndMsgVisibleUsers({ token: tok, whisper: msg.whisper });

        if (usersToPlayFor.length === 1 && game.users.some((u) => u.isGM && u.id === usersToPlayFor[0])) {
            style.stroke = "rgb(0, 100, 100)";
        }

        const dmgListFiltered = dmg_list.filter((d) => d.value > 0);

        if (settings.showTotal) {
            const totalDamage = dmgListFiltered.reduce((tot_dmg, curr_dmg) => tot_dmg + curr_dmg.value, 0);
            style.fontSize = settings.fontSize * getFontScale("percentMaxHealth", totalDamage, tok) * 1.1;
            style.fill = colors[findTypeWithLargestTotal(dmg_list)] ?? "white";

            seq.effect()
                .syncGroup(`${msg.id}-total`)
                .atLocation(tok, { offset: { y: topOffset }, gridUnits: true })
                .text(`${totalDamage}`, style)
                .anchor({ x: 0.5, y: 0.8 })
                .duration(settings.duration)
                .scaleIn(0.5, settings.duration / 3)
                .fadeOut(settings.duration / 3)
                .zIndex(2)
                .forUsers(usersToPlayFor);
        }

        dmgListFiltered.forEach((dmg, index) => {
            const xMod = Math.round(Math.random()) * 2 - 1;
            style.fontSize = settings.fontSize * getFontScale("percentMaxHealth", dmg.value, tok);
            style.fill = colors[dmg.type] ?? "white";

            seq.effect()
                .syncGroup(`${msg.id}-breakdown-${index}`)
                .atLocation(tok, { offset: { y: topOffset }, gridUnits: true, randomOffset: settings.jitter })
                .text(`${dmg.value}`, style)
                .anchor({ x: 0.5, y: 0.8 })
                .duration(settings.duration)
                .waitUntilFinished(settings.waitTime)
                .scaleIn(0.5, settings.duration / 3)
                .animateProperty("sprite", "position.x", {
                    from: 0,
                    to: ((size * xMod) / 2) * settings.animScale,
                    ease: "easeOutSine",
                    duration: settings.duration,
                    gridUnits: true,
                })
                .loopProperty("sprite", "position.y", {
                    from: 0,
                    to: (-size / 4) * settings.animScale,
                    duration: settings.duration / 2,
                    gridUnits: true,
                    pingPong: true,
                })
                .fadeOut(settings.duration / 3)
                .forUsers(usersToPlayFor);
        });
    }

    await seq.play();
}
