import { useGame } from '../Controller/hooks/useGame'
import { Creature } from '../Model/Creature'
import { CREATURE_NAMES, ELEMENTAL_TYPES } from '../Model/constants'
import './ChooseCreature.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'

function CreatureSelect({creature}) {
    const {languajeDocument} = useGame()
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
                        <div className='buttonOption'>{lang.viewButton}</div>
                    </div>

                </div>
            </div>
        </>
    )
}


CreatureSelect.propTypes = {
    creature: PropTypes.object.isRequired
}

export function ChooseCreature() {
    const {languajeDocument} = useGame()
    const lang = languajeDocument.ChooseCreature
    
    const creature1 = new Creature(CREATURE_NAMES.PARASECT,ELEMENTAL_TYPES.FIRE)
    const creature2 = new Creature(CREATURE_NAMES.NIDOKING,ELEMENTAL_TYPES.GRASS)
    const creature3 = new Creature(CREATURE_NAMES.LAPRAS,ELEMENTAL_TYPES.WATER)
    
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