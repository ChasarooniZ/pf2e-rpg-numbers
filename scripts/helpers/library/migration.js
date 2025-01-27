import { getSetting, MODULE_ID } from "../misc.js";
const DEFAULT_VALUE = 'default';

const DEFAULT_CRIT_DATA = {
    enabled: DEFAULT_VALUE,
    type: DEFAULT_VALUE,
    art: '',
    offset: {
        x: 0,
        y: 0
    },
    rotation: 0,
    sfx: '', //Note should also accept JB2A * card
    volume: 100,
    scale: 1,
}

export const DEFAULT_CRIT = {
    success: DEFAULT_CRIT_DATA,
    failure: DEFAULT_CRIT_DATA
};

function migrateTokenSettingsToActorSettings() {
    //Get all actors
    const actors = game.actors.contents;
    //Update a HUD bar as you go through each actor
    for (const actor in actors) {
        const token = actor?.prototypeToken;
        const flags = token?.flags?.['pf2e-rpg-numbers']
        if (token && flags) {
            //Set Game version to ease futue migration attempt
            setActorFlag(actor, 'version', game.modules.get('pf2e-rpg-numbers').version);
            //Hand;e Crit stuff here
            //NEw categories:
            // TODO in the future consider support for triggering off specific Rule elements?
            const crit = {
                default: {
                    success: {
                        enabled: DEFAULT_VALUE,
                        offset: {
                            x: flags?.critOffsetX ?? 0,
                            y: flags?.critOffsetY ?? 0
                        },
                        rotation: flags?.critRotation ?? 0,
                        sfx: flags?.critSFX ?? '', //Note should also accept JB2A * card
                        volume: 100,
                        scale: flags?.critScale ?? 0,
                        art: getCritImageLegacy(flags),
                        type: 'default'
                    },
                    failure: DEFAULT_CRIT.failure
                },
                checks: DEFAULT_CRIT,
                saves: DEFAULT_CRIT,
                strikes: DEFAULT_CRIT
            }
            setActorFlag(actor, 'critical', crit)

        }
    }
    /**
     * Flag Structure
     * {
    "rotationOffset": 32,
    "fireEmblemImg": "steve",
    "personaImg": "Jobs",
    "critOffsetX": 123,
    "critOffsetY": 555,
    "critScale": 100,
    "critRotation": 20,
    "critSFX": "sfx"
}
     */
    //CHeck if they have prototype token, and transfer that to actor settings
}

//sets actor flag
async function setActorFlag(actor, key, value) {
    await actor.setFlag(MODULE_ID, key, value)
}

function getCritImageLegacy(flags) {
    const fireEmblemImg = flags?.fireEmblemImg;
    const personaImg = flags?.personaImg;
    if (fireEmblemImg & personaImg) {
        if (getSetting('critical.type') === 'persona') {
            return personaImg
        }
    } else if (fireEmblemImg) {
        return fireEmblemImg
    }
    return personaImg
}