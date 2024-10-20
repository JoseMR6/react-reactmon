import { createContext } from "react";
import { PropTypes } from 'prop-types'
import { useConfig } from "../hooks/useConfig";
import { useMechanics } from "../hooks/useMechanics";

export const GameContext = createContext()

export function GameProvider({ children }) {
    const {
        languaje, setLanguaje,
        languajeDocument, setLanguajeDocument,
        gameState, setGameState,
        actualWindow, setActualWindow,
        formerWindow
    } = useConfig()

    const {
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
    } = useMechanics()


    return (
        <GameContext.Provider value={{
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
        }}>
            {children}
        </GameContext.Provider>
    )
}

GameProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]).isRequired
}