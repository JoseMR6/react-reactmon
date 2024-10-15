import "./GeneralContainer.css"
import { LeftMenu } from "./LeftMenu"
import { RightPanel } from "./RightPanel"

export function GeneralContainer() {
    
    return(
        <>
            <LeftMenu/>
            <RightPanel/>
            
            <div className="centralContainer">
                <h1>Reactmon</h1>
            </div>
            
        </>
    )
}