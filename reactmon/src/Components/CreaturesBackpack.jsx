import { GAME_STATES, INIT_STATES, ITEM_TYPES, ROUNDS_PER_STAGE, WINDOW_NAMES } from '../Logic/constants'
import { creatureCanLearnAttack } from '../Logic/functions/creature'
import { useGame } from '../Logic/hooks/useGame'
import './CreaturesBackpack.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'

export function CreaturesBackpack() {
    const { playerCreatures, changeWindow, initWindow,
        languajeDocument, gameState, extraItem
    } = useGame()
    const lang = languajeDocument.CreaturesBackpack

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
                        onClick={() => {
                            changeWindow(WINDOW_NAMES.BATTLE_OPTIONS)
                        }}
                    >
                        {lang.returnButton}
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
        setExtraItem, setGameState, round
    } = useGame()
    const lang = languajeDocument.CreaturesBackpack
    const newAttack = (gameState == GAME_STATES.NEW_ITEM && extraItem.itemType == ITEM_TYPES.ATTACK)
    const cloneCreature = structuredClone(creature)

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
                                    {newAttack &&
                                        lang.teachButton
                                    }
                                    {!newAttack &&
                                        lang.viewButton
                                    }
                                </div>
                            }
                            {(index != indexActualCreaturePlayer && !creature.dead
                                && gameState != GAME_STATES.NEW_ITEM
                            ) &&
                                <div className='choose button'
                                    onClick={handleChooseClick}
                                >
                                    {lang.chooseButton}
                                </div>
                            }
                            {(gameState == GAME_STATES.NEW_ITEM && extraItem.itemType == ITEM_TYPES.CREATURE) &&
                                <div className='delete button'
                                    onClick={handleDeleteClick}
                                >
                                    {lang.deleteButton}
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

    const handleExtraAttackInfoClick=(event)=>{
        if (event.target.className == 'buttonOption')
            event.target.children[0].style.visibility = 'visible'
    }

    const handleExtraAttackInfoLeave=(event)=>{
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
                            src={'./src/assets/categories/' + attack.category + '.svg'}
                        />
                        <ElemntIcon type={attack.type} />
                    </div>
                </div>
                <div className='section2'>
                    <div className='buttonOption'
                        onClick={handleDiscardClick}
                    >
                        {lang.discardButton}
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