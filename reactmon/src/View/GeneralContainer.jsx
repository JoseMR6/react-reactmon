import { useGame } from "../Controller/hooks/useGame"
import { WINDOW_NAMES } from "../Model/constants"
import { ChooseCreature } from "./ChooseCreature"
import "./GeneralContainer.css"
import { LeftMenu } from "./LeftMenu"
import { RightPanel } from "./RightPanel"
import { SelectSkin } from "./SelectSkin"
import { WriteName } from "./WriteName"

export function GeneralContainer() {
    const{actualWindow
        ,setActualWindow
    } = useGame()
    setActualWindow(WINDOW_NAMES.CHOOSE_CREATURE)
    
    return(
        <>
            <LeftMenu/>
            <RightPanel/>
            
            <div className="centralContainer">
                {actualWindow==WINDOW_NAMES.SELECT_SKIN &&
                    <SelectSkin/>
                }
                {actualWindow==WINDOW_NAMES.WRITE_NAME &&
                    <WriteName/>
                }
                {actualWindow==WINDOW_NAMES.CHOOSE_CREATURE &&
                    <ChooseCreature/>
                }
            </div>
            
        </>
    )
}