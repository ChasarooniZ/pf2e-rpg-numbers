//TODO settings on visuals (colors)
//TODO settings on size etc.
//TODO add scaling based on size
/**
 * Generates damage scrolling text for a passed in list of damage values
 * @param {{type: string, value: string}[]} dmg_list list of type and value
 * @param {string[]} targets list of token ids 
 */
export function generateDamageScroll(dmg_list, targets) {
    const fontSize = game.settings.get("pf2e-rpg-numbers", 'font-size');
    const jitter = game.settings.get("pf2e-rpg-numbers", 'jitter');
    const colors = {
        acid: "0x56fc03",
        bludgeoning: "0xc7c7c7",
        cold: "0x0394fc",
        fire: "0xfc5603",
        force: "0xff006a",
        lightning: "0x0313fc",
        "": "0xffffff",
        piercing: "0xc7c7c7",
        poison: "0x0b6625",
        mental: "0x710996",
        radiant: "0xffff54",
        slashing: "0xc7c7c7",
        electricity: "0x54ffb2",
        healing: "0x09ff00",
        void: "0x4e4e68",
        vitality: "0xffffbf",
        chaotic: "0xa600a6",
        evil: "0x611f90",
        good: "0x9d730a",
        lawful: "0x683e00",
        sonic: "darkcyan",
        bleed: "0x99001a",
        precision: "0xf5bf03"
    };
    const style = {
        "fill": "white",
        "fontSize": fontSize,
        align: "center",
        dropShadow: true,
        strokeThickness: 5,
    }
    const duration = game.settings.get("pf2e-rpg-numbers", 'duration') * 1000;
    const anim_scale = game.settings.get("pf2e-rpg-numbers", 'animation-scale');
    const wait_time = game.settings.get("pf2e-rpg-numbers", 'wait-time-between-numbers') - duration;
    const onlyGM = game.settings.get("pf2e-rpg-numbers", 'show-only-GM');

    for (const target_id of targets) {
        const tok = game.canvas.tokens.get(target_id);
        const size = tok.document.texture.scaleY * tok.document.width;
        const topOffset = size * (game.settings.get("pf2e-rpg-numbers", 'top-offset') / 100);
        const usersToPlayFor = onlyGM ? game.users.filter(u => u.isGM).map(u => u.id) : getVisibleUsers(tok);

        const dmg_list_filtered = dmg_list.filter(d => d.value > 0);
        const seq = new Sequence();

        if (game.settings.get("pf2e-rpg-numbers", 'show-total')) {
            const tot = dmg_list.reduce((tot_dmg, curr_dmg) => tot_dmg + curr_dmg.value, 0)
            style.fontSize = fontSize * getFontScale("percentMaxHealth", tot, tok) * 1.1;
            style.fill = colors[findTypeWithLargestTotal(dmg_list)] ?? 'white';
            seq.effect()
                .atLocation(tok, {
                    offset: {
                        y: topOffset
                    },
                    gridUnits: true,
                })
                .text(`${tot}`, style)
                .anchor({
                    x: 0.5,
                    y: 0.8
                })
                .duration(duration)
                .scaleIn(0.5, duration / 3)
                .fadeOut(duration / 3)
                .zIndex(2)
                .forUsers(usersToPlayFor)
        }

        for (const dmg of dmg_list_filtered) {
            const xMod = Math.round(Math.random()) * 2 - 1;;
            style.fontSize = fontSize * getFontScale("percentMaxHealth", dmg.value, tok);
            style.fill = colors[dmg.type] ?? 'white';
            seq.effect()
                .atLocation(tok, {
                    offset: {
                        y: topOffset
                    },
                    gridUnits: true,
                    randomOffset: jitter
                })
                .text(`${dmg.value}`, style)
                .anchor({
                    x: 0.5,
                    y: 0.8
                })
                .duration(duration)
                .waitUntilFinished(wait_time)
                .scaleIn(0.5, duration / 3)
                .animateProperty("sprite", "position.x", {
                    from: 0,
                    to: size * xMod / 2 * anim_scale,
                    ease: "easeOutSine",
                    duration: duration,
                    gridUnits: true
                })
                .loopProperty("sprite", "position.y", {
                    from: 0,
                    to: -size / 4 * anim_scale,
                    duration: duration / 2,
                    gridUnits: true,
                    pingPong: true
                })
                .fadeOut(duration / 3)
                .forUsers(usersToPlayFor)
        }

        seq.play();
    }
}

/**
 * Generates scrolling text for a Check
 * @param {{outcome: 'none' | 'criticalFailure' | 'failure' | 'success' | 'criticalSuccess', token: token, whisper: string[] roll: number | '', type: 'attack-roll'}} roll_deets 
 */
export function generateRollScroll(roll_deets) {
    const fontSize = game.settings.get("pf2e-rpg-numbers", 'check-font-size');
    const theme = game.settings.get("pf2e-rpg-numbers", 'check-color-scheme');
    const colors =
    {
        default: {
            none: 'white',
            criticalFailure: 'rgb(255, 0, 0)',
            failure: 'rgb(255, 69, 0)',
            success: 'rgb(0, 0, 255)',
            criticalSuccess: 'rgb(0, 128, 0)'
        },
        dark: {
            none: 'white',
            criticalFailure: 'rgb(255, 0, 0)',
            failure: 'rgb(255, 129, 0)',
            success: 'rgb(0, 241, 255)',
            criticalSuccess: 'rgb(107, 255, 0)'
        }
    }
    const style = {
        "fill": colors[theme][roll_deets.outcome],
        "fontSize": fontSize,
        align: "center",
        dropShadow: true,
        strokeThickness: 5,
    }
    const duration = game.settings.get("pf2e-rpg-numbers", 'check-duration') * 1000;
    let text = roll_deets.roll;
    switch (game.settings.get("pf2e-rpg-numbers", 'check-outcome-result')) {
        case "numbers":
            text = roll_deets.roll;
            break;
        case "outcome-except-combat-crits":
            if (roll_deets.type === "attack-roll" || roll_deets.outcome === 'none') {
                text = roll_deets.roll;
            } else {
                text = game.i18n.localize(`pf2e-rpg-numbers.display-text.outcomes.${roll_deets.outcome}`)
            }
            break;
        case "outcome":
            if (roll_deets.outcome === 'none') {
                text = roll_deets.roll;
            } else {
                text = game.i18n.localize(`pf2e-rpg-numbers.display-text.outcomes.${roll_deets.outcome}`)
            }
            break;
        default:
            break;
    }
    const seq = new Sequence();
    seq.effect()
        .atLocation(roll_deets.token,
            {
                offset: {
                    y: -0.4 * roll_deets.token.texture.scaleY * roll_deets.token.width
                },
                gridUnits: true,
            })
        .text(`${text}`, style)
        .anchor({
            x: 0.5,
            y: 0.8
        })
        .duration(duration)
        .scaleIn(0.5, duration / 3)
        .fadeOut(duration / 3)
        .zIndex(2)
        .forUsers(getVisibleUsers(roll_deets.token).filter(player => (roll_deets.whisper.length === 0 ? game.users.map(u => u.id) : roll_deets.whisper).includes(player)))
        .play()
}

/**
 * Shakes the screen based on damage taken and settings
 * @param {*} uuid Uuid of token that took damage
 * @param {*} damage Amount of damage taken
 * @returns 
 */
export function shakeScreen(uuid, damage) {
    const actor = fromUuidSync(uuid);
    if (!actor.hasPlayerOwner && !game.settings.get("pf2e-rpg-numbers", 'shake-gm-enabled')) return;
    const gmID = game.users.activeGM.id;
    const hp = actor.system.attributes.hp;
    const shakeType = game.settings.get("pf2e-rpg-numbers", 'shake-intensity-type');
    const max = game.settings.get("pf2e-rpg-numbers", 'shake-intensity-max');
    const includeTempHP = game.settings.get("pf2e-rpg-numbers", 'shake-intensity-include-temp-hp');
    let shake_amt = 0;
    switch (shakeType) {
        case 'max':
            shake_amt = max;
            break;
        case '%-current-hp':
            shake_amt = max * (damage / (hp.value + damage + (includeTempHP ? hp.temp : 0)));
            break;
        case '%-max-hp':
            shake_amt = max * (damage / (hp.max + (includeTempHP ? hp.temp : 0)));
            break;
        default:
            shake_amt = 0;
    }
    if (!isFinite('Infinity')) shake_amt = max;
    let userToShake;
    if (actor.hasPlayerOwner) {
        userToShake = Object.entries(actor.ownership).filter(perm => perm[1] === 3 && perm[0] !== gmID).map(p => p[0]);
    } else {
        userToShake = [gmID];
    }
    new Sequence()
        .canvasPan()
        .shake({ duration: 250, strength: shake_amt })
        .forUsers(userToShake)
        .play()
}


/**
 * 
 * @param {*} dmg_list 
 * @returns Type of damage taken that is the highest
 */
export function findTypeWithLargestTotal(dmg_list) {
    const typeMap = dmg_list.reduce((acc, { type, value }) => {
        acc[type] = (acc[type] || 0) + value;
        return acc;
    }, {});

    return Object.keys(typeMap).reduce((maxType, type) =>
        typeMap[type] > typeMap[maxType] ? type : maxType
    );
}

/**
 * How much to scale the font off of (1 = 100% of default font size)
 * @param {*} scaleType Type of scaling to use
 * @param {*} dmg How much damage was dealt (to know how big to scale it)
 * @param {*} tok Token this is affecting (to know how big to scale it)
 * @returns scale of font, 1 = 100% of original size
 */
export function getFontScale(scaleType, dmg, tok) {
    const maxFontScale = game.settings.get("pf2e-rpg-numbers", 'max-font-scale');
    let scale = maxFontScale - 1;
    if (scaleType === "percentMaxHealth") {
        scale *= (dmg / (tok.actor.system.attributes.hp.max + tok.actor.system.attributes.hp.temp));
    }
    if (scaleType === "percentRemainingHealth") {
        scale *= (dmg / (tok.actor.system.attributes.hp.value + tok.actor.system.attributes.hp.temp));
    }
    if (scaleType === "none") {
        return 1;
    }
    return Math.max(1, Math.min(scale + 1, maxFontScale))
}

/**
 * Get all users that can see the token
 * @param {*} tok Token trying to be seen
 * @returns Returns list of user ids that can see the token
 */
export function getVisibleUsers(tok) {
    let list = game.users.filter(u => u.isGM).map(u => u.id);
    if (tok?.document) {
        tok = tok.document;
    }
    if (!tok?.hidden) {
        // check vision if pf2e perception active
        if (game.modules.get("pf2e-perception")?.active) {
            let cantSee = [];
            for (const key in tok?.flags?.['pf2e-perception']) {
                if (['undetected', 'unnoticed'].includes(tok?.flags?.['pf2e-perception']?.[key]?.visibility)) {
                    cantSee.push(canvas.tokens.get(key)?.actor?.uuid);
                }
            }
            list = list.concat(game.users.players.filter(u => !cantSee.includes(u?.character?.uuid)).map(u => u.id));
        } else {
            list = game.users.map(u => u.id);
        }
    }
    return list;
}

