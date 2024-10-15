export function checkContextProvider(context, hookName, providerName){
    if (context == undefined) {
        throw new Error(hookName+' must be used whithin a '+providerName)
    }
}

export function checkLanguajeDocument(lang, document){
    if (!document) {
        throw new Error(lang+' document can not be open')
    }
}