export class Creature{
    constructor(img,type){
        this.id=''
        this.image={
            name: img,
            dark: 0 //de 0 a 6
        }
        this.type=type
        this.recordedLife=''
        this.attacks=''
        this.stats={
            maxLife:'',
            speed:'',
            physicalAttack:'',
            specialAttack:'',
            physicalDefense:'',
            specialDefense:''
        }
    }
}