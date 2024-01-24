import Experience from '../Experience'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class Scroll {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources
    this.camera = this.experience.camera.instance

    // Setup
    this.resources.on('ready', () => {
      this.setupScrollAnimations();
    })
  }

  setupScrollAnimations() {
    const slides = document.querySelectorAll('.slide');

    slides.forEach((slide, index) => {
      const sections = slide.querySelectorAll('section');

      sections.forEach((section, sectionIndex) => {
        const animationType = section.dataset.animation;
        const slideId = slide.getAttribute('data-slide');

        if (animationType === 'translate') {
          const slideElt = this.experience.world[`slide${slideId}`].mesh.position
          console.log(slideId);
          gsap.to(slideElt, {
            x: 11,
            scrollTrigger: {
              trigger: section,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
              // markers: true
            },
          });
        } else if (animationType === 'cameraMove') {
          gsap.to(this.camera.position, {
            z: 12,
            scrollTrigger: {
              trigger: section,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            },
          });
        }
      });
    });
  }
}
