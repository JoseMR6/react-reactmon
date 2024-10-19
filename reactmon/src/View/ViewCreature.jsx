import { Creature } from '../Model/Creature'
import { ATTACKS, CREATURES, ELEMENTAL_TYPES } from '../Model/constants'
import { ElemntIcon } from './Types'
import './ViewCreature.css'
import { CreatureImg } from './creatures/CreatureImg'

export function ViewCreature() {
    const creature = new Creature(
        0,
        {
            name: CREATURES[3].name,
            dark: 0
        },
        ELEMENTAL_TYPES.FIRE,
        [
            ATTACKS[0],
            ATTACKS[10]
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

    return (
        <>
            <div className="viewCreatureContainer">
                <h2>Información de Criatura</h2>
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

                        <div className='attackContainer'>
                            <span className='name'><b>{creature.attacks[0].name}</b></span>
                            <div className='icons'>
                                <img className={'category ' + creature.attacks[0].category.name} src={'./src/assets/categories/' + creature.attacks[0].category.name + '.svg'} />
                                <ElemntIcon type={creature.attacks[0].type} />
                            </div>
                        </div>
                        <div className='attackContainer'>
                            <span className='name'><b>{creature.attacks[1].name}</b></span>
                            <div className='icons'>
                                <img className={'category ' + creature.attacks[1].category.name} src={'./src/assets/categories/' + creature.attacks[1].category.name + '.svg'} />
                                <ElemntIcon type={creature.attacks[1].type} />
                            </div>
                        </div>

                    </div>
                    <div className='section2'>Estadisticas</div>
                </div>

            </div>

        </>
    )
}