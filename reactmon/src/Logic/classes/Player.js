export class Player {
    constructor(nom = '', img = '', rec = 0) {
        this.name = nom
        this.image = img
        this.record = rec
        this.liveCreatures = 0
    }
}