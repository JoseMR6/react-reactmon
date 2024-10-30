import { useGame } from "../Logic/hooks/useGame"
import { WINDOW_NAMES } from "../Logic/constants"
import { ChooseCreature } from "./ChooseCreature"
import { Footer } from "./Footer"
import "./GeneralContainer.css"
import { LeftMenu } from "./LeftMenu"
import { RightPanel } from "./RightPanel"
import { SelectSkin } from "./SelectSkin"
import { WriteName } from "./WriteName"
import { ViewCreature } from "./ViewCreature"
import { createElement } from "react"
import { BattlePreview } from "./BattlePreview"
import { BattleOptions } from "./BattleOptions"
import { WinOptions } from "./WinOptions"
import { LoseGame } from "./LoseGame"
import { CreaturesBackpack } from "./CreaturesBackpack"

export function GeneralContainer() {
    const { actualWindow
        //, setActualWindow
    } = useGame()
    //setActualWindow(WINDOW_NAMES.BATTLE_OPTIONS)

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
        },
        {
            name: WINDOW_NAMES.BATTLE_PREVIEW,
            component: BattlePreview
        },
        {
            name: WINDOW_NAMES.BATTLE_OPTIONS,
            component: BattleOptions
        },
        {
            name: WINDOW_NAMES.CREATURES_BACKPACK,
            component: CreaturesBackpack
        },
        {
            name: WINDOW_NAMES.WIN_OPTIONS,
            component: WinOptions
        },
        {
            name: WINDOW_NAMES.LOSE_GAME,
            component: LoseGame
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