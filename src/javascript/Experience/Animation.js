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

  revealMessages(messageBox, messages) {
    gsap.from(messages, {
      scrollTrigger: {
        trigger: messageBox,
        pin: true,
        markers: true,
        scrub: 1,
        start: "top 400",
        end: "top center"
      },
      opacity: 0,
      y: 100,
      ease: "circ.out",
      duration: 3,
      stagger: {
        amount: 1
      }
    });
  }

  displayTitle(slide) {
    this.title = slide.querySelector('hgroup');
    // this.distanceText = this.title.querySelector('.distance__value')
    this.triggerStart = slide.querySelector('[data-title="start"]')
    this.triggerEnd = slide.querySelector('[data-title="end"]')

    const fadeInTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.triggerStart,
        start: '-=10 bottom',
        end: 'bottom center',
        scrub: true,
      },
    });

    fadeInTimeline.to(this.title, {
      opacity: 1,
      onStart: () => {
        this.distanceText = this.title.querySelector('.distance__value')
        gsap.set(this.title, { opacity: 0 });
        this.scrollingNumber(this.distanceText)
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

  scrollingNumber(text){
    let numberFrom = text.getAttribute('data-from')
    const numberTo = text.getAttribute('data-to')
    text.innerText = numberFrom.toString()
    setInterval((scrollingNumber) => {
      if((numberFrom - numberTo) != 0){
        numberFrom++
        text.innerText = numberFrom.toString()
      }
    }, 50);
  }
}
