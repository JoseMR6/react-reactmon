import { useGame } from '../Logic/hooks/useGame'
import './ChooseAttack.css'
import { PropTypes } from 'prop-types'
import { ElemntIcon } from './Types'
import { GAME_STATES, ITEM_TYPES, WINDOW_NAMES } from '../Logic/constants'
import { getCategoryRoute } from '../Logic/functions/parse'

export function ChooseAttack() {
    const { chooseOptions, languajeDocument } = useGame()
    const lang = languajeDocument.ChooseAttack

    return (
        <>
            {(chooseOptions && chooseOptions.length != 0) &&
                <div className="chooseAttackContainer">
                    <h1>{lang.title}</h1>
                    <div className='attacksContainer'>
                        {chooseOptions.map((creature, index) => {
                            if (index < 3) {
                                return (
                                    <div key={index} className='creatureAttacks'>
                                        <AttackSelect attack={creature.attacks[0]} />
                                        {creature.attacks.length >= 2 &&
                                            <AttackSelect attack={creature.attacks[1]} />
                                        }
                                    </div>
                                )
                            }

                        })}
                    </div>
                </div>
            }
        </>
    )
}

function AttackSelect({ attack }) {
    const { languajeDocument, setExtraItem, setGameState, changeWindow } = useGame()
    const lang = languajeDocument.ChooseAttack
    const langA = languajeDocument.AttacksText

    const handleChooseClick = () => {
        setExtraItem({ itemType: ITEM_TYPES.ATTACK, item: attack })
        setGameState(GAME_STATES.NEW_ITEM)
        changeWindow(WINDOW_NAMES.CREATURES_BACKPACK)
    }

    const handleExtraAttackInfoClick = (event) => {
        if (event.target.className == 'buttonOption')
            event.target.children[0].style.visibility = 'visible'
    }

    const handleExtraAttackInfoLeave = (event) => {
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
                            src={getCategoryRoute(attack.category)}
                        />
                        <ElemntIcon type={attack.type} />
                    </div>
                </div>
                <div className='section2'>
                    <div className='buttonOption'
                        onClick={handleChooseClick}
                    >
                        <b>{lang.chooseButton}</b>
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

AttackSelect.propTypes = {
    attack: PropTypes.object.isRequired
}