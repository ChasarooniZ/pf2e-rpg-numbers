import { MODULE_ID } from "../misc.js";
import { EnhancedTour } from "../library/EnhancedTour.js";
import { TOUR_LIST, TOURS, TOUR_BASICS } from "./tour-setup.js";

export function sendUpdateMessage() {
    let pastVersion = "0.0.0";
    const version = game.modules.get(MODULE_ID).version;
    try {
        pastVersion = game.settings.get(MODULE_ID, "last-version");
    } catch (e) { }
    const toursToRun = getNewTourList(splitVersions(version), splitVersions(pastVersion));
    game.settings.set(MODULE_ID, "last-version", version);
    if (toursToRun.length === 0) return;
    runTour(toursToRun);
}

function getNewTourList(pastVersion, version) {
    return TOUR_LIST.filter((tour) => foundry.utils.isNewerVersion(version, tour) && foundry.utils.isNewerVersion(tour, pastVersion))
}

function splitVersions(version) {
    let items = version.split(".");
    return [items[0], items[1], ...items[2].split("-")];
}

async function runTour(tourStepsArray) {
    let tourData = TOUR_BASICS;
    const hasFirst = tourStepsArray.some((t) => TOURS[t].first);
    tourStepsArray.forEach((t) => (tourData.steps = tourData.steps.concat(TOURS[t].steps)));
    const tour = new EnhancedTour(tourData);
    await tour.reset();
    if (!hasFirst) {
        game.settings.sheet.render(true);
        await new Promise((resolve) =>
            setTimeout(function () {
                document
                    .querySelector(
                        '#client-settings > section > div > aside > nav > a.item.category-tab[data-tab="pf2e-rpg-numbers"]'
                    )
                    .click();
                Promise.resolve(resolve);
            }, 1000)
        );
    }
    await tour.start();
}
