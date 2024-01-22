import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Slide from './Slide.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        console.log(this.experience)

        this.resources.on('ready', ()=> {
          // Setup
          this.slide1 = new Slide(this.resources.items.slide1Texture,16)
          this.slide2 = new Slide(this.resources.items.slide2Texture, 8)
          this.slide3 = new Slide(this.resources.items.slide3Texture, 0)
          this.environment = new Environment()
        })
    }
}
