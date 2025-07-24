import { getSetting } from "../../misc.js";

export function handleDarkestDungeonStress(msg) {
  if (!getSetting("darkest-dungeon.stress.enabled")) return;
  const token = msg.token;
  const targets = getTargetList(msg).map(tID => canvas.tokens.get(tID))
  const users = getMessageVisible(msg);
  const data = {
    isAttackRoll: msg.flags?.pf2e?.context?.type === "attack-roll",
    isCrit: msg?.flags?.pf2e?.context?.outcome === 'criticalSuccess',
    isCritFail: msg?.flags?.pf2e?.context?.outcome === 'criticalFailure',
    type: msg?.flags?.pf2e?.context?.type ?? "attack-roll"
  }

  const friendlyTarget = targets.find(target => target.document.disposition === CONST.TOKEN_DISPOSITIONS.FRIENDLY);

  if (
    token?.document?.disposition === CONST.TOKEN_DISPOSITIONS.HOSTILE || friendlyTarget) { // contains a friendly creature
    switch (data.type) {
      case "perception-check":
      case "skill-check":
        if (data.isCrit && token?.document?.disposition !== CONST.TOKEN_DISPOSITIONS.FRIENDLY)
          darkestDungeonStress(friendlyTarget ?? targets?.[0], users)
        break;
      case "attack-roll":
        if (data.isCrit)
          darkestDungeonStress(friendlyTarget ?? targets?.[0], users)
        break;
      case "saving-throw":
        if (data.isCrit)
          darkestDungeonStress(friendlyTarget ?? targets?.[0], users)
        if (data.isCritFail)
          darkestDungeonStress(friendlyTarget ?? targets?.[0], users)
        break;
      default:
        break;
    }
  } else if (token?.document?.disposition === CONST.TOKEN_DISPOSITIONS.FRIENDLY) {
    switch (data.type) {
      case "perception-check":
      case "skill-check":
        if (data.isCrit)
          darkestDungeonRelief(token, users)
        if (data.isCritFail)
          darkestDungeonStress(token, users)
        break;
      case "attack-roll":
        if (data.isCrit)
          darkestDungeonRelief(token, users)
        break;
      case "saving-throw":
        if (data.isCrit)
          darkestDungeonRelief(token, users)
        if (data.isCritFail)
          darkestDungeonStress(token, users)
        break;
      default:
        break;
    }
  }
}

export function darkestDungeonRelief(token, users = game.users.contents.map(u => u.id)) {
  darkestDungeonHelper(token, false, users);
}

export function darkestDungeonStress(token, users = game.users.contents.map(u => u.id)) {
  darkestDungeonHelper(token, true, users);
}


function darkestDungeonHelper(token, isStress, users) {
  const tokens = canvas.tokens.placeables
    .filter(t => t.document.disposition === token.document.disposition)
    .filter(t => getSetting("darkest-dungeon.stress.include-target") ? true : t.id !== token.id)
    .sort((a, b) => a.distanceTo(token) - b.distanceTo(token));

  const config = {
    isStress: isStress,
    duration: getSetting("darkest-dungeon.stress.duration") * 1000,
    delayPerToken: getSetting("darkest-dungeon.stress.delay-per-token"),
    volume: getSetting("darkest-dungeon.stress.volume") / 100,
  }

  game.genga.api.darkestDungeonStress(tokens, config, users);
}