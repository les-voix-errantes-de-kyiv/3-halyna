import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(30, 30)
    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = new THREE.Color("#413E40")
        this.textures.color.colorSpace = THREE.SRGBColorSpace
        this.textures.roughness = 0.5
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            color: this.textures.color
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}
