import { getSkinRoute } from "../Controller/functions/skins"
import { useGame } from "../Controller/hooks/useGame"
import { Creature } from "../Model/Creature"
import { Player } from "../Model/Player"
import { ELEMENTAL_TYPES, WINDOW_NAMES } from "../Model/constants"
import './WriteName.css'

export function WriteName() {
    const { player, setPlayer, languajeDocument, changeWindow,
        setChooseOptions, getNewId
    } = useGame()
    const skinImg = (player.image != '') ? player.image : 'acetrainer'
    const lang = languajeDocument.WriteName

    return (
        <>
            <div className="writeNameContainer">
                <h1>{lang.title}</h1>
                <img src={getSkinRoute(skinImg)}
                    className="skinImg"
                    alt={skinImg}
                />
                <input id="setName" type="text" placeholder={player.name}
                    maxLength="13"
                />
                <div className="continueButton"
                    onClick={() => {
                        const name = document.getElementById("setName").value
                        if (name.length >= 3) {
                            setPlayer(new Player(name, skinImg, player.record))
                            setChooseOptions([
                                Creature.generateCreature({
                                    id:getNewId(),
                                    type:ELEMENTAL_TYPES.FIRE,
                                    numAttacks:2,
                                    maxedStatsNum:1
                                }),
                                Creature.generateCreature({
                                    id:getNewId(),
                                    type:ELEMENTAL_TYPES.WATER,
                                    numAttacks:2,
                                    maxedStatsNum:1
                                }),
                                Creature.generateCreature({
                                    id:getNewId(),
                                    type:ELEMENTAL_TYPES.GRASS,
                                    numAttacks:2,
                                    maxedStatsNum:1
                                })
                            ])
                            
                            changeWindow(WINDOW_NAMES.CHOOSE_CREATURE)
                        }
                    }}
                >
                    <b>{lang.continueText}</b>
                </div>
            </div>

        </>
    )
}