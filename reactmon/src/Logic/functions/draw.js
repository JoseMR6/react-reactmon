import { ELEMENTAL_TYPES } from "../constants"
import { errorType } from "../errors"
import { getBackgroundRoute } from "./parse"

export function getColorPattern(type, dark) {
    const variation = 0x55
    const secondVariation = 0x22

    //dark puede ser de 0 a 6
    if (dark < 0) dark = 0
    if (dark > 6) dark = 6
    const darkVariation = parseInt(("0x" + dark + dark), 16)

    //base debe ser entre 99 y FF
    const base = 0xFF - darkVariation
    const second = base - variation
    const third = second - secondVariation

    let baseColor
    let secondColor

    let baseIntense
    let baseDark
    let baseLight

    let secondIntense
    let secondDark
    let secondLight

    if (type == ELEMENTAL_TYPES.FIRE) {
        //tipo fuego (red) 
        baseColor = "#" + base.toString(16) + "0000"
        secondColor = "#" + base.toString(16)
            + second.toString(16) + "00"

        baseIntense = baseColor
        baseDark = "#" + second.toString(16) + "0000"
        baseLight = "#" + base.toString(16)
            + variation.toString(16) + variation.toString(16)

        secondIntense = secondColor
        secondDark = "#" + second.toString(16)
            + third.toString(16) + "00"
        secondLight = "#" + base.toString(16)
            + (second + secondVariation).toString(16) + variation.toString(16)
    } else if (type == ELEMENTAL_TYPES.GRASS) {
        //tipo planta (green)
        baseColor = "#00" + base.toString(16) + "00"
        secondColor = "#00" + base.toString(16) + second.toString(16) + ""

        baseIntense = baseColor
        baseDark = "#00" + second.toString(16) + "00"
        baseLight = "#" + variation.toString(16) + base.toString(16) + variation.toString(16)

        secondIntense = secondColor
        secondDark = "#00" + second.toString(16) + third.toString(16) + ""
        secondLight = "#" + variation.toString(16) + base.toString(16) + (second + secondVariation).toString(16)
    } else if (type == ELEMENTAL_TYPES.WATER) {
        //tipo agua (blue)
        baseColor = "#0000" + base.toString(16) + ""
        secondColor = "#" + second.toString(16) + "00" + base.toString(16) + ""

        baseIntense = baseColor
        baseDark = "#0000" + second.toString(16) + ""
        baseLight = "#" + variation.toString(16) + variation.toString(16) + base.toString(16)

        secondIntense = secondColor
        secondDark = "#" + third.toString(16) + "00" + second.toString(16) + ""
        secondLight = "#" + (second + secondVariation).toString(16) + variation.toString(16) + base.toString(16)
    } else {
        errorType()
    }

    const black = "#000000"
    const white = "#ffffff"
    const gray = "#777777"

    return {
        baseIntense, baseDark, baseLight,
        secondIntense, secondDark, secondLight,
        black, white, gray
    }
}

export function changeBackground(background) {
    const root = document.body
    const bgImage = getBackgroundRoute(background.image)
    const bgColor = background.color
    root.style.backgroundImage = `url('${bgImage}')`
    const gc = document.getElementsByClassName("generalContainer")[0]
    gc.style.backgroundColor = bgColor
}