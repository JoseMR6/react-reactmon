import reactIcon from '/react.svg'
import helpIcon from '/help.svg'
import resetIcon from '/reset.svg'
import soundOn from '/soundOn.svg'
import soundOff from '/soundOff.svg'
import musicOn from '/musicOn.svg'
import musicOff from '/musicOff.svg'

import './LeftMenu.css'
import { useGame } from '../Logic/hooks/useGame'
import { TRANSLATIONS, TR_IMG, WINDOW_NAMES } from '../Logic/constants'
import { applyMessageVars, getLanguajeDocument } from '../Logic/functions/parse'

export function LeftMenu() {
    const { languaje, setLanguaje,
        languajeDocument, setLanguajeDocument, reset, changeWindow, volume, setVolume, mute,
        setMute, playMusic, setPlayMusic, musicVolume, setMusicVolume
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
                <div className="option"
                    onClick={() => { changeWindow(WINDOW_NAMES.HELP) }}
                >
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
                <div className="soundOptions">
                    {!mute &&
                        <img
                            src={soundOn} className="imgOption"
                            onClick={()=>{setMute(!mute)}}
                        />
                    }
                    {mute &&
                        <img
                            src={soundOff} className="imgOption"
                            onClick={()=>{setMute(!mute)}}
                        />
                    }

                    <input className='volume' type="range" min="0" max="100" value={Math.round(volume * 100)}
                        onChange={(e) => {
                            const newVolume=e.target.value / 100
                            setVolume(newVolume)
                            if(newVolume==0) setMute(true)
                            else setMute(false)
                        }}
                    />
                </div>
                <div className="soundOptions">
                    {playMusic &&
                        <img
                            src={musicOn} className="imgOption"
                            onClick={()=>{setPlayMusic(!playMusic)}}
                        />
                    }
                    {!playMusic &&
                        <img
                            src={musicOff} className="imgOption"
                            onClick={()=>{setPlayMusic(!playMusic)}}
                        />
                    }

                    <input className='volume' type="range" min="0" max="100" value={Math.round(musicVolume * 100)}
                        onChange={(e) => {
                            const newVolume=e.target.value / 100
                            setMusicVolume(newVolume)
                            if(newVolume==0) setPlayMusic(false)
                            else setPlayMusic(true)
                        }}
                    />
                </div>
                {translationNames.map((translationName, index) => {
                    if (languaje == translationName) return

                    return (
                        <div key={index} className="option"
                            onClick={() => {
                                getLanguajeDocument(translationName).then((document) => {
                                    setLanguaje(translationName)
                                    setLanguajeDocument(document)
                                })
                            }}
                        >
                            <img
                                src={applyMessageVars(TRANSLATIONS[translationName].srcIcon, TR_IMG)} className="imgOption"
                                alt={TRANSLATIONS[languaje].srcIconAltPattern.replace('{name}', translationName)}
                            />
                            <span><b>{TRANSLATIONS[translationName].buttonText}</b></span>
                        </div>

                    )
                })}
            </div>
        </>
    )
}