import { useGame } from '../Logic/hooks/useGame'
import './DevPanel.css'

export function DevPanel(){
    const {setRound, setCoins} = useGame()
    
    const handleSetRoundClick=()=>{
        const newValue = parseInt(document.getElementById("devPanelSetRound").value)
        setRound(newValue)
    }

    const handleSetCoinsClick=()=>{
        const newValue = parseInt(document.getElementById("devPanelSetCoins").value)
        setCoins(newValue)
    }
    
    return(
        <>
            <div className='devPanelContainer'>
                <div className='devOption'>
                    <div className='devButton'
                        onClick={handleSetRoundClick}
                    >
                        Set Round
                    </div>
                    <input id='devPanelSetRound' type='number' defaultValue={0}/>
                </div>
                <div className='devOption'>
                    <div className='devButton'
                        onClick={handleSetCoinsClick}
                    >
                        Set Coins
                    </div>
                    <input id='devPanelSetCoins' type='number' defaultValue={0}/>
                </div>
            </div>
        </>
    )
}