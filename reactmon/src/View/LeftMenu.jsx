import reactIcon from '/react.svg'
import helpIcon from '/help.svg'
import englishIcon from '/english.svg'
import spainIcon from '/spain.svg'
import resetIcon from '/reset.svg'

import './LeftMenu.css'
import { useGame } from '../Controller/hooks/useGame'
import { LANGUAJES } from '../Model/constants'
import { getLanguajeDocument } from '../Controller/functions/languaje'

export function LeftMenu() {
    const { languaje, setLanguaje,
        languajeDocument, setLanguajeDocument
    } = useGame()

    const lang = languajeDocument.LeftMenu

    return (
        <>
            <div className="leftMenu">
                <div className="option">
                    <img
                        src={reactIcon} className="imgOption"
                        alt={lang.Reactmon.imgAlt}
                    />
                    <span>{lang.Reactmon.text}</span>
                </div>
                <div className="option">
                    <img
                        src={helpIcon} className="imgOption"
                        alt={lang.Help.imgAlt}
                    />
                    <span>{lang.Help.text}</span>
                </div>
                <div className="option">
                    <img
                        src={resetIcon} className="imgOption"
                        alt={lang.Reset.imgAlt}
                    />
                    <span>{lang.Reset.text}</span>
                </div>
                {languaje != LANGUAJES.ENGLISH &&
                    <div className="option"
                        onClick={() => {
                            const { lang, document } = getLanguajeDocument(LANGUAJES.ENGLISH)
                            setLanguaje(lang)
                            setLanguajeDocument(document)
                        }}
                    >
                        <img
                            src={englishIcon} className="imgOption"
                            alt={lang.English.imgAlt}
                        />
                        <span>{lang.English.text}</span>
                    </div>
                }
                {languaje != LANGUAJES.SPANISH &&
                    <div className="option"
                        onClick={() => {
                            const { lang, document } = getLanguajeDocument(LANGUAJES.SPANISH)
                            setLanguaje(lang)
                            setLanguajeDocument(document)
                        }}
                    >
                        <img
                            src={spainIcon} className="imgOption"
                            alt={lang.Spanish.imgAlt}
                        />
                        <span>{lang.Spanish.text}</span>
                    </div>
                }

            </div>
        </>
    )
}