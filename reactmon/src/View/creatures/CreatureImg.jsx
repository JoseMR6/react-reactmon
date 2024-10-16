import { PropTypes } from 'prop-types'
import { ParasectSvg } from './ParasectSvg'
import { CREATURE_NAMES } from '../../Model/constants'
import { LaprasSvg } from './LaprasSvg'
import { NidokingSvg } from './NidokingSvg'

export function CreatureImg({name, type, dark=0}){
    
    return(
        <>
            {name==CREATURE_NAMES.PARASECT &&
                <ParasectSvg
                    type={type}
                    dark={dark}
                />
            }
            {name==CREATURE_NAMES.LAPRAS &&
                <LaprasSvg
                    type={type}
                    dark={dark}
                />
            }
            {name==CREATURE_NAMES.NIDOKING &&
                <NidokingSvg
                    type={type}
                    dark={dark}
                />
            }
        </>
    )
}

CreatureImg.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    dark: PropTypes.number
}