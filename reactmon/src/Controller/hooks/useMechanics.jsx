import { useRef, useState } from "react"
import { INITIAL_COINS } from "../../Model/constants"
import { Player } from "../../Model/Player"

export function useMechanics(initialCoins=INITIAL_COINS){
    const [round, setRound] = useState(0)
    const [coins, setCoins] = useState(initialCoins)
    const contCreatureIds = useRef(0)
    const [player, setPlayer] = useState(new Player())
    const [playerCreatures, setPlayerCreatures] = useState(null)
    const [indexActualCreaturePlayer, setIndexActualCreaturePlayer] = useState(null)
    const [healthActualCreaturePlayer, setHealthActualCreaturePlayer] = useState(null)
    const [buffsActualCreaturePlayer, setBuffsActualCreaturePlayer] = useState({cont:0,stat:null})
    const [rival, setRival] = useState(null)
    const [rivalCreatures, setRivalCreatures] = useState(null)
    const [indexActualCreatureRival, setIndexActualCreatureRival] = useState(null)
    const [healthActualCreatureRival, setHealthActualCreatureRival] = useState(null)
    const [buffsActualCreatureRival, setBuffsActualCreatureRival] = useState({cont:0,stat:null})
    const [selectedItem, setSelectedItem] = useState({itemType:null,item:null})
    const [chooseOptions, setChooseOptions] = useState([])

    return{
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
    }
}