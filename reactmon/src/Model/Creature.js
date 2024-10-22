import { ADJUSTMENT, ATTACKS, ATTACKS_POWER, ATTACK_CATEGORYS, BUFF_BASE, CREATURES, EFFECTIVE_TYPE, ELEMENTAL_TYPES, HEAL, MAX_STAT_VALUE, MIN_HEALTH, OWN_TYPE, STAT_NAMES, TOTAL_STATS, WEAK_TYPE, WEAK_TYPE_OF } from "./constants"

export class Creature {
    constructor(
        id = 0,
        image = {
            name: CREATURES[0].name,
            dark: 0      //de 0 a 6
        },
        type = ELEMENTAL_TYPES.FIRE,
        attacks = [],
        stats = {
            maxHealth: MIN_HEALTH,
            speed: 0,
            physicalAttack: 0,
            specialAttack: 0,
            physicalDefense: 0,
            specialDefense: 0
        }
    ) {
        this.id = id
        this.image = image
        this.type = type
        this.recordedHealth = stats.maxHealth
        this.attacks = attacks
        this.stats = stats
    }

    getAttackDamage(attackIndex, rivalCreature, playerBuffs = { cont: 0, stat: null },
        rivalBuffs = { cont: 0, stat: null }
    ) {
        const category = this.attacks[attackIndex].category
        let damage = 0
        let attack
        let defense

        if (category == ATTACK_CATEGORYS.PHYSICAL) {
            attack = this.stats.physicalAttack
            defense = rivalCreature.stats.physicalDefense
            if (playerBuffs.stat == STAT_NAMES.PH_ATTACK && playerBuffs.cont > 0) {
                const ownType = this.type == ELEMENTAL_TYPES.FIRE ? OWN_TYPE : 1
                attack += BUFF_BASE * playerBuffs.cont * ownType
            }
            if (rivalBuffs.stat == STAT_NAMES.PH_DEFENSE && rivalBuffs.cont > 0) {
                const ownType = rivalCreature.type == ELEMENTAL_TYPES.WATER ? OWN_TYPE : 1
                defense += BUFF_BASE * rivalBuffs.cont * ownType
            }
        } else if (category == ATTACK_CATEGORYS.SPECIAL) {
            attack = this.stats.specialAttack
            defense = rivalCreature.stats.specialDefense
            if (playerBuffs.stat == STAT_NAMES.SP_ATTACK && playerBuffs.cont > 0) {
                const ownType = this.type == ELEMENTAL_TYPES.FIRE ? OWN_TYPE : 1
                attack += BUFF_BASE * playerBuffs.cont * ownType
            }
            if (rivalBuffs.stat == STAT_NAMES.SP_DEFENSE && rivalBuffs.cont > 0) {
                const ownType = rivalCreature.type == ELEMENTAL_TYPES.WATER ? OWN_TYPE : 1
                defense += BUFF_BASE * rivalBuffs.cont * ownType
            }
        }
        console.log(attack)
        console.log(defense)

        if (category != ATTACK_CATEGORYS.SUPPORT) {
            const ownType = (this.attacks[attackIndex].type == this.type) ? OWN_TYPE : 1
            let effect = 1
            if (WEAK_TYPE_OF[this.attacks[attackIndex].type] == rivalCreature.type) {
                effect = EFFECTIVE_TYPE
            } else if (WEAK_TYPE_OF[rivalCreature.type] == this.attacks[attackIndex].type) {
                effect = WEAK_TYPE
            }
            if (defense == 0) defense = 1

            damage = Math.round((ADJUSTMENT * ownType * effect * ATTACKS_POWER * attack) / defense)
        }

        return damage
    }

    getHeal() {
        const ownType = this.type == ELEMENTAL_TYPES.GRASS ? OWN_TYPE : 1
        return (HEAL * ownType)
    }

    getFirst(rivalCreature, playerBuffs = { cont: 0, stat: null },
        rivalBuffs = { cont: 0, stat: null }
    ) {
        let playerSpeed = this.stats.speed
        let rivalSpeed = rivalCreature.stats.speed
        if (playerBuffs.stat == STAT_NAMES.SPEED && playerBuffs.cont > 0) {
            const ownType = this.type == ELEMENTAL_TYPES.GRASS ? OWN_TYPE : 1
            playerSpeed += BUFF_BASE * playerBuffs.cont * ownType
        }
        if (rivalBuffs.stat == STAT_NAMES.SPEED && rivalBuffs.cont > 0) {
            const ownType = rivalCreature.type == ELEMENTAL_TYPES.GRASS ? OWN_TYPE : 1
            rivalSpeed += BUFF_BASE * rivalBuffs.cont * ownType
        }

        const playerFirst = playerSpeed >= rivalSpeed

        return playerFirst
    }

    static generateCreature({ id = 0, type = 'random', numAttacks = 'random',
        maxedStatsNum = 0
    }) {
        //generar tipo
        const possibleTypes = [
            ELEMENTAL_TYPES.FIRE,
            ELEMENTAL_TYPES.WATER,
            ELEMENTAL_TYPES.GRASS
        ]

        let randomNumber

        if (type == 'random') {
            randomNumber = Math.floor(Math.random() * 3)  //0 a 2
            type = possibleTypes[randomNumber]
        }

        //generar ataques 
        if (numAttacks == 'random') {
            randomNumber = Math.floor(Math.random() * 2)
            numAttacks = randomNumber + 1
        }

        let attacks = []

        //primero de su tipo o neutral, fisico o especial
        let possibleAttacks = []

        for (let i = 0; i < ATTACKS.length; i++) {
            const actualAttack = ATTACKS[i]

            if (
                (actualAttack.type == type
                    || actualAttack.type == ELEMENTAL_TYPES.NEUTRAL
                )
                &&
                (actualAttack.category == ATTACK_CATEGORYS.PHYSICAL
                    || actualAttack.category == ATTACK_CATEGORYS.SPECIAL
                )
            ) {
                possibleAttacks.push(actualAttack)
            }
        }

        randomNumber = Math.floor(Math.random() * possibleAttacks.length)
        attacks[0] = possibleAttacks[randomNumber]

        //Segundo puede ser apoyo
        if (numAttacks == 2) {
            possibleAttacks = []

            for (let i = 0; i < ATTACKS.length; i++) {
                const actualAttack = ATTACKS[i]

                if (
                    (actualAttack.type == type
                        || actualAttack.type == ELEMENTAL_TYPES.NEUTRAL
                    ) &&
                    (
                        actualAttack.name != attacks[0].name
                    )
                ) {
                    possibleAttacks.push(actualAttack)
                }
            }

            randomNumber = Math.floor(Math.random() * possibleAttacks.length)
            attacks[1] = possibleAttacks[randomNumber]
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
            randomNumber = Math.floor(Math.random() * (indexArray.length))
            const maxedStat = statNames[indexArray[randomNumber]]
            stats[STAT_NAMES[maxedStat]] = MAX_STAT_VALUE
            sumStats = sumStats - MAX_STAT_VALUE
            indexArray.splice(randomNumber, 1)
            calculatedStats++
        }

        //calcular vida si no se ha hecho ya
        if (stats[STAT_NAMES.MAX_HEALTH] != MAX_STAT_VALUE) {
            randomNumber = Math.floor(Math.random() * (MAX_STAT_VALUE + 1))
            if (randomNumber < MIN_HEALTH) randomNumber = MIN_HEALTH
            stats[STAT_NAMES.MAX_HEALTH] = randomNumber
            sumStats = sumStats - randomNumber
            calculatedStats++
        }

        //calcular stats restantes
        for (let i = 0; i < statNames.length - calculatedStats; i++) {
            const maxValue = (sumStats >= MAX_STAT_VALUE) ? MAX_STAT_VALUE : sumStats
            if (maxValue >= 0)
                randomNumber = Math.floor(Math.random() * (maxValue + 1))
            else
                randomNumber = 0
            statsValues[i] = randomNumber
            sumStats = sumStats - randomNumber
        }

        while (sumStats > 0) {
            let portion = (sumStats >= 10) ? 10 : sumStats
            randomNumber = Math.floor(Math.random() * (statsValues.length))
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
        const maxStatsDiff = 10
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
                && (mainStat.value - stats[actualStat] <= maxStatsDiff)
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

        randomNumber = Math.floor(Math.random() * (possibleImages.length))

        let image = {
            name: possibleImages[randomNumber],
            dark: 0
        }

        //establecer estadistica principal relacionada con tipo
        const typeStatsRelations = {
            FIRE: [STAT_NAMES.PH_ATTACK, STAT_NAMES.SP_ATTACK],
            GRASS: [STAT_NAMES.MAX_HEALTH, STAT_NAMES.SPEED],
            WATER: [STAT_NAMES.PH_DEFENSE, STAT_NAMES.SP_DEFENSE]
        }
        let typeRelatedStats

        if (type == ELEMENTAL_TYPES.FIRE) {
            typeRelatedStats = typeStatsRelations.FIRE
        } else if (type == ELEMENTAL_TYPES.GRASS) {
            typeRelatedStats = typeStatsRelations.GRASS
        } else if (type == ELEMENTAL_TYPES.WATER) {
            typeRelatedStats = typeStatsRelations.WATER
        }

        let mainTypeRelatedStat = typeRelatedStats[0]

        let mainTypeStat0CompValue = stats[typeRelatedStats[0]]
        let tempValue = MAX_STAT_VALUE - stats[typeRelatedStats[0]]
        if (tempValue < mainTypeStat0CompValue) mainTypeStat0CompValue = tempValue

        let mainTypeStat1CompValue = stats[typeRelatedStats[1]]
        tempValue = MAX_STAT_VALUE - stats[typeRelatedStats[1]]
        if (tempValue < mainTypeStat1CompValue) mainTypeStat1CompValue = tempValue

        if (mainTypeStat1CompValue < mainTypeStat0CompValue) {
            mainTypeRelatedStat = typeRelatedStats[1]
        }

        //generar tono en base a la estadistica principal entre 0 y 6
        const darkValues = 7
        image.dark = (darkValues - 1) - Math.floor(
            (stats[mainTypeRelatedStat] * (darkValues - 0.01)) / MAX_STAT_VALUE
        )

        return new Creature(
            id,
            image,
            type,
            attacks,
            stats
        )
    }
}