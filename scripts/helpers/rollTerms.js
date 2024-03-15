import { debugLog } from "./misc.js";
export function getDamageList(rolls) {
    const split_type = game.settings.get("pf2e-rpg-numbers", "damage-split");
    let dmg_list = [];
    switch (split_type) {
        case "none":
            dmg_list = extractDamageInfoSimple(rolls);
            break;
        case "by-damage-type":
            dmg_list = extractDamageInfoCombined(rolls);
            break;
        case "all":
            dmg_list = extractDamageInfoAll(rolls);
            break;
        default:
            dmg_list = extractDamageInfoSimple(rolls);
            break;
    }
    return dmg_list;
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
                    value: roll.total,
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
            result = result.concat(extractTerm(term));
        }
    }
    return result;
}

export function extractDamageInfoSimple(rolls) {
    return [
        {
            type: "",
            value: rolls.total,
        },
    ];
}

export function extractTerm(term, flavor = "") {
    let result = [];
    switch (term.constructor.name) {
        case "InstancePool":
            result = processInstancePool(term, result, flavor);
            break;
        case "DamageInstance":
            result = processDamageInstance(term, result, flavor);
            break;
        case "Grouping":
            result = processGrouping(result, term, flavor);
            break;
        case "ArithmeticExpression":
            result = processArithmeticExpression(term, result, flavor);
            break;
        case "Die":
            result = processDie(term, result, flavor);
            break;
        case "NumericTerm":
            result = processNumericTerm(result, term, flavor);
            break;

        default:
            console.error("Unrecognized Term when extracting parts", term);
            result.push({
                value: term.total,
                type: term.flavor || flavor,
            });
            break;
    }
    debugLog(
        {
            type: term.constructor.name,
            result,
        },
        "extractTerm"
    );

    return result;
}

function processGrouping(result, term, flavor) {
    return result.concat(extractTerm(term.term, term.flavor || flavor));
}

function processInstancePool(term, result, flavor) {
    for (const roll of term.rolls) {
        result = result.concat(extractTerm(roll, term.flavor || flavor));
    }
    return result;
}

function processDamageInstance(term, result, flavor) {
    for (const item of term.terms) {
        result = result.concat(extractTerm(item, term.types || flavor));
    }
    const keepPersistent = !!term.options.evaluatePersistent;
    result = result
        .filter((res) => (res.type.startsWith("persistent,") ? keepPersistent : true))
        .map((r) => ({
            value: r.value,
            type: r.type.replace(/persistent,/g, ""),
        }));
    return result;
}

function processArithmeticExpression(term, result, flavor) {
    switch (term.operator) {
        case "+":
            for (const op of term.operands) {
                result = result.concat(extractTerm(op, term.flavor || flavor));
            }
            break;
        case "-":
            result = result.concat(extractTerm(term.operands[0], term.flavor || flavor));
            result = result.concat(extractTerm(term.operands[1], term.flavor || flavor)).map((t) => {
                return {
                    value: -t.value,
                    type: t.type,
                };
            });
            break;
        case "*":
            if (["NumericTerm", "Die"].includes(term.operands[0].constructor.name)) {
                result = result.concat(extractTerm(term.operands[1], term.flavor || flavor).flatMap((i) => [i, i]));
            } else if (["NumericTerm", "Die"].includes(term.operands[1].constructor.name)) {
                result = result.concat(extractTerm(term.operands[0], term.flavor || flavor).flatMap((i) => [i, i]));
            } else {
                result.push({
                    value: term.total,
                    type: term.flavor || flavor,
                });
            }
            break;
        default:
            break;
    }
    return result;
}

function processDie(term, result, flavor) {
    for (const dice of term.results) {
        result.push({
            value: dice.result,
            type: term.flavor || flavor,
        });
    }
    return result;
}

function processNumericTerm(result, term, flavor) {
    return result.push({
        value: term.number,
        type: term.flavor || flavor,
    });
}
