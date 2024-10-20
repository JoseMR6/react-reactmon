import { useGame } from "../Controller/hooks/useGame"
import { WINDOW_NAMES } from "../Model/constants"
import { ChooseCreature } from "./ChooseCreature"
import { Footer } from "./Footer"
import "./GeneralContainer.css"
import { LeftMenu } from "./LeftMenu"
import { RightPanel } from "./RightPanel"
import { SelectSkin } from "./SelectSkin"
import { WriteName } from "./WriteName"
import { ViewCreature } from "./ViewCreature"
import { createElement } from "react"

export function GeneralContainer() {
    const { actualWindow
        //, setActualWindow
    } = useGame()
    //setActualWindow(WINDOW_NAMES.VIEW_CREATURE)

    const windowComponents = [
        {
            name: WINDOW_NAMES.SELECT_SKIN,
            component: SelectSkin
        },
        {
            name: WINDOW_NAMES.WRITE_NAME,
            component: WriteName
        },
        {
            name: WINDOW_NAMES.CHOOSE_CREATURE,
            component: ChooseCreature
        },
        {
            name: WINDOW_NAMES.VIEW_CREATURE,
            component: ViewCreature
        }
    ]

    return (
        <>
            <LeftMenu />
            <RightPanel />

            <div className="centralContainer">
                {windowComponents.map((windowComponent,index) => {
                    if (actualWindow == windowComponent.name) {
                        return createElement(windowComponent.component,{key:index})
                    }
                })}
            </div>

            <Footer />
        </>
    )
}