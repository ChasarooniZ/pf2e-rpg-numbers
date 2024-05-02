import { getMultiVisibleAndMsgVisible } from "../anim.js";

const ACTION_LIST = [
    "action:demoralize",
    "action:feint",
    "action:grapple",
    "action:reposition",
    "action:shove",
    "action:trip",
    "action:tumble-through",
];

const TODO_LIST = [
    //Basic Actions
    "action:administer-first-aid",
    "action:administer-first-aid:stabilize",
    "action:administer-first-aid:stop-bleeding",
    "action:balance",
    "action:bon-mot",
    "action:climb",
    "action:command-an-animal",
    "action:conceal-an-object",
    "action:craft",
    "action:create-a-diversion",
    "action:create-a-diversion:distracting-words",
    "action:create-a-diversion:gesture",
    "action:create-a-diversion:trick",
    "action:disable-device",
    "action:disable-a-device",
    "action:disarm",
    "action:escape",
    "action:force-open",
    "action:hide",
    "action:high-jump",
    "action:long-jump",
    "action:lie",
    "action:maneuver-in-flight",
    "action:palm-an-object",
    "action:perform",
    "action:pick-a-lock",
    "RECALL_KNOWLEDGE_SPECIAL_CASE",
    "action:repair",
    "action:request",
    "action:seek",
    "action:sense-motive",
    "action:sneak",
    "action:steal",
    "action:swim",
    "action:treat-poison",
    //exploration Actions
    "action:avoid-notice",
    "action:coerce",
    "action:decipher-writing",
    "action:decipher-writing:arcana",
    "action:decipher-writing:occultism",
    "action:decipher-writing:religion",
    "action:decipher-writing:society",
    "action:gather-information",
    "action:impersonate",
    "action:make-an-impression",
    "action:sense-direction",
    "action:squeeze",
    "action:track",
    //Downtime
    "action:create-forgery",
    "action:subsist",
    "action:treat-disease",
];

export function createBasicActionAnimation(msg) {
    try {
        const { token: tokenID, target: targetUUID, options, outcome } = msg.flags.pf2e.context;
        const token = canvas?.tokens?.get(tokenID);
        const action = options.find((opt) => ACTION_LIST.includes(opt));
        if (!action || !token) return;
        const isFailure = outcome?.includes("failure");
        const target = canvas.tokens.placeables.find((t) => t.document.uuid === targetUUID.token);
        const isJb2aPremActive = game.modules.get("jb2a_patreon")?.active;
        const isAnimSpellFXCartoonActive = game.modules.get("animated-spell-effects-cartoon")?.active;
        const usersToPlayFor = getMultiVisibleAndMsgVisible([token, target], msg.whisper);

        const data = {
            token,
            target,
            isFailure,
            users: usersToPlayFor,
            action,
            whisper: msg.whisper,
            animModule: {
                jb2a: {
                    active: isJb2aPremActive,
                },
                cartoonSpell: {
                    active: isAnimSpellFXCartoonActive,
                },
            },
        };

        let seq = new Sequence();
        switch (action) {
            case "action:demoralize":
                seq = demoralize(data, seq);
                break;
            case "action:tumble-through":
                seq = tumbleThrough(data, seq);
                break;
            case "action:feint":
                seq = feint(data, seq);
                break;
            case "action:grapple":
                seq = grapple(data, seq);
                break;
            case "action:reposition":
                seq = reposition(data, seq);
                break;
            case "action:shove":
                seq = shove(data, seq);
            case "action:trip":
                seq = trip(data, seq);
                break;
            default:
                return;
        }
        seq.play();
    } catch (error) {
        console.error("PF2e RPG Numbers", error);
    }
}

function trip(data, seq) {
    if (data.animModule.cartoonSpell) {
        const mirror = Sequencer.Helpers.random_int_between(0, 2);
        seq.effect()
            .file("animated-spell-effects-cartoon.smoke.25")
            .mirrorX()
            .mirrorY(!!mirror)
            .atLocation(data.token)
            .scale(1.2)
            .missed(data.isFailure)
            .stretchTo(data.target, { offset: { x: data.target.w, y: 0 }, local: true })
            .forUsers(data.users);
    }
    return seq;
}

function reposition(data, seq) {
    if (data.animModule.cartoonSpell) {
        const mirror = Sequencer.Helpers.random_int_between(0, 2);
        seq.effect()
            .file("animated-spell-effects-cartoon.simple.109")
            .tint("#b3216f")
            .mirrorX()
            .mirrorY(!!mirror)
            .atLocation(data.token)
            .stretchTo(data.target)
            .spriteRotation(mirror ? -20 : 20)
            .missed(data.isFailure)
            .forUsers(data.users)
            .effect()
            .missed(data.isFailure)
            .file("animated-spell-effects-cartoon.simple.109")
            .scaleToObject()
            .atLocation(data.target)
            .delay(400)
            .scale(1.5)
            .mirrorX(!mirror)
            .spriteRotation(spriteRotationMath(data.token, data.target));
    }
    return seq;
}

function feint(data, seq) {
    if (data.animModule.cartoonSpell) {
        const mirror = Sequencer.Helpers.random_int_between(0, 2);
        seq.effect()
            .file("animated-spell-effects-cartoon.simple.39")
            .mirrorY(!!mirror)
            .atLocation(data.token, {
                offset: { x: -token.w * 0.5, y: mirror ? token.h / 4 : -token.h / 4 },
                local: true,
            })
            .stretchTo(data.target, {
                offset: { x: token.w * 0.75, y: mirror ? token.h / 4 : -token.h / 4 },
                local: true,
            })
            .missed(data.isFailure);
    }
}

function grapple(data, seq) {
    if (data.animModule.cartoonSpell) {
        seq.effect()
            .file("animated-spell-effects-cartoon.simple.109")
            .tint("#b3350e")
            .mirrorX()
            .mirrorY()
            .atLocation(data.token, { offset: { x: -data.target.w / 2 }, local: true })
            .stretchTo(data.target, { offset: { x: data.target.w / 2 }, local: true })
            .spriteRotation(-20)
            .missed(data.isFailure)
            .forUsers(data.users)
            .effect()
            .file("animated-spell-effects-cartoon.simple.109")
            .tint("#b3350e")
            .mirrorX()
            .mirrorY(false)
            .atLocation(data.token, { offset: { x: -data.target.w / 2 }, local: true })
            .stretchTo(data.target, { offset: { x: data.target.w / 2 }, local: true })
            .spriteRotation(20)
            .missed(data.isFailure)
            .forUsers(data.users)
            .effect()
            .file("animated-spell-effects-cartoon.simple.113")
            .scaleToObject(3.5)
            .tint("#401204")
            .delay(600)
            .belowTokens()
            .atLocation(data.target)
            .missed(data.isFailure)
            .forUsers(data.users);
    }
    return seq;
}

function tumbleThrough(data, seq) {
    if (data.animModule.cartoonSpell) {
        const mirror = Sequencer.Helpers.random_int_between(0, 2);
        seq.effect()
            .file("animated-spell-effects-cartoon.smoke.05")
            .missed(data.isFailure)
            .mirrorY(!!mirror)
            .atLocation(data.token)
            .scale(1.2)
            .stretchTo(data.target, { offset: { x: data.target.w }, local: true })
            .forUsers(data.users);
    }
    return seq;
}

function demoralize(data, seq) {
    if (data.animModule.cartoonSpell) {
        seq.effect()
            .file("animated-spell-effects-cartoon.misc.demon")
            .atLocation(data.token)
            .scaleToObject()
            .scale(1)
            .anchor({ x: 0.5, y: 0.7 })
            .forUsers(getMultiVisibleAndMsgVisible([data.token], data.whisper))
            .effect()
            .file("animated-spell-effects-cartoon.magic.mind sliver")
            .filter("ColorMatrix", { hue: 180 })
            .atLocation(data.token)
            .stretchTo(data.target)
            .delay(200)
            .forUsers(data.users)
            .missed(data.isFailure)
            .effect()
            .file("animated-spell-effects-cartoon.energy.pulse.yellow")
            .scaleToObject()
            .atLocation(data.target)
            .scale(1.3)
            .delay(600)
            .forUsers(data.users)
            .missed(data.isFailure);
    }
    return seq;
}

function shove(data, seq) {
    if (data.animModule.cartoonSpell) {
        seq.effect()
            .scaleToObject(3)
            .file("animated-spell-effects-cartoon.cantrips.mending.yellow")
            .atLocation(data.token)
            .filter("ColorMatrix", { hue: -23 })
            .forUsers(data.users)
            .effect()
            .delay(200)
            .scaleToObject(2)
            .file("animated-spell-effects-cartoon.air.gust.gray")
            .spriteRotation(spriteRotationMath(data.token, data.target) - 180)
            .atLocation(data.target)
            .forUsers(data.users)
            .missed(data.isFailure);
    }
    return seq;
}

function spriteRotationMath(token, target) {
    return (Math.atan2(target.y - token.y, target.x - token.x) * 360) / Math.PI / 2 - 90;
}
