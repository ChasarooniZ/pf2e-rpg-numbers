import { createCritAnimation } from "./animation/crit/critAnimation.js";
import { createFinishingMoveAnimation } from "./animation/text/finishingMove.js";
import { generateDamageScroll } from "./animation/generateDamageScroll.js";
import { generateRollScroll } from "./animation/generateRollScroll.js";
import { getDamageList } from "./rollTerms.js";
import { eldenRingDeath, eldenRingNounVerbed, sekiroDeath } from "./animation/text/fromSoftwareText.js";
import { turnTokenOnAttack } from "./animation/turnTokenOnAttack.js";
import { exportSettings } from "./forms/exportSettings.js";
import { importSettings } from "./forms/importSettings.js";
import { getSetting } from "./misc.js";

export function createAPI() {
    game.pf2eRPGNumbers = {
        damageNumbers: {
            generate: async function (dmgList, targetIDs) {
                return generateDamageScroll(dmgList, targetIDs, { whisper: game.users.map(u => u.id) });
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
            generate: function (token, critType = getSetting("critical.type")) {
                createCritAnimation({ type: "custom", whisper: [], token: token.document }, critType);
            },
        },
        turnTokenAttack: {
            generate: function (tokenObject, targetTokenObject) {
                turnTokenOnAttack(tokenObject, targetTokenObject);
            },
        },
        fromSoftware: {
            eldenRing: {
                nounVerbed: eldenRingNounVerbed,
                death: eldenRingDeath
            },
            sekiro: {
                death: sekiroDeath
            }
        },
        settings: {
            export: exportSettings,
            import: importSettings
        }
    };
}
