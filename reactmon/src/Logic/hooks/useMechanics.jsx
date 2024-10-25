import { useRef, useState } from "react"
import { INITIAL_COINS } from "../constants"
import { Player } from "../classes/Player"

export function useMechanics(initialCoins=INITIAL_COINS){
    const [round, setRound] = useState(0)
    const [coins, setCoins] = useState(initialCoins)
    const contCreatureIds = useRef(0)
    const [player, setPlayer] = useState(new Player())
    const [playerCreatures, setPlayerCreatures] = useState(null)
    const [indexActualCreaturePlayer, setIndexActualCreaturePlayer] = useState(null)
    const [rival, setRival] = useState(null)
    const [rivalCreatures, setRivalCreatures] = useState(null)
    const [indexActualCreatureRival, setIndexActualCreatureRival] = useState(null)
    const [selectedItem, setSelectedItem] = useState({itemType:null,item:null})
    const chooseOptions = new useRef([])

    return{
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
    }
}