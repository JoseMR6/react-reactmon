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
    let transformedText = text

    for (const variable in TEXT_VARIABLES) {
        transformedText = transformedText.replace(
            '{'+variable+'}',TEXT_VARIABLES[variable]
        )
    }

    return transformedText
}