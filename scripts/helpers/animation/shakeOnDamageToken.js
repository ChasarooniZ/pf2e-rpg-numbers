import { getTokenShakeScale, getVisibleUsers } from "../anim.js";

/**
 * Shakes token on damage
 * @param {*} actor_uuid Token's Actor Uuid
 * @returns
 */

export function shakeOnDamageToken(actor_uuid, dmg) {
    if (!actor_uuid) return;
    const token = canvas.tokens.placeables.find((t) => t.actor.uuid === actor_uuid);
    const [shake_distance_percent, shakes, duration] = getTokenShakeScale(token, dmg);
    const usersToPlayFor = getVisibleUsers(token);
    const { w: tok_width } = token;

    const mov_amt = shake_distance_percent * tok_width;
    let values = [0];
    for (let i = 0; i < shakes; i++) {
        const mod = i % 2 ? 1 : -1;
        values = values.concat([mod * mov_amt, 0]);
    }
    const it_dur = duration / values.length;
    const original_opacity = token.alpha;
    new Sequence()
        .animation()
        .on(token)
        .opacity(0)
        .effect()
        .atLocation(token)
        .file(token.document.texture.src)
        .scaleToObject(token.document.texture.scaleX)
        .loopProperty("spriteContainer", "position.x", {
            values,
            duration: it_dur,
            ease: "easeInOutSine",
            pingPong: true,
        })
        .duration(duration)
        .forUsers(usersToPlayFor)
        .animation()
        .on(token)
        .opacity(original_opacity)
        .waitUntilFinished()
        .play();
}
