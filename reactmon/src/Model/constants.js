import gameBalance from '../Config/gameBalance.json'
import translations from '../Config/translations.json'

export const TRANSLATIONS = translations

export const INITIAL_COINS = gameBalance.initialCoins

export const ATTACKS_POWER = 100

export const BUFF_BASE = 15

export const BUFF_LAYER_MAX = 5

export const HEAL = 50

export const MAX_STAT_VALUE = 100

export const TOTAL_STATS = 230

export const MIN_HEALTH = 30

export const GAME_STATES = {
    START: 'start',
}

export const WINDOW_NAMES = {
    SELECT_SKIN: 'selectSkin',
    WRITE_NAME: 'writeName',
    CHOOSE_CREATURE: 'chooseCreature',
    VIEW_CREATURE: 'viewCreature'
}

export const ELEMENTAL_TYPES = {
    FIRE: 'fire',
    GRASS: 'grass',
    WATER: 'water',
    NEUTRAL: 'neutral'
}

export const ATTACK_CATEGORYS = {
    PHYSICAL:{
        name:"physical",
        description:"Ataque que reduce la vida del enemigo infligiendo daño físico con una potencia básica de {power}. Perderá potencia en función de la defensa física enemiga."
    },
    SPECIAL:{
        name:"special",
        description:"Ataque que reduce la vida del enemigo infligiendo daño especial con una potencia básica de {power}. Perderá potencia en función de la defensa especial enemiga."
    },
    SUPPORT:{
        name:"support",
        description:"No afecta a la vida del enemigo de forma directa. En su lugar causa distintos efectos como mejorar estadísticas (añadiendo {base} puntos permanentes por uso hasta un máximo de {maxLayer} usos mientras no salga del combate) o recuperar vida (+{heal})."
    }
}

export const STAT_NAMES = {
    MAX_HEALTH:'maxHealth',
    SPEED:'speed',
    PH_ATTACK:'physicalAttack',
    SP_ATTACK:'specialAttack',
    PH_DEFENSE:'physicalDefense',
    SP_DEFENSE:'SpecialDefense'
}

export const ATTACKS = [
    {
        name:"Puño Fuego",
        category:ATTACK_CATEGORYS.PHYSICAL,
        type:ELEMENTAL_TYPES.FIRE,
        description:"El enemigo recibe un puñetazo envuelto en llamas."
    },
    {
        name:"Lanzallamas",
        category:ATTACK_CATEGORYS.SPECIAL,
        type:ELEMENTAL_TYPES.FIRE,
        description:"El enemigo es abrasado por una intensa explosión de fuego."
    },
    {
        name:"Afilado Térmico",
        category:ATTACK_CATEGORYS.SUPPORT,
        type:ELEMENTAL_TYPES.FIRE,
        description:"Aumenta el daño físico puliendo sus garras con calor."
    },
    {
        name:"Ignición",
        category:ATTACK_CATEGORYS.SUPPORT,
        type:ELEMENTAL_TYPES.FIRE,
        description:"Aumenta el daño especial aumentando su energía elemental."
    },
    {
        name:"Cuchillada Fluida",
        category:ATTACK_CATEGORYS.PHYSICAL,
        type:ELEMENTAL_TYPES.WATER,
        description:"El enemigo recibe una cuchillada lubricada con agua."
    },
    {
        name:"Hidrocañón",
        category:ATTACK_CATEGORYS.SPECIAL,
        type:ELEMENTAL_TYPES.WATER,
        description:"El enemigo recibe un potente chorro de agua a presión."
    },
    {
        name:"Blindaje Helado",
        category:ATTACK_CATEGORYS.SUPPORT,
        type:ELEMENTAL_TYPES.WATER,
        description:"Aumenta su defensa física rodeando su cuerpo con hielo."
    },
    {
        name:"Aura acuática",
        category:ATTACK_CATEGORYS.SUPPORT,
        type:ELEMENTAL_TYPES.WATER,
        description:"Aumenta su defensa especial manipulando el agua a su alrededor."
    },
    {
        name:"Espina Empaladora",
        category:ATTACK_CATEGORYS.PHYSICAL,
        type:ELEMENTAL_TYPES.GRASS,
        description:"El enemigo es impactado por una espina grande y afilada."
    },
    {
        name:"Bomba Ácida",
        category:ATTACK_CATEGORYS.SPECIAL,
        type:ELEMENTAL_TYPES.GRASS,
        description:"El enemigo recibe una explosión química corrosiva."
    },
    {
        name:"Autoestimulante",
        category:ATTACK_CATEGORYS.SUPPORT,
        type:ELEMENTAL_TYPES.GRASS,
        description:"Aumenta su velocidad generando sustancias estimulantes dentro de su cuerpo."
    },
    {
        name:"Absorber Nutrientes",
        category:ATTACK_CATEGORYS.SUPPORT,
        type:ELEMENTAL_TYPES.GRASS,
        description:"Regenera parte de su vida absorbiendo nutrientes del terreno."
    },
    {
        name:"Cabezazo",
        category:ATTACK_CATEGORYS.PHYSICAL,
        type:ELEMENTAL_TYPES.NEUTRAL,
        description:"El enemigo recibe un cabezazo a gran velocidad."
    },
    {
        name:"Rayo de Aura",
        category:ATTACK_CATEGORYS.SPECIAL,
        type:ELEMENTAL_TYPES.NEUTRAL,
        description:"El enemigo recibe un rayo generado a partir de pura energía."
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