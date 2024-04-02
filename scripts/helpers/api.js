import { createCritAnimation } from "./animation/crit-animation.js";
import { createFinishingMoveAnimation } from "./animation/finishing-move.js";
import { generateDamageScroll } from "./animation/generateDamageScroll.js";
import { generateRollScroll } from "./animation/generateRollScroll.js";
import { MODULE_ID } from "./misc.js";
import { getDamageList } from "./rollTerms.js";
/**
 * Define your class that extends FormApplication
 */
class MyFormApplication extends FormApplication {
    constructor(exampleOption) {
        super();
        this.exampleOption = exampleOption;
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["form"],
            popOut: true,
            template: `modules/${MODULE_ID}/templates/settings.hb`,
            id: "my-form-application",
            title: "My FormApplication",
        });
    }

    getData() {
        // Send data to the template
        return {
            msg: this.exampleOption,
            color: "red",
        };
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    async _updateObject(event, formData) {
        console.log(formData.exampleInput);
    }
}

window.MyFormApplication = MyFormApplication;

export function createAPI() {
    game.pf2eRPGNumbers = {
        damageNumbers: {
            generate: function (dmgList, targetIDs) {
                generateDamageScroll(dmgList, targetIDs);
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
        viewSettings: function () {
            new MyFormApplication("example").render(true);
        },
    };
}
