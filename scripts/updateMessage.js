import { MODULE_ID } from "./helpers/const.js";

const sampleData = {
    new: [{ item: "" }, { item: "", feat: true }, { children: [""] }],
    update: [{ item: "" }, { children: [""] }],
};

const updateData = {
    '13.6.0': {
        new: [
            { item: "Added handling for `PF2e Toolbelt` rolls and rerolls" },
            { item: "Critical", feat: true },
            { children: ["Added `Art Delay` setting to delay the art portion", "Added `Duration` setting to set the total effect duration"] },
        ],
        update: [
            { item: "Required **Genga** version to `0.7.3`" },
        ],
    },
    '13.4.0': {
        new: [
            { item: "Darkest Dungeon: Stress / Relief", feat: true },
            { children: ["Adds a new animation that will either play the stress or relief icon on friendly tokens based on either Critical Success or Failures"] },
            { item: "Update Messages", feat: true },
            { children: ["Occassionally will have update messages with some patch notes (General Reserved for Feature releases and not patches)"] },
        ],
        update: [
            { item: "Updated French translation (@rectulo)" },
            { item: "Updated Polish translation (@Lioheart)" },
            { item: "Updated `Genga` requirement to `0.7.1`" },
        ],
    }
};

export async function handleUpdateMessage() {
    if (!game.user.isGM) return;
    const last_version = game.settings.get(MODULE_ID, "last-version");
    game.settings.set(
        MODULE_ID,
        "last-version",
        game.modules.get(MODULE_ID).version
    );
    if (
        last_version === game.modules.get(MODULE_ID).version
        || !game.modules.get(MODULE_ID).version.endsWith(".0")
    ) {
        return;
    }

    const updateStuff = updateData?.[game.modules.get(MODULE_ID).version];

    if (!updateStuff) return;

    const updateMessage = {
        name: game.modules.get(MODULE_ID).title,
        icon: "fa-solid fa-dragon",
        version: game.modules.get(MODULE_ID).version,
        ...updateStuff,
    };
    updateMessage.isNew = updateMessage?.new && updateMessage?.new?.length > 0
    updateMessage.isUpdate = updateMessage?.update && updateMessage?.update?.length > 0
    updateMessage.new = updateMessage?.new?.map(it => ({
        hasChild: !!it?.children && !!it?.children?.length > 0,
        ...it
    }))
    updateMessage.update = updateMessage?.update?.map(it => ({
        hasChild: !!it?.children && !!it?.children?.length > 0,
        ...it
    }))

    const content = await renderTemplate(
        `modules/${MODULE_ID}/templates/updateMessage.hbs`,
        updateMessage
    );

    ChatMessage.create({
        content,
        whisper: game.users.filter((u) => u.isGM).map((u) => u.id),
    });
}
