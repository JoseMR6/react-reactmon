import { getSkinRoute } from '../Logic/functions/skins'
import { useGame } from '../Logic/hooks/useGame'
import { Player } from '../Logic/classes/Player'
import { PLAYER_SKINS, WINDOW_NAMES } from '../Logic/constants'
import './SelectSkin.css'

export function SelectSkin() {
    const {player,setPlayer,
        languajeDocument, changeWindow
    } = useGame()

    const lang = languajeDocument.SelectSkin

    return (
        <>
            <div className="skinContainer">
                <h1>{lang.title}</h1>
                <div>
                    {PLAYER_SKINS.map((skin, index) => {
                        return (
                            <img key={index} 
                                src={getSkinRoute(skin)}
                                alt={skin} className='skinImg'
                                onClick={()=>{
                                    setPlayer(new Player(player.name,skin,
                                        player.record)
                                    )
                                    changeWindow(WINDOW_NAMES.WRITE_NAME)
                                }}
                            />
                        )
                    })}

                </div>
            </div>

        </>
    )
}