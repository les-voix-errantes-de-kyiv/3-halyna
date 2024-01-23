import EventEmitter from './EventEmitter'

export default class Scroll extends EventEmitter{
  constructor(){
    super()

    // Setup
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    console.log('scroll');
    // Scroll event
    window.addEventListener('scroll', ()=>{
      console.log('scroooooooooooooooooooool');
    })
  }
}
