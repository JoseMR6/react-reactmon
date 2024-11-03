import { CREATURES, ELEMENTAL_TYPES, MIN_HEALTH} from "../constants"

export class Creature {
    constructor(
        id = 0,
        image = new CreatureImage(),
        type = ELEMENTAL_TYPES.FIRE,
        attacks = [],
        stats = {
            maxHealth: MIN_HEALTH,
            speed: 0,
            physicalAttack: 0,
            specialAttack: 0,
            physicalDefense: 0,
            specialDefense: 0
        },
        recordedHealth = null,
        recordedBuffs = new Buff(),
        dead = false
    ) {
        if(recordedHealth===null) recordedHealth=stats.maxHealth
        
        this.id = id
        this.image = image
        this.type = type
        this.attacks = attacks
        this.stats = stats

        this.recordedHealth=recordedHealth
        this.recordedBuffs=recordedBuffs
        this.dead=dead
    }
}

export class Buff{
    constructor(cont=0,stat=null){
        this.cont=cont
        this.stat=stat
    }
}

export class CreatureImage{
    constructor(name=CREATURES[0].name,dark=0){
        //de 0 a 6
        this.name=name
        this.dark=dark
    }
}