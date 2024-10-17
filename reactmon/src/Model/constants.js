import gameBalance from '../Config/gameBalance.json'
import translations from '../Config/translations.json'

export const TRANSLATIONS = translations

export const GAME_STATES = {
    START: 'start',
}

export const WINDOW_NAMES = {
    SELECT_SKIN: 'selectSkin',
    WRITE_NAME: 'writeName',
    CHOOSE_CREATURE: 'chooseCreature'
}

export const ELEMENTAL_TYPES = {
    FIRE: 'fire',
    GRASS: 'grass',
    WATER: 'water'
}

export const CREATURE_NAMES = {
    PARASECT: "parasect",
    LAPRAS: "lapras",
    NIDOKING: "nidoking",
    ALAKAZAM: "alakazam",
    BEEDRILL: "beedrill",
    DODRIO: "dodrio",
    GOLEM: "golem",
    JOLTEON: "jolteon",
    KABUTOPS: "kabutops",
    MACHAMP: "machamp",
    MUK: "muk",
    NINETALES: "ninetales",
    OMASTAR: "omastar",
    PRIMEAPE: "primeape",
    SANDSLASH: "sandslash",
    TENTACRUEL: "tentacruel",
    VENOMOTH: "venomoth",
    VICTREEBEL: "victreebel"
}

export const PLAYER_SKINS = [
    'maniac',
    'acetrainer',
    'aquagrunt',
    'biker',
    'picnicker',
    'acetrainerf',
    'magmagrunt',
    'battlegirl'
]

export const INITIAL_COINS = gameBalance.initialCoins