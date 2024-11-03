import { getSkinRoute } from '../Logic/functions/parse'
import { useGame } from '../Logic/hooks/useGame'
import './RightPanel.css'

import CoinIcon from '/coin.svg'

export function RightPanel() {
    const { languajeDocument, round, coins, player } = useGame()

    const lang = languajeDocument.RightPanel
    
    return (
        <>
            <div className="rightPanel">
                <div className="option">
                    <div className='line'>
                        <span><b>{lang.Record}</b>:</span>
                        <span>{player.record}</span>
                    </div>
                    <div className='line'>
                        <span><b>{lang.Round}</b>:</span>
                        <span>{round}</span>
                    </div>
                </div>
                <div className="option">
                    <div className='line2'>
                        <span><b>{lang.Coins.text}</b></span>
                    </div>
                    <div className='line2'>
                        <span>{coins}</span>
                        <img
                            src={CoinIcon} className="imgOption"
                            alt={lang.Coins.imgAlt}
                        />
                    </div>
                </div>
                <div className="option">
                    {player.image != '' &&
                        <img src={getSkinRoute(player.image)}
                            alt={player.image}
                        />
                    }
                    {player.name != '' &&
                        <div className='playerName'><b>{player.name}</b></div>
                    }
                </div>
            </div>
        </>
    )
}