import { PropTypes } from 'prop-types'
import { Suspense, createElement, lazy } from 'react'
import { CREATURES } from '../../Logic/constants'
import loadingIcon from '/loading.svg'

export function CreatureImg({ name, type, dark = 0 }) {

    const creatureComponents = [
        {
            name: CREATURES[0].name,
            component: lazy(() =>
                import("./ParasectSvg").then((module) => ({ default: module.ParasectSvg }))
            )
        },
        {
            name: CREATURES[1].name,
            component: lazy(() =>
                import("./LaprasSvg").then((module) => ({ default: module.LaprasSvg }))
            )
        },
        {
            name: CREATURES[2].name,
            component: lazy(() =>
                import("./NidokingSvg").then((module) => ({ default: module.NidokingSvg }))
            )
        },
        {
            name: CREATURES[3].name,
            component: lazy(() =>
                import("./BeedrillSvg").then((module) => ({ default: module.BeedrillSvg }))
            )
        },
        {
            name: CREATURES[4].name,
            component: lazy(() =>
                import("./DodrioSvg").then((module) => ({ default: module.DodrioSvg }))
            )
        },
        {
            name: CREATURES[5].name,
            component: lazy(() =>
                import("./JolteonSvg").then((module) => ({ default: module.JolteonSvg }))
            )
        },
        {
            name: CREATURES[6].name,
            component: lazy(() =>
                import("./KabutopsSvg").then((module) => ({ default: module.KabutopsSvg }))
            )
        },
        {
            name: CREATURES[7].name,
            component: lazy(() =>
                import("./MachampSvg").then((module) => ({ default: module.MachampSvg }))
            )
        },
        {
            name: CREATURES[8].name,
            component: lazy(() =>
                import("./PrimeapeSvg").then((module) => ({ default: module.PrimeapeSvg }))
            )
        },
        {
            name: CREATURES[9].name,
            component: lazy(() =>
                import("./AlakazamSvg").then((module) => ({ default: module.AlakazamSvg }))
            )
        },
        {
            name: CREATURES[10].name,
            component: lazy(() =>
                import("./NinetalesSvg").then((module) => ({ default: module.NinetalesSvg }))
            )
        },
        {
            name: CREATURES[11].name,
            component: lazy(() =>
                import("./VenomothSvg").then((module) => ({ default: module.VenomothSvg }))
            )
        },
        {
            name: CREATURES[12].name,
            component: lazy(() =>
                import("./GolemSvg").then((module) => ({ default: module.GolemSvg }))
            )
        },
        {
            name: CREATURES[13].name,
            component: lazy(() =>
                import("./OmastarSvg").then((module) => ({ default: module.OmastarSvg }))
            )
        },
        {
            name: CREATURES[14].name,
            component: lazy(() =>
                import("./SandslashSvg").then((module) => ({ default: module.SandslashSvg }))
            )
        },
        {
            name: CREATURES[15].name,
            component: lazy(() =>
                import("./MukSvg").then((module) => ({ default: module.MukSvg }))
            )
        },
        {
            name: CREATURES[16].name,
            component: lazy(() =>
                import("./TentacruelSvg").then((module) => ({ default: module.TentacruelSvg }))
            )
        },
        {
            name: CREATURES[17].name,
            component: lazy(() =>
                import("./VictreebelSvg").then((module) => ({ default: module.VictreebelSvg }))
            )
        }
    ]

    return (
        <>
            {creatureComponents.map((creatureComponent, index) => {
                if (name == creatureComponent.name) {
                    return (
                        <Suspense key={index} fallback={
                            <img
                                src={loadingIcon} className="imgOption"
                            />
                        }>
                            {createElement(creatureComponent.component,
                                { key: index, type: type, dark: dark }
                            )}
                        </Suspense>
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