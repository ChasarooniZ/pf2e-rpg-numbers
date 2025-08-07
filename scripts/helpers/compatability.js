export function isVisionerActive() {
    return !!game.modules.get("pf2e-visioner")?.active;
}

export function isPerceptionActive() {
    return !!game.modules.get("pf2e-perception")?.active;
}

export function getTokenIDsThatSeeTokenVisioner(tok) {
    const cantSee = []
    const api = game.modules.get("pf2e-visioner").api;
    for (const tokenID of canvas.tokens.placeables.map(t => t.id)) {
        if (api.getVisibility(tokenID, tok.id) === 'undetected') {
            cantSee.push(canvas.tokens.get(tokenID)?.actor?.uuid)
        }
    }
    return cantSee;
}

export function getTokenIDsThatSeeTokenPerception(tok) {
    const cantSee = []
    for (const key in tok?.flags?.["pf2e-perception"]?.data) {
        if (
            ["undetected", "unnoticed"].includes(
                tok?.flags?.["pf2e-perception"]?.data?.[key]?.visibility
            )
        ) {
            cantSee.push(canvas.tokens.get(key)?.actor?.uuid);
        }
    }
    return cantSee;
}

export function isVisiblePerception(tokenDoc) {
    return !Object.values(tokenDoc.flags?.["pf2e-perception"]?.data ?? {})
        ?.some((item) =>
            ["undetected", "unnoticed"].includes(item?.visibility)
        )
}

export function isHiddenPerception(tokenDoc) {
    return Object.values(
        tokenDoc.flags?.["pf2e-perception"]?.data ?? {}
    )?.some((item) =>
        ["hidden", "concealed"].includes(item?.visibility)
    )
}

export function isVisibleVisioner(tokenDoc, combatantTokens) {
    return !isVisionerActive() ||
        !combatantTokens.some(tok =>
            game.modules.get("pf2e-visioner").api
                .getVisibility(tok.id, tokenDoc.id) === 'undetected'
        )
}

export function isHiddenVisioner(tokenDoc, combatantTokens) {
    return isVisionerActive() &&
        combatantTokens.some(tok =>
            ['hidden', 'concealed'].includes(
                game.modules.get("pf2e-visioner").api
                    .getVisibility(tok.id, tokenDoc.id)
            )
        )
}