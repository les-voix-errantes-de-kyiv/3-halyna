import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Slide
{
    constructor(texture, posZ)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera

        this.setGeometry()
        this.setTextures(texture)
        this.setMaterial()
        this.setMesh(posZ)
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(9, 12.1)
    }

    setTextures(texture)
    {
        this.textures = {}

        this.textures.color = texture
        this.textures.color.colorSpace = THREE.SRGBColorSpace
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            side: THREE.DoubleSide,
            transparent: true
        })
    }

    setMesh(posZ)
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(0, 0, posZ)
        this.mesh.lookAt(this.camera.instance.position)
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}
