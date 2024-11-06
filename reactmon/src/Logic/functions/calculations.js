import { BACKGROUNDS, ROUNDS_PER_STAGE } from "../constants";
import { rgbaToHex } from "./parse";

export function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

export function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

export function nextBackground(round) {
    let bgIndex = Math.floor(round / ROUNDS_PER_STAGE)

    if (bgIndex >= BACKGROUNDS.length - 1) {
        bgIndex = getRandomInt(BACKGROUNDS.length - 1)
        let bgActual = document.getElementsByClassName("generalContainer")[0].style.backgroundColor
        let bgNew = BACKGROUNDS[bgIndex].color
        if(!bgActual.includes("#"))
            bgActual=rgbaToHex(bgActual)
        if(!bgNew.includes("#"))
            bgNew=rgbaToHex(bgNew)

        if (bgNew == bgActual) {
            bgIndex = (bgIndex + 1) % (BACKGROUNDS.length - 1)
        }
    }

    return BACKGROUNDS[bgIndex]
}