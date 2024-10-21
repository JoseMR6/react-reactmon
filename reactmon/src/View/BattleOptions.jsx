import { useGame } from '../Controller/hooks/useGame'
import './BattleOptions.css'

export function BattleOptions() {
    const { playerCreatures, rivalCreatures, indexActualCreaturePlayer,
        indexActualCreatureRival, healthActualCreaturePlayer,
        healthActualCreatureRival, buffsActualCreaturePlayer,
        buffsActualCreatureRival
    } = useGame()

    console.log(playerCreatures[indexActualCreaturePlayer])
    console.log(healthActualCreaturePlayer)
    console.log(buffsActualCreaturePlayer)
    console.log(rivalCreatures[indexActualCreatureRival])
    console.log(healthActualCreatureRival)
    console.log(buffsActualCreatureRival)

    return (
        <>
            <div className='generalBattleContainer'>
                <div className='battleContainer'>

                </div>
                <div className='optionsContainer'>
                    <div className='option'>
                        <span>Luchar</span>
                        <img className='attack'
                            src={'./src/assets/options/battle.svg'}
                        />
                    </div>
                    <div className='option'>
                        <span>Cambiar</span>
                        <img className='change'
                            src={'./src/assets/options/change.svg'}
                        />
                    </div>
                    <div className='option'>
                        <span>Rendirse</span>
                        <img className='surrender'
                            src={'./src/assets/options/surrender.svg'}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}