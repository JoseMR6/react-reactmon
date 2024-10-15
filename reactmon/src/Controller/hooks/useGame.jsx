import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { checkContextProvider } from "../../Model/errors";

export function useGame(){
    const context = useContext(GameContext)

    checkContextProvider(context,'useGame','GameProvider')
    
    const {
        languaje,setLanguaje,
        languajeDocument, setLanguajeDocument,
        gameState, setGameState,
        actualWindow, setActualWindow,
        formerWindow,
        round, setRound,
        coins, setCoins,
        contCreatureIds,
        player, setPlayer,
        playerCreatures, setPlayerCreatures,
        lifeActualCreaturePlayer, setLifeActualCreaturePlayer,
        rival, setRival,
        rivalCreatures, setRivalCreatures,
        lifeActualCreatureRival, setLifeActualCreatureRival
    } = context

    return{
        languaje,setLanguaje,
        languajeDocument, setLanguajeDocument,
        gameState, setGameState,
        actualWindow, setActualWindow,
        formerWindow,
        round, setRound,
        coins, setCoins,
        contCreatureIds,
        player, setPlayer,
        playerCreatures, setPlayerCreatures,
        lifeActualCreaturePlayer, setLifeActualCreaturePlayer,
        rival, setRival,
        rivalCreatures, setRivalCreatures,
        lifeActualCreatureRival, setLifeActualCreatureRival
    }
}