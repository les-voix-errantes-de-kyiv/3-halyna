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
        this.objectsDistance = 4;
        this.currentSlide = 1
        this.slides

        console.log(this.experience);

        this.resources.on('ready', ()=> {
          // Setup
          this.slide1 = new Slide(1, this.resources.items.slide1Texture, 4, 2.5, 108)
          this.slide2 = new Slide(2, this.resources.items.slide2Texture, 3.8, 3.3, 96)
          this.slide3 = new Slide(3, this.resources.items.slide3Texture, 5, 3.9, 84)
          this.slide4 = new Slide(4, this.resources.items.slide4Texture, 4.6, 6.5, 72)
          this.slide5 = new Slide(5, this.resources.items.slide5Texture, 4.6, 6.8, 60)
          this.slide6 = new Slide(6, this.resources.items.slide6Texture, 1.6, 14, 48)
          this.slide7 = new Slide(7, this.resources.items.slide7Texture, 1.6, 16, 36)
          this.slide8 = new Slide(8, this.resources.items.slide8Texture, 4.6, 11.5, 24)
          this.slide9 = new Slide(9, this.resources.items.slide9Texture, 1.6, 13, 12)
          this.environment = new Environment()
        })

        this.getSlides()
      }

      update(newValue){
        this.currentSlide = newValue
      }

      getSlides() {
        const slides = document.querySelectorAll('.slide')

        if (slides) {
            this.slides = slides;
        }
    }
}
