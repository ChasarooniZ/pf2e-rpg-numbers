// import {generateDamageScroll, extractDamageInfoCombined, getTargetList} from './utility.js'
// HOOKS STUFF
Hooks.on("ready", async () => {
    console.error("PF2e RPG Numbers is ready");
    ui.notifications.notify("PF2e RPG Numbers is ready")
    //game.RPGNumbers = new RPGNumbers();
})

Hooks.on("createChatMessage", async function (msg, status, id) {
    debugLog({ msg })
    if (!msg.isDamageRoll || !game.user.isGM) return;
    const dmg_list = getDamageList(msg.rolls);
    const targets = getTargetList(msg);
    debugLog({ targets, dmg_list })
    generateDamageScroll(dmg_list, targets);
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
//TODO add scaling based on % health
//TODO add scaling based on size
/**
 * Generates damage scrolling text for a passed in list of damage values
 * @param {{type: string, value: string}[]} dmg_list list of type and value
 * @param {string[]} targets list of token ids 
 */
export function generateDamageScroll(dmg_list, targets) {
    for (const target_id of targets) {
        const tok = game.canvas.tokens.get(target_id);
        const size = tok.document.texture.scaleY * tok.document.width;
        const topOffset = size * (game.settings.get("pf2e-rpg-numbers", 'top-offset') / 100);
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

        const dmg_list_filtered = dmg_list.filter(d => d.value > 0);
        const seq = new Sequence();
        for (const dmg of dmg_list_filtered) {
            style.fontSize = fontSize * getFontScale("percentMaxHealth", dmg.value, tok);
            style.fill = colors[dmg.type] ?? 'white';
            seq.scrollingText()
                .atLocation(tok, { offset: { y: topOffset }, gridUnits: true })
                .text(`${dmg.value}`, style)
                .jitter(jitter)
                .anchor("TOP")
                .waitUntilFinished(-1800)
        }
        seq.play();
    }
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
                result.push({ type: roll.type, value: roll.total });
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
    return [{ type: '', value: rolls.total }]
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
                    result = result.concat(extractTerm(term.operands[1], term.flavor || flavor)).map(t => { return { value: -t.value, type: t.type } });
                case '*':
                    if (['NumericTerm', 'Die'].includes(term.operands[0].class)) {
                        result = result.concat(extractTerm(term.operands[1], term.flavor || flavor).flatMap(i => [i, i]));
                    } else if (['NumericTerm', 'Die'].includes(term.operands[1].class)) {
                        result = result.concat(extractTerm(term.operands[0], term.flavor || flavor).flatMap(i => [i, i]));
                    } else {
                        result.push({ value: term.total, type: term.flavor || flavor })
                    }

                    break;
                default:
                    break;
            }
            break;
        case 'Die':
            for (const dice of term.results) {
                result.push({ value: dice.result, type: term.flavor || flavor })
            }
            break;
        case 'NumericTerm':
            result.push({ value: term.number, type: term.flavor || flavor })
            break;

        default:
            console.error("Unrecognized Term when extracting parts", term)
            result.push({ value: term.total, type: term.flavor || flavor })
            break;
    }
    debugLog({type: term.constructor.name, result}, 'extractTerm')

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

export function debugLog(data, context = "") {
    if (game.settings.get("pf2e-rpg-numbers", 'debug-mode'))
        console.log(`PF2E-RPG-#s: ${context}`, data);
}