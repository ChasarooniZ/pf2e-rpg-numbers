import { getSetting } from "../../misc.js";

export async function eldenRingNounVerbed(text = getSetting(`from-software.noun-verbed.sound-text`), options = {}) {
    const sound = options?.sound ?? getSetting(`from-software.noun-verbed.sound-effect`)
    const fontSize = option?.fontSize ?? getSetting(`from-software.noun-verbed.font-size`)
    const partOne = text.slice(0, text.length / 2)
    const partOneOffset = (partOne.length + 0.5) * fontSize / 2;
    const partTwo = text.slice(text.length / 2, text.length)
    const partTwoOffset = (partTwo.length + 0.5) * fontSize / 2;

    const rect = {
        height: fontSize * 3,
        width: 4000
    }

    const duration = (options?.duration ?? getSetting(`from-software.noun-verbed.duration`)) * 1000;
    const fadein = 500;

    return new Sequence()
        //Sound
        .sound()
        .file(sound)
        .delay(fadein / 2)
        //Background
        .effect()
        .syncGroup("eldenRing.nounVerbed")
        .screenSpaceAboveUI()
        .duration(duration - 100)
        .fadeIn(fadein)
        .fadeOut(fadein / 2)
        .screenSpace()
        .screenSpacePosition({ x: 0, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .shape("rectangle", {
            width: rect.width,
            height: rect.height,
            fillColor: "#000001",
            fillAlpha: 0.8,
            lineSize: 0,
            lineColor: "#FF0000",
            offset: { x: -rect.width / 2, y: -rect.height / 2 }
        }
        )
        .filter("Blur", {
            strength: 1,    // Number, strength of the filter
            blurY: 30,       // Number, blur strength on the vertical axis
            quality: 15,     // Number, quality of the filter
            resolution: 4,  // Number, sets the resolution of the blur filter
            kernelSize: 5   // Number, effectively how many passes the blur goes through
        })
        //Text part 1
        .effect()
        .syncGroup("eldenRing.nounVerbed")
        .screenSpaceAboveUI()
        .duration(duration)
        .fadeIn(fadein)
        .fadeOut(fadein / 2)
        .screenSpace()
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpacePosition({ x: -partOneOffset, y: 0 })
        .text(partOne, { "align": "left", "dropShadow": true, "dropShadowAlpha": 0.2, "dropShadowAngle": 3.14, "dropShadowColor": "#ffd042", "dropShadowDistance": 13, "fill": "#dcaf2d", "fontFamily": "Lusitana-Regular", "fontSize": fontSize, "padding": 10, "stroke": "#dcaf2d" })
        //Text Part 2
        .effect()
        .syncGroup("eldenRing.nounVerbed")
        .screenSpaceAboveUI()
        .duration(duration)
        .fadeIn(fadein)
        .fadeOut(fadein / 2)
        .screenSpace()
        .screenSpacePosition({ x: partTwoOffset, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .text(partTwo, { "align": "right", "dropShadow": true, "dropShadowAlpha": 0.2, "dropShadowAngle": 0, "dropShadowColor": "#ffd042", "dropShadowDistance": 13, "fill": "#dcaf2d", "fontFamily": "Lusitana-Regular", "fontSize": fontSize, "padding": 10, "stroke": "#dcaf2d" })
        .play();
}

export async function eldenRingDeath(text = getSetting(`from-software.death.sound-text`), options = {}) {
    const sound = options?.sound ?? getSetting(`from-software.death.sound-effect`)
    const fontSize = option?.fontSize ?? getSetting(`from-software.death.font-size`)

    const rect = {
        height: fontSize * 3,
        width: 4000
    }

    const duration = (options?.duration ?? getSetting(`from-software.death.duration`)) * 1000;
    const fadein = 500;

    return new Sequence()
        //Sound
        .sound()
        .file(sound)
        .delay(fadein / 2)
        //Background
        .effect()
        .syncGroup("eldenRing.death")
        .screenSpaceAboveUI()
        .duration(duration)
        .fadeIn(fadein)
        .fadeOut(fadein / 2)
        .screenSpace()
        .screenSpacePosition({ x: 0, y: 0 })
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .shape("rectangle", {
            width: rect.width,
            height: rect.height,
            fillColor: "#000001",
            fillAlpha: 0.8,
            lineSize: 0,
            lineColor: "#FF0000",
            offset: { x: -rect.width / 2, y: -rect.height / 2 }
        }
        )
        .filter("Blur", {
            strength: 1,    // Number, strength of the filter
            blurY: 30,       // Number, blur strength on the vertical axis
            quality: 15,     // Number, quality of the filter
            resolution: 4,  // Number, sets the resolution of the blur filter
            kernelSize: 5   // Number, effectively how many passes the blur goes through
        })
        //Text part 1
        .effect()
        .syncGroup("eldenRing.death")
        .screenSpaceAboveUI()
        .duration(duration + 100)
        .fadeIn(fadein)
        .fadeOut(fadein / 2)
        .screenSpace()
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .text(text, {
            "fill": "#82101d",
            "fontFamily": "Lusitana-Regular",
            "fontSize": fontSize,
            "padding": 10
        })
        .play();
}