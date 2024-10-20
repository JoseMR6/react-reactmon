import { useGame } from '../Controller/hooks/useGame'
import { Creature } from '../Model/Creature'
import { ATTACKS, CREATURES, ELEMENTAL_TYPES, ITEM_TYPES, WINDOW_NAMES } from '../Model/constants'
import './ChooseCreature.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'

export function ChooseCreature() {
    const {languajeDocument} = useGame()
    const lang = languajeDocument.ChooseCreature
    
    const creature1 = new Creature(
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

    const creature2 = new Creature(
        1,
        {
            name: CREATURES[1].name,
            dark: 0
        },
        ELEMENTAL_TYPES.WATER,
        [
            ATTACKS[4],
            ATTACKS[5]
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

    const creature3 = Creature.generateCreature({
        id:2,
        type:ELEMENTAL_TYPES.GRASS,
        numAttacks:1
    })
    
    return (
        <>
            <div className="chooseCreatureContainer">
                <h1>{lang.title}</h1>
                <div className='creaturesContainer'>
                    <CreatureSelect creature={creature1}/>
                    <CreatureSelect creature={creature2}/>
                    <CreatureSelect creature={creature3}/>
                </div>
            </div>
        </>
    )
}

function CreatureSelect({creature}) {
    const {languajeDocument, changeWindow, setSelectedItem} = useGame()
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
                    <ElemntIcon type={creature.type}/>
                    <div className='options'>
                        <div className='buttonOption'>{lang.selectButton}</div>
                        <div className='buttonOption'
                            onClick={()=>{
                                const newSelected = {
                                    itemType:ITEM_TYPES.CREATURE,
                                    item:creature
                                }
                                setSelectedItem(newSelected)
                                changeWindow(WINDOW_NAMES.VIEW_CREATURE)
                            }}
                        >
                            {lang.viewButton}
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