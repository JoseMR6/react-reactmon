import gameBalance from '../Config/gameBalance.json'
import translations from '../Config/translations.json'

export const TRANSLATIONS = translations

export const INITIAL_COINS = gameBalance.initialCoins

export const ATTACKS_POWER = gameBalance.attacksPower

export const BUFF_BASE = gameBalance.buffBase

export const BUFF_LAYER_MAX = gameBalance.buffLayerMax

export const HEAL = gameBalance.heal

export const MAX_STAT_VALUE = gameBalance.maxStatValue

export const TOTAL_STATS = gameBalance.totalStats

export const MIN_HEALTH = gameBalance.minHealth

export const ADJUSTMENT = gameBalance.adjustment

export const OWN_TYPE = gameBalance.ownType

export const EFFECTIVE_TYPE = gameBalance.effectiveType

export const WEAK_TYPE = gameBalance.weakType

export const GAME_STATES = {
    START: 'start',
    BATTLE:'battle',
    WIN: 'win',
    LOSE: 'lose'
}

export const ITEM_TYPES = {
    CREATURE:"creature",
    ATTACK:"attack"
}

export const WINDOW_NAMES = {
    SELECT_SKIN: 'selectSkin',
    WRITE_NAME: 'writeName',
    CHOOSE_CREATURE: 'chooseCreature',
    VIEW_CREATURE: 'viewCreature',
    BATTLE_PREVIEW:'battlePreview',
    BATTLE_OPTIONS:'battleOptions',
    CREATURES_BACKPACK: 'creaturesBackpack',
    WIN_OPTIONS:'winOptions',
    LOSE_GAME:'loseGame'
}

export const ELEMENTAL_TYPES = {
    FIRE: 'fire',
    GRASS: 'grass',
    WATER: 'water',
    NEUTRAL: 'neutral'
}

export const WEAK_TYPE_OF = {
    fire: ELEMENTAL_TYPES.GRASS,
    grass: ELEMENTAL_TYPES.WATER,
    water: ELEMENTAL_TYPES.FIRE,
    neutral: ''
}

export const TEXT_VARIABLES ={
    'power':ATTACKS_POWER,
    'base':BUFF_BASE,
    'maxLayer':BUFF_LAYER_MAX,
    'heal':HEAL
}
    

export const ATTACK_CATEGORYS = {
    PHYSICAL:"physical",
    SPECIAL:"special",
    SUPPORT:"support"
}

export const STAT_NAMES = {
    MAX_HEALTH:'maxHealth',
    SPEED:'speed',
    PH_ATTACK:'physicalAttack',
    SP_ATTACK:'specialAttack',
    PH_DEFENSE:'physicalDefense',
    SP_DEFENSE:'specialDefense'
}

export const ATTACKS = [
    {
        name:"FireFist",
        category:ATTACK_CATEGORYS.PHYSICAL,
        type:ELEMENTAL_TYPES.FIRE,
    },
    {
        name:"Flamethrower",
        category:ATTACK_CATEGORYS.SPECIAL,
        type:ELEMENTAL_TYPES.FIRE,
    },
    {
        name:"ThermalSharpening",
        category:ATTACK_CATEGORYS.SUPPORT,
        type:ELEMENTAL_TYPES.FIRE,
    },
    {
        name:"Ignition",
        category:ATTACK_CATEGORYS.SUPPORT,
        type:ELEMENTAL_TYPES.FIRE,
    },
    {
        name:"FluidSlash",
        category:ATTACK_CATEGORYS.PHYSICAL,
        type:ELEMENTAL_TYPES.WATER,
    },
    {
        name:"WaterCanon",
        category:ATTACK_CATEGORYS.SPECIAL,
        type:ELEMENTAL_TYPES.WATER,
    },
    {
        name:"FrozenShield",
        category:ATTACK_CATEGORYS.SUPPORT,
        type:ELEMENTAL_TYPES.WATER,
    },
    {
        name:"AquaticAura",
        category:ATTACK_CATEGORYS.SUPPORT,
        type:ELEMENTAL_TYPES.WATER,
    },
    {
        name:"ImpalingSpike",
        category:ATTACK_CATEGORYS.PHYSICAL,
        type:ELEMENTAL_TYPES.GRASS,
    },
    {
        name:"AcidBomb",
        category:ATTACK_CATEGORYS.SPECIAL,
        type:ELEMENTAL_TYPES.GRASS,
    },
    {
        name:"Doping",
        category:ATTACK_CATEGORYS.SUPPORT,
        type:ELEMENTAL_TYPES.GRASS,
    },
    {
        name:"Absorption",
        category:ATTACK_CATEGORYS.SUPPORT,
        type:ELEMENTAL_TYPES.GRASS,
    },
    {
        name:"Headbutt",
        category:ATTACK_CATEGORYS.PHYSICAL,
        type:ELEMENTAL_TYPES.NEUTRAL,
    },
    {
        name:"AuraRay",
        category:ATTACK_CATEGORYS.SPECIAL,
        type:ELEMENTAL_TYPES.NEUTRAL,
    }
]

export const CREATURES = [
    {
        name: "parasect",
        mainStat: STAT_NAMES.MAX_HEALTH
    },
    {
        name: "lapras",
        mainStat: STAT_NAMES.MAX_HEALTH
    },
    {
        name: "nidoking",
        mainStat: STAT_NAMES.MAX_HEALTH
    },
    {
        name: "beedrill",
        mainStat: STAT_NAMES.SPEED
    },
    {
        name: "dodrio",
        mainStat: STAT_NAMES.SPEED
    },
    {
        name: "jolteon",
        mainStat: STAT_NAMES.SPEED
    },
    {
        name: "kabutops",
        mainStat: STAT_NAMES.PH_ATTACK
    },
    {
        name: "machamp",
        mainStat: STAT_NAMES.PH_ATTACK
    },
    {
        name: "primeape",
        mainStat: STAT_NAMES.PH_ATTACK
    },
    {
        name: "alakazam",
        mainStat: STAT_NAMES.SP_ATTACK
    },
    {
        name: "ninetales",
        mainStat: STAT_NAMES.SP_ATTACK
    },
    {
        name: "venomoth",
        mainStat: STAT_NAMES.SP_ATTACK
    },
    {
        name: "golem",
        mainStat: STAT_NAMES.PH_DEFENSE
    },
    {
        name: "omastar",
        mainStat: STAT_NAMES.PH_DEFENSE
    },
    {
        name: "sandslash",
        mainStat: STAT_NAMES.PH_DEFENSE
    },
    {
        name: "muk",
        mainStat: STAT_NAMES.SP_DEFENSE
    },
    {
        name: "tentacruel",
        mainStat: STAT_NAMES.SP_DEFENSE
    },
    {
        name: "victreebel",
        mainStat: STAT_NAMES.SP_DEFENSE
    }
]

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