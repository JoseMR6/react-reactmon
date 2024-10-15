import { useMemo, useRef, useState } from "react"
import { GAME_STATES, LANGUAJES, WINDOW_NAMES } from "../../Model/constants"
import { getLanguajeDocument } from "../functions/languaje"

export function useConfig(initLang=LANGUAJES.SPANISH){
    const {lang,document} = useMemo(()=>getLanguajeDocument(initLang),[])
    
    const [languaje, setLanguaje] = new useState(lang)
    const [languajeDocument, setLanguajeDocument] 
        = new useState(document)
    const [gameState, setGameState] = new useState(GAME_STATES.START)
    const [actualWindow, setActualWindow] = new useState(WINDOW_NAMES.SELECT_SKIN)
    const formerWindow = new useRef(null)

    return{
        languaje,setLanguaje,
        languajeDocument, setLanguajeDocument,
        gameState, setGameState,
        actualWindow, setActualWindow,
        formerWindow
    }
}