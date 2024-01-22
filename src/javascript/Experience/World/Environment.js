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
        this.setAmbiantLight()
        this.setMoonLight()
        this.setDeskLight()
        this.setStanLight()
    }

    setFog(){
      this.fog = new THREE.Fog('#09111B', 7, 16)
      this.scene.fog = this.fog
    }

    setAmbiantLight(){
      this.ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
      this.scene.add(this.ambientLight)
    }

    setMoonLight()
    {
        this.moonLight = new THREE.PointLight('#ffffff', 0.7, 20, 1)
        this.moonLight.castShadow = true
        this.moonLight.shadow.camera.far = 15
        this.moonLight.shadow.mapSize.set(1024, 1024)
        this.moonLight.shadow.normalBias = 0.05
        this.moonLight.position.set(1, 3, - 3.25)

        // this.directionalLightHelper = new THREE.PointLightHelper( this.moonLight )
        this.scene.add( this.moonLight)
    }

    setDeskLight(){
      this.spotLightDesk = new THREE.SpotLight('#E69466', 0.9, 10, Math.PI * 0.4, 0.25, 1)
      this.spotLightDesk.position.set(1.75, 1.85, -1.2)
      this.spotLightDesk.shadow.mapSize.width = 1024;
      this.spotLightDesk.shadow.mapSize.height = 1024;
      this.scene.add(this.spotLightDesk)

      // this.spotLightHelper = new THREE.PointLightHelper( this.spotLightDesk );
      // this.scene.add( this.spotLightHelper );
    }

    setStanLight(){
      this.standLight = new THREE.SpotLight(0xffffff, 0.5, 10, Math.PI / 4, 0.25, 1)
      this.standLight.position.set(-0.25, 2.2, 0.75)
      this.scene.add(this.standLight)

      this.standLight.target.position.set(-0.25, 0, 0.75)
      this.scene.add(this.standLight.target)

      // this.standLightHelper = new THREE.SpotLightHelper( this.standLight );
      // this.scene.add( this.standLightHelper );
    }
}
