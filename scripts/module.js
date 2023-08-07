function extractTerm(term, flavor = '') {
    if (term.class === "NumericTerm") {
        result.push({ dmg: term.number, type: term.options.flavor ?? flavor });
    } else if (term.class === "Die") {
        for (const dieResult of term.results) {
            result.push({ dmg: dieResult.result, type: term.options.flavor ?? flavor });
        }
    } else if (term.class === "Grouping") {
        this.extractTerm(term.term, term?.options?.flavor ?? flavor);
    } else if (term.class === "ArithmeticExpression") {
        for (const operand of term?.operands) {
            extractTerm(operand, flavor);
        }
    } else if (!term?.class) {
        for (const t of term.rolls) {
            for (const tt of term.terms) {
                this.extractTerm(tt, tt?.options?.flavor ?? flavor);
            }
        }
    }
}

/**
 * Extracts the list of damage info from pf2e chat message, breaks down into each individual item
 * @param {*} rolls 
 * @returns 
 */
//TODO make this work
//TODO add options to toggle doubling amt of numbers on crit etc. or combining them
function extractDamageInfo(rolls) {
    const result = [];
    console.log({ rolls })

    for (const inp of rolls) {
        for (const term of inp.terms) {
            for (const roll of term.rolls) {
                const dmg = { type: roll.type, value: roll.total };
                result.push(dmg);
                //console.log("----dmg----");
                //console.log(dmg);
            }
            //console.log({inp, term})
            //this.extractTerm(term, inp?.options?.flavor ?? '');
        }
    }

    return result;
}

/**
 * Extracts the list of damage info from pf2e chat message, only breaks it up between the overarching damage types
 * @param {any} rolls Roll value from pf2e chat message
 * @returns 
 */
function extractDamageInfoCombined(rolls) {
    const result = [];

    for (const inp of rolls) {
        for (const term of inp.terms) {
            for (const roll of term.rolls) {
                const dmg = { type: roll.type, value: roll.total };
                result.push(dmg);
            }
        }
    }
    return result;
}

/**
 * Generates damage scrolling text for a passed in list of damage values
 * @param {{type: string, value: string}[]} dmg_list list of type and value
 * @param {string[]} targets list of token ids 
 */
//TODO settings on visuals (colors)
//TODO settings on size etc.
//TODO add scaling based on % health
//TODO add scaling based on size
function generateDamageScroll(dmg_list, targets) {
    for (const target_id of targets) {
        const tok = game.canvas.tokens.get(target_id);
        const size = tok.document.texture.scaleY * tok.document.width;
        const topOffset = size / 4;
        const fontSize = 20;
        const fontMod = 1;
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
        };
        const style = {
            "fill": "white",
            "fontSize": fontSize * fontMod,
            align: "center",
            dropShadow: true,
            strokeThickness: 5,
        }

        const seq = new Sequence();
        const color = (new RPGNumbers).colors
        for (const dmg of dmg_list.filter(d => d.value > 0)) {
            style.fill = colors?.[dmg.type] ?? 'white';
            seq.scrollingText()
                .atLocation(tok, { offset: { y: topOffset }, gridUnits: true })
                .text(`${dmg.value}`, style)
                .jitter(1)
                .anchor("TOP")
                .waitUntilFinished(-1800)
        }
        seq.play();
    }
}

/**
 * Get list of targets based on a passed in chat msg
 * @param {any} msg Message data from create Chat Message
 * @returns {string[]} A list of all the ids of the targets
 */
function getTargetList(msg) {
    if (msg.flags?.["pf2e-target-damage"]?.targets) {
        return msg.flags.pf2e - target - damage.targets.map(t => t.id);
    } else {
        return [(await fromUuid(msg.flags.pf2e.target.token)).id];
    }
}

Hooks.on("init", async () => {
    console.error("PF2e RPG Numbers is initiated"); if (!game.user.isGM) return;
    game.RPGNumbers = new RPGNumbers();
})

Hooks.on("ready", async () => {
    if (!game.user.isGM) return;
    console.error("PF2e RPG Numbers is ready");
    game.ui.notify("PF2e RPG Numbers is ready")
    //game.RPGNumbers = new RPGNumbers();
})

Hooks.on("createChatMessage", async function (msg, status, id) {
    console.log({ msg })
    if (msg?.flags?.pf2e?.context?.type !== 'damage-roll') return;
    const dmg_list = extractDamageInfoCombined(msg.rolls);
    const targets = getTargetList(msg);
    generateDamageScroll(dmg_list, targets);
})