import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Slide
{
    constructor(id, texture, posX, posY, posZ)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.sections = []
        this.id = id
        this.currentSection = 1
        this.sections

        this.setGeometry()
        this.setTextures(texture)
        this.setMaterial()
        this.setMesh(posX, posY, posZ)
        this.getSections()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(30, 20)
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
            transparent: true
        })
    }

    setMesh(posX, posY, posZ)
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(posX, posY, posZ)
        this.mesh.scale.set(1.85, 1.85, 1.85)
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    getSections() {
        const slideSections = document.querySelectorAll(`[data-slide="${this.id}"] > section`)

        if (slideSections) {
            this.sections = slideSections;
        }
    }
}
