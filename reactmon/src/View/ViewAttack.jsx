import { applyTextVars } from '../Controller/functions/languaje'
import { useGame } from '../Controller/hooks/useGame'
import { ElemntIcon } from './Types'
import './ViewAttack.css'
import { PropTypes } from 'prop-types'

export function ViewAttack({ attack }) {
    const {languajeDocument} = useGame()
    const lang = languajeDocument.ViewAttack
    const langC = languajeDocument.CategorysText
    const langA = languajeDocument.AttacksText
    
    return (
        <>
            <div className='positionContainer'>
                <div className='basicInfoCotainer'>
                    <div className='attackName'>
                        <b>{langA[attack.name].name}</b>
                    </div>
                    <div className='typeContainer'>
                        <span><b>{lang.elemntIconText}</b>:</span>
                        <ElemntIcon type={attack.type} />
                    </div>
                </div>
                <div className='categoryInfoCotainer'>
                    <div className='infoText'>
                        {applyTextVars(langC[attack.category])}
                    </div>
                    <img className={'category ' + attack.category}
                        src={'./src/assets/categories/' + attack.category + '.svg'}
                    />
                </div>
                <div className='attackDescriptionContainer'>
                    <div><b>Descripción</b></div>
                    <div className='attackDescriptionText'>
                        {langA[attack.name].description}
                    </div>
                </div>
            </div>
        </>
    )
}

ViewAttack.propTypes = {
    attack: PropTypes.object.isRequired
}