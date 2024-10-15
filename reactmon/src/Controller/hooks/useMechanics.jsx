import { useRef, useState } from "react"
import { INITIAL_COINS } from "../../Model/constants"

export function useMechanics(initialCoins=INITIAL_COINS){
    const [round, setRound] = useState(0)
    const [coins, setCoins] = useState(initialCoins)
    const contCreatureIds = useRef(0)
    const [player, setPlayer] = useState(null)
    const [playerCreatures, setPlayerCreatures] = useState(null)
    const [lifeActualCreaturePlayer, setLifeActualCreaturePlayer] = useState(null)
    const [rival, setRival] = useState(null)
    const [rivalCreatures, setRivalCreatures] = useState(null)
    const [lifeActualCreatureRival, setLifeActualCreatureRival] = useState(null)

    return{
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