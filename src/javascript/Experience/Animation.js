import gsap from 'gsap';
import EventEmitter from './Utils/EventEmitter'
import Experience from "./Experience";

export default class Animation extends EventEmitter{
  constructor(){
    super()

    this.experience = new Experience();
    this.camera = this.experience.camera.instance
    this.scrollY = window.scrollY;
    this.sizes = this.experience.sizes;
    this.objectsDistance = this.experience.world.objectsDistance;
    // this.observer = this.experience.observer
    
    // console.log(this.experience.observer)
    // this.observer.on('cameraMove', ()=> {
    //   console.log('yup');
    // })

    // Scroll event
  }

  cameraMove () {
    // this.camera.instance.position.z = this.camera.instance.position.z +  (-this.scrollY / 14);
    gsap.to(this.camera.position, {z: 39, duration: 2, ease: 'circ.out'})
  }
}

