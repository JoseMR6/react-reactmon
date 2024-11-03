export function getRandomInt(max){
    return Math.floor(Math.random() * max)
}

export function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}