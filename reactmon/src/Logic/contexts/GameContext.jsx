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
        formerWindow,
        initWindow,setInitWindow
    } = useConfig()

    const {
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
        extraItem, setExtraItem,
        chooseOptions
    } = useMechanics()


    return (
        <GameContext.Provider value={{
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
            extraItem, setExtraItem,
            chooseOptions
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