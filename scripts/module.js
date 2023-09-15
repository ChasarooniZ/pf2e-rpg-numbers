// import {generateDamageScroll, extractDamageInfoCombined, getTargetList} from './utility.js'
// HOOKS STUFF
Hooks.on("ready", async () => {
    //console.error("PF2e RPG Numbers is ready");
    //ui.notifications.notify("PF2e RPG Numbers is ready")
    //game.RPGNumbers = new RPGNumbers();
})

Hooks.on("createChatMessage", async function (msg, status, id) {
    if (!game.settings.get("pf2e-rpg-numbers", 'enabled')) return;
    debugLog({
        msg
    })
    if (game.user.isGM) {
        if (msg.isDamageRoll && game.settings.get("pf2e-rpg-numbers", 'dmg-enabled')) {
            const dmg_list = getDamageList(msg.rolls);
            const targets = getTargetList(msg);
            debugLog({
                targets,
                dmg_list
            })
            generateDamageScroll(dmg_list, targets);
        }
        if (msg.isCheckRoll && game.settings.get("pf2e-rpg-numbers", 'check-enabled')) {
            const roll_deets = {
                outcome: msg.flags.pf2e.context.outcome ?? 'none',
                token: msg.token,
                whisper: msg.whisper,
                roll: msg.rolls[0]?.total ?? ''
            }
            generateRollScroll(roll_deets);
        }
    }
})

export function getTargetList(msg) {
    if (msg.flags?.["pf2e-target-damage"]?.targets) {
        return msg.flags['pf2e-target-damage'].targets.map(t => t.id);
    } else { // No pf2e target damage module
        return [msg?.target?.token?.id ?? msg.token.id];
    }
}

export function getDamageList(rolls) {
    const split_type = game.settings.get("pf2e-rpg-numbers", 'damage-split');
    let dmg_list = [];
    switch (split_type) {
        case 'none':
            dmg_list = extractDamageInfoSimple(rolls);
            break;
        case 'by-damage-type':
            dmg_list = extractDamageInfoCombined(rolls);
            break;
        case 'all':
            dmg_list = extractDamageInfoAll(rolls);
            break;
        default:
            dmg_list = extractDamageInfoSimple(rolls);
            break;
    }
    return dmg_list;
}

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
        negative: "0x4e4e68",
        positive: "0xffffbf",
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
 * 
 * @param {{outcome: 'none' | 'criticalFailure' | 'failure' | 'success' | 'criticalSuccess', token: token, whisper: string[] roll: number | ''}} roll_deets 
 */
export function generateRollScroll(roll_deets) {
    const fontSize = game.settings.get("pf2e-rpg-numbers", 'check-font-size');
    const colors = {
        none: 'white',
        criticalFailure: 'rgb(255, 0, 0)',
        failure: 'rgb(255, 69, 0)',
        success: 'rgb(0, 0, 255)',
        criticalSuccess: 'rgb(0, 128, 0)'

    }
    const style = {
        "fill": colors[roll_deets.outcome],
        "fontSize": fontSize,
        align: "center",
        dropShadow: true,
        strokeThickness: 5,
    }
    const duration = game.settings.get("pf2e-rpg-numbers", 'check-duration') * 1000;
    const seq = new Sequence();
    seq.effect()
        .atLocation(roll_deets.token, {
            offset: {
                y: 0.4 * roll_deets.token.texture.scaleY * roll_deets.token.width
            },
            gridUnits: true,
        })
        .text(`${roll_deets.roll}`, style)
        .anchor({
            x: 0.5,
            y: 0.8
        })
        .duration(duration)
        .scaleIn(0.5, duration / 3)
        .fadeOut(duration / 3)
        .zIndex(2)
        .forUsers(game.users.filter(u => roll_deets.whisper.length === 0 || roll_deets.whisper.includes(u.id)))
        .play()
}

