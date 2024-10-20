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
        round, setRound,
        coins, setCoins,
        contCreatureIds,
        player, setPlayer,
        playerCreatures, setPlayerCreatures,
        healthActualCreaturePlayer, setHealthActualCreaturePlayer,
        buffsActualCreaturePlayer, setBuffsActualCreaturePlayer,
        rival, setRival,
        rivalCreatures, setRivalCreatures,
        healthActualCreatureRival, setHealthActualCreatureRival,
        buffsActualCreatureRival, setBuffsActualCreatureRival,
        selectedItem, setSelectedItem
    } = context

    function reset() {
        setCoins(INITIAL_COINS)
        setActualWindow(WINDOW_NAMES.SELECT_SKIN)
        setGameState(GAME_STATES.START)
        setRound(0)
        formerWindow.current = null
        contCreatureIds.current = 0
        setPlayerCreatures(null)
        setHealthActualCreaturePlayer(null)
        setBuffsActualCreaturePlayer(null)
        setRival(null)
        setRivalCreatures(null)
        setHealthActualCreatureRival(null)
        setBuffsActualCreatureRival(null)
        setSelectedItem({ itemType: null, item: null })
    }

    function changeWindow(newWindow) {
        formerWindow.current = actualWindow
        setActualWindow(newWindow)
    }

    return {
        languaje, setLanguaje,
        languajeDocument, setLanguajeDocument,
        gameState, setGameState,
        actualWindow, setActualWindow,
        formerWindow,
        round, setRound,
        coins, setCoins,
        contCreatureIds,
        player, setPlayer,
        playerCreatures, setPlayerCreatures,
        healthActualCreaturePlayer, setHealthActualCreaturePlayer,
        buffsActualCreaturePlayer, setBuffsActualCreaturePlayer,
        rival, setRival,
        rivalCreatures, setRivalCreatures,
        healthActualCreatureRival, setHealthActualCreatureRival,
        buffsActualCreatureRival, setBuffsActualCreatureRival,
        selectedItem, setSelectedItem,
        reset, changeWindow
    }
}