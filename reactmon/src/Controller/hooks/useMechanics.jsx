import { useRef, useState } from "react"
import { INITIAL_COINS } from "../../Model/constants"
import { Player } from "../../Model/Player"

export function useMechanics(initialCoins=INITIAL_COINS){
    const [round, setRound] = useState(0)
    const [coins, setCoins] = useState(initialCoins)
    const contCreatureIds = useRef(0)
    const [player, setPlayer] = useState(new Player())
    const [playerCreatures, setPlayerCreatures] = useState(null)
    const [healthActualCreaturePlayer, setHealthActualCreaturePlayer] = useState(null)
    const [buffsActualCreaturePlayer, setBuffsActualCreaturePlayer] = useState(null)
    const [rival, setRival] = useState(null)
    const [rivalCreatures, setRivalCreatures] = useState(null)
    const [healthActualCreatureRival, setHealthActualCreatureRival] = useState(null)
    const [buffsActualCreatureRival, setBuffsActualCreatureRival] = useState(null)

    return{
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
        buffsActualCreatureRival, setBuffsActualCreatureRival
    }
}