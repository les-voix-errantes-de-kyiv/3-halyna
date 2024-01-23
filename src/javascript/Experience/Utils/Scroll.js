import Animation from '../Animation'
import EventEmitter from './EventEmitter'

export default class Scroll extends EventEmitter{
  constructor(){
    super()

    // Setup
    this.animation = new Animation()
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    
    // // Scroll event
    // this.scrollY = window.scrollY;
    // window.addEventListener('scroll', ()=>{
    //   // console.log(this.scrollY);
    //   this.scrollY = window.scrollY;
    //   this.animation.animateCamera();
    // })
  }
}
