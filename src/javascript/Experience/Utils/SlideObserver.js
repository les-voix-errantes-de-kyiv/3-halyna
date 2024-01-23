import Animation from '../Animation'
import Experience from '../Experience'
import World from '../World/World'
import EventEmitter from './EventEmitter.js'


export default class SlideObserver extends EventEmitter {
    constructor(){
        super()
        // Setup
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.animation = new Animation()
        this.world = new World()

        this.resources.on('ready', ()=> {
            this.slides = this.experience.world.slides

            this.currentSlideId = this.experience.world.currentSlide
            this.nextSlide = this.slides[(this.experience.world.currentSlide + 1) - 1]
            console.log('next slide :  ' + this.nextSlide);

            this.slideObserver = new IntersectionObserver(this.slideCallback.bind(this), { threshold: 0.99 });

            this.slideObserver.observe(this.nextSlide);
        });
    }

    slideCallback (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.currentSlideId++
                console.log(this.currentSlideId);
                if(this.slides[(this.currentSlideId + 1) - 1]){
                    this.slideObserver.observe(this.slides[(this.currentSlideId + 1) - 1]);
                }
            }
        });
    }
}