export function damageShakeRollDamage(token, targets) {
    targets.forEach((target) => {
        const default_shake = (target === token || !token);
        const { x: tok_x, y: tok_y, w: tok_width } = target;
        let ray = new Ray(token, target);
        const shake_distance = 0.2;
        let ray_projection_amt = (tok_width / ray.distance) * shake_distance;
        const shakes = 7
        const seq = new Sequence();
        for (let i = 0; i < shakes; i++) {
            const sign = i % 2 === 0 ? 1 : -1;
            let details = ray.project(1 + sign * ray_projection_amt);
            if (default_shake) details = { x: tok_x + (tok_width * shake_distance * sign), y: tok_y };
            details.ease = "easeInOutSine";
            seq.animation()
                .waitUntilFinished(10)
                .on(target)
                .moveSpeed(10)
                .moveTowards(details)
        }

        seq.animation()
            .waitUntilFinished()
            .on(target)
            .moveSpeed(10)
            .moveTowards({ x: tok_x, y: tok_y, ease: 'easeInOutSine' })
            .play()
    })
}

/**
 * Shakes token on damage
 * @param {*} actor_uuid Token's Actor Uuid
 * @returns 
 */
export function shakeOnDamageToken(actor_uuid, dmg) {
    if (!actor_uuid) return;
    const token = canvas.tokens.placeables.find(t => t.actor.uuid === actor_uuid);
    const [shake_distance_percent, shakes, duration] = getTokenShakeScale(token, dmg);
    const usersToPlayFor = getVisibleUsers(token);
    const { w: tok_width } = token;

    const mov_amt = shake_distance_percent * tok_width;
    let values = [0];
    for (let i = 0; i < shakes; i++) {
        const mod = (i % 2) ? 1 : -1;
        values = values.concat([mod * mov_amt, 0]);
    }
    const it_dur = duration / values.length;
    new Sequence()
        .animation()
        .on(token)
        .hide()
        .waitUntilFinished()
        .effect() //Make sure this only plays to people that can see it
        .atLocation(token)
        .file(token.document.texture.src)
        .scaleToObject(token.document.texture.scaleX)
        .loopProperty("spriteContainer", "position.x", { values, duration: it_dur, ease: 'easeInOutSine', pingPong: true })
        .duration(duration)
        .waitUntilFinished()
        .forUsers(usersToPlayFor)
        .animation()
        .on(token)
        .show()
        .waitUntilFinished()
        .play()
}

/**
 * Turns token towards target when attacking
 * @param {*} token Attack token that will turn
 * @param {*} target Person they are attacking
 */
export function turnTokenOnAttack(token, target) {
    if (!token || !target || token === target) return;
    const angle = token.angle;
    const rotationOffset = token.data.flags?.["pf2e-rpg-numbers"]?.rotationOffset ?? 0;
    new Sequence().animation()
        .on(token)
        .rotateTowards(target, { duration: 500, ease: 'easeInCubic', rotationOffset })
        .waitUntilFinished(250)
        .animation()
        .on(token)
        .rotateIn(angle, 500, { ease: "easeOutCubic" })
        .play()
}

/**
 * Critical hit animation like in fire emblem
 * @param {*} token 
 */
export function fireEmblemCrit(token) {

}

export function getTokenShakeScale(token, dmg) {
    const result = ['distance', 'shakes', 'duration'];
    let values = {
        distance: game.settings.get("pf2e-rpg-numbers", 'tok-shake-distance') / 100,
        shakes: game.settings.get("pf2e-rpg-numbers", 'tok-shake-shakes'),
        duration: game.settings.get("pf2e-rpg-numbers", 'tok-shake-duration')
    }
    const scaleType = game.settings.get("pf2e-rpg-numbers", 'tok-shake-scaling-type');
    const hp = token.actor.system.attributes.hp;
    let scale = 1;
    switch (scaleType) {
        case 'nothing':
            break;
        case '%-current-hp':
            scale = (dmg / (hp.value + dmg + hp.temp));
            break;
        case '%-max-hp':
            scale = (dmg / (hp.max + hp.temp));
            break
        default:
            break;
    }

    return result.map(it => {
        let scaling_option = game.settings.get("pf2e-rpg-numbers", `tok-shake-scaling-${it}`);
        let val = values[it];
        switch (scaling_option) {
            case 'no':
                return val;
            case 'max':
                return val * scale;
            case 'mid':
                return val * scale * 2;
            default:
                return val;
        }
    })

}