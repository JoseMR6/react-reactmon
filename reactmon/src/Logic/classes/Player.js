import { Creature } from "./Creature"
import { PLAYER_SKINS } from "../constants"

export class Player {
    constructor(nom = '', img = '', rec = 0) {
        this.name = nom
        this.image = img
        this.record = rec
        this.liveCreatures = 0
    }

    static generateName() {
        let name = ''
        let syllables = Math.floor(Math.random() * 4) + 1
        const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n',
            'p', 'q', 'r', 's', 't', 'v', 'x', 'z', 'w', 'y'
        ]
        const vowel = ['a', 'e', 'i', 'o', 'u']
        let randomNumber = 0

        for (let i = 0; i < syllables; i++) {
            randomNumber = Math.floor(Math.random() * consonants.length)
            name += consonants[randomNumber]
            randomNumber = Math.floor(Math.random() * vowel.length)
            name += vowel[randomNumber]
        }

        name = name[0].toUpperCase() + name.substring(1)

        return name
    }

    static generateRival(round, getNewId, firstType = null) {
        let newRival = new Player(
            'Kenny',
            PLAYER_SKINS[0],
            round
        )

        if (!firstType) {
            firstType = Creature.generateType()
        }

        let newRivalCreatures = [
            Creature.generateCreature({
                id: getNewId(),
                type: firstType,
                numAttacks: 1
            })
        ]

        if (round > 1) {
            let randomNumber = Math.floor(Math.random() * PLAYER_SKINS.length)

            newRival = new Player(
                Player.generateName(),
                PLAYER_SKINS[randomNumber],
                round
            )

            const numCreatures = (round <= 3) ? round : 3
            let numCrMaxAttack = ((round - 3) < 3) ? (round - 3) : 3

            newRivalCreatures = []

            for (let i = 0; i < numCreatures; i++) {
                let nAttacks=1
                if(numCrMaxAttack>0){
                    nAttacks++
                    numCrMaxAttack--
                }
                
                newRivalCreatures.push(
                    Creature.generateCreature({
                        id: getNewId(),
                        type: Creature.generateType(),
                        numAttacks: nAttacks
                    })
                )
            }
        }

        console.log(newRivalCreatures)

        return { newRival, newRivalCreatures }
    }
}