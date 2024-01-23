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
          this.slide1 = new Slide(this.resources.items.slide1Texture, 40)
          this.slide2 = new Slide(this.resources.items.slide2Texture, 26)
          this.slide3 = new Slide(this.resources.items.slide3Texture, 12)
          this.slide4 = new Slide(this.resources.items.slide4Texture, -2)
          this.environment = new Environment()
        })
    }
}
