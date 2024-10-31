import { GAME_STATES, WINDOW_NAMES, WIN_COINS } from '../Logic/constants'
import { shuffle } from '../Logic/functions/arrays'
import { useGame } from '../Logic/hooks/useGame'
import { ElemntIcon } from './Types'
import './WinOptions.css'
import { CreatureImg } from './creatures/CreatureImg'
import CoinIcon from '/coin.svg'

export function WinOptions() {
    const { coins, setCoins, changeWindow, chooseOptions, rivalCreatures,
        setGameState,setInitWindow
     } = useGame()

    const rivalClone = []
    rivalCreatures.forEach(creature => {
        const creatureClone = creature.clone()
        creatureClone.reset()
        rivalClone.push(creatureClone)
    });
    shuffle(rivalClone)

    const creature = rivalClone[0]

    return (
        <>
            <div className="winOptionsContainer">
                <h1>Has Ganado: Elije Recompensa</h1>
                <div className='optionsContainer'>
                    <div className='optionContainer'
                        onClick={() => {
                            chooseOptions.current = rivalClone
                            changeWindow(WINDOW_NAMES.CHOOSE_CREATURE)
                        }}
                    >
                        <div className='imgOption'>
                            <CreatureImg
                                name={creature.image.name}
                                type={creature.type}
                                dark={creature.image.dark}
                            />
                        </div>
                        <div className='optionText'>
                            <b>Criatura Enemiga</b>
                        </div>
                    </div>

                    <div className='optionContainer'>
                        <div className='imgOption'>
                            <img className={'category ' + creature.attacks[0].category}
                                src={'./src/assets/categories/' + creature.attacks[0].category + '.svg'}
                            />
                            <ElemntIcon type={creature.attacks[0].type} />
                        </div>
                        <div className='optionText'>
                            <b>Ataque Enemigo</b>
                        </div>
                    </div>

                    <div className='optionContainer'
                        onClick={() => {
                            setCoins(coins + WIN_COINS)
                            setInitWindow(WINDOW_NAMES.BATTLE_PREVIEW)
                            setGameState(GAME_STATES.BATTLE)
                            changeWindow(WINDOW_NAMES.BATTLE_PREVIEW)
                        }}
                    >
                        <div className='imgOption'>
                            <img
                                src={CoinIcon} className="imgOption"
                                alt="Icono de monedas"
                            />
                        </div>
                        <div className='optionText'>
                            <b>Monedas</b>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}