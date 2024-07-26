import { getVisibleUsers } from "../anim.js";

export async function pingToken(token, { user = game.user, sceneID = canvas.scene.id, scaling = 1, duration = 1000 }) {
    await canvas.controls.handlePing(user, token.center, {
        scene: sceneID,
        style: "chevron",
        size: ((token.width + token.height) * 1.5 * scaling) / 2,
        duration,
    });
}

export async function pingTokenIfVisible(token, options) {
    if (token.visible&& getVisibleUsers(token)) {
        await pingToken(token, options);
    }
}
