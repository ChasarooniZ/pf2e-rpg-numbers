Hooks.on("combatStart", async (encounter, _turn) => {
    console.log({
        enemies: encounter.combatants.contents
            .filter((c) => c?.actor?.alliance === "opposition")
            .map((c) => c?.actor?.img ?? ""),
        party: encounter.combatants.contents
            .filter((c) => c?.actor?.alliance === "party")
            .map((c) => c?.actor?.img ?? ""),
    });
});
