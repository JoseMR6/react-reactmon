import { useEffect } from 'react'
import { useGame } from '../Logic/hooks/useGame'
import { ELEMENTAL_TYPES, GAME_STATES, ITEM_TYPES, MAX_CREATURES, PLAYER_CREATURE_EXAMPLE, ROUNDS_PER_STAGE, WINDOW_NAMES } from '../Logic/constants'
import './ChooseCreature.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'
import { generateCreature } from '../Logic/functions/creature'

export function ChooseCreature() {
    const { languajeDocument, chooseOptions,
        initWindow, getNewId, setInitWindow
    } = useGame()
    const lang = languajeDocument.ChooseCreature

    useEffect(() => {
        if (initWindow == WINDOW_NAMES.CHOOSE_CREATURE) {
            chooseOptions.current = [
                generateCreature({
                    id: getNewId(),
                    type: ELEMENTAL_TYPES.FIRE,
                    numAttacks: 1,
                    maxedStatsNum: 1
                }),
                generateCreature({
                    id: getNewId(),
                    type: ELEMENTAL_TYPES.WATER,
                    numAttacks: 1,
                    maxedStatsNum: 1
                }),
                generateCreature({
                    id: getNewId(),
                    type: ELEMENTAL_TYPES.GRASS,
                    numAttacks: 1,
                    maxedStatsNum: 1
                })
            ]
            setInitWindow(null)
        } else if (!chooseOptions.current || chooseOptions.current.length == 0) {
            chooseOptions.current = [
                PLAYER_CREATURE_EXAMPLE,
                PLAYER_CREATURE_EXAMPLE,
                PLAYER_CREATURE_EXAMPLE
            ]
        }
    }, [])

    return (
        <>
            {(chooseOptions.current && chooseOptions.current.length != 0) &&
                <div className="chooseCreatureContainer">
                    <h1>{lang.title}</h1>
                    <div className='creaturesContainer'>
                        {chooseOptions.current.map((creature, index) => {
                            if (index < 3) {
                                return (
                                    <CreatureSelect key={index} creature={creature} />
                                )
                            }

                        })}
                    </div>
                </div>
            }
        </>
    )
}

function CreatureSelect({ creature }) {
    const { languajeDocument, changeWindow, setSelectedItem,
        setPlayerCreatures, setGameState, setInitWindow,
        gameState, playerCreatures, setExtraItem,round
    } = useGame()
    const lang = languajeDocument.ChooseCreature

    const handleSelectClick=()=>{
        if (gameState == GAME_STATES.WIN && playerCreatures.length >= MAX_CREATURES) {
            setExtraItem({ itemType: ITEM_TYPES.CREATURE, item: creature })
            setGameState(GAME_STATES.NEW_ITEM)
            changeWindow(WINDOW_NAMES.CREATURES_BACKPACK)
        } else {
            if (gameState == GAME_STATES.START) {
                setPlayerCreatures([creature])
            } else if (gameState == GAME_STATES.WIN) {
                setPlayerCreatures([...playerCreatures, creature])
            }
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
    }

    const handleViewClick=()=>{
        const newSelected = {
            itemType: ITEM_TYPES.CREATURE,
            item: creature
        }
        setSelectedItem(newSelected)
        changeWindow(WINDOW_NAMES.VIEW_CREATURE)
    }

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
                            onClick={handleSelectClick}
                        >
                            <b>{lang.selectButton}</b>
                        </div>
                        <div className='buttonOption'
                            onClick={handleViewClick}
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