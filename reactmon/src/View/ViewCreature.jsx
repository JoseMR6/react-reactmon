import { useState } from 'react'
import { Creature } from '../Model/Creature'
import { ATTACKS, CREATURES, ELEMENTAL_TYPES, GAME_STATES, WINDOW_NAMES } from '../Model/constants'
import { ElemntIcon } from './Types'
import { ViewAttack } from './ViewAttack'
import './ViewCreature.css'
import { ViewStats } from './ViewStats'
import { CreatureImg } from './creatures/CreatureImg'
import { useGame } from '../Controller/hooks/useGame'
import { PropTypes } from 'prop-types'

export function ViewCreature() {
    const { languajeDocument, selectedItem, changeWindow, gameState } = useGame()
    const [select, setSelect] = useState(2) //stats

    const lang = languajeDocument.ViewCreature

    let creature = selectedItem.item

    if (!creature) {
        creature = new Creature(
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
                        {creature.attacks.length>1 &&
                            <AttackContainer
                                index={1}
                                attack={creature.attacks[1]}
                                select={select}
                                setSelect={setSelect}
                            />
                        }
                        
                    </div>
                    <div className='section2'>
                        <div className='healthContainer'>
                            <meter className='healthBar'
                                value={creature.recordedHealth} min="0"
                                max={creature.stats.maxHealth}
                            />
                            <span>{creature.recordedHealth}
                                /{creature.stats.maxHealth}
                            </span>
                        </div>
                        <div className='buttonsContainer'>
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
                            <div className='buttonReturn'
                                onClick={()=>{
                                    if(gameState==GAME_STATES.START)
                                        changeWindow(WINDOW_NAMES.CHOOSE_CREATURE)
                                }}
                            >
                                <b>{lang.returnButton}</b>
                            </div>
                        </div>
                        <div className='infoContainer'>
                            {select == 2 &&
                                <ViewStats stats={creature.stats} />
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