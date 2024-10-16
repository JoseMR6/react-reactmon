import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { checkContextProvider } from "../../Model/errors";
import { GAME_STATES, INITIAL_COINS, WINDOW_NAMES } from "../../Model/constants";

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

    function reset(){
        setCoins(INITIAL_COINS)
        setActualWindow(WINDOW_NAMES.SELECT_SKIN)
        setGameState(GAME_STATES.START)
        setRound(0)
        formerWindow.current=null
        contCreatureIds.current=0
        setPlayerCreatures(null)
        setLifeActualCreaturePlayer(null)
        setRival(null)
        setRivalCreatures(null)
        setLifeActualCreatureRival(null)
    }

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
        lifeActualCreatureRival, setLifeActualCreatureRival,
        reset
    }
}