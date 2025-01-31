import { getSetting, localize, MODULE_ID, setSetting } from "../misc.js";
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
    default: DEFAULT_CRIT_DATA,
    checks: DEFAULT_CRIT_DATA,
    saves: DEFAULT_CRIT_DATA,
    strikes: DEFAULT_CRIT_DATA,
};

export const DEFAULT_TOKEN = {
    rotation: {
        offset: 0,
    }
}

export async function handleUpdate(curVersion, prevVersion) {
    //12.7.0
    if (foundry.utils.isNewerVersion('12.7.0', prevVersion))
        await migrateTokenSettingsToActorSettings;

    //End of handling
    setSetting('last-version', curVersion);
}

export async function migrateTokenSettingsToActorSettings() {
    //Get all actors
    const actors = game.actors.contents;
    //Update a HUD bar as you go through each actor
    const actorCnt = actors.length;
    let cnt = 0;
    console.log("Started Migration for 12.7.0")
    for (const actor in actors) {
        cnt++;
        //Progress
        console.log(localize('display-text.notifications.migrate-token-settings-12-7', { actorName: actor.name }),)
        SceneNavigation.displayProgressBar({ label: localize('display-text.notifications.migrate-token-settings-12-7', { actorName: actor.name }), pct: (cnt / actorCnt) * 100 })

        await migrateActorTokenSettings(actor);
    }
    console.log("Settings Migrated")
}

export async function migrateActorTokenSettings(actor) {
    const token = actor?.prototypeToken;
    const flags = token?.flags?.['pf2e-rpg-numbers'];
    if (token && flags) {
        //Set Game version to ease future migration attempt
        await setActorFlag(actor, 'version', game.modules.get('pf2e-rpg-numbers').version);

        const crit = {
            success: {
                default: {
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
                checks: DEFAULT_CRIT_DATA,
                saves: DEFAULT_CRIT_DATA,
                strikes: DEFAULT_CRIT_DATA
            },
            failure: DEFAULT_CRIT
        };
        await setActorFlag(actor, 'critical', crit);

        const tok = {
            rotation: {
                offset: flags?.rotationOffset ?? 0,
            }
        };
        await setActorFlag(actor, 'token', tok);

    }
}

//sets actor flag
async function setActorFlag(actor, key, value) {
    return actor.setFlag(MODULE_ID, key, value)
}

function getCritImageLegacy(flags) {
    const fireEmblemImg = flags?.fireEmblemImg;
    const personaImg = flags?.personaImg;
    if (fireEmblemImg && personaImg) {
        if (getSetting('critical.type') === 'persona') {
            return personaImg
        }
    } else if (fireEmblemImg) {
        return fireEmblemImg
    }
    return personaImg
}