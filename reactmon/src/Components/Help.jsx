import './Help.css'
import { useGame } from '../Logic/hooks/useGame'
import { applyMessageVars, jsonArrayToString } from '../Logic/functions/parse'
import { HELP_IMG } from '../Logic/constants'

export function Help() {
    const {changeWindow, formerWindow, languajeDocument} = useGame()
    const lang=languajeDocument.Help

    return (
        <>
            <div className='helpContainer'>
                <div className='guideContainer'
                    dangerouslySetInnerHTML={{__html: applyMessageVars(jsonArrayToString(lang.text), HELP_IMG)}}
                />
                <div className='returnButton'
                    onClick={()=>{changeWindow(formerWindow.current)}}
                >
                    <b>{lang.returnButton}</b>
                </div>
            </div>
        </>
    )
}