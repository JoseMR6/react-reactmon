import { Creature } from "./Creature"
import { PLAYER_SKINS } from "./constants"

export class Player{
    constructor(nom='', img='', rec=0){
        this.name=nom
        this.image=img
        this.record=rec
        this.liveCreatures=0
    }

    static generateRival(round, getNewId, firstType=null){
        const newRival = new Player(
            'Kenny',
            PLAYER_SKINS[0],
            round
        )

        if(!firstType){
            firstType=Creature.generateType()
        }

        const newRivalCreatures = [
            Creature.generateCreature({
                id: getNewId(),
                type: firstType,
                numAttacks: 2
            })
        ]

        return {newRival, newRivalCreatures}
    }
}