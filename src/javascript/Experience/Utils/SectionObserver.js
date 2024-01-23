import Animation from '../Animation'
import Experience from '../Experience'
import EventEmitter from './EventEmitter.js'


export default class Observer extends EventEmitter {
    constructor(){
        super()
        // Setup
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.animation = new Animation()

        this.currentSlide = this.experience.world.currentSlide
        const slide = `slide${this.currentSlide}`

        this.resources.on('ready', ()=> {
            this.sections = this.experience.world[slide].sections

            // SECTION OBSERVER

            this.currentSectionId = this.experience.world[slide].currentSection
            this.nextSectionId = this.currentSectionId + 1

            this.currentSection = this.sections[this.currentSectionId - 1]
            this.nextSection = this.sections[this.nextSectionId - 1]
            this.nextSectionAttr = this.nextSection.getAttribute('data-animation')

            console.log(this.nextSection.getAttribute('data-animation'));

            this.sectionObserver = new IntersectionObserver(this.sectionCallback.bind(this), { threshold: 0.5 });

            this.sectionObserver.observe(this.nextSection);
        });
    }

    sectionCallback (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if(this.nextSectionAttr == "cameraMove"){
                    this.animation.cameraMove()
                }
                if(this.sections[(this.nextSectionId + 1) - 1]){
                    this.currentSectionId = this.nextSectionId
                    this.nextSectionId++
                    this.nextSection = this.sections[this.nextSectionId - 1]
                }
            }
        });
    }
    slideCallback (entries, observer) {
        entries.forEach(entry => {
            console.log();
            if (entry.isIntersecting) {
                console.log('ddddd');
                // this.currentSlideId ++
            }
        });
    }
}
