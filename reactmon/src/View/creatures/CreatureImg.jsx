import { PropTypes } from 'prop-types'
import { ParasectSvg } from './ParasectSvg'
import { LaprasSvg } from './LaprasSvg'
import { NidokingSvg } from './NidokingSvg'
import { AlakazamSvg } from './AlakazamSvg'
import { BeedrillSvg } from './BeedrillSvg'
import { createElement } from 'react'
import { DodrioSvg } from './DodrioSvg'
import { GolemSvg } from './GolemSvg'
import { JolteonSvg } from './JolteonSvg'
import { KabutopsSvg } from './KabutopsSvg'
import { MachampSvg } from './MachampSvg'
import { MukSvg } from './MukSvg'
import { NinetalesSvg } from './NinetalesSvg'
import { OmastarSvg } from './OmastarSvg'
import { PrimeapeSvg } from './PrimeapeSvg'
import { SandslashSvg } from './SandslashSvg'
import { TentacruelSvg } from './TentacruelSvg'
import { VenomothSvg } from './VenomothSvg'
import { VictreebelSvg } from './VictreebelSvg'
import { CREATURES } from '../../Model/constants'

export function CreatureImg({ name, type, dark = 0 }) {

    const creatureComponents = [
        {
            name: CREATURES[0].name,
            component: ParasectSvg
        },
        {
            name: CREATURES[1].name,
            component: LaprasSvg
        },
        {
            name: CREATURES[2].name,
            component: NidokingSvg
        },
        {
            name: CREATURES[3].name,
            component: BeedrillSvg
        },
        {
            name: CREATURES[4].name,
            component: DodrioSvg
        },
        {
            name: CREATURES[5].name,
            component: JolteonSvg
        },
        {
            name: CREATURES[6].name,
            component: KabutopsSvg
        },
        {
            name: CREATURES[7].name,
            component: MachampSvg
        },
        {
            name: CREATURES[8].name,
            component: PrimeapeSvg
        },
        {
            name: CREATURES[9].name,
            component: AlakazamSvg
        },
        {
            name: CREATURES[10].name,
            component: NinetalesSvg
        },
        {
            name: CREATURES[11].name,
            component: VenomothSvg
        },
        {
            name: CREATURES[12].name,
            component: GolemSvg
        },
        {
            name: CREATURES[13].name,
            component: OmastarSvg
        },
        {
            name: CREATURES[14].name,
            component: SandslashSvg
        },
        {
            name: CREATURES[15].name,
            component: MukSvg
        },
        {
            name: CREATURES[16].name,
            component: TentacruelSvg
        },
        {
            name: CREATURES[17].name,
            component: VictreebelSvg
        }
    ]

    return(
        <>
            {creatureComponents.map((creatureComponent, index)=>{
                if (name == creatureComponent.name) {
                    return createElement(creatureComponent.component,
                        { key:index, type: type, dark: dark }
                    )
                }
            })}
        </>
    )
}

CreatureImg.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    dark: PropTypes.number
}