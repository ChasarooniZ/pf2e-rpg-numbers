// import { MODULE_ID } from "./misc.js";

// export function sendUpdateChatMessage() {
//     const version = game.modules.get('pf2e-rpg-numbers').version;
//     const pastVersion = game.settings.get(MODULE_ID, 'updateMessage')
//     getVersionDifferenceList(splitVersions(version), splitVersions(pastVersion))
//     game.settings.set(MODULE_ID, 'updateMessage', version)
// }
// await ChatMessage.create({ content: `<h1>PF2e RPG Number Info</h1>` })

// function createChatMessage(header, desc) {
//     await ChatMessage.create({ content: `<h2>hi</h2><p>lol i don't know</p>` })
// }

// function getVersionDifferenceList(version, pastVersion) {
//     for (let major = pastVersion[0]; major <= version[0]; major++) {
//         for (let minor = pastVersion[1]; minor <= version[1]; minor++) {
//             for (let patch = pastVersion[2]; patch <= version[2]; patch++) { }
//         }

//     }
// }

// function splitVersions(version) {
//     let items = version.split(".");
//     return [
//         items[0],
//         items[1],
//         ...items[2].includes("-").split("-")
//     ]
// }

// function getChangeInfo(major, minor, patch, beta = null) {
//     const versions = {
//         11: {
//             9: {
//                 0: {
//                     header: 'Pizzazz',
//                     desc: ['Added ']
//                 }
//             }
//         }
//     }
// }