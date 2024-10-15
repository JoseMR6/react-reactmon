import { useGame } from '../Controller/hooks/useGame'
import './RightPanel.css'

import CoinIcon from '/coin.svg'

export function RightPanel() {
    const {languajeDocument, round, coins, player} = useGame()

    const lang = languajeDocument.RightPanel

    return (
        <>
            <div className="rightPanel">
                <div className="option">
                    <div className='line'>
                        <span>{lang.Record}:</span>
                        <span>{player.record}</span>
                    </div>
                    <div className='line'>
                        <span>{lang.Round}:</span>
                        <span>{round}</span>
                    </div>
                </div>
                <div className="option">
                    <div className='line2'>
                        <span>{lang.Coins.text}</span>
                    </div>
                    <div className='line2'>
                        <span>{coins}</span>
                        <img
                            src={CoinIcon} className="imgOption"
                            alt={lang.Coins.imgAlt}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}