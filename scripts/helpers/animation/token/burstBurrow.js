import { getSetting } from "../../misc.js";

export function burstBurrow(data) {
    if (crossesZero(data?.elevationA ?? 0, data?.elevationB ?? 0)) return;

    const hasBurrow = data?.token?.actor?.system?.attributes?.speed?.otherSpeeds?.some((spd) => spd.type === 'burrow');
    if (!hasBurrow)
        return;

    const duration = getSetting("burst-burrow.duration") * 1000 // In Seconds
    const persistent = getSetting("burst-burrow.persistent"); // Should the ground hole stay?
    const sizeMultiplier = getSetting('burst-burrow.size-multiplier'); //Size of the FXs
    //Animation
    new Sequence()
        .effect() //Ground FX
        .atLocation(token)
        .file("jb2a.burrow.out.01.still_frame.0")
        .scaleToObject(3 * sizeMultiplier)
        .persist(persistent)
        .belowTokens()
        .duration(duration)
        .fadeIn(600, { ease: "easeInExpo", delay: 200 })
        .fadeOut(1000)
        .effect() //Burst FX
        .atLocation(token)
        .file("jb2a.burrow.out.01.brown.1")
        .scaleToObject(3 * sizeMultiplier)
        .belowTokens()
        .play()
}

function crossesZero(a, b) {
    return Math.min(a, b) < 0 && Math.max(a, b) >= 0;
}