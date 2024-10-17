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

export function CreatureImg({ name, type, dark = 0 }) {
    const creatureComponents = {
        parasect: ParasectSvg,
        lapras: LaprasSvg,
        nidoking: NidokingSvg,
        alakazam: AlakazamSvg,
        beedrill: BeedrillSvg,
        dodrio: DodrioSvg,
        golem: GolemSvg,
        jolteon: JolteonSvg,
        kabutops: KabutopsSvg,
        machamp: MachampSvg,
        muk: MukSvg,
        ninetales: NinetalesSvg,
        omastar: OmastarSvg,
        primeape: PrimeapeSvg,
        sandslash: SandslashSvg,
        tentacruel: TentacruelSvg,
        venomoth: VenomothSvg,
        victreebel: VictreebelSvg
    }

    for (const componetName in creatureComponents) {
        if(name == componetName){
            return createElement(creatureComponents[name], 
                { type: type, dark: dark }
            )
        }
    }
}

CreatureImg.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    dark: PropTypes.number
}