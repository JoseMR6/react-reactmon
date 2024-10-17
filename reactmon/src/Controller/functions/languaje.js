import { TRANSLATIONS } from "../../Model/constants"
import { checkLanguajeDocument } from "../../Model/errors"

export async function getLanguajeDocument(lang){
    const translationsDirectory="../../Config/translations/"
    let document

    for (const TranslationName in TRANSLATIONS) {
        if(lang==TranslationName){
            document = await import(translationsDirectory+TranslationName+".json")
        }
    }

    checkLanguajeDocument(lang, document)
    
    return document
}