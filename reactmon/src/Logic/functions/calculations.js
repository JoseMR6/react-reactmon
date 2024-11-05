import { BACKGROUNDS, ROUNDS_PER_STAGE } from "../constants";

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
        console.log(bgIndex)
        const bgActual = document.getElementsByClassName("generalContainer")[0].style.backgroundColor
        console.log(bgActual)
        if (BACKGROUNDS[bgIndex].color == bgActual) {
            bgIndex = (bgIndex + 1) % (BACKGROUNDS.length - 1)
        }
    }

    return BACKGROUNDS[bgIndex]
}