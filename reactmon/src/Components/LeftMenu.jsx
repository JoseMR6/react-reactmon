import reactIcon from '/react.svg'
import helpIcon from '/help.svg'
import resetIcon from '/reset.svg'

import './LeftMenu.css'
import { useGame } from '../Logic/hooks/useGame'
import { TRANSLATIONS } from '../Logic/constants'
import { getLanguajeDocument } from '../Logic/functions/languaje'

export function LeftMenu() {
    const { languaje, setLanguaje,
        languajeDocument, setLanguajeDocument, reset
    } = useGame()

    const lang = languajeDocument.LeftMenu

    const translationNames = Object.keys(TRANSLATIONS)

    return (
        <>
            <div className="leftMenu">
                <div className="option"
                    onClick={() => { window.open("https://github.com/JoseMR6/react-reactmon") }}
                >
                    <img
                        src={reactIcon} className="imgOption"
                        alt={lang.Reactmon.imgAlt}
                    />
                    <span><b>{lang.Reactmon.text}</b></span>
                </div>
                <div className="option">
                    <img
                        src={helpIcon} className="imgOption"
                        alt={lang.Help.imgAlt}
                    />
                    <span><b>{lang.Help.text}</b></span>
                </div>
                <div className="option"
                    onClick={reset}
                >
                    <img
                        src={resetIcon} className="imgOption"
                        alt={lang.Reset.imgAlt}
                    />
                    <span><b>{lang.Reset.text}</b></span>
                </div>
                {translationNames.map((translationName, index) => {
                    if(languaje == translationName) return

                    return (
                        <div key={index} className="option"
                            onClick={() => {
                                getLanguajeDocument(translationName).then((document)=>{
                                    setLanguaje(translationName)
                                    setLanguajeDocument(document)
                                })
                            }}
                        >
                            <img
                                src={TRANSLATIONS[translationName].srcIcon} className="imgOption"
                                alt={TRANSLATIONS[languaje].srcIconAltPattern.replace('{name}',translationName)}
                            />
                            <span><b>{TRANSLATIONS[translationName].buttonText}</b></span>
                        </div>
                        
                    )
                })}
            </div>
        </>
    )
}