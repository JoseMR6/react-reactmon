import { useMemo, useRef, useState } from "react"
import { GAME_STATES, TRANSLATIONS, WINDOW_NAMES } from "../constants"
import english from '../../Config/translations/english.json'
import { getLanguajeDocument } from "../functions/languaje"

export function useConfig() {
    const [languaje, setLanguaje] = new useState('english')
    const [languajeDocument, setLanguajeDocument]
        = new useState(english)
    const [gameState, setGameState] = new useState(GAME_STATES.START)
    const [actualWindow, setActualWindow] = new useState(WINDOW_NAMES.SELECT_SKIN)
    const formerWindow = new useRef(null)
    const [initWindow, setInitWindow] = new useState(null)

    useMemo(() => {
        const initLanguaje=Object.keys(TRANSLATIONS)[0]
        if (initLanguaje != languaje) {
            getLanguajeDocument(initLanguaje).then((initLanguajeDocument) => {
                setLanguaje(initLanguaje)
                setLanguajeDocument(initLanguajeDocument)
            })
        }
    },[])


    return {
        languaje, setLanguaje,
        languajeDocument, setLanguajeDocument,
        gameState, setGameState,
        actualWindow, setActualWindow,
        formerWindow,
        initWindow, setInitWindow
    }
}