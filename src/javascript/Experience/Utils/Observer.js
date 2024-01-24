import Animation from '../Animation'
import Experience from '../Experience'
import World from '../World/World'
import EventEmitter from './EventEmitter.js'

export default class Observer extends EventEmitter {
    constructor() {
        super();

        // Setup
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.animation = new Animation();
        this.currentSlideId = this.experience.world.currentSlide
        this.previousScroll = 0;
        this.direction = 'down'; // Set a default direction

        this.resources.on('ready', () => {
            this.setupSlideObserver();
            this.setupSectionObserver();
        });

        window.addEventListener('scroll', this.getScrollDirection.bind(this));
    }

    setupSectionObserver() {
        this.sectionObserver = new IntersectionObserver(this.sectionCallback.bind(this), { threshold: 0.5 });
    }

    getScrollDirection() {
        const currentScroll = window.scrollY;
        if (currentScroll > this.previousScroll) {
            this.direction = 'down';
        } else {
            this.direction = 'up';
        }
        this.previousScroll = currentScroll;
    }

    sectionCallback(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target;
                const animationType = currentSection.getAttribute('data-animation');
                console.log(currentSection);
                console.log(animationType);

                // Perform animation based on the data-animation attribute
                switch (animationType) {
                    case 'cameraMove':
                      console.log("camera move");
                        this.animation.cameraMove();
                    break;
                }
            }
        });
    }
}
