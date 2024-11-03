import { TEXT_VARIABLES, TRANSLATIONS } from "../constants"
import { checkLanguajeDocument } from "../errors"

export async function getLanguajeDocument(lang){
    const translationsDirectory="../../Config/translations"
    let document

    for (const TranslationName in TRANSLATIONS) {
        if(lang==TranslationName){
            document = await import(
                /* @vite-ignore */
                `${translationsDirectory}/${TranslationName}.json`
            )
        }
    }

    checkLanguajeDocument(lang, document)
    
    return document
}

export function applyTextVars(text){
    return applyMessageVars(text,TEXT_VARIABLES)
}

export function applyMessageVars(text, varObject){
    let transformedText = text

    for (const variable in varObject) {
        transformedText = transformedText.replace(
            '{'+variable+'}',varObject[variable]
        )
    }

    return transformedText
}

export function getSkinRoute(skin){
    const skinsDirectory = '/src/assets/player_skins/'
    return skinsDirectory+skin+'.png'
}