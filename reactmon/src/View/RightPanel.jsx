import './RightPanel.css'

import CoinIcon from '/coin.svg'

export function RightPanel() {

    return (
        <>
            <div className="rightPanel">
                <div className="option">
                    <div className='line'>
                        <span>Record:</span>
                        <span>109</span>
                    </div>
                    <div className='line'>
                        <span>Ronda:</span>
                        <span>10</span>
                    </div>
                </div>
                <div className="option">
                    <div className='line2'>
                        <span>Monedas</span>
                    </div>
                    <div className='line2'>
                        <span>1000</span>
                        <img
                            src={CoinIcon} className="imgOption"
                            alt="Icono de Moneda"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}