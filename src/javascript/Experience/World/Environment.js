import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.resources

        this.setFog()
        // this.setDirectionalLight()
        this.setAmbiantLight()
    }

    setFog(){
      this.fog = new THREE.Fog('#1f2c45', 18, 60)
      this.scene.fog = this.fog
    }

    setAmbiantLight(){
      this.ambientLight = new THREE.AmbientLight('#D2E1EE', 0.5)
      this.scene.add(this.ambientLight)
    }

    setDirectionalLight(){
      this.directionalLight = new THREE.DirectionalLight('#D2E1EE', 1)
      this.scene.add(this.directionalLight, this.directionalLight.target)
      this.directionalLightHelper = new THREE.DirectionalLightHelper( this.directionalLight );
      this.scene.add( this.directionalLightHelper );
    }
}
