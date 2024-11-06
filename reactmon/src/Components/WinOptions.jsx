import { useEffect } from 'react'
import { BOSS_WIN_COINS, GAME_STATES, MAX_CREATURES, ROUNDS_PER_STAGE, WINDOW_NAMES, WIN_COINS } from '../Logic/constants'
import { shuffle } from '../Logic/functions/calculations'
import { creatureReset } from '../Logic/functions/creature'
import { useGame } from '../Logic/hooks/useGame'
import { ElemntIcon } from './Types'
import './WinOptions.css'
import { CreatureImg } from './creatures/CreatureImg'
import CoinIcon from '/coin.svg'

export function WinOptions() {
    const { coins, setCoins, changeWindow, setChooseOptions, rivalCreatures,
        setGameState, setInitWindow, languajeDocument, round, initWindow,
        chooseOptions
    } = useGame()

    useEffect(()=>{
        if(initWindow==WINDOW_NAMES.WIN_OPTIONS){
            const rivalClone = []
            rivalCreatures.forEach(creature => {
                const creatureClone = structuredClone(creature)
                creatureReset(creatureClone)
                rivalClone.push(creatureClone)
            });
            shuffle(rivalClone)
            setChooseOptions(rivalClone)

            setInitWindow(null)
        }
    },[])

    const creature = chooseOptions[0]

    const lang = languajeDocument.WinOptions

    const handleCoinsClick = () => {
        const coinsReward = (rivalCreatures.length >= MAX_CREATURES) ? BOSS_WIN_COINS : WIN_COINS
        setCoins(coins + coinsReward)
        if ((round>=ROUNDS_PER_STAGE)&&(round%ROUNDS_PER_STAGE == 0)) {
            setGameState(GAME_STATES.SHOPPING)
            setInitWindow(WINDOW_NAMES.SHOP)
            changeWindow(WINDOW_NAMES.SHOP)
        }else{
            setInitWindow(WINDOW_NAMES.BATTLE_PREVIEW)
            setGameState(GAME_STATES.BATTLE)
            changeWindow(WINDOW_NAMES.BATTLE_PREVIEW)
        }
    }

    return (
        <>
            <div className="winOptionsContainer">
                <h1>{lang.title}</h1>
                <div className='optionsContainer'>
                    <div className='optionContainer'
                        onClick={() => {
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