async function bounceToTarget(tok, target) {
    const ray = new Ray(tok, target);
    const [normalized_x, normalized_y] = [-ray.dx / ray.distance, -ray.dy / ray.distance];
    const distance = 0.2;
    const duration = 300;
    const [x, y] = [normalized_x * distance, normalized_y * distance];
    let params = [
        {
            filterType: "transform",
            filterId: "jumpedDodge",
            autoDestroy: true,
            padding: 80,
            animated: {
                translationY: {
                    animType: "cosOscillation",
                    val1: 0,
                    val2: y,
                    loops: 1,
                    loopDuration: duration,
                },
                translationX: {
                    animType: "cosOscillation",
                    val1: 0,
                    val2: x,
                    loops: 1,
                    loopDuration: duration,
                },
            },
        },
    ];

    await TokenMagic.addUpdateFiltersOnSelected(params);
}
