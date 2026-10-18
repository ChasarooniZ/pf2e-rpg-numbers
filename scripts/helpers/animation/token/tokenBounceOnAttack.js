import { gengaAPI } from "../../misc.js";

export async func(token, targetToken) {
    if (!token || !targetToken || token === targetToken) return;
    gengaAPI().token.bounceToTarget(token, targetToken);
}
