import { useEffect, useRef, useState } from "react"
import { BACKGROUNDS, GAME_STATES, TRANSLATIONS, WINDOW_NAMES } from "../constants"
import english from '../../Config/translations/english.json'
import { getLanguajeDocument } from "../functions/parse"
import { changeBackground } from "../functions/draw"

export function useConfig() {
    const [languaje, setLanguaje] = new useState('english')
    const [languajeDocument, setLanguajeDocument]
        = new useState(english)
    const [gameState, setGameState] = new useState(GAME_STATES.START)
    const [actualWindow, setActualWindow] = new useState(WINDOW_NAMES.SELECT_SKIN)
    const formerWindow = new useRef(null)
    const [initWindow, setInitWindow] = new useState(null)
    const [background, setBackground] = new useState(BACKGROUNDS[BACKGROUNDS.length-1])
    const battleOptions = new useRef(null)

    useEffect(() => {
        const initLanguaje=Object.keys(TRANSLATIONS)[0]
        if (initLanguaje != languaje) {
            getLanguajeDocument(initLanguaje).then((initLanguajeDocument) => {
                setLanguaje(initLanguaje)
                setLanguajeDocument(initLanguajeDocument)
            })
        }
    },[])

    useEffect(()=>{
        changeBackground(background)
    },[background])


    return {
        languaje, setLanguaje,
        languajeDocument, setLanguajeDocument,
        gameState, setGameState,
        actualWindow, setActualWindow,
        formerWindow,
        initWindow, setInitWindow,
        background, setBackground,
        battleOptions
    }
}