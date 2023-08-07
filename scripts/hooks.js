/**
 * A single Damage Number in damage number list.
 * @typedef {Object} DamageNumber
 * @property {string} type - Type of damage
 * @property {number} value - How much damage it was
 */
Hooks.on("init", function () {
    console.log("PF2e RPG Numbers is initiated"); if (!game.user.isGM) return;
    game.RPGNumbers = new RPGNumbers();
});

Hooks.on("ready", function () {
    console.log("PF2e RPG Numbers is ready");
    game.ui.notify("PF2e RPG Numbers is ready")
});

Hooks.on("createChatMessage", async function (msg, status, id) {
    console.log({ msg })
    if (msg?.flags?.pf2e?.context?.type !== 'damage-roll') return;
    const dmg_list = game.RPGNumbers.extractDamageInfoCombined(msg.rolls);
    const targets = game.RPGNumbers.getTargetList(msg);
    game.RPGNumbers.generateDamageScroll(dmg_list, targets);
});