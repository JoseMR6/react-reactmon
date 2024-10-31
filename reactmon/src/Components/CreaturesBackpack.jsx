import { ITEM_TYPES, WINDOW_NAMES } from '../Logic/constants'
import { useGame } from '../Logic/hooks/useGame'
import './CreaturesBackpack.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'

export function CreaturesBackpack() {
    const { playerCreatures, changeWindow,
        languajeDocument
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
                <div className='return button'
                    onClick={() => {
                        changeWindow(WINDOW_NAMES.BATTLE_OPTIONS)
                    }}
                >
                    {lang.returnButton}
                </div>
            </div >
        </>
    )
}

function CreatureBackpack({ index, creature }) {
    const { changeWindow, setSelectedItem,
        languajeDocument, indexActualCreaturePlayer,setIndexActualCreaturePlayer,
        setInitWindow, initWindow, playerCreatures, setPlayerCreatures
    } = useGame()
    const lang = languajeDocument.CreaturesBackpack

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
                            <div className='view button'
                                onClick={() => {
                                    setSelectedItem({ itemType: ITEM_TYPES.CREATURE, item: creature })
                                    changeWindow(WINDOW_NAMES.VIEW_CREATURE)
                                }}
                            >
                                {lang.viewButton}
                            </div>
                            {(index != indexActualCreaturePlayer && !creature.dead) &&
                                <div className='choose button'
                                    onClick={()=>{
                                        const cloneCreatures = structuredClone(playerCreatures)
                                        cloneCreatures[index].recordedBuffs={cont:0,stat:null}
                                        setPlayerCreatures(cloneCreatures)
                                        
                                        setIndexActualCreaturePlayer(index)
                                        if(initWindow=='dead'){
                                            setInitWindow('forcedChange')
                                        }else{
                                            setInitWindow('change')
                                        }
                                        changeWindow(WINDOW_NAMES.BATTLE_OPTIONS)
                                    }}
                                >
                                    {lang.chooseButton}
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