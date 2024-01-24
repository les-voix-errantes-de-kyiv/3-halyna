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

    setupSlideObserver() {
      this.slideObserver = new IntersectionObserver(this.slideCallback.bind(this), { threshold: 0.99 });

      // Observer la première diapositive
      const currentSlideSections = this.experience.world[`slide${this.currentSlideId}`].sections;
      currentSlideSections.forEach(section => {
          this.slideObserver.observe(section);
      });
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

    slideCallback(entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Handle slide change when scrolling down or up
              switch (this.direction) {
                  case 'down':
                      // Update currentSlideId for the next slide
                      this.currentSlideId++;
                      break;
                  case 'up':
                      // Update currentSlideId for the previous slide, ensuring it doesn't go below 1
                      this.currentSlideId = Math.max(1, this.currentSlideId - 1);
                      break;
              }

              // Observer les sections de la nouvelle diapositive
              const currentSlideSections = this.experience.world[`slide${this.currentSlideId}`].sections;
              currentSlideSections.forEach(section => {
                  this.sectionObserver.observe(section);
              });
          }
      });
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
                    case 'translate':
                        this.animation.translate(this.currentSlideId);
                        break;
                    // Add more cases for other animation types as needed
                }
            }
        });
    }
}
