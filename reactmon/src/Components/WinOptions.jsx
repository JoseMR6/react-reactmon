import { BOSS_WIN_COINS, GAME_STATES, MAX_CREATURES, WINDOW_NAMES, WIN_COINS } from '../Logic/constants'
import { shuffle } from '../Logic/functions/calculations'
import { creatureReset } from '../Logic/functions/creature'
import { useGame } from '../Logic/hooks/useGame'
import { ElemntIcon } from './Types'
import './WinOptions.css'
import { CreatureImg } from './creatures/CreatureImg'
import CoinIcon from '/coin.svg'

export function WinOptions() {
    const { coins, setCoins, changeWindow, chooseOptions, rivalCreatures,
        setGameState, setInitWindow, languajeDocument
    } = useGame()

    const rivalClone = []
    rivalCreatures.forEach(creature => {
        const creatureClone = structuredClone(creature)
        creatureReset(creatureClone)
        rivalClone.push(creatureClone)
    });
    shuffle(rivalClone)

    const creature = rivalClone[0]

    const lang = languajeDocument.WinOptions

    const handleCoinsClick=()=>{
        const coinsReward = (rivalCreatures.length>=MAX_CREATURES)?BOSS_WIN_COINS:WIN_COINS
        setCoins(coins + coinsReward)
        setInitWindow(WINDOW_NAMES.BATTLE_PREVIEW)
        setGameState(GAME_STATES.BATTLE)
        changeWindow(WINDOW_NAMES.BATTLE_PREVIEW)
    }

    return (
        <>
            <div className="winOptionsContainer">
                <h1>{lang.title}</h1>
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
                            <b>{lang.optionCreature}</b>
                        </div>
                    </div>

                    <div className='optionContainer'
                        onClick={() => {
                            chooseOptions.current = rivalClone
                            changeWindow(WINDOW_NAMES.CHOOSE_ATTACK)
                        }}
                    >
                        <div className='imgOption'>
                            <img className={'category ' + creature.attacks[0].category}
                                src={'./src/assets/categories/' + creature.attacks[0].category + '.svg'}
                            />
                            <ElemntIcon type={creature.attacks[0].type} />
                        </div>
                        <div className='optionText'>
                            <b>{lang.optionAttack}</b>
                        </div>
                    </div>

                    <div className='optionContainer'
                        onClick={handleCoinsClick}
                    >
                        <div className='imgOption'>
                            <img
                                src={CoinIcon} className="imgOption"
                                alt="Icono de monedas"
                            />
                        </div>
                        <div className='optionText'>
                            <b>{lang.optionCoins}</b>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}