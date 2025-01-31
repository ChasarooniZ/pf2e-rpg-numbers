import { getSetting } from "../../misc.js";

/**
 * Perform a critical hit animation resembling the style of Fire Emblem.
 * This function creates an animated effect around the provided actor, displaying
 * an image moving across the screen along with other visual effects and sounds.
 *
 * @param {Actor} actor - The actor object around which the animation will be centered.
 * @param {User[]} users - An array of users who will see the animation.
 * @returns {void}
 */

export async function fireEmblemCrit(actor, users, config) {
    const windowHeight = screen.height / 10;
    const padding = windowHeight / 10;
    const rectangleHeight = windowHeight + padding * 2;
    const windowWidth = screen.width;
    const imageUrl = config.art;
    const duration = getSetting("critical.duration") * 1000;
    const soundUrl = config.sfx;
    const volumeLevel = config.volume;

    //Sequencer.Preloader.preloadForClients([imageUrl, soundUrl]);
    new Sequence()
        //background
        .effect()
        .zIndex(-1)
        .syncGroup(`fe-crit-${actor.uuid}`)
        .shape("rectangle", {
            lineSize: 0,
            width: windowWidth,
            height: rectangleHeight,
            fillColor: game.user.color.css,
            fillAlpha: 0.6,
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
        .delay(config.delay)
        .screenSpaceAboveUI()
        //Image
        .effect()
        .zIndex(0)
        .syncGroup(`fe-crit-${actor.uuid}`)
        .file(imageUrl)
        .spriteRotation(config.rotation)
        .animateProperty("sprite", "position.x", {
            from: -0.9,
            to: 1.5,
            screenSpace: true,
            duration: duration,
            ease: "easeInBack",
        })
        .screenSpace()
        .screenSpaceScale({
            x: 0.134 * config.scale,
            y: 0.134 * config.scale,
            fitX: false,
            fitY: true,
            ratioX: true,
            ratioY: false,
        })
        // Y Offset
        .animateProperty(
            "sprite",
            "position.y",
            {
                from: config?.offset?.y ?? 0,
                to: config?.offset?.y ?? 0,
                duration: duration,
                screenSpace: true
            })
        .duration(duration)
        .forUsers(users)
        .delay(config.delay)
        .screenSpaceAboveUI()
        //Sound
        .sound()
        .file(soundUrl)
        .fadeOutAudio(duration / 4)
        .volume(volumeLevel)
        .forUsers(users)
        .delay(config.delay)
        .play();
}
