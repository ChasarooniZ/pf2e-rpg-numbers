export function rotateOnProne(token, prone = true) {
    if (prone) {
        new Sequence().animation().on(token).rotateIn(-90, 500).play();
    } else {
        new Sequence().animation().on(token).rotateOut(-90, 0).play();
    }
}
