import { CREATURES, ELEMENTAL_TYPES } from "./constants"

export class Creature{
    constructor(
        id=0,
        image={
            name:CREATURES[0].name,
            dark:0      //de 0 a 6
        },
        type=ELEMENTAL_TYPES.FIRE,
        attacks=[],
        stats={
            maxHealth:0,
            speed:0,
            physicalAttack:0,
            specialAttack:0,
            physicalDefense:0,
            specialDefense:0
        }
    ){
        this.id=id
        this.image=image
        this.type=type
        this.recordedHealth=stats.maxHealth
        this.attacks=attacks
        this.stats=stats
    }
}