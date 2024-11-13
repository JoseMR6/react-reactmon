import { GAME_STATES, INIT_STATES, ITEM_TYPES, ROUNDS_PER_STAGE, WINDOW_NAMES } from '../Logic/constants'
import { creatureCanLearnAttack, getCreaturePrice } from '../Logic/functions/creature'
import { getCategoryRoute } from '../Logic/functions/parse'
import { useGame } from '../Logic/hooks/useGame'
import './CreaturesBackpack.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import CoinIcon from '/coin.svg'
import { PropTypes } from 'prop-types'

export function CreaturesBackpack() {
    const { playerCreatures, changeWindow, initWindow,
        languajeDocument, gameState, extraItem
    } = useGame()
    const lang = languajeDocument.CreaturesBackpack

    const handleReturnClick = () => {
        if (gameState == GAME_STATES.SHOPPING) {
            changeWindow(WINDOW_NAMES.SHOP)
        } else {
            changeWindow(WINDOW_NAMES.BATTLE_OPTIONS)
        }
    }

    return (
        <>
            <div className='creaturesBackpackContainer'>
                <h2>{lang.title}</h2>
                <div className='creaturesContainer'>
                    {playerCreatures.map((creature, index) => {
                        return (
                            <CreatureBackpack
                                key={index}
                                index={index}
                                creature={creature}
                            />
                        )
                    })}
                </div>
                {(initWindow != INIT_STATES.DEAD && gameState != GAME_STATES.NEW_ITEM) &&
                    <div className='return button'
                        onClick={handleReturnClick}
                    >
                        <b>{lang.returnButton}</b>
                    </div>
                }
                {(gameState == GAME_STATES.NEW_ITEM && extraItem.itemType == ITEM_TYPES.CREATURE) &&
                    < CreatureBackpack
                        index={6}
                        creature={extraItem.item}
                    />
                }
                {(gameState == GAME_STATES.NEW_ITEM && extraItem.itemType == ITEM_TYPES.ATTACK) &&
                    <AttackBackpack attack={extraItem.item} />
                }

            </div >
        </>
    )
}

function CreatureBackpack({ index, creature }) {
    const { changeWindow, setSelectedItem,
        languajeDocument, indexActualCreaturePlayer, setIndexActualCreaturePlayer,
        setInitWindow, initWindow, playerCreatures, setPlayerCreatures, gameState, extraItem,
        setExtraItem, setGameState, round, setCoins, coins, setCanSell, canSell
    } = useGame()
    const lang = languajeDocument.CreaturesBackpack
    const newAttack = (gameState == GAME_STATES.NEW_ITEM && extraItem.itemType == ITEM_TYPES.ATTACK)
    const cloneCreature = structuredClone(creature)
    const price = Math.floor(getCreaturePrice(creature) / 2)

    const handleViewClick = () => {
        if (newAttack) setIndexActualCreaturePlayer(index)
        setSelectedItem({ itemType: ITEM_TYPES.CREATURE, item: creature })
        changeWindow(WINDOW_NAMES.VIEW_CREATURE)
    }

    const handleChooseClick = () => {
        const cloneCreatures = structuredClone(playerCreatures)
        cloneCreatures[index].recordedBuffs = { cont: 0, stat: null }
        setPlayerCreatures(cloneCreatures)

        setIndexActualCreaturePlayer(index)
        if (initWindow == INIT_STATES.DEAD) {
            setInitWindow(INIT_STATES.FORCED_CHANGE)
        } else {
            setInitWindow(INIT_STATES.CHANGE)
        }
        changeWindow(WINDOW_NAMES.BATTLE_OPTIONS)
    }

    const handleDeleteClick = () => {
        if (index < 6) {
            const cloneCreatures = structuredClone(playerCreatures)
            cloneCreatures.splice(index, 1)
            cloneCreatures.push(extraItem.item)
            setPlayerCreatures(cloneCreatures)
        }
        setExtraItem({ itemType: null, item: null })
        if ((round >= ROUNDS_PER_STAGE) && (round % ROUNDS_PER_STAGE == 0)) {
            setGameState(GAME_STATES.SHOPPING)
            setInitWindow(WINDOW_NAMES.SHOP)
            changeWindow(WINDOW_NAMES.SHOP)
        } else {
            setInitWindow(WINDOW_NAMES.BATTLE_PREVIEW)
            setGameState(GAME_STATES.BATTLE)
            changeWindow(WINDOW_NAMES.BATTLE_PREVIEW)
        }
    }

    const handleSellClick = () => {
        const cloneCreatures = structuredClone(playerCreatures)
        cloneCreatures.splice(index, 1)
        setPlayerCreatures(cloneCreatures)
        setCoins(coins + price)
        setCanSell(false)
    }

    return (
        <>
            <div className='creatureContainer'>
                <div className='creatureImgContainer'>
                    <CreatureImg
                        name={creature.image.name}
                        type={creature.type}
                        dark={creature.image.dark}
                    />
                </div>
                <div className='basicInfoContainer'>
                    <meter className='healthBar'
                        value={creature.recordedHealth} min="0"
                        max={creature.stats.maxHealth}
                    />
                    <div className='iconContainer'>
                        <ElemntIcon type={creature.type} />
                        <div className='buttonsContainer'>
                            {(!newAttack || newAttack && creatureCanLearnAttack(cloneCreature, extraItem.item)) &&
                                <div className='view button'
                                    onClick={handleViewClick}
                                >
                                    <b>
                                        {newAttack &&
                                            lang.teachButton
                                        }
                                        {!newAttack &&
                                            lang.viewButton
                                        }
                                    </b>
                                </div>
                            }
                            {(index != indexActualCreaturePlayer && !creature.dead
                                && gameState != GAME_STATES.NEW_ITEM && gameState != GAME_STATES.SHOPPING
                            ) &&
                                <div className='choose button'
                                    onClick={handleChooseClick}
                                >
                                    <b>{lang.chooseButton}</b>
                                </div>
                            }
                            {(gameState == GAME_STATES.NEW_ITEM && extraItem.itemType == ITEM_TYPES.CREATURE) &&
                                <div className='delete button'
                                    onClick={handleDeleteClick}
                                >
                                    <b>{lang.deleteButton}</b>
                                </div>
                            }
                            {(gameState == GAME_STATES.SHOPPING
                                && playerCreatures.length > 1
                                && canSell
                            )
                                &&
                                <div className='sell button'
                                    onClick={handleSellClick}
                                >
                                    <b>{lang.sellButton}</b>
                                    <div>{price}</div>
                                    <img src={CoinIcon} className="imgOption" />
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

CreatureBackpack.propTypes = {
    creature: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

function AttackBackpack({ attack }) {
    const { setExtraItem, setInitWindow, setGameState, changeWindow, languajeDocument,
        round
    } = useGame()
    const lang = languajeDocument.CreaturesBackpack
    const langA = languajeDocument.AttacksText

    const handleDiscardClick = () => {
        setExtraItem({ itemType: null, item: null })
        if ((round >= ROUNDS_PER_STAGE) && (round % ROUNDS_PER_STAGE == 0)) {
            setGameState(GAME_STATES.SHOPPING)
            setInitWindow(WINDOW_NAMES.SHOP)
            changeWindow(WINDOW_NAMES.SHOP)
        } else {
            setInitWindow(WINDOW_NAMES.BATTLE_PREVIEW)
            setGameState(GAME_STATES.BATTLE)
            changeWindow(WINDOW_NAMES.BATTLE_PREVIEW)
        }
    }

    const handleExtraAttackInfoClick = (event) => {
        if (event.target.className == 'buttonOption')
            event.target.children[0].style.visibility = 'visible'
    }

    const handleExtraAttackInfoLeave = (event) => {
        let description = event.target.children[0]
        if (event.target.className == 'attackDescription') description = event.target
        description.style.visibility = 'hidden'
    }

    return (
        <>
            <div className='attackContainer'>
                <div className='section1'>
                    <span className='name'>
                        <b>{langA[attack.name].name}</b>
                    </span>
                    <div className='icons'>
                        <img className={'category ' + attack.category}
                            src={getCategoryRoute(attack.category)}
                        />
                        <ElemntIcon type={attack.type} />
                    </div>
                </div>
                <div className='section2'>
                    <div className='buttonOption'
                        onClick={handleDiscardClick}
                    >
                        <b>{lang.discardButton}</b>
                    </div>
                    <div className='buttonOption'
                        onClick={handleExtraAttackInfoClick}
                        onMouseLeave={handleExtraAttackInfoLeave}
                    >
                        ?
                        <div className='attackDescription'>{langA[attack.name].description}</div>
                    </div>

                </div>
            </div>
        </>
    )
}

AttackBackpack.propTypes = {
    attack: PropTypes.object.isRequired
}