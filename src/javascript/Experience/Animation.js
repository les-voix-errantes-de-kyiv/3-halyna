import gsap from 'gsap';
import EventEmitter from './Utils/EventEmitter'
import Experience from "./Experience";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export default class Animation extends EventEmitter{
  constructor(){
    super()

    this.experience = new Experience();
    this.camera = this.experience.camera.instance
    this.scrollY = window.scrollY;
    this.sizes = this.experience.sizes;
    this.objectsDistance = this.experience.world.objectsDistance;
  }

  cameraMove (section, posY, posZ) {
    gsap.to(this.camera.position, {
      z: posZ,
      y: posY,
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        ease: "circ.out",
        scrub: true,
      },
    });
  }

  revealMessages(messageBox) {
    gsap.from(".message", {
      scrollTrigger: {
        trigger: messageBox,
        pin: true,
        markers: true,
        scrub: 1,
        start: "bottom bottom",
        end: "+=150 center"
      },
      opacity: 0,
      y: 100,
      ease: "circ.out",
      stagger: {
        amount: 1
      }
    });
  }

  revealTitle(slide) {
    
  }

  displayTitle(slide) {
    this.title = slide.querySelector('hgroup');
    this.triggerStart = slide.querySelector('[data-title="start"]')
    this.triggerEnd = slide.querySelector('[data-title="end"]')
    console.log(this.triggerEnd)

    const fadeInTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.triggerStart,
        start: 'top bottom',
        end: 'bottom center',
        scrub: true,
      },
    });
  
    fadeInTimeline.to(this.title, {
      opacity: 1,
      onStart: () => {
        gsap.set(this.title, { opacity: 0 });
      },
    });
  
    if (this.triggerEnd) {
      const fadeOutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: this.triggerEnd,
          start: 'top bottom',
          end: 'bottom center',
          scrub: true,
        },
      });
  
      fadeOutTimeline.to(this.title, {
        opacity: 0,
      });
    }  
  }
}
