import gameBalance from '../Config/gameBalance.json'
import translations from '../Config/translations.json'
import { Creature, CreatureImage } from './classes/Creature'
import { Player } from './classes/Player'

export const TRANSLATIONS = translations

export const INITIAL_COINS = gameBalance.initialCoins

export const WIN_COINS = gameBalance.winCoins

export const BOSS_WIN_COINS = gameBalance.bossWinCoins

export const CREATURE_PRICE = gameBalance.creaturePrice

export const RARE_CREATURE_PRICE = gameBalance.rareCreaturePrice

export const ULTRA_RARE_CREATURE_PRICE = gameBalance.ultraRareCreaturePrice

export const REFRESH_PRICE = gameBalance.refreshPrice

export const RARE_PERCENTAGE = gameBalance.rarePercentage

export const ULTRA_RARE_PERCENTAGE = gameBalance.ultraRarePercentaje

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

export const ROUND_FIRST_BOSS = gameBalance.roundFirstBoss

export const ROUNDS_PER_STAGE = gameBalance.roundsPerStage

export const GAME_STATES = {
    START: 'start',
    BATTLE: 'battle',
    NEW_ITEM: 'newItem',
    SHOPPING: 'shopping',
    WIN: 'win',
    LOSE: 'lose'
}

export const INIT_STATES = {
    DEAD: "dead",
    CHANGE: "change",
    FORCED_CHANGE: "forcedChange",
    PURCHASED:'purchased'
}

export const ITEM_TYPES = {
    CREATURE: "creature",
    ATTACK: "attack"
}

export const WINDOW_NAMES = {
    SELECT_SKIN: 'selectSkin',
    WRITE_NAME: 'writeName',
    CHOOSE_CREATURE: 'chooseCreature',
    VIEW_CREATURE: 'viewCreature',
    BATTLE_PREVIEW: 'battlePreview',
    BATTLE_OPTIONS: 'battleOptions',
    CREATURES_BACKPACK: 'creaturesBackpack',
    SHOP: 'shop',
    WIN_OPTIONS: 'winOptions',
    CHOOSE_ATTACK: 'chooseAttack',
    LOSE_GAME: 'loseGame'
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

export const TEXT_VARIABLES = {
    'power': ATTACKS_POWER,
    'base': BUFF_BASE,
    'maxLayer': BUFF_LAYER_MAX,
    'heal': HEAL
}


export const ATTACK_CATEGORYS = {
    PHYSICAL: "physical",
    SPECIAL: "special",
    SUPPORT: "support"
}

export const STAT_NAMES = {
    MAX_HEALTH: 'maxHealth',
    SPEED: 'speed',
    PH_ATTACK: 'physicalAttack',
    SP_ATTACK: 'specialAttack',
    PH_DEFENSE: 'physicalDefense',
    SP_DEFENSE: 'specialDefense'
}

export const PLAYER_ACTIONS = {
    ATTACK:'attack',
    CHANGE:'change',
    DEAD:'dead'
}

export const ATTACKS = [
    {
        name: "FireFist",
        category: ATTACK_CATEGORYS.PHYSICAL,
        type: ELEMENTAL_TYPES.FIRE,
    },
    {
        name: "Flamethrower",
        category: ATTACK_CATEGORYS.SPECIAL,
        type: ELEMENTAL_TYPES.FIRE,
    },
    {
        name: "ThermalSharpening",
        category: ATTACK_CATEGORYS.SUPPORT,
        type: ELEMENTAL_TYPES.FIRE,
    },
    {
        name: "Ignition",
        category: ATTACK_CATEGORYS.SUPPORT,
        type: ELEMENTAL_TYPES.FIRE,
    },
    {
        name: "FluidSlash",
        category: ATTACK_CATEGORYS.PHYSICAL,
        type: ELEMENTAL_TYPES.WATER,
    },
    {
        name: "WaterCanon",
        category: ATTACK_CATEGORYS.SPECIAL,
        type: ELEMENTAL_TYPES.WATER,
    },
    {
        name: "FrozenShield",
        category: ATTACK_CATEGORYS.SUPPORT,
        type: ELEMENTAL_TYPES.WATER,
    },
    {
        name: "AquaticAura",
        category: ATTACK_CATEGORYS.SUPPORT,
        type: ELEMENTAL_TYPES.WATER,
    },
    {
        name: "ImpalingSpike",
        category: ATTACK_CATEGORYS.PHYSICAL,
        type: ELEMENTAL_TYPES.GRASS,
    },
    {
        name: "AcidBomb",
        category: ATTACK_CATEGORYS.SPECIAL,
        type: ELEMENTAL_TYPES.GRASS,
    },
    {
        name: "Doping",
        category: ATTACK_CATEGORYS.SUPPORT,
        type: ELEMENTAL_TYPES.GRASS,
    },
    {
        name: "Absorption",
        category: ATTACK_CATEGORYS.SUPPORT,
        type: ELEMENTAL_TYPES.GRASS,
    },
    {
        name: "Headbutt",
        category: ATTACK_CATEGORYS.PHYSICAL,
        type: ELEMENTAL_TYPES.NEUTRAL,
    },
    {
        name: "AuraRay",
        category: ATTACK_CATEGORYS.SPECIAL,
        type: ELEMENTAL_TYPES.NEUTRAL,
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

export const RANDOM = 'random'

export const TYPE_STATS_RELATIONS = {
    fire: [STAT_NAMES.PH_ATTACK, STAT_NAMES.SP_ATTACK],
    grass: [STAT_NAMES.MAX_HEALTH, STAT_NAMES.SPEED],
    water: [STAT_NAMES.PH_DEFENSE, STAT_NAMES.SP_DEFENSE]
}

export const MIN_SLICE = 10

export const DARK_VALUES = 7

export const MAX_CREATURES_RIVAL = 3

export const MAX_CREATURES = 6

export const PLAYER_EXAMPLE = new Player('Player', PLAYER_SKINS[0], 0)

export const PLAYER_CREATURE_EXAMPLE = new Creature(0, new CreatureImage(),
    ELEMENTAL_TYPES.FIRE, [ATTACKS[0], ATTACKS[1]])

export const PLAYER_CREATURES_EXAMPLE = [
    PLAYER_CREATURE_EXAMPLE,
    PLAYER_CREATURE_EXAMPLE,
    PLAYER_CREATURE_EXAMPLE,
    PLAYER_CREATURE_EXAMPLE,
    PLAYER_CREATURE_EXAMPLE,
    PLAYER_CREATURE_EXAMPLE
]

export const RIVAL_EXAMPLE = new Player('Rival', PLAYER_SKINS[1], 0)

export const RIVAL_CREATURE_EXAMPLE = new Creature(1, new CreatureImage(),
    ELEMENTAL_TYPES.GRASS, [ATTACKS[8], ATTACKS[9]])

export const RIVAL_CREATURES_EXAMPLE = [
    RIVAL_CREATURE_EXAMPLE,
    RIVAL_CREATURE_EXAMPLE,
    RIVAL_CREATURE_EXAMPLE,
    RIVAL_CREATURE_EXAMPLE,
    RIVAL_CREATURE_EXAMPLE,
    RIVAL_CREATURE_EXAMPLE
]