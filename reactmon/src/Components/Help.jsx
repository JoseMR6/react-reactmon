import './Help.css'
import { useGame } from '../Logic/hooks/useGame'
import { jsonArrayToString } from '../Logic/functions/parse'

export function Help() {
    const {changeWindow, formerWindow, languajeDocument} = useGame()
    const lang=languajeDocument.Help

    return (
        <>
            <div className='helpContainer'>
                <div className='guideContainer'
                    dangerouslySetInnerHTML={{__html: jsonArrayToString(lang.text)}}
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