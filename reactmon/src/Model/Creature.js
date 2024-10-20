import { ATTACKS, ATTACK_CATEGORYS, CREATURES, ELEMENTAL_TYPES, MAX_STAT_VALUE, MIN_HEALTH, STAT_NAMES, TOTAL_STATS } from "./constants"

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

    static generateCreature({id=0,type='random',numAttacks='random',
        maxedStatsNum=0
    }){
        //generar tipo
        const possibleTypes = [
            ELEMENTAL_TYPES.FIRE,
            ELEMENTAL_TYPES.WATER,
            ELEMENTAL_TYPES.GRASS
        ]

        let randomNumber
        
        if(type=='random'){
            randomNumber = Math.floor(Math.random()*3)  //0 a 2
            type=possibleTypes[randomNumber]
        }

        //generar ataques 
        if(numAttacks=='random'){
            randomNumber = Math.floor(Math.random()*2)
            numAttacks=randomNumber+1
        }
        
        let attacks = []

        //primero de su tipo o neutral, fisico o especial
        let possibleAttacks = []

        for(let i=0;i<ATTACKS.length;i++){
            const actualAttack = ATTACKS[i]

            if((actualAttack.type==type 
                    || actualAttack.type==ELEMENTAL_TYPES.NEUTRAL
                )
                &&
                (actualAttack.category==ATTACK_CATEGORYS.PHYSICAL
                    || actualAttack.category==ATTACK_CATEGORYS.SPECIAL
                )
            ){
                possibleAttacks.push(actualAttack)
            }
        }
        
        randomNumber = Math.floor(Math.random()*possibleAttacks.length)
        attacks[0] = possibleAttacks[randomNumber]

        //Segundo puede ser apoyo
        if(numAttacks==2){
            possibleAttacks = []
            
            for(let i=0;i<ATTACKS.length;i++){
                const actualAttack = ATTACKS[i]
    
                if((actualAttack.type==type 
                        || actualAttack.type==ELEMENTAL_TYPES.NEUTRAL
                    )
                ){
                    possibleAttacks.push(actualAttack)
                }
            }
            
            randomNumber = Math.floor(Math.random()*possibleAttacks.length)
            attacks[1] = possibleAttacks[randomNumber]
        }

        //generar stadisticas
        let stats={}
        let sumStats=TOTAL_STATS
        let statsValues=[]
        const statNames = Object.keys(STAT_NAMES)
        let maxedStats = []

        for(let i=0;i<statNames.length;i++){
            stats[STAT_NAMES[statNames[i]]]=0
        }

        /*for(let i=0;i<maxedStatsNum;i++){
            randomNumber = Math.floor(Math.random()*(MAX_STAT_VALUE+1))
            maxedStats.push()
        }*/

        randomNumber = Math.floor(Math.random()*(MAX_STAT_VALUE+1))
        if(randomNumber<MIN_HEALTH) randomNumber=MIN_HEALTH
        stats[STAT_NAMES.MAX_HEALTH] = randomNumber
        sumStats=sumStats-randomNumber

        for(let i=0;i<statNames.length-1;i++){
            const maxValue = (sumStats>=MAX_STAT_VALUE)?MAX_STAT_VALUE:sumStats
            randomNumber = Math.floor(Math.random()*(maxValue+1))
            statsValues[i] = randomNumber
            sumStats=sumStats-randomNumber
        }

        while(sumStats>0){
            let portion = (sumStats>=10)?10:sumStats
            randomNumber = Math.floor(Math.random()*(statsValues.length))
            statsValues[randomNumber] += portion
            sumStats=sumStats-portion
            if(statsValues[randomNumber]>MAX_STAT_VALUE){
                portion=statsValues[randomNumber]-MAX_STAT_VALUE
                statsValues[randomNumber]=MAX_STAT_VALUE
                sumStats=sumStats+portion
            }
        }

        for(let i=0;i<statsValues.length;i++){
            stats[STAT_NAMES[statNames[i+1]]]=statsValues[i]
        }
        
        /*stats={
            maxHealth: 50,
            speed: 50,
            physicalAttack: 50,
            specialAttack: 50,
            physicalDefense: 50,
            specialDefense: 50
        }*/
        
        return new Creature(
            id,
            {
                name: CREATURES[0].name,
                dark: 0
            },
            type,
            attacks,
            stats
        )
    }
}