import Experience from '../Experience'
import EventEmitter from './EventEmitter.js'

export default class Observer extends EventEmitter {
    constructor(){
        super()
        // Setup
        this.experience = new Experience()
        this.resources = this.experience.resources

        this.currentSlide = this.experience.world.currentSlide
        const slide = `slide${this.currentSlide}`

        this.resources.on('ready', ()=> {
            this.currentSection = this.experience.world[slide].currentSection

            console.log(' yooo :  ' + this.currentSection)
        })
    }
}
