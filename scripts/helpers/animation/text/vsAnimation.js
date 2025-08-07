import { getSetting, localize } from "../../misc.js";
import { MODULE_ID, MS_TO_SEC } from "../../const.js";

const startUpEach = 100;

export async function vsAnimation() {
    if (!(game.combat?.combatants?.contents || canvas.tokens.controlled)) {
        ui.notifications.error("You need a combat encounter or tokens selected");
        return;
    }
    const CONFIG = {
        showTeamNames: getSetting("vs.show-name"),
        duration: getSetting("vs.duration"),
    };

    const defNames = {
        party: game.actors?.party?.name ?? "",
        opposition: "",
    };
    let teamNames;
    if (CONFIG.showTeamNames) {
        teamNames = await await foundry.applications.api.DialogV2.prompt({
            window: {
                title: localize("menu.versus.name.title"),
                controls: [
                    {
                        action: "kofi",
                        label: "Support Dev",
                        icon: "fa-solid fa-mug-hot fa-beat-fade",
                        onClick: () => window.open("https://ko-fi.com/chasarooni", "_blank"),
                    },
                ],
                icon: "far fa-swords",
            },
            position: {
                width: 550,
            },
            content: `
              <form>
                <div style="display: flex; align-items: center; gap: 20px; padding-bottom: 1.5em;">
                  <div>
                    <label for="partyName" style="text-align: center;">${localize("menu.versus.name.party")}</label><br>
                    <input type="text" id="partyName" name="partyName" style="width: 250px;" value="${defNames.party}">
                  </div>
                  <div>
                    <label for="opponentName" style="text-align: center;">${localize(
                "menu.versus.name.opponent"
            )}</label><br>
                    <input type="text" id="opponentName" name="opponentName" style="width: 250px;" value="${defNames.opposition
                }">
                  </div>
                </div>
                <div>
                </div>
              </form>`,
            ok: {
                label: "OK",
                callback: (event, button, dialog) => {
                    const party = button.form.elements.partyName.value;
                    const opposition = button.form.elements.opponentName.value;
                    return { party, opposition };
                },
            },
        });
    }
    if (teamNames === null) return;
    const colorMap = game.users.players
        .filter((p) => p.character)
        .reduce((res, p) => {
            res[p.character.id] = p.color.css;
            return res;
        }, {});

    const encounter = game.combat;
    const maxDur = CONFIG.duration * MS_TO_SEC;
    const art = {
        enemies: (encounter ? encounter.combatants.contents : canvas.tokens.controlled)
            .filter(
                (c, _id, combatants) =>
                    c?.actor?.alliance === "opposition" &&
                    (encounter ? !c?.hidden && isVisible(c.token, comb) : isVisible(c?.document))
            )
            .map((c, _id, combatants) => ({
                img: c?.actor?.img ?? "",
                visible: encounter ? !isHidden(c.token) : !isHidden(c?.document),
                id: c.actor.id,
                color:
                    colorMap[c.actor.id] ||
                    (encounter
                        ? c?.token?.document?.ring?.colors?.ring?.css || "#FFA500"
                        : c?.document?.ring?.colors?.ring?.css || "#FFA500"),
            })),
        party: (encounter ? encounter.combatants.contents : canvas.tokens.controlled)
            .filter(
                (c, _id, combatants) =>
                    c?.actor?.alliance === "party" &&
                    (encounter ? !c?.hidden && isVisible(c.token) : isVisible(c?.document))
            )
            .map((c, _id, combatants) => ({
                img: c?.actor?.img ?? "",
                visible: encounter ? !isHidden(c.token) : !isHidden(c?.document),
                id: c.actor.id,
                color:
                    colorMap[c.actor.id] ||
                    (encounter
                        ? c?.token?.document?.ring?.colors?.ring?.css || "#FFA500"
                        : c?.document?.ring?.colors?.ring?.css || "#FFA500"),
            })),
    };
    let seq = new Sequence({ moduleName: game.modules.get(MODULE_ID).title });
    let cnt = 1;
    for (const p of art.party) {
        seq = createActorAnim(seq, {
            art: p.img,
            number: cnt,
            total: art.party.length + 1,
            side: "left",
            visible: p.visible,
            color: p.color,
        });
        cnt++;
    }
    cnt = 1;
    for (const e of art.enemies) {
        seq = createActorAnim(seq, {
            art: e.img,
            number: cnt,
            total: art.enemies.length + 1,
            side: "right",
            visible: e.visible,
            color: e.color,
        });
        cnt++;
    }

    const delayVS = startUpEach * (Math.max(art.enemies.length, art.party.length) + 2);
    seq.effect()
        .file("modules/pf2e-rpg-numbers/resources/imgs/vs_1.webp")
        .delay(delayVS)
        .fadeIn(startUpEach * 4, { ease: "easeOutQuart" })
        .scaleIn(2, startUpEach * 4, { ease: "easeOutCubic" })
        .fadeOut(startUpEach * 8, { ease: "easeOutQuart" })
        .duration(maxDur - delayVS + startUpEach)
        .screenSpace()
        .screenSpaceAboveUI()
        .screenSpaceScale({ x: 0.25, fitX: true, ratioY: true });

    if (teamNames) {
        seq = teamName(seq, { name: teamNames.party, side: "left" });
        seq = teamName(seq, { name: teamNames.opposition, side: "right" });
    }

    seq.play({ preload: true });
    //})

    function createActorAnim(seq, { art, number, total, side = "left", visible, color }) {
        seq.effect()
            .file(art)
            .screenSpace()
            .screenSpaceAboveUI()
            .screenSpaceAnchor({
                x: side === "left" ? 0.05 + (number / total) * 0.4 : 0.95 - (number / total) * 0.4,
                y: 0.5,
            })
            .anchor({ x: side === "left" ? 0.9 : 0.1, y: 0.5 })
            .screenSpaceScale({ x: 0.8 / total, fitX: true, ratioY: true })
            .animateProperty("sprite", "position.x", {
                from: side === "left" ? -0.5 : 0.5,
                to: 0,
                duration: startUpEach * 4,
                screenSpace: true,
                ease: "easeOutExpo",
            })
            .zIndex(number)
            .duration(maxDur - startUpEach * number)
            .delay(startUpEach * number)
            .fadeOut(startUpEach * (4 + number), { ease: "easeOutExpo" });
        if (visible === false) {
            seq.filter("ColorMatrix", {
                brightness: 0,
            }).filter("Glow", {
                distance: 5, // Number, distance of the glow in pixels
                outerStrength: 1, // Number, strength of the glow outward from the edge of the sprite
                color: 0xffffff, // Hexadecimal, color of the glow
                quality: 0.1,
            });
        } else {
            // seq.filter("Glow", {
            //     distance: 5, // Number, distance of the glow in pixels
            //     outerStrength: 1, // Number, strength of the glow outward from the edge of the sprite
            //     color: color, // Hexadecimal, color of the glow
            //     quality: 0.1,
            // });
        }
        return seq;
    }

    function teamName(seq, { name, side = "left" }) {
        seq.effect()
            .text(` ${name} `, {
                fontFamily: "Impact",
                fontSize: 35,
                fontStyle: "italic",
                stroke: "#ffffff",
                strokeThickness: 5,
            })
            .screenSpace()
            .screenSpaceAboveUI()
            .screenSpaceAnchor({ x: side === "left" ? 0.2 : 0.8, y: 0.7 })
            .fadeIn(startUpEach * 4, { ease: "easeOutQuart" })
            .scaleIn(2, startUpEach * 4, { ease: "easeOutCubic" })
            .fadeOut(startUpEach * 8, { ease: "easeOutQuart" })
            .duration(maxDur - startUpEach * 8)
            .delay(startUpEach * 8)
            .zIndex(100);
        return seq;
    }

    function isVisible(tokenDoc, combatantTokens) {
        return (
            tokenDoc?.visible &&
            !Object.values(tokenDoc.flags?.["pf2e-perception"]?.data ?? {})?.some((item) =>
                ["undetected", "unnoticed"].includes(item?.visibility)
            ) &&
            !tokenDoc.actor.conditions.bySlug("undetected")?.length &&
            (
                !game.modules.get("pf2e-visioner")?.active ||
                !combatantTokens.some(tok =>
                    game.modules.get("pf2e-visioner").api
                        .getVisibility(tok.id, tokenDoc.id) === 'undetected'
                )
            )
        );
    }

    function isHidden(tokenDoc, combatantsTokens) {
        return (
            !!tokenDoc.actor.conditions.bySlug("hidden")?.length ||
            !!tokenDoc.actor.conditions.bySlug("concealed")?.length ||
            Object.values(tokenDoc.flags?.["pf2e-perception"]?.data ?? {})?.some((item) =>
                ["hidden", "concealed"].includes(item?.visibility)
            ) || (
                game.modules.get("pf2e-visioner")?.active &&
                combatantTokens.some(tok =>
                    ['hidden', 'concealed'].includes(
                        game.modules.get("pf2e-visioner").api
                            .getVisibility(tok.id, tokenDoc.id)
                    )
                )
            )
        );
    }
}
