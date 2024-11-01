import { useState } from 'react'
import { Creature } from '../Logic/classes/Creature'
import { ATTACKS, CREATURES, ELEMENTAL_TYPES, GAME_STATES, ITEM_TYPES, WINDOW_NAMES } from '../Logic/constants'
import { ElemntIcon } from './Types'
import { ViewAttack } from './ViewAttack'
import './ViewCreature.css'
import { ViewStats } from './ViewStats'
import { CreatureImg } from './creatures/CreatureImg'
import { useGame } from '../Logic/hooks/useGame'
import { PropTypes } from 'prop-types'

export function ViewCreature() {
    const { languajeDocument, selectedItem, changeWindow, gameState,
        extraItem, setExtraItem, setInitWindow, setGameState, playerCreatures, setPlayerCreatures,
        indexActualCreaturePlayer
    } = useGame()
    const [select, setSelect] = useState(2) //stats

    const lang = languajeDocument.ViewCreature
    const newAttack = (gameState == GAME_STATES.NEW_ITEM && extraItem.itemType == ITEM_TYPES.ATTACK)

    const creature = (selectedItem && selectedItem.item)
        ? selectedItem.item
        : new Creature(
            0,
            {
                name: CREATURES[0].name,
                dark: 0
            },
            ELEMENTAL_TYPES.FIRE,
            [
                ATTACKS[0],
                ATTACKS[1]
            ],
            {
                maxHealth: 50,
                speed: 50,
                physicalAttack: 50,
                specialAttack: 50,
                physicalDefense: 50,
                specialDefense: 50
            }
        )

    const cloneCreature = Creature.cloneFromObject(creature)

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
                                        && (!creature.attacks[1]||extraItem.item.name != creature.attacks[1].name)
                                        && cloneCreature.canForget(select, extraItem.item)
                                        && select!=3
                                    ) &&
                                        <div className='buttonReturn'
                                            onClick={() => {
                                                if (select < 2) {
                                                    const cloneCreatures = structuredClone(playerCreatures)
                                                    const attacks = cloneCreatures[indexActualCreaturePlayer].attacks
                                                    if (attacks.length >= 2)
                                                        attacks.splice(select, 1)
                                                    attacks.push(extraItem.item)
                                                    setPlayerCreatures(cloneCreatures)
                                                }
                                                setExtraItem({ itemType: null, item: null })
                                                setInitWindow(WINDOW_NAMES.BATTLE_PREVIEW)
                                                setGameState(GAME_STATES.BATTLE)
                                                changeWindow(WINDOW_NAMES.BATTLE_PREVIEW)
                                            }}
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

                            <div className='buttonReturn'
                                onClick={() => {
                                    if (gameState == GAME_STATES.START || gameState == GAME_STATES.WIN)
                                        changeWindow(WINDOW_NAMES.CHOOSE_CREATURE)
                                    else if (gameState == GAME_STATES.BATTLE || gameState == GAME_STATES.NEW_ITEM)
                                        changeWindow(WINDOW_NAMES.CREATURES_BACKPACK)
                                }}
                            >
                                <b>{lang.returnButton}</b>
                            </div>
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
                        src={'./src/assets/categories/' + attack.category + '.svg'}
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