import { TEXT_VARIABLES, TRANSLATIONS } from "../../Model/constants"
import { checkLanguajeDocument } from "../../Model/errors"

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