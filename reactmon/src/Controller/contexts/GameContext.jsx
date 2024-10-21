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
        indexActualCreaturePlayer, setIndexActualCreaturePlayer,
        healthActualCreaturePlayer, setHealthActualCreaturePlayer,
        buffsActualCreaturePlayer, setBuffsActualCreaturePlayer,
        rival, setRival,
        rivalCreatures, setRivalCreatures,
        indexActualCreatureRival, setIndexActualCreatureRival,
        healthActualCreatureRival, setHealthActualCreatureRival,
        buffsActualCreatureRival, setBuffsActualCreatureRival,
        selectedItem, setSelectedItem,
        chooseOptions, setChooseOptions
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
            indexActualCreaturePlayer, setIndexActualCreaturePlayer,
            healthActualCreaturePlayer, setHealthActualCreaturePlayer,
            buffsActualCreaturePlayer, setBuffsActualCreaturePlayer,
            rival, setRival,
            rivalCreatures, setRivalCreatures,
            indexActualCreatureRival, setIndexActualCreatureRival,
            healthActualCreatureRival, setHealthActualCreatureRival,
            buffsActualCreatureRival, setBuffsActualCreatureRival,
            selectedItem, setSelectedItem,
            chooseOptions, setChooseOptions
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