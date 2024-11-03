import { Buff, Creature, CreatureImage } from "../classes/Creature"
import { ADJUSTMENT, ATTACKS, ATTACKS_POWER, ATTACK_CATEGORYS, BUFF_BASE, BUFF_LAYER_MAX, CREATURES, DARK_VALUES, EFFECTIVE_TYPE, ELEMENTAL_TYPES, HEAL, MAX_STAT_VALUE, MIN_HEALTH, MIN_SLICE, OWN_TYPE, RANDOM, STAT_NAMES, TOTAL_STATS, TYPE_STATS_RELATIONS, WEAK_TYPE, WEAK_TYPE_OF } from "../constants"
import { getRandomInt } from "./calculations"

export function creatureReset(creature) {
    creature.recordedHealth = creature.stats.maxHealth
    creature.recordedBuffs = new Buff()
    creature.dead = false
}

export function creatureCanLearnAttack(creature, attack) {
    let can = attack.type == creature.type || attack.type == ELEMENTAL_TYPES.NEUTRAL
    if (!can && WEAK_TYPE_OF[attack.type] == creature.type) can = true

    return can
}

export function creatureCanForget(creature, actualIndex, newAttack) {
    let can = true
    if (actualIndex >= 2) return true

    let otherDamageAttack = false
    creature.attacks.forEach((attack, index) => {
        if (actualIndex != index && !otherDamageAttack)
            otherDamageAttack = (attack.category != ATTACK_CATEGORYS.SUPPORT)
    })
    if (newAttack.category == ATTACK_CATEGORYS.SUPPORT && !otherDamageAttack
        && creature.attacks.length >= 2
    )
        can = false

    return can
}

export function deadFilterChoose(creatures) {
    let liveCreaturesIndex = []

    creatures.forEach((creature, index) => {
        if (!creature.dead) {
            liveCreaturesIndex.push(index)
        }
    })

    const randomNumber = getRandomInt(liveCreaturesIndex.length)

    if (liveCreaturesIndex.length == 0) return null

    return liveCreaturesIndex[randomNumber]
}

export function getCreatureAttackDamage(creature, attackIndex, rivalCreature) {
    const category = creature.attacks[attackIndex].category
    const playerBuffs = creature.recordedBuffs
    const rivalBuffs = rivalCreature.recordedBuffs
    let damage = 0
    let attack
    let defense

    if (category == ATTACK_CATEGORYS.PHYSICAL) {
        attack = creature.stats.physicalAttack
        defense = rivalCreature.stats.physicalDefense
        if (playerBuffs.stat == STAT_NAMES.PH_ATTACK && playerBuffs.cont > 0) {
            const ownType = creature.type == ELEMENTAL_TYPES.FIRE ? OWN_TYPE : 1
            attack += BUFF_BASE * playerBuffs.cont * ownType
        }
        if (rivalBuffs.stat == STAT_NAMES.PH_DEFENSE && rivalBuffs.cont > 0) {
            const ownType = rivalCreature.type == ELEMENTAL_TYPES.WATER ? OWN_TYPE : 1
            defense += BUFF_BASE * rivalBuffs.cont * ownType
        }
    } else if (category == ATTACK_CATEGORYS.SPECIAL) {
        attack = creature.stats.specialAttack
        defense = rivalCreature.stats.specialDefense
        if (playerBuffs.stat == STAT_NAMES.SP_ATTACK && playerBuffs.cont > 0) {
            const ownType = creature.type == ELEMENTAL_TYPES.FIRE ? OWN_TYPE : 1
            attack += BUFF_BASE * playerBuffs.cont * ownType
        }
        if (rivalBuffs.stat == STAT_NAMES.SP_DEFENSE && rivalBuffs.cont > 0) {
            const ownType = rivalCreature.type == ELEMENTAL_TYPES.WATER ? OWN_TYPE : 1
            defense += BUFF_BASE * rivalBuffs.cont * ownType
        }
    }

    if (category != ATTACK_CATEGORYS.SUPPORT) {
        const creatureAttackType = creature.attacks[attackIndex].type
        const ownType = (creatureAttackType == creature.type) ? OWN_TYPE : 1
        let effect = 1
        if (WEAK_TYPE_OF[creatureAttackType] == rivalCreature.type) {
            effect = EFFECTIVE_TYPE
        } else if (WEAK_TYPE_OF[rivalCreature.type] == creatureAttackType) {
            effect = WEAK_TYPE
        }
        if (defense == 0) defense = 1

        damage = Math.round((ADJUSTMENT * ownType * effect * ATTACKS_POWER * attack) / defense)
        if (damage <= 0) damage = 1
    }

    return damage
}

export function getCreatureHeal(creature) {
    const ownType = creature.type == ELEMENTAL_TYPES.GRASS ? OWN_TYPE : 1
    return (HEAL * ownType)
}

export function getFirst(creature, rivalCreature) {
    const playerBuffs = creature.recordedBuffs
    const rivalBuffs = rivalCreature.recordedBuffs
    let playerSpeed = creature.stats.speed
    let rivalSpeed = rivalCreature.stats.speed
    if (playerBuffs.stat == STAT_NAMES.SPEED && playerBuffs.cont > 0) {
        const ownType = creature.type == ELEMENTAL_TYPES.GRASS ? OWN_TYPE : 1
        playerSpeed += BUFF_BASE * playerBuffs.cont * ownType
    }
    if (rivalBuffs.stat == STAT_NAMES.SPEED && rivalBuffs.cont > 0) {
        const ownType = rivalCreature.type == ELEMENTAL_TYPES.GRASS ? OWN_TYPE : 1
        rivalSpeed += BUFF_BASE * rivalBuffs.cont * ownType
    }

    const playerFirst = playerSpeed >= rivalSpeed

    return playerFirst
}

export function doAttack(creature, indexAttack, creatureRival, player, rival) {
    const newCreaturePlayer = structuredClone(creature)
    const newCreatureRival = structuredClone(creatureRival)
    const attack = newCreaturePlayer.attacks[indexAttack]
    const newPlayer = structuredClone(player)
    const newRival = structuredClone(rival)

    if (newCreaturePlayer.dead) return [null, newCreatureRival, newPlayer, newRival]
    if (newCreatureRival.dead) return [newCreaturePlayer, null, newPlayer, newRival]

    if (attack.category == ATTACK_CATEGORYS.PHYSICAL
        || attack.category == ATTACK_CATEGORYS.SPECIAL
    ) {
        const damage = getCreatureAttackDamage(newCreaturePlayer,
            indexAttack, newCreatureRival
        )

        let health = newCreatureRival.recordedHealth - damage
        if (health < 0) health = 0
        newCreatureRival.recordedHealth = health
    } else if (attack.category == ATTACK_CATEGORYS.SUPPORT) {
        //Curacion
        if (attack.name == 'Absorption') {
            let heal = newCreaturePlayer.recordedHealth + getCreatureHeal(newCreaturePlayer)
            if (heal > newCreaturePlayer.stats.maxHealth) heal = newCreaturePlayer.stats.maxHealth
            newCreaturePlayer.recordedHealth = heal
        }

        //bufos
        const attackBuffs = {
            Doping: STAT_NAMES.SPEED,
            ThermalSharpening: STAT_NAMES.PH_ATTACK,
            Ignition: STAT_NAMES.SP_ATTACK,
            FrozenShield: STAT_NAMES.PH_DEFENSE,
            AquaticAura: STAT_NAMES.SP_DEFENSE
        }

        for (const statAttack in attackBuffs) {
            if (attack.name == statAttack) {
                let buff = new Buff(0, attackBuffs[statAttack])
                if (newCreaturePlayer.recordedBuffs.stat == buff.stat)
                    buff = newCreaturePlayer.recordedBuffs
                if (buff.cont + 1 <= BUFF_LAYER_MAX) buff.cont++
                newCreaturePlayer.recordedBuffs = buff
            }
        }

    }

    if (newCreaturePlayer.recordedHealth <= 0) {
        newCreaturePlayer.dead = true
        newPlayer.liveCreatures--
    }

    if (newCreatureRival.recordedHealth <= 0) {
        newCreatureRival.dead = true
        newRival.liveCreatures--
    }

    return [newCreaturePlayer, newCreatureRival, newPlayer, newRival]
}

export function generateType() {
    const possibleTypes = [
        ELEMENTAL_TYPES.FIRE,
        ELEMENTAL_TYPES.WATER,
        ELEMENTAL_TYPES.GRASS
    ]

    const randomNumber = getRandomInt(3)  //0 a 2
    const type = possibleTypes[randomNumber]

    return type
}

export function generateCreature({ id = 0, type = RANDOM, numAttacks = RANDOM,
    maxedStatsNum = 0
}) {
    let randomNumber = 0

    //generar tipo
    if (type == RANDOM) {
        type = generateType()
    }

    //generar ataques 
    if (numAttacks == RANDOM) {
        randomNumber = getRandomInt(2)
        numAttacks = randomNumber + 1
    }

    let attacks = []

    //se generan por defecto de su tipo o neutral, primero es fisico o especial
    for (let i = 0; i < numAttacks; i++) {
        const possibleAttacks = []

        for (let j = 0; j < ATTACKS.length; j++) {
            const actualAttack = ATTACKS[j]
            let secondCondition

            if (i == 0) secondCondition = (actualAttack.category == ATTACK_CATEGORYS.PHYSICAL
                || actualAttack.category == ATTACK_CATEGORYS.SPECIAL
            )
            else{
                secondCondition = actualAttack.name != attacks[0].name
            }

            if (
                (actualAttack.type == type
                    || actualAttack.type == ELEMENTAL_TYPES.NEUTRAL
                )
                &&
                secondCondition
            ) {
                possibleAttacks.push(actualAttack)
            }
        }

        randomNumber = getRandomInt(possibleAttacks.length)
        attacks.push(possibleAttacks[randomNumber])
    }

    //generar stadisticas
    let stats = {}
    let sumStats = TOTAL_STATS
    let statsValues = []
    const statNames = Object.keys(STAT_NAMES)
    let indexArray = []
    let calculatedStats = 0

    for (let i = 0; i < statNames.length; i++) {
        stats[STAT_NAMES[statNames[i]]] = null
        indexArray[i] = i
    }

    //determinar las estadistas aleatorias maxeadas
    for (let i = 0; i < maxedStatsNum; i++) {
        randomNumber = getRandomInt(indexArray.length)
        const maxedStat = statNames[indexArray[randomNumber]]
        stats[STAT_NAMES[maxedStat]] = MAX_STAT_VALUE
        sumStats = sumStats - MAX_STAT_VALUE
        indexArray.splice(randomNumber, 1)
        calculatedStats++
    }

    //calcular vida si no se ha hecho ya
    if (stats[STAT_NAMES.MAX_HEALTH] != MAX_STAT_VALUE) {
        randomNumber = getRandomInt(MAX_STAT_VALUE + 1)
        if (randomNumber < MIN_HEALTH) randomNumber = MIN_HEALTH
        stats[STAT_NAMES.MAX_HEALTH] = randomNumber
        sumStats = sumStats - randomNumber
        calculatedStats++
    }

    //calcular stats restantes
    for (let i = 0; i < statNames.length - calculatedStats; i++) {
        const maxValue = (sumStats >= MAX_STAT_VALUE) ? MAX_STAT_VALUE : sumStats
        if (maxValue >= 0)
            randomNumber = getRandomInt(maxValue + 1)
        else
            randomNumber = 0
        statsValues[i] = randomNumber
        sumStats = sumStats - randomNumber
    }

    while (sumStats > 0) {
        let portion = (sumStats >= MIN_SLICE) ? MIN_SLICE : sumStats
        randomNumber = getRandomInt(statsValues.length)
        statsValues[randomNumber] += portion
        sumStats = sumStats - portion
        if (statsValues[randomNumber] > MAX_STAT_VALUE) {
            portion = statsValues[randomNumber] - MAX_STAT_VALUE
            statsValues[randomNumber] = MAX_STAT_VALUE
            sumStats = sumStats + portion
        }
    }

    let j = 0
    for (let i = 0; i < statNames.length; i++) {
        if (stats[STAT_NAMES[statNames[i]]] == null) {
            stats[STAT_NAMES[statNames[i]]] = statsValues[j]
            j++
        }
    }

    //estadisticas principales
    let mainStats = []
    let mainStat = {
        name: STAT_NAMES[statNames[0]],
        value: stats[STAT_NAMES[statNames[0]]]
    }

    statNames.forEach((statname) => {
        const actualStat = STAT_NAMES[statname]
        if (stats[actualStat] > mainStat.value) {
            mainStat.name = actualStat
            mainStat.value = stats[actualStat]
        }
    })

    mainStats.push(mainStat.name)

    statNames.forEach((statname) => {
        const actualStat = STAT_NAMES[statname]
        if ((actualStat != mainStat.name)
            && (mainStat.value - stats[actualStat] <= MIN_SLICE)
        ) {
            mainStats.push(actualStat)
        }
    })

    //generar imagen segun estadisticas principales
    let possibleImages = []

    CREATURES.forEach((creature) => {
        mainStats.forEach((stat) => {
            if (creature.mainStat == stat) {
                possibleImages.push(creature.name)
            }
        })
    })

    randomNumber = getRandomInt(possibleImages.length)

    let image = new CreatureImage(possibleImages[randomNumber],0)

    //establecer estadistica principal relacionada con tipo
    const typeRelatedStats = TYPE_STATS_RELATIONS[type]

    let mainTypeRelatedStat = typeRelatedStats[0]
    let mainTypeStatCompValue = MAX_STAT_VALUE*2

    typeRelatedStats.forEach((stat)=>{
        const statValueFromStart = stats[stat]
        const statValueFromEnd = MAX_STAT_VALUE - stats[typeRelatedStats[0]]
        const mainStatValue = (statValueFromStart<statValueFromEnd)
            ?statValueFromStart
            :statValueFromEnd
        if(mainStatValue<mainTypeStatCompValue)
            mainTypeStatCompValue=mainStatValue
    })

    //generar tono en base a la estadistica principal entre 0 y 6
    image.dark = (DARK_VALUES - 1) - Math.floor(
        (stats[mainTypeRelatedStat] * (DARK_VALUES - 0.01)) / MAX_STAT_VALUE
    )

    return new Creature(
        id,
        image,
        type,
        attacks,
        stats
    )
}