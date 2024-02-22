export function createCritAnimation() {
    let screenWidth = window.screen.availWidth;
    let amt = 0.35;
    let msg = "Pick a God and Pray!"
    const style = {
        "fill": "white",
        "stroke": "black",
        "fontFamily": "Impact, Charcoal, sans-serif",
        "fontSize": 36,
        //fontWeight: "bold",
        "strokeThickness": 3
    }

    const duration = 3000;
    const dist = amt * screenWidth;
    const height = screen.height / 10;
    const padding = height / 10;
    const rectHeight = height + (padding * 2)
    const width = screen.width;
    new Sequence()
        .effect()
        .shape('rectangle', {
            lineSize: 0,
            width,
            height: rectHeight,
            fillColor: '#e39df5',
            fillAlpha: 1,
            name: "feCritA"
        }
        )
        .duration(duration)
        .animateProperty("shapes.feCritA", "scale.y", { from: 1, to: 0.6, duration: 3000, ease: "easeInCubic" })
        .animateProperty("shapes.feCritA", "position.y", { from: 0, to: (rectHeight * .4) / 2, duration: 3000, ease: "easeInCubic" })
        //.attachTo(token)
        .screenSpace()
        //.screenSpaceAboveUI()
        .screenSpacePosition({ x: 0, y: -rectHeight / 2 })
        .screenSpaceAnchor({ x: 0, y: 0.5 })
        .effect()
        .text(msg, style)
        .screenSpace()
        .screenSpaceAnchor({ x: 0.5, y: 0.4 })
        .duration(duration)
        .fadeIn(250, { ease: "easeInQuint" })
        .scaleIn(2, 250)
        .fadeOut(1000)
        .scaleOut(0, 200)
        //.animateProperty("sprite", "scale.y", {from: -1, to: 0, duration: 1000, ease: "easeOutCubic", fromEnd: true})
        //.animateProperty("sprite", "position.x", { from: -dist, to: 0, duration: 1000, ease: "easeOutElastic"})
        //.animateProperty("sprite", "position.x", { from: 0, to: dist, duration: 1000, ease: "easeOutCubic", fromEnd: true})
        .effect()
        .file(token?.document?.texture?.src ?? 'icons/svg/cowled.svg')
        .animateProperty("sprite", "position.x", { from: -dist, to: dist, duration: 3000, ease: "easeInBack" })
        .scale(0.3)
        .screenSpace()
        .duration(duration)
        //.screenSpaceAboveUI()
        .scale(token?.document?.texture?.scaleX)
        .size(height)
        .play()
}