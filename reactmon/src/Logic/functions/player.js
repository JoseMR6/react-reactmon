import { Player } from "../classes/Player"
import { MAX_CREATURES_RIVAL, PLAYER_SKINS } from "../constants"
import { getRandomInt } from "./calculations"
import { generateCreature, generateType } from "./creature"

export function generateName() {
    let name = ''
    const syllables = Math.floor(Math.random() * 4) + 1
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n',
        'p', 'q', 'r', 's', 't', 'v', 'x', 'z', 'w', 'y'
    ]
    const vowels = ['a', 'e', 'i', 'o', 'u']
    let randomNumber = 0

    for (let i = 0; i < syllables; i++) {
        randomNumber = getRandomInt(consonants.length)
        name += consonants[randomNumber]
        randomNumber = getRandomInt(vowels.length)
        name += vowels[randomNumber]
    }

    name = name[0].toUpperCase() + name.substring(1)

    return name
}

export function generateRival(round, getNewId, firstType = null) {
    let newRival = new Player(
        'Kenny',
        PLAYER_SKINS[0],
        round
    )

    if (!firstType) {
        firstType = generateType()
    }

    let newRivalCreatures = [
        generateCreature({
            id: getNewId(),
            type: firstType,
            numAttacks: 1
        })
    ]

    if (round > 1) {
        let randomNumber = getRandomInt(PLAYER_SKINS.length)

        newRival = new Player(
            generateName(),
            PLAYER_SKINS[randomNumber],
            round
        )

        const numCreatures = (round <= MAX_CREATURES_RIVAL) ? round : MAX_CREATURES_RIVAL
        let numCrMaxAttack = ((round - MAX_CREATURES_RIVAL) < MAX_CREATURES_RIVAL)
            ? (round - MAX_CREATURES_RIVAL)
            : MAX_CREATURES_RIVAL

        newRivalCreatures = []

        for (let i = 0; i < numCreatures; i++) {
            let nAttacks = 1
            if (numCrMaxAttack > 0) {
                nAttacks++
                numCrMaxAttack--
            }

            newRivalCreatures.push(
                generateCreature({
                    id: getNewId(),
                    type: generateType(),
                    numAttacks: nAttacks
                })
            )
        }
    }

    return { newRival, newRivalCreatures }
}