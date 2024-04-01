import { createCritAnimation } from "./animation/crit-animation.js";

document.getElementById("critButton").addEventListener("click", function (e) {
    e.preventDefault();
    ui.notifications.info("This is an info message");
    const uuid = e.srcElement.parentElement.parentElement.parentElement.parentElement.id.replace(
        "TokenConfigPF2e-",
        ""
    );
    const token = await fromUuid(uuid);
    console.log({
        e,
        test: "TESTANIM",
    });
    createCritAnimation({ type: "custom", whisper: [game.user.id], token: token ?? game.user.character });
});
