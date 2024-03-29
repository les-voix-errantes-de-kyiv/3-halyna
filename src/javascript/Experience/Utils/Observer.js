import Animation from '../Animation'
import Experience from '../Experience'
import World from '../World/World'
import EventEmitter from './EventEmitter.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
            this.setupSectionObserver();
        });

        window.addEventListener('scroll', this.getScrollDirection.bind(this));
    }

    setupSectionObserver() {
        this.slides = document.querySelectorAll('.slide');
        this.gradientLayer = document.querySelector('.gradient-bottom');

        this.slides.forEach(slide => {
            this.slideObserver(slide);

            const sections = slide.querySelectorAll('section');

            sections.forEach(section => {
                const animation = section.getAttribute('data-animation');
                this.sectionObserver(section, animation);
            });
        });
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

    sectionObserver(section, animation) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (animation == "cameraMove") {
                        this.posZ = section.getAttribute('data-posZCamera')
                        this.posY = section.getAttribute('data-posYCamera')
                        this.animation.cameraMove(section, this.posY, this.posZ);
                    }
                    // if (section.classList.contains('section-messages')) {
                    //     const messageBox = section.querySelector('.messages');
                    //     const messages = messageBox.querySelectorAll('.message');
                    //     this.animation.revealMessages(messageBox, messages);
                    // }
                }
            });
        });
        observer.observe(section);
    }

    slideObserver (slide) {
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animation.displayTitle(slide);
                    if (!this.gradientLayer.classList.contains('active')) {
                        this.animation.displayGradientLayer(this.gradientLayer);
                        this.gradientLayer.classList.add('active');
                    }
                }
            });
        });
        observer.observe(slide);
    }
}
