import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.resources

        // this.setFog()
        this.setAmbiantLight()
    }

    setFog(){
      this.fog = new THREE.Fog('#cccccc', 0, 6)
      this.scene.fog = this.fog
    }

    setAmbiantLight(){
      this.ambientLight = new THREE.AmbientLight('#ffffff', 1)
      this.scene.add(this.ambientLight)
    }
}
