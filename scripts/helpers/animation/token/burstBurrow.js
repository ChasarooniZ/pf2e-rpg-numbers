import { MS_TO_SEC } from "../../const.js";
import { getSetting } from "../../misc.js";
import { MODULE_ID } from "../../const.js";

export function burstBurrow(data) {
    if (!data?.token) return;
    if (!crossesZero(data?.elevationA, data?.elevationB)) return;
    if (!getSetting("burst-burrow.ignore-speed")) {
        const hasBurrow = data?.token?.actor?.system?.attributes?.speed?.otherSpeeds?.some(
            (spd) => spd.type === "burrow"
        );
        if (!hasBurrow) return;
    }
    // In Seconds
    const duration = getSetting("burst-burrow.duration") * MS_TO_SEC;
    // Should the ground hole stay?
    const persistent = getSetting("burst-burrow.persistent");
    //Size of the FXs
    const sizeMultiplier = getSetting("burst-burrow.size-multiplier");

    //Animation
    new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
        .effect() //Ground FX
        .atLocation(data?.token)
        .file("jb2a.burrow.out.01.still_frame.0")
        .scaleToObject(3 * sizeMultiplier)
        .persist(persistent)
        .belowTokens()
        .duration(duration)
        .fadeIn(600, { ease: "easeInExpo", delay: 200 })
        .fadeOut(MS_TO_SEC)
        .effect() //Burst FX
        .atLocation(data?.token)
        .file("jb2a.burrow.out.01.brown.1")
        .scaleToObject(3 * sizeMultiplier)
        .belowTokens()
        .play({ preload: true });
}

function crossesZero(a, b) {
    if (isNaN(a) || isNaN(b)) return false;
    return Math.min(a, b) < 0 && Math.max(a, b) >= 0;
}

export async function burrow(coord1, coord2, data) {
    if (!data?.token) return;
    if (!getSetting("burst-burrow.ignore-speed")) {
        const hasBurrow = data?.token?.actor?.system?.attributes?.speed?.otherSpeeds?.some(
            (spd) => spd.type === "burrow"
        );
        if (!hasBurrow) return;
    }
    if (coord1 === coord2) return;
    const token = data.token.object;
    const file = "jb2a.burrow.ranged.01.brown";
    return new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
        .animation()
        .on(token)
        .opacity(0)
        .waitUntilFinished()
        .effect()
        .scale(Math.max((token.document.width + token.document.height) / 4, 1))
        .atLocation(coord1)
        .stretchTo(coord2)
        .belowTokens()
        .file(file)
        .waitUntilFinished(-3000)
        .animation()
        .on(token)
        .fadeIn(500, { ease: "easeInCubic" })
        .opacity(1)
        .play({ preload: true });
}
