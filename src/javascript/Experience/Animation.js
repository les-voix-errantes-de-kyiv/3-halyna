import gsap from 'gsap';
import EventEmitter from './Utils/EventEmitter'
import Experience from "./Experience";

export default class Animation extends EventEmitter{
  constructor(){
    super()

    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.scrollY = window.scrollY;
    this.sizes = this.experience.sizes;
    this.objectsDistance = this.experience.world.objectsDistance;

    console.log(this.objectsDistance);
    
    // Scroll event
    window.addEventListener('scroll', ()=>{
      // console.log(this.scrollY);
      this.scrollY = window.scrollY;
      this.animateCamera();
    })

  }
  animateCamera () {
    console.log('anim');
    this.camera.instance.position.z = this.camera.instance.position.z +  (-this.scrollY / 14);
    console.log(this.camera.instance.position.z);
  }
}

