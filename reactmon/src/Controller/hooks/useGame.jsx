import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { checkContextProvider } from "../../Model/errors";
import { GAME_STATES, INITIAL_COINS, WINDOW_NAMES } from "../../Model/constants";

export function useGame() {
    const context = useContext(GameContext)

    checkContextProvider(context, 'useGame', 'GameProvider')

    const {
        languaje, setLanguaje,
        languajeDocument, setLanguajeDocument,
        gameState, setGameState,
        actualWindow, setActualWindow,
        formerWindow,
        initWindow,setInitWindow,
        round, setRound,
        coins, setCoins,
        contCreatureIds,
        player, setPlayer,
        playerCreatures, setPlayerCreatures,
        indexActualCreaturePlayer, setIndexActualCreaturePlayer,
        rival, setRival,
        rivalCreatures, setRivalCreatures,
        indexActualCreatureRival, setIndexActualCreatureRival,
        selectedItem, setSelectedItem,
        chooseOptions
    } = context

    function reset() {
        setCoins(INITIAL_COINS)
        setActualWindow(WINDOW_NAMES.SELECT_SKIN)
        setGameState(GAME_STATES.START)
        setRound(0)
        formerWindow.current = null
        setInitWindow(null)
        contCreatureIds.current = 0
        setPlayerCreatures(null)
        setIndexActualCreaturePlayer(null)
        setRival(null)
        setRivalCreatures(null)
        setIndexActualCreatureRival(null)
        setSelectedItem({ itemType: null, item: null })
        chooseOptions.current=[]
    }

    function changeWindow(newWindow) {
        formerWindow.current = actualWindow
        setActualWindow(newWindow)
    }

    function getNewId(){
        const newId = contCreatureIds.current
        contCreatureIds.current++
        return newId
    }

    return {
        languaje, setLanguaje,
        languajeDocument, setLanguajeDocument,
        gameState, setGameState,
        actualWindow, setActualWindow,
        formerWindow,
        initWindow,setInitWindow,
        round, setRound,
        coins, setCoins,
        contCreatureIds,
        player, setPlayer,
        playerCreatures, setPlayerCreatures,
        indexActualCreaturePlayer, setIndexActualCreaturePlayer,
        rival, setRival,
        rivalCreatures, setRivalCreatures,
        indexActualCreatureRival, setIndexActualCreatureRival,
        selectedItem, setSelectedItem,
        chooseOptions,
        reset, changeWindow, getNewId
    }
}