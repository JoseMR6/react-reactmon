import { getSkinRoute } from '../Controller/functions/skins'
import { useGame } from '../Controller/hooks/useGame'
import { Player } from '../Model/Player'
import { PLAYER_SKINS, WINDOW_NAMES } from '../Model/constants'
import './SelectSkin.css'

export function SelectSkin() {
    const {player,setPlayer,actualWindow,formerWindow,setActualWindow,
        languajeDocument
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
                                        player.record))
                                    formerWindow.current = actualWindow
                                    setActualWindow(WINDOW_NAMES.WRITE_NAME)
                                }}
                            />
                        )
                    })}

                </div>
            </div>

        </>
    )
}