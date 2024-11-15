import { useGame } from "../Logic/hooks/useGame"
import { WINDOW_NAMES } from "../Logic/constants"
import { Footer } from "./Footer"
import "./GeneralContainer.css"
import { LeftMenu } from "./LeftMenu"
import { RightPanel } from "./RightPanel"
import { Suspense, createElement, lazy } from "react"
import { DevPanel } from "./DevPanel"
import { LoadingWindow } from "./LoadingWindow"

import { SelectSkin } from "./SelectSkin"
import { WriteName } from "./WriteName"
import { ChooseCreature } from "./ChooseCreature"
import { ViewCreature } from "./ViewCreature"
import { BattlePreview } from "./BattlePreview"
import { BattleOptions } from "./BattleOptions"
import { CreaturesBackpack } from "./CreaturesBackpack"
import { WinOptions } from "./WinOptions"
import { ChooseAttack } from "./ChooseAttack"
import { Shop } from "./Shop"
import { Help } from "./Help"

export function GeneralContainer() {
    const { actualWindow } = useGame()

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
            component: lazy(() =>
                import("./LoseGame").then((module) => ({ default: module.LoseGame }))
            )
        },
        {
            name: WINDOW_NAMES.CHOOSE_ATTACK,
            component: ChooseAttack
        },
        {
            name: WINDOW_NAMES.SHOP,
            component: Shop
        },
        {
            name: WINDOW_NAMES.HELP,
            component: Help
        }
    ]

    document.oncontextmenu = function () { return false }
    const seeDevPanel = false

    return (
        <>
            <div className="generalContainer">
                <div className="generalPositioner">
                    <LeftMenu />
                    <RightPanel />
                    {seeDevPanel && <DevPanel />}

                    <div className="centralContainer">
                        {windowComponents.map((windowComponent, index) => {
                            if (actualWindow == windowComponent.name) {
                                return (
                                    <Suspense key={index} fallback={<LoadingWindow/>}>
                                        {createElement(windowComponent.component)}
                                    </Suspense>
                                )
                            }
                        })}
                    </div>

                    <Footer />
                </div>
            </div>
        </>
    )
}