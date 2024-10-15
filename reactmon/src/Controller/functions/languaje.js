import { LANGUAJES } from "../../Model/constants"
import { checkLanguajeDocument } from "../../Model/errors"
import spanish from '../../translations/spanish.json'
import english from '../../translations/english.json'

export function getLanguajeDocument(lang){
    let document

    if(lang==LANGUAJES.SPANISH){
        document = spanish
    }else if(lang==LANGUAJES.ENGLISH){
        document = english
    }else{
        document = spanish
        lang = LANGUAJES.SPANISH
    }

    checkLanguajeDocument(lang, document)
    
    return {lang,document}
}