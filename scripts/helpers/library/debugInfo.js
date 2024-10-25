import { MODULE_ID } from "../misc.js"

const RELEVANT_MODULES = [MODULE_ID, 'sequencer']

export function getDebugData() {
    return {
        browserInfo: navigator.userAgent,
        foundryVersion: game.version,
        systemId: game.system.id,
        systemVersion: game.system.version,
        canvas: {
            width: canvas.dimensions.width,
            height: canvas.dimensions.height
        },
        module_versions: RELEVANT_MODULES.reduce((acc, moduleId) => {
            const module = game.modules?.get(moduleId);
            if (module) {
                acc[moduleId] = module?.version;
            } else {
                acc[moduleId] = 'Not installed or not active';
            }
            return acc;
        }, {})
    }
}