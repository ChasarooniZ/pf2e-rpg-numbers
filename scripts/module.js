// import {generateDamageScroll, extractDamageInfoCombined, getTargetList} from './utility.js'
// HOOKS STUFF
Hooks.on("ready", async () => {
    console.error("PF2e RPG Numbers is ready");
    ui.notifications.notify("PF2e RPG Numbers is ready")
    //game.RPGNumbers = new RPGNumbers();
})

Hooks.on("createChatMessage", async function (msg, status, id) {
    console.log({ msg })
    if (!msg.isDamageRoll) return;
    // const dmg_list = extractDamageInfoCombined(msg.rolls);
    let dmg_list = [{ value: 10, type: "" }]
    const targets = getTargetList(msg);
    console.log({targets, dmg_list})
    // generateDamageScroll(dmg_list, targets);
})

export function getTargetList(msg) {
    if (msg.flags?.["pf2e-target-damage"]?.targets) {
        return msg.flags['pf2e-target-damage'].targets.map(t => t.id);
    } else { // No pf2e target damage module
        return [msg?.target?.token?.id ?? msg.token.id];
    }
}