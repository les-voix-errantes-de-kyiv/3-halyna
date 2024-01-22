import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.resources

        this.setAmbiantLight()
    }

    setAmbiantLight(){
      this.ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
      this.scene.add(this.ambientLight)
    }
}
