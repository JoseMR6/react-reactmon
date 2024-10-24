import { getSkinRoute } from "../Controller/functions/skins"
import { useGame } from "../Controller/hooks/useGame"
import { Player } from "../Model/Player"
import { WINDOW_NAMES } from "../Model/constants"
import './WriteName.css'

export function WriteName() {
    const { player, setPlayer, languajeDocument, changeWindow, setInitWindow
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
                            setInitWindow(WINDOW_NAMES.CHOOSE_CREATURE)
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