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
          this.slide1 = new Slide(1, this.resources.items.slide1Texture, 10, 0, 200)
          this.slide2 = new Slide(2, this.resources.items.slide2Texture, 10, 0, 180)
          this.slide3 = new Slide(3, this.resources.items.slide3Texture, 7, 3.9, 160)
          this.slide4 = new Slide(4, this.resources.items.slide4Texture, 10, 4.5, 140)
          this.slide5 = new Slide(5, this.resources.items.slide5Texture, 15, 5.5, 120)
          this.slide6 = new Slide(6, this.resources.items.slide6Texture, 1.6, 16.5, 100)
          this.slide7 = new Slide(7, this.resources.items.slide7Texture, 8, 18.5, 80)
          this.slide8 = new Slide(8, this.resources.items.slide8Texture, 4.6, 23, 60)
          this.slide9 = new Slide(9, this.resources.items.slide9Texture, 15, 24, 40)
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
