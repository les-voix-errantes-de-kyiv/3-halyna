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
          this.slide1 = new Slide(1, this.resources.items.slide1Texture, 4, 0, 162)
          this.slide2 = new Slide(2, this.resources.items.slide2Texture, 3.8, 0, 144)
          this.slide3 = new Slide(3, this.resources.items.slide3Texture, 4, 3.9, 126)
          this.slide4 = new Slide(4, this.resources.items.slide4Texture, 4.6, 4.5, 108)
          this.slide5 = new Slide(5, this.resources.items.slide5Texture, 5.6, 5.5, 90)
          this.slide6 = new Slide(6, this.resources.items.slide6Texture, 1.6, 7, 72)
          this.slide7 = new Slide(7, this.resources.items.slide7Texture, 0.8, 3.5, 54)
          this.slide8 = new Slide(8, this.resources.items.slide8Texture, 4.6, 9, 36)
          this.slide9 = new Slide(9, this.resources.items.slide9Texture, 6, 9.8, 18)
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
