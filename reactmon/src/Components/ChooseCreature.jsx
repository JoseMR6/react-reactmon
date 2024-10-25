import { useEffect } from 'react'
import { useGame } from '../Logic/hooks/useGame'
import { Creature } from '../Logic/classes/Creature'
import { ELEMENTAL_TYPES, GAME_STATES, ITEM_TYPES, WINDOW_NAMES } from '../Logic/constants'
import './ChooseCreature.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'

export function ChooseCreature() {
    const { languajeDocument, chooseOptions,
        initWindow, getNewId, setInitWindow
    } = useGame()
    const lang = languajeDocument.ChooseCreature
    
    useEffect(() => {
        if (initWindow == WINDOW_NAMES.CHOOSE_CREATURE) {
            chooseOptions.current = [
                Creature.generateCreature({
                    id: getNewId(),
                    type: ELEMENTAL_TYPES.FIRE,
                    numAttacks: 2,
                    maxedStatsNum: 1
                }),
                Creature.generateCreature({
                    id: getNewId(),
                    type: ELEMENTAL_TYPES.WATER,
                    numAttacks: 2,
                    maxedStatsNum: 1
                }),
                Creature.generateCreature({
                    id: getNewId(),
                    type: ELEMENTAL_TYPES.GRASS,
                    numAttacks: 2,
                    maxedStatsNum: 1
                })
            ]
            setInitWindow(null)
        } else if(!chooseOptions.current||chooseOptions.current.length==0) {
            chooseOptions.current = [
                new Creature(),
                new Creature(),
                new Creature()
            ]
        }
    }, [])

    return (
        <>
            {(chooseOptions.current&&chooseOptions.current.length!=0)&&
                <div className="chooseCreatureContainer">
                    <h1>{lang.title}</h1>
                    <div className='creaturesContainer'>
                        <CreatureSelect creature={chooseOptions.current[0]} />
                        <CreatureSelect creature={chooseOptions.current[1]} />
                        <CreatureSelect creature={chooseOptions.current[2]} />
                    </div>
                </div>
            }
        </>
    )
}

function CreatureSelect({ creature }) {
    const { languajeDocument, changeWindow, setSelectedItem,
        setPlayerCreatures, setGameState, setInitWindow
    } = useGame()
    const lang = languajeDocument.ChooseCreature

    return (
        <>
            <div className='creatureContainer'>

                <div className='imgCreature'>
                    <CreatureImg
                        name={creature.image.name}
                        type={creature.type}
                        dark={creature.image.dark}
                    />
                </div>

                <div className='creatureSection'>
                    <ElemntIcon type={creature.type} />
                    <div className='options'>
                        <div className='buttonOption'
                            onClick={() => {
                                setPlayerCreatures([creature])
                                setInitWindow(WINDOW_NAMES.BATTLE_PREVIEW)
                                setGameState(GAME_STATES.BATTLE)
                                changeWindow(WINDOW_NAMES.BATTLE_PREVIEW)
                            }}
                        >
                            <b>{lang.selectButton}</b>
                        </div>
                        <div className='buttonOption'
                            onClick={() => {
                                const newSelected = {
                                    itemType: ITEM_TYPES.CREATURE,
                                    item: creature
                                }
                                setSelectedItem(newSelected)
                                changeWindow(WINDOW_NAMES.VIEW_CREATURE)
                            }}
                        >
                            <b>{lang.viewButton}</b>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

CreatureSelect.propTypes = {
    creature: PropTypes.object.isRequired
}