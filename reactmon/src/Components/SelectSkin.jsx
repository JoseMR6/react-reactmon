import { getSkinRoute } from '../Logic/functions/parse'
import { useGame } from '../Logic/hooks/useGame'
import { Player } from '../Logic/classes/Player'
import { BACKGROUNDS, PLAYER_SKINS, WINDOW_NAMES } from '../Logic/constants'
import './SelectSkin.css'
import { useEffect } from 'react'

export function SelectSkin() {
    const { player, setPlayer,
        languajeDocument, changeWindow, setBackground
    } = useGame()

    const lang = languajeDocument.SelectSkin

    useEffect(() => {
        const playerStored = localStorage.getItem("reactmonPayer")
        if (playerStored) setPlayer(JSON.parse(playerStored))
        
        setBackground(BACKGROUNDS[BACKGROUNDS.length-1])
    }, [])

    const handleSkinClick=(skin)=>{
        setPlayer(new Player(player.name, skin,
            player.record)
        )
        changeWindow(WINDOW_NAMES.WRITE_NAME)
    }

    const skinsKeys = Object.keys(PLAYER_SKINS)

    return (
        <>
            <div className="skinContainer">
                <h1>{lang.title}</h1>
                <div>
                    {skinsKeys.map((skin, index) => {
                        return (
                            <img key={index}
                                src={getSkinRoute(skin)}
                                alt={skin} className={'skinImg '
                                    + (player.image == skin ? 'selected' : '')
                                }
                                onClick={()=>{handleSkinClick(skin)}}
                            />
                        )
                    })}

                </div>
            </div>

        </>
    )
}