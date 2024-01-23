import Animation from '../Animation'
import Experience from '../Experience'
import World from '../World/World'
import EventEmitter from './EventEmitter.js'


export default class Observer extends EventEmitter {
    constructor(){
        super()
        // Setup
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.animation = new Animation()
        this.world = new World()
        this.previousScroll = 0;
        this.direction

        this.resources.on('ready', ()=> {
          // Slide
          this.slides = this.experience.world.slides
          this.currentSlideId = this.experience.world.currentSlide
          this.nextSlide = this.slides[(this.experience.world.currentSlide + 1) - 1]
          const slide = `slide${this.currentSlideId}`

            this.slideObserver = new IntersectionObserver(this.slideCallback.bind(this), { threshold: 0.99 });
            this.slideObserver.observe(this.nextSlide);

            // Section

            this.sections = this.experience.world[slide].sections
            this.currentSectionId = this.experience.world[slide].currentSection
            this.nextSectionId = this.currentSectionId + 1
            this.currentSection = this.sections[this.currentSectionId - 1]
            this.nextSection = this.sections[this.nextSectionId - 1]
            this.nextSectionAttr = this.nextSection.getAttribute('data-animation')

            this.sectionObserver = new IntersectionObserver(this.sectionCallback.bind(this), { threshold: 0.5 });
            this.sectionObserver.observe(this.nextSection);
        });

        window.addEventListener('scroll', this.getScrollDirection.bind(this));
    }

    getScrollDirection() {
      const currentScroll = window.scrollY;
      if (currentScroll > this.previousScroll) {
         this.direction = 'down'
      } else {
          this.direction = 'up'
      }
      this.previousScroll = currentScroll;
    }

    slideCallback (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
              switch(this.direction){
                case 'down':
                  this.currentSlideId++
                  console.log("slide actuelle : " + this.currentSlideId);
                  if(this.slides[(this.currentSlideId + 1) - 1]){
                    this.slideObserver.observe(this.slides[(this.currentSlideId + 1) - 1]);
                  }
                break
                case 'up':
                  this.currentSlideId--
                  console.log("slide actuelle :  " +  this.currentSlideId);
                  if(this.slides[(this.currentSlideId - 1) - 1]){
                      this.slideObserver.observe(this.slides[(this.currentSlideId - 1) - 1]);
                  }
                break
              }
            }
        });
    }

    sectionCallback (entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {

            switch(this.nextSectionAttr){
              case "cameraMove":
                this.animation.cameraMove()
              break
              case "translate":
                this.animation.translate()
              break
            }

            // switch(this.direction){
            //   case 'down':
            //     this.currentSectionId++
            //     if(this.sections[(this.currentSectionId + 1) - 1]){
            //       console.log("section suivante : " + this.nextSectionId);
            //       this.sectionObserver.observe(this.sections[(this.currentSectionId + 1) - 1]);
            //       // this.currentSectionId = this.nextSectionId
            //       // this.nextSection = this.sections[this.nextSectionId - 1]
            //     }
            //   break
            //   case 'up':
            //     this.currentSectionId--
            //     if(this.sections[(this.currentSectionId - 1) - 1]){
            //       console.log("section précédente : " + this.nextSectionId);
            //       this.sectionObserver.observe(this.sections[(this.currentSectionId - 1) - 1]);
            //       // this.currentSectionId = this.nextSectionId
            //       // this.nextSection = this.sections[this.nextSectionId - 1]
            //     }
            //   break
            // }
          }
      });
  }
}
