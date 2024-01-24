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

  revealMessages() {
    gsap.from(".message", {
      scrollTrigger: {
        trigger: ".messages",
        pin: true,
        markers: true,
        scrub: 2,
        start: "bottom bottom",
        end: "+=200 center"
      },
      opacity: 0,
      y: 100,
      ease: "circ.out",
      stagger: {
        amount: 1
      }
    });

  }

  // translate(slideId){
  //   const slideElt = this.experience.world[`slide${slideId}`].mesh
  //   gsap.to(slideElt.position, {x: 5, duration: 2, ease: 'circ.out'})
  // }
}
