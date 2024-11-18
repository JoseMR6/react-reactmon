import { useEffect, useRef, useState } from "react"
import { BACKGROUNDS, GAME_STATES, TRANSLATIONS, WINDOW_NAMES } from "../constants"
import english from '../../Config/translations/english.json'
import { getLanguajeDocument } from "../functions/parse"
import { changeBackground } from "../functions/draw"
import seaMusic from '../../assets/sounds/sea.flac'
import desertMusic from '../../assets/sounds/desert.mp3'
import forestMusic from '../../assets/sounds/forest.mp3'
import grasslandMusic from '../../assets/sounds/grassland.wav'
import cityMusic from '../../assets/sounds/city.wav'
import volcanoMusic from '../../assets/sounds/volcano.mp3'

export function useConfig() {
    const [languaje, setLanguaje] = new useState('english')
    const [languajeDocument, setLanguajeDocument]
        = new useState(english)
    const [gameState, setGameState] = new useState(GAME_STATES.START)
    const [actualWindow, setActualWindow] = new useState(WINDOW_NAMES.SELECT_SKIN)
    const formerWindow = new useRef(null)
    const [initWindow, setInitWindow] = new useState(null)
    const [background, setBackground] = new useState(BACKGROUNDS[BACKGROUNDS.length-1])
    const battleOptions = new useRef(null)
    const [volume, setVolume] = new useState(1)
    const [mute, setMute] = new useState(false)
    const [music, setMusic] = new useState(null)
    const [playMusic, setPlayMusic] = new useState(false)
    const [musicVolume, setMusicVolume] = new useState(1)

    useEffect(() => {
        const initLanguaje=Object.keys(TRANSLATIONS)[0]
        if (initLanguaje != languaje) {
            getLanguajeDocument(initLanguaje).then((initLanguajeDocument) => {
                setLanguaje(initLanguaje)
                setLanguajeDocument(initLanguajeDocument)
            })
        }
    },[])

    useEffect(()=>{
        changeBackground(background)

        let newMusic = new Audio(cityMusic)

        if(background.image==BACKGROUNDS[0].image){
            newMusic = new Audio(grasslandMusic)
        }else if(background.image==BACKGROUNDS[1].image){
            newMusic = new Audio(forestMusic)
        }else if(background.image==BACKGROUNDS[2].image){
            newMusic = new Audio(seaMusic)
        }else if(background.image==BACKGROUNDS[3].image){
            newMusic = new Audio(desertMusic)
        }else if(background.image==BACKGROUNDS[4].image){
            newMusic = new Audio(volcanoMusic)
        }

        newMusic.volume=musicVolume
        newMusic.muted=!playMusic
        newMusic.loop=true
        if(music) music.pause()
        if(playMusic) newMusic.play()

        if(music && music.src==newMusic.src){
            newMusic.currentTime = music.currentTime
        }

        setMusic(newMusic)
        
    },[background, musicVolume, playMusic])


    return {
        languaje, setLanguaje,
        languajeDocument, setLanguajeDocument,
        gameState, setGameState,
        actualWindow, setActualWindow,
        formerWindow,
        initWindow, setInitWindow,
        background, setBackground,
        battleOptions,
        volume, setVolume,
        mute, setMute,
        playMusic, setPlayMusic,
        musicVolume, setMusicVolume
    }
}