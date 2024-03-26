import { getVisibleAndMsgVisibleUsers } from "../anim.js";
import { MODULE_ID } from "../misc.js";

export function createCritAnimation(roll_deets) {
    //TODO add option for default color
    const isAttack = roll_deets.type === "attack-roll";
    const showOn = game.settings.get(MODULE_ID, "critical.show-on");
    if ((showOn === "checks" && isAttack) || (showOn === "attacks" && !isAttack)) return;

    const enabledTokenType = game.settings.get(MODULE_ID, "critical.show-on-token-type");
    const defaultImgType = game.settings.get(MODULE_ID, "critical.default-img");
    const actorType = roll_deets.token.actor.type;
    let imgData = {
        img: "icons/svg/cowled.svg",
        xScale: 1,
        yScale: 1,
        xOffset: 0,
        yOffset: 0,
    };

    if (
        (actorType === "character" && enabledTokenType !== "npc") ||
        (actorType !== "character" && enabledTokenType !== "pc")
    ) {
        if (actorType === "character" ? defaultImgType.startWith("pc-tok") : defaultImgType.includes("npc-tok")) {
            // Token
            imgData.img = roll_deets?.token?.texture?.src;
            imgData.xScale = roll_deets?.token?.texture?.scaleX ?? 1;
            imgData.yScale = roll_deets?.token?.texture?.scaleY ?? 1;
        } else {
            // actor
            imgData.img = roll_deets?.token?.actor?.img;
        }
    } else {
        return;
    }

    const users = getVisibleAndMsgVisibleUsers(roll_deets);
    switch (game.settings.get(MODULE_ID, "critical.type")) {
        case "persona":
            personaCrit(roll_deets.token, users, imgData);
            break;
        case "fire-emblem":
            fireEmblemCrit(roll_deets.token, users, imgData);
            break;
        default:
            return;
    }
}

/**
 * Perform a critical hit animation resembling the style of Fire Emblem.
 * This function creates an animated effect around the provided token, displaying
 * an image moving across the screen along with other visual effects and sounds.
 *
 * @param {Token} token - The token object around which the animation will be centered.
 * @param {User[]} users - An array of users who will see the animation.
 * @param {Object} imgData - An object containing image data, including image URL and scaling information.
 * @param {string} imgData.img - The URL of the image to be displayed in the animation.
 * @param {number} imgData.xScale - The horizontal scaling factor of the image.
 * @param {number} imgData.yScale - The vertical scaling factor of the image.
 * @returns {void}
 */
export function fireEmblemCrit(token, users, imgData) {
    const screenWidth = window.screen.availWidth;
    const scaleFactor = 0.35;
    const distance = scaleFactor * screenWidth;
    const windowHeight = screen.height / 10;
    const padding = windowHeight / 10;
    const rectangleHeight = windowHeight + padding * 2;
    const windowWidth = screen.width;
    const imageUrl = token.data.flags?.["pf2e-rpg-numbers"]?.fireEmblemImg || imgData.img;
    const duration = game.settings.get(MODULE_ID, "critical.duration") * 1000;
    const soundUrl = game.settings.get(MODULE_ID, "critical.sound");
    const volumeLevel = game.settings.get(MODULE_ID, "critical.volume") / 100;

    if (!!token.data.flags?.["pf2e-rpg-numbers"]?.fireEmblemImg) {
        imgData.xScale = 1;
        imgData.yScale = 1;
    }

    const scaleFactorHalf = imgData.xScale / 2;

    new Sequence()
        .effect()
        .shape("rectangle", {
            lineSize: 0,
            width: windowWidth,
            height: rectangleHeight,
            fillColor: game.user.color,
            fillAlpha: 1,
            name: "feCritA",
        })
        .opacity(0.7)
        .duration(duration)
        .animateProperty("shapes.feCritA", "scale.y", { from: 1, to: 0.6, duration: duration, ease: "easeInCubic" })
        .animateProperty("shapes.feCritA", "position.y", {
            from: 0,
            to: (rectangleHeight * 0.4) / 2,
            duration: duration,
            ease: "easeInCubic",
        })
        .screenSpace()
        .screenSpacePosition({ x: 0, y: -rectangleHeight / 2 })
        .screenSpaceAnchor({ x: 0, y: 0.5 })
        .forUsers(users)
        .effect()
        .file(imageUrl)
        .animateProperty("sprite", "position.x", {
            from: -distance / (2 * scaleFactorHalf),
            to: distance,
            duration: duration,
            ease: "easeInBack",
        })
        .scale(0.3)
        .screenSpace()
        .screenSpaceScale({
            x: 0.2 * imgData.xScale,
            y: 0.2 * imgData.yScale,
            fitX: false,
            fitY: true,
            ratioX: true,
            ratioY: false,
        })
        .duration(duration)
        .scale(1)
        .size(windowHeight)
        .forUsers(users)
        .sound()
        .file(soundUrl)
        .fadeOutAudio(duration / 4)
        .volume(volumeLevel)
        .forUsers(users)
        .play();
}

/**
 *  Conversion method from css clip path
 * r = """0% 55%, 2% 52%, 9% 51%, 15% 44%, 23% 40%, 32% 38%, 34% 36%, 35% 35%, 41% 28%, 43% 30%, 50% 26%, 53% 27%, 58% 26%, 59% 26%, 62% 24%, 65% 25%, 71% 23%, 78% 15%, 85% 14%, 89% 14%, 95% 11%, 97% 12%, 100% 9%, 100% 55%, 97% 53%, 96% 55%, 92% 55%, 80% 56%, 72% 57%, 69% 58%, 64% 63%, 62% 63%, 61% 65%, 59% 63%, 57% 62%, 55% 64%, 53% 65%, 49% 63%, 43% 63%, 39% 64%, 37% 65%, 36% 65%, 34% 68%, 32% 67%, 29% 72%, 27% 71%, 27% 73%, 24% 72%, 22% 73%, 20% 70%, 16% 73%, 14% 71%, 13% 72%, 10% 71%, 5% 72%, 6% 70%, 0% 73%"""
 
for pair in r.split(","):
    pair = pair.replace('%', '').strip()
    items = pair.split(" ")
    widthPer = str(int(items[0])/100)
    heightPer = str(int(items[1])/100)
    print("[" + widthPer + "* width, " + heightPer + "* height],")
 */
//https://www.cssportal.com/css-clip-path-generator/
/**
 * Perform a critical hit animation resembling a persona-like effect.
 * This function creates an animated effect centered around the provided token, displaying
 * an image with a polygonal mask, along with other visual effects and sounds.
 *
 * @param {Token} token - The token object around which the animation will be centered.
 * @param {User[]} users - An array of users who will see the animation.
 * @param {Object} imgData - An object containing image data, including image URL and scaling information.
 * @param {string} imgData.img - The URL of the image to be displayed in the animation.
 * @param {number} imgData.scaleX - The horizontal scaling factor of the image.
 * @param {number} imgData.yScale - The vertical scaling factor of the image.
 * @returns {void}
 */
export function personaCrit(token, users, imgData) {
    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;
    const polygonPoints = [
        [-0.1 * width, 0.55 * height],
        [0.02 * width, 0.52 * height],
        [0.09 * width, 0.51 * height],
        [0.15 * width, 0.44 * height],
        [0.23 * width, 0.4 * height],
        [0.32 * width, 0.38 * height],
        [0.34 * width, 0.36 * height],
        [0.35 * width, 0.35 * height],
        [0.41 * width, 0.28 * height],
        [0.43 * width, 0.3 * height],
        [0.5 * width, 0.26 * height],
        [0.53 * width, 0.27 * height],
        [0.58 * width, 0.26 * height],
        [0.59 * width, 0.26 * height],
        [0.62 * width, 0.24 * height],
        [0.65 * width, 0.25 * height],
        [0.71 * width, 0.23 * height],
        [0.78 * width, 0.15 * height],
        [0.85 * width, 0.14 * height],
        [0.89 * width, 0.14 * height],
        [0.95 * width, 0.11 * height],
        [0.97 * width, 0.12 * height],
        [1.1 * width, 0.09 * height],
        [1.1 * width, 0.55 * height],
        [0.97 * width, 0.53 * height],
        [0.96 * width, 0.55 * height],
        [0.92 * width, 0.55 * height],
        [0.8 * width, 0.56 * height],
        [0.72 * width, 0.57 * height],
        [0.69 * width, 0.58 * height],
        [0.64 * width, 0.63 * height],
        [0.62 * width, 0.63 * height],
        [0.61 * width, 0.65 * height],
        [0.59 * width, 0.63 * height],
        [0.57 * width, 0.62 * height],
        [0.55 * width, 0.64 * height],
        [0.53 * width, 0.65 * height],
        [0.49 * width, 0.63 * height],
        [0.43 * width, 0.63 * height],
        [0.39 * width, 0.64 * height],
        [0.37 * width, 0.65 * height],
        [0.36 * width, 0.65 * height],
        [0.34 * width, 0.68 * height],
        [0.32 * width, 0.67 * height],
        [0.29 * width, 0.72 * height],
        [0.27 * width, 0.71 * height],
        [0.27 * width, 0.73 * height],
        [0.24 * width, 0.72 * height],
        [0.22 * width, 0.73 * height],
        [0.2 * width, 0.7 * height],
        [0.16 * width, 0.73 * height],
        [0.14 * width, 0.71 * height],
        [0.13 * width, 0.72 * height],
        [0.1 * width, 0.71 * height],
        [0.05 * width, 0.72 * height],
        [0.06 * width, 0.7 * height],
        [-0.1 * width, 0.73 * height],
    ];
    const centeredPoints = polygonPoints.map(([x, y]) => [x - screenWidth / 2, y - screenHeight / 2]);
    const imageUrl = token.data.flags?.["pf2e-rpg-numbers"]?.personaImg || imgData.img;
    const imageScaler = !!token.data.flags?.["pf2e-rpg-numbers"]?.personaImg
        ? (imgData.scaleX + imgData.yScale) / 2
        : 1;
    const duration = game.settings.get(MODULE_ID, "critical.duration") * 1000;
    const soundUrl = game.settings.get(MODULE_ID, "critical.sound");
    const volumeLevel = game.settings.get(MODULE_ID, "critical.volume") / 100;

    const image = new Image();
    image.src = imageUrl;

    image.onload = ({ target }) => {
        const imageHeight = target.height;
        new Sequence()
            .effect()
            .shape("polygon", {
                points: centeredPoints,
                fillColor: game.user.color,
                fillAlpha: 1,
            })
            .screenSpace()
            .screenSpacePosition({ x: 0, y: 0 })
            .screenSpaceAnchor({ x: 0.5, y: 0.5 })
            .screenSpaceAboveUI()
            .zIndex(-1)
            .duration(duration)
            .forUsers(users)
            .effect()
            .file(imageUrl)
            .zIndex(0)
            .shape("polygon", {
                isMask: true,
                points: centeredPoints,
            })
            .scale((screenHeight / imageHeight) * imageScaler)
            .screenSpace()
            .screenSpacePosition({ x: 0, y: 0 })
            .screenSpaceAnchor({ x: 0.5, y: 0.5 })
            .screenSpaceAboveUI()
            .duration(duration)
            .forUsers(users)
            .effect()
            .zIndex(1)
            .shape("polygon", {
                points: centeredPoints,
                fillAlpha: 0,
                lineSize: 10,
                lineColor: "white",
            })
            .screenSpace()
            .screenSpacePosition({ x: 0, y: 0 })
            .screenSpaceAnchor({ x: 0.5, y: 0.5 })
            .screenSpaceAboveUI()
            .duration(duration)
            .forUsers(users)
            .sound()
            .file(soundUrl)
            .fadeOutAudio(duration / 4)
            .volume(volumeLevel)
            .forUsers(users)
            .play();
    };
}
