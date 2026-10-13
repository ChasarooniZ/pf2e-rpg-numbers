import { gengaAPI } from "../../misc.js";

export async function tokenBounceOnAttack(token, targetToken) {
    if (!token || !targetToken || token === targetToken) return;
    gengaAPI().token.bounceToTarget(token, targetToken);
}
