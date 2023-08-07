// import {generateDamageScroll, extractDamageInfoCombined, getTargetList} from './utility.js'
// HOOKS STUFF
Hooks.on("ready", async () => {
    console.error("PF2e RPG Numbers is ready");
    ui.notifications.notify("PF2e RPG Numbers is ready")
    //game.RPGNumbers = new RPGNumbers();
})

Hooks.on("createChatMessage", async function (msg, status, id) {
    console.log({ msg })
    // if (msg?.flags?.pf2e?.context?.type !== 'damage-roll') return;
    // const dmg_list = extractDamageInfoCombined(msg.rolls);
    // const targets = getTargetList(msg);
    // generateDamageScroll(dmg_list, targets);
})