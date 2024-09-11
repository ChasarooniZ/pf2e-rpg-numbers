import { createCritAnimation } from "./animation/crit/critAnimation.js";
import { createFinishingMoveAnimation } from "./animation/text/finishingMove.js";
import { generateDamageScroll } from "./animation/generateDamageScroll.js";
import { generateRollScroll } from "./animation/generateRollScroll.js";
import { getDamageList } from "./rollTerms.js";

export function createAPI() {
    game.pf2eRPGNumbers = {
        damageNumbers: {
            generate: async function (dmgList, targetIDs) {
                return generateDamageScroll(dmgList, targetIDs);
            },
            getDamageList: function (msg) {
                return getDamageList(msg.rolls);
            },
        },
        finishingMove: {
            generate: function (text) {
                createFinishingMoveAnimation(text);
            },
        },
        rollNumbers: {
            generate: function ({ roll, whisper = [], type = "attack-roll", outcome = "none", token }) {
                generateRollScroll({ roll, whisper, type, outcome, token });
            },
        },
        critAnimation: {
            generate: function (token, critType = "persona") {
                createCritAnimation({ type: "custom", whisper: [], token }, critType);
            },
        },
        turnTokenAttack: {
            generate: function (tokenObject, targetTokenObject) {
                turnTokenAttack(tokenObject, targetTokenObject);
            },
        },
    };
}
