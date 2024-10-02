import { debugLog, getSetting } from "./misc.js";

export function getDamageList(rolls) {
    const split_type = getSetting("damage-split");
    switch (split_type) {
        case "by-damage-type":
            return extractDamageInfoCombined(rolls);
        case "all":
            return extractDamageInfoAll(rolls);
        case "none":
        default:
            return extractDamageInfoSimple(rolls);
    }
}

export function extractDamageInfoCombined(rolls) {
    return rolls.flatMap(inp =>
        inp?.terms?.flatMap(term =>
            term?.rolls?.map(roll => ({
                type: roll.type,
                value: roll.total,
            })) || []
        ) || []
    );
}

export function extractDamageInfoAll(rolls) {
    return rolls.flatMap(inp =>
        inp?.terms?.flatMap(term => extractTerm(term)) || []
    );
}

export function extractDamageInfoSimple(rolls) {
    return [{ type: "", value: rolls.total }];
}

export function extractTerm(term, flavor = "") {
    let result = [];
    const termName = term.constructor.name;

    if (termProcessors[termName]) {
        result = termProcessors[termName](term, result, flavor);
    } else {
        console.error("Unrecognized Term when extracting parts", term);
        result.push({ value: term.total, type: term.flavor || flavor });
    }

    debugLog({ type: termName, result }, "extractTerm");
    return result;
}

const termProcessors = {
    "InstancePool": processInstancePool,
    "DamageInstance": processDamageInstance,
    "Grouping": processGrouping,
    "ArithmeticExpression": processArithmeticExpression,
    "Die": processDie,
    "NumericTerm": processNumericTerm,
};

function processGrouping(term, result, flavor) {
    return result.concat(extractTerm(term.term, term.flavor || flavor));
}

function processInstancePool(term, result, flavor) {
    return result.concat(term.rolls.flatMap(roll => extractTerm(roll, term.flavor || flavor)));
}

function processDamageInstance(term, result, flavor) {
    result = term.terms.flatMap(item => extractTerm(item, term.types || flavor));
    const keepPersistent = !!term.options.evaluatePersistent;
    return result.filter(res => (res?.type?.startsWith("persistent,") ? keepPersistent : true))
        .map(r => ({ value: r.value, type: r.type.replace(/persistent,/g, "") }));
}

function processArithmeticExpression(term, result, flavor) {
    const operands = term.operands.map(op => extractTerm(op, term.flavor || flavor)).flat();
    if (term.operator === "+") {
        return result.concat(operands);
    }
    if (term.operator === "-") {
        const [first, second] = operands;
        second.value = -second.value;
        return result.concat(first, second);
    }
    if (term.operator === "*") {
        // This works on the assumption of times 2
        const [first, second] = operands;
        // add a way to figure out which is number
        return result.concat(...Array(second).fill(first));
    }
    return result;
}

function processDie(term, result, flavor) {
    return result.concat(term.results.map(dice => ({ value: dice.result, type: term.flavor || flavor })));
}

function processNumericTerm(term, result, flavor) {
    result.push({ value: term.number, type: term.flavor || flavor });
    return result;
}