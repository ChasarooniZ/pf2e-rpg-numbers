import { getSetting } from "../../../misc.js";

/**
 * Creates a Sekiro style "Death" sequence.
 * @param {Object} options - Configuration options.
 * @param {string} [options.text] - The text to display.
 * @param {string} [options.sound] - The sound effect file path.
 * @param {number} [options.fontSize] - The font size for the text.
 * @param {number} [options.duration] - The duration of the sequence in seconds.
 * @returns {Promise<Sequence>} A promise that resolves to the played Sequence.
 */

export async function sekiroDeath(options = {}) {
    const text = (options.text ?? getSetting(`from-software.death.text`)).toUpperCase();
    const sound = options.sound ?? getSetting(`from-software.death.sound-effect`);
    const fontSize = options.fontSize ?? getSetting(`from-software.death.font-size`) / 2;
    const duration = (options.duration ?? getSetting(`from-software.death.duration`)) * 1000;
    const users = options?.users ?? game.users.map((u) => u.id);

    const bigFontSize = fontSize * 6;
    const separationHeight = (bigFontSize / 2) * 0.85;
    const fadein = 500;

    new Sequence()
        //Sound
        .sound()
        .file(sound)
        .delay(fadein / 2)
        .forUsers(users)
        //Text part 1
        .effect()
        .syncGroup("sekiro.death")
        .screenSpaceAboveUI()
        .duration(duration + 100)
        .fadeIn(fadein)
        .fadeOut(fadein / 2)
        .screenSpace()
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpacePosition({ x: 0, y: separationHeight })
        .text(text.split("").join(" "), {
            fill: "#82101d",
            fontFamily: "Lusitana-Regular",
            fontSize: fontSize,
            padding: 10,
        })
        .forUsers(users)
        //Japanese Text
        .effect()
        .syncGroup("sekiro.death")
        .screenSpaceAboveUI()
        .duration(duration + 100)
        .fadeIn(fadein)
        .fadeOut(fadein / 2)
        .screenSpace()
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpacePosition({ x: 0, y: -separationHeight })
        .text("死", {
            fill: "#82101d",
            fontFamily: "Lusitana-Regular",
            fontSize: bigFontSize,
            padding: 10,
        })
        //Japanese Text Scalein
        .effect()
        .syncGroup("sekiro.death")
        .screenSpaceAboveUI()
        .delay(fadein / 2)
        .duration(fadein * 2)
        .fadeOut(fadein)
        .scaleIn(1.1, fadein, { ease: "easeOutCubic" })
        //.fadeIn(fadein/2)
        .screenSpace()
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .opacity(0.8)
        .screenSpacePosition({ x: 0, y: -separationHeight })
        .text("死", {
            fill: "#e87d7d",
            fontFamily: "Lusitana-Regular",
            fontSize: bigFontSize,
            padding: 10,
        })
        .forUsers(users)
        .play({preload: true });
}
