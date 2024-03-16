export function createCritAnimation(token, type) {
    const isAttack = type === "attack-roll";
    const showOn = game.settings.get(MODULE_ID, "critical.show-on");
    if ((showOn === 'checks' && isAttack) || (showOn === 'attacks' && !isAttack)) return;
    switch (game.settings.get(MODULE_ID, "critical.type")) {
        case "persona":
            personaCrit(token);
            break;
        case "fire-emblem":
            fireEmblemCrit(token);
            break;
        default:
            return;
    }
}

/**
 * Critical hit animation like in fire emblem
 * @param {*} token
 */
export function fireEmblemCrit(token) {
    let screenWidth = window.screen.availWidth;
    let amt = 0.35;
    let dist = amt * screenWidth;
    const height = screen.height / 10;
    const padding = height / 10;
    const rectHeight = height + padding * 2;
    const width = screen.width;
    const img = token.data.flags?.["pf2e-rpg-numbers"]?.personaImg || token?.document?.texture?.src || "icons/svg/cowled.svg"

    const tokenScale = { x: token?.document?.texture?.scaleX ?? 1, y: token?.document?.texture?.scaleY ?? 1 };
    const usingToken = !!token.data.flags?.["pf2e-rpg-numbers"]?.personaImg;
    const distScale = usingToken ? tokenScale.x + tokenScale.y / 2 : 1;
    //TODO set who it plays for
    new Sequence()
        .effect()
        .shape("rectangle", {
            lineSize: 0,
            width,
            height: rectHeight,
            fillColor: game.user.color,
            fillAlpha: 1,
            name: "feCritA",
        })
        .opacity(0.7)
        .duration(3000)
        .animateProperty("shapes.feCritA", "scale.y", { from: 1, to: 0.6, duration: 3000, ease: "easeInCubic" })
        .animateProperty("shapes.feCritA", "position.y", {
            from: 0,
            to: (rectHeight * 0.4) / 2,
            duration: 3000,
            ease: "easeInCubic",
        })
        //.attachTo(token)
        .screenSpace()
        //.screenSpaceAboveUI()
        .screenSpacePosition({ x: 0, y: -rectHeight / 2 })
        .screenSpaceAnchor({ x: 0, y: 0.5 })
        .effect()
        .file(img)
        .animateProperty("sprite", "position.x", {
            from: -dist / (2 * distScale),
            to: dist,
            duration: 3000,
            ease: "easeInBack",
        })
        .scale(0.3)
        .screenSpace()
        .screenSpaceScale({
            x: 0.2 * (usingToken ? tokenScale.x : 1), // Scale on the effect's X scale
            y: 0.2 * (usingToken ? tokenScale.y : 1), // Scale on the effect's Y scale
            fitX: false, // Causes the effect to set its width to fit the width of the screen
            fitY: true, // Causes the effect to set its height to fit the height of the screen
            ratioX: true, // If Y is scaled, setting this to true will preserve the width/height ratio
            ratioY: false, // If X is scaled, setting this to true will preserve the height/width ratio
        })
        .duration(3000)
        //.screenSpaceAboveUI()
        .scale(1)
        .size(height)
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
export function personaCrit(token) {
    const width = window.screen.availWidth;
    const height = window.screen.availHeight;
    const points = [
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
    const duration = 1500;
    const pointsOffset = points.map(([w, h]) => [w - width / 2, h - height / 2]);

    const img = token.data.flags?.["pf2e-rpg-numbers"]?.personaImg || token?.actor?.img || "icons/svg/cowled.svg";
    new Sequence()
        .effect()
        .shape("polygon", {
            //isMask: true,
            points: pointsOffset,
            fillColor: game.user.color,
            fillAlpha: 1,
        })
        .screenSpace()
        .screenSpacePosition({ x: 0, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpaceAboveUI()
        .zIndex(-1)
        .duration(duration)
        .effect()
        .file(img)
        .zIndex(0)
        .shape("polygon", {
            isMask: true,
            points: pointsOffset,
        })
        .screenSpace()
        .screenSpacePosition({ x: 0, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpaceAboveUI()
        .duration(duration)
        .effect()

        .zIndex(1)
        .shape("polygon", {
            //isMask: true,
            points: pointsOffset,
            fillAlpha: 0,
            lineSize: 10,
            lineColor: "white",
        })
        .screenSpace()
        .screenSpacePosition({ x: 0, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpaceAboveUI()
        .duration(duration)
        .play();
}
