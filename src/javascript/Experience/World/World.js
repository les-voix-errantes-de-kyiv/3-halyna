import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'

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
          this.floor = new Floor()
          this.environment = new Environment()
        })
    }
}
