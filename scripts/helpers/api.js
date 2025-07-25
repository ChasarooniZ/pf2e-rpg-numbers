import { createCritAnimation } from "./animation/crit/critAnimation.js";
import { createFinishingMoveAnimation } from "./animation/text/finishingMove.js";
import { generateDamageScroll } from "./animation/generateDamageScroll.js";
import { generateRollScroll } from "./animation/generateRollScroll.js";
import { getDamageList } from "./rollTerms.js";
import { turnTokenOnAttack } from "./animation/token/turnTokenOnAttack.js";
import { exportSettings } from "./forms/exportSettings.js";
import { importSettings } from "./forms/importSettings.js";
import { migrateTokenSettingsToActorSettings } from "./library/migration.js";
import { EnhancedTour } from "./library/EnhancedTour.js";
import { vsAnimation } from "./animation/text/vsAnimation.js";
import { fromSoftwareDeath, fromSoftwareNounVerbed } from "./animation/text/fromSoftwareText.js";
import { darkestDungeonRelief, darkestDungeonStress } from "./animation/token/darkestDungeonStress.js";

export function createAPI() {
    game.pf2eRPGNumbers = {
        damageNumbers: {
            generate: async function (dmgList, targetIDs) {
                return generateDamageScroll(dmgList, targetIDs, { whisper: game.users.map((u) => u.id) });
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
            generate: function (token, critType = "") {
                createCritAnimation({ type: "custom", whisper: [], token: token.document }, critType);
            },
        },
        turnTokenAttack: {
            generate: function (tokenObject, targetTokenObject) {
                turnTokenOnAttack(tokenObject, targetTokenObject);
            },
        },
        fromSoftware: {
            nounVerbed: fromSoftwareNounVerbed,
            death: fromSoftwareDeath,
        },
        vs: {
            generate: vsAnimation,
        },
        darkestDungeon: {
            relief: function (token) { darkestDungeonRelief(token) },
            stress: function (token) { darkestDungeonStress(token) },
        },
        settings: {
            export: exportSettings,
            import: importSettings,
        },
        migration: {
            tokenSettingsToActor: migrateTokenSettingsToActorSettings,
        },
        tour: {
            new: function (tourData) {
                return new EnhancedTour(tourData);
            },
        },
    };
}