export function getVisibleUsers(tok) {
    let list = game.users.filter(u => u.isGM).map(u => u.id);
    if (!tok.document.hidden) {
        // check vision if pf2e perception active
        if (game.modules.get("pf2e-perception").active) {
            let cantSee = [];
            for (const key in tok.document?.flags?.['pf2e-perception']) {
                if (['undetected', 'unnoticed'].includes(tok.document?.flags?.['pf2e-perception']?.[key]?.visibility)) {
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

/**
 * Extracts the list of damage info from pf2e chat message, only breaks it up between the overarching damage types
 * @param {any} rolls Roll value from pf2e chat message
 * @returns 
 */
export function extractDamageInfoCombined(rolls) {
    const result = [];

    for (const inp of rolls) {
        for (const term of inp.terms) {
            for (const roll of term.rolls) {
                result.push({
                    type: roll.type,
                    value: roll.total
                });
            }
        }
    }
    return result;
}

export function extractDamageInfoAll(rolls) {
    let result = [];

    for (const inp of rolls) {
        for (const term of inp.terms) {
            result = result.concat(extractTerm(term))
        }
    }
    return result;
}

export function extractDamageInfoSimple(rolls) {
    return [{
        type: '',
        value: rolls.total
    }]
}

export function extractTerm(term, flavor = '') {
    let result = [];
    switch (term.constructor.name) {
        case 'InstancePool':
            for (const roll of term.rolls) {
                result = result.concat(extractTerm(roll, term.flavor || flavor));
            }
            break;
        case 'DamageInstance':
            for (const item of term.terms) {
                result = result.concat(extractTerm(item, term.types || flavor));
            }
            const keepPersistent = !!term.options.evaluatePersistent;
            result = result
                .filter(res => res.type.startsWith('persistent,') ? keepPersistent : true)
                .map(r => ({
                    value: r.value,
                    type: r.type.replace(/persistent,/g, '')
                }))
            break;
        case 'Grouping':
            result = result.concat(extractTerm(term.term, term.flavor || flavor));
            break;
        case 'ArithmeticExpression':
            switch (term.operator) {
                case '+':
                    for (const op of term.operands) {
                        result = result.concat(extractTerm(op, term.flavor || flavor));
                    }
                    break;
                case '-':
                    result = result.concat(extractTerm(term.operands[0], term.flavor || flavor));
                    result = result.concat(extractTerm(term.operands[1], term.flavor || flavor)).map(t => {
                        return {
                            value: -t.value,
                            type: t.type
                        }
                    });
                case '*':
                    if (['NumericTerm', 'Die'].includes(term.operands[0].constructor.name)) {
                        result = result.concat(extractTerm(term.operands[1], term.flavor || flavor).flatMap(i => [i, i]));
                    } else if (['NumericTerm', 'Die'].includes(term.operands[1].constructor.name)) {
                        result = result.concat(extractTerm(term.operands[0], term.flavor || flavor).flatMap(i => [i, i]));
                    } else {
                        result.push({
                            value: term.total,
                            type: term.flavor || flavor
                        })
                    }
                    break;
                default:
                    break;
            }
            break;
        case 'Die':
            for (const dice of term.results) {
                result.push({
                    value: dice.result,
                    type: term.flavor || flavor
                })
            }
            break;
        case 'NumericTerm':
            result.push({
                value: term.number,
                type: term.flavor || flavor
            })
            break;

        default:
            console.error("Unrecognized Term when extracting parts", term)
            result.push({
                value: term.total,
                type: term.flavor || flavor
            })
            break;
    }
    debugLog({
        type: term.constructor.name,
        result
    }, 'extractTerm')

    return result;
}

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

export function findTypeWithLargestTotal(dmg_list) {
    const typeMap = dmg_list.reduce((acc, { type, value }) => {
        acc[type] = (acc[type] || 0) + value;
        return acc;
    }, {});

    return Object.keys(typeMap).reduce((maxType, type) =>
        typeMap[type] > typeMap[maxType] ? type : maxType
    );
}

export function debugLog(data, context = "") {
    if (game.settings.get("pf2e-rpg-numbers", 'debug-mode'))
        console.log(`PF2E-RPG-#s: ${context}`, data);
}