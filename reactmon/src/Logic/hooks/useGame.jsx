import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { checkContextProvider } from "../errors";
import { GAME_STATES, INITIAL_COINS, WINDOW_NAMES } from "../constants";

export function useGame() {
    const context = useContext(GameContext)

    checkContextProvider(context, 'useGame', 'GameProvider')

    const {
        languaje, setLanguaje,
        languajeDocument, setLanguajeDocument,
        gameState, setGameState,
        actualWindow, setActualWindow,
        formerWindow,
        initWindow, setInitWindow,
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
        setExtraItem({ itemType: null, item: null })
        chooseOptions.current = []
    }

    function changeWindow(newWindow) {
        formerWindow.current = actualWindow
        setActualWindow(newWindow)
    }

    function getNewId() {
        const newId = contCreatureIds.current
        contCreatureIds.current++
        return newId
    }

    function checkWinner(player, rival) {
        if (player == null || player.liveCreatures <= 0) {
            setGameState(GAME_STATES.LOSE)
        } else if (rival == null || rival.liveCreatures <= 0) {
            setGameState(GAME_STATES.WIN)
        }
    }

    function processAttack(index, isPlayer = true) {
        const newPlayerCreatures = structuredClone(playerCreatures)
        const newRivalCreatures = structuredClone(rivalCreatures)
        const creature = playerCreatures[indexActualCreaturePlayer]
        const rivalCreature = rivalCreatures[indexActualCreatureRival]
        let message = null

        if (isPlayer) {
            const [newCreaturePlayer, newCreatureRival,
                newPlayer, newRival
            ] = creature.doAttack(
                index, rivalCreature, player, rival
            )

            if (newCreaturePlayer != null && newCreatureRival != null) {
                newPlayerCreatures[indexActualCreaturePlayer] = newCreaturePlayer
                setPlayerCreatures(newPlayerCreatures)
                newRivalCreatures[indexActualCreatureRival] = newCreatureRival
                setRivalCreatures(newRivalCreatures)
                setPlayer(newPlayer)
                setRival(newRival)

                message = {
                    name: "useAttack",
                    vars: {
                        "player": player.name,
                        "attackName": creature.attacks[index].name
                    }
                }

            }

            checkWinner(newPlayer, newRival)
        } else {
            const [newCreatureRival, newCreaturePlayer,
                newRival, newPlayer
            ] = rivalCreature.doAttack(
                index, creature, rival, player
            )

            if (newCreaturePlayer != null && newCreatureRival != null) {
                newPlayerCreatures[indexActualCreaturePlayer] = newCreaturePlayer
                setPlayerCreatures(newPlayerCreatures)
                newRivalCreatures[indexActualCreatureRival] = newCreatureRival
                setRivalCreatures(newRivalCreatures)
                setPlayer(newPlayer)
                setRival(newRival)

                message = {
                    name: "useAttack",
                    vars: {
                        "player": rival.name,
                        "attackName": rivalCreature.attacks[index].name
                    }
                }
            }

            checkWinner(newPlayer, newRival)
        }

        return message
    }

    return {
        languaje, setLanguaje,
        languajeDocument, setLanguajeDocument,
        gameState, setGameState,
        actualWindow, setActualWindow,
        formerWindow,
        initWindow, setInitWindow,
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
        chooseOptions,
        reset, changeWindow, getNewId, checkWinner, processAttack
    }
}