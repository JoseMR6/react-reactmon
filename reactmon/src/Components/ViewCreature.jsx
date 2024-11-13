import { useState } from 'react'
import { GAME_STATES, INIT_STATES, ITEM_TYPES, MAX_CREATURES, PLAYER_CREATURE_EXAMPLE, ROUNDS_PER_STAGE, WINDOW_NAMES } from '../Logic/constants'
import { ElemntIcon } from './Types'
import { ViewAttack } from './ViewAttack'
import './ViewCreature.css'
import { ViewStats } from './ViewStats'
import { CreatureImg } from './creatures/CreatureImg'
import { useGame } from '../Logic/hooks/useGame'
import { PropTypes } from 'prop-types'
import { creatureCanForget } from '../Logic/functions/creature'
import { getCategoryRoute } from '../Logic/functions/parse'

export function ViewCreature() {
    const { languajeDocument, selectedItem, changeWindow, gameState,
        extraItem, setExtraItem, setInitWindow, setGameState, playerCreatures, setPlayerCreatures,
        indexActualCreaturePlayer, initWindow,round
    } = useGame()
    const [select, setSelect] = useState(2) //stats

    const lang = languajeDocument.ViewCreature
    const newAttack = (gameState == GAME_STATES.NEW_ITEM && extraItem.itemType == ITEM_TYPES.ATTACK)

    const creature = (selectedItem && selectedItem.item)
        ? selectedItem.item
        : PLAYER_CREATURE_EXAMPLE

    const cloneCreature = structuredClone(creature)

    const handleTeachAttackClick = () => {
        const cloneCreatures = structuredClone(playerCreatures)
        const attacks = cloneCreatures[indexActualCreaturePlayer].attacks
        if (select < 2 && attacks.length >= 2) {
            attacks.splice(select, 1)
        }
        if (select != 2 || attacks.length < 2) {
            attacks.push(extraItem.item)
            setPlayerCreatures(cloneCreatures)
        }
        setExtraItem({ itemType: null, item: null })

        if (((round>=ROUNDS_PER_STAGE)&&(round%ROUNDS_PER_STAGE == 0))
            ||initWindow == INIT_STATES.PURCHASED
        ) {
            setInitWindow(WINDOW_NAMES.SHOP)
            setGameState(GAME_STATES.SHOPPING)
            changeWindow(WINDOW_NAMES.SHOP)
        } else {
            setInitWindow(WINDOW_NAMES.BATTLE_PREVIEW)
            setGameState(GAME_STATES.BATTLE)
            changeWindow(WINDOW_NAMES.BATTLE_PREVIEW)
        }

    }

    const handleReturnClick = () => {
        if (gameState == GAME_STATES.START || gameState == GAME_STATES.WIN)
            changeWindow(WINDOW_NAMES.CHOOSE_CREATURE)
        else if (gameState == GAME_STATES.BATTLE || gameState == GAME_STATES.NEW_ITEM)
            changeWindow(WINDOW_NAMES.CREATURES_BACKPACK)
        else if (gameState == GAME_STATES.SHOPPING)
            changeWindow(WINDOW_NAMES.SHOP)
    }

    const handleGetCreature = () => {
        if (playerCreatures.length >= MAX_CREATURES) {
            setExtraItem({ itemType: ITEM_TYPES.CREATURE, item: creature })
            setGameState(GAME_STATES.NEW_ITEM)
            changeWindow(WINDOW_NAMES.CREATURES_BACKPACK)
        } else {
            setPlayerCreatures([...playerCreatures, creature])

            setInitWindow(WINDOW_NAMES.SHOP)
            setGameState(GAME_STATES.SHOPPING)
            changeWindow(WINDOW_NAMES.SHOP)
        }
    }

    const handleGetAttack = () => {
        if (select < 2) {
            setExtraItem({ itemType: ITEM_TYPES.ATTACK, item: creature.attacks[select] })
            setGameState(GAME_STATES.NEW_ITEM)
            changeWindow(WINDOW_NAMES.CREATURES_BACKPACK)
        }
    }

    return (
        <>
            <div className="viewCreatureContainer">
                <h2>{lang.title}</h2>
                <div className='sectionsContainer'>
                    <div className="section1">
                        <div className='imgCreatureContainer'>
                            <div className='imgCreature'>
                                <CreatureImg
                                    name={creature.image.name}
                                    type={creature.type}
                                    dark={creature.image.dark}
                                />
                            </div>
                            <ElemntIcon type={creature.type} />
                        </div>

                        <AttackContainer
                            index={0}
                            attack={creature.attacks[0]}
                            select={select}
                            setSelect={setSelect}
                        />
                        {creature.attacks.length > 1 &&
                            <AttackContainer
                                index={1}
                                attack={creature.attacks[1]}
                                select={select}
                                setSelect={setSelect}
                            />
                        }

                    </div>
                    <div className='section2'>
                        {!newAttack &&
                            <div className='healthContainer'>
                                <meter className='healthBar'
                                    value={creature.recordedHealth} min="0"
                                    max={creature.stats.maxHealth}
                                />
                                <span>{creature.recordedHealth}
                                    /{creature.stats.maxHealth}
                                </span>
                            </div>
                        }
                        <div className='buttonsContainer'>
                            {!newAttack &&
                                <div
                                    className={'buttonStats '
                                        + (select == 2 ? 'selected' : '')
                                    }
                                    onClick={() => {
                                        setSelect(2)
                                    }}
                                >
                                    <b>{lang.statsButton}</b>
                                </div>
                            }
                            {newAttack &&
                                <>
                                    <AttackContainer
                                        index={2}
                                        attack={extraItem.item}
                                        select={select}
                                        setSelect={setSelect}
                                    />
                                    <div
                                        className={'buttonReturn stats '
                                            + (select == 3 ? 'selected' : '')
                                        }
                                        onClick={() => {
                                            setSelect(3)
                                        }}
                                    >
                                        <b>Stats</b>
                                    </div>
                                    {(extraItem.item.name != creature.attacks[0].name
                                        && (!creature.attacks[1] || extraItem.item.name != creature.attacks[1].name)
                                        && creatureCanForget(cloneCreature, select, extraItem.item)
                                        && select != 3
                                    ) &&
                                        <div className='buttonReturn'
                                            onClick={handleTeachAttackClick}
                                        >
                                            {playerCreatures[indexActualCreaturePlayer].attacks.length >= 2 &&
                                                <b>{lang.forgetText}</b>
                                            }
                                            {!(playerCreatures[indexActualCreaturePlayer].attacks.length >= 2) &&
                                                <b>{lang.teachText}</b>
                                            }
                                        </div>
                                    }
                                </>
                            }
                            {!(initWindow == INIT_STATES.PURCHASED
                                && gameState == GAME_STATES.SHOPPING)
                                &&
                                <div className='buttonReturn'
                                    onClick={handleReturnClick}
                                >
                                    <b>{lang.returnButton}</b>
                                </div>
                            }
                            {(initWindow == INIT_STATES.PURCHASED
                                && gameState == GAME_STATES.SHOPPING)
                                &&
                                <>
                                    <div className='buttonReturn'
                                        onClick={handleGetCreature}
                                    >
                                        <b>{lang.getCreature}</b>
                                    </div>
                                    {select < 2 &&
                                        <div className='buttonReturn'
                                            onClick={handleGetAttack}
                                        >
                                            <b>{lang.getAttack}</b>
                                        </div>
                                    }

                                </>
                            }

                        </div>
                        <div className='infoContainer'>
                            {select == 3 &&
                                <ViewStats stats={creature.stats} />
                            }
                            {(select == 2 && !newAttack) &&
                                <ViewStats stats={creature.stats} />
                            }
                            {(select == 2 && newAttack) &&
                                <ViewAttack attack={extraItem.item} />
                            }
                            {(select == 0 || select == 1) &&
                                <ViewAttack attack={creature.attacks[select]} />
                            }
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export function AttackContainer({ index, attack, select, setSelect }) {
    const { languajeDocument } = useGame()
    const langA = languajeDocument.AttacksText

    return (
        <>
            <div
                className={'attackContainer '
                    + (select == index ? 'selected' : '')
                }
                onClick={() => {
                    setSelect(index)
                }}
            >
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
        </>
    )
}

AttackContainer.propTypes = {
    index: PropTypes.number.isRequired,
    attack: PropTypes.object.isRequired,
    select: PropTypes.number.isRequired,
    setSelect: PropTypes.func.isRequired
}