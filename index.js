/* eslint-disable indent */
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const CIRCLE = 360
const cw = window.innerWidth
const ch = window.innerHeight

canvas.width = cw
canvas.height = ch

const confetis = []
const alto = 20
const ancho = 10
const conteoConfeti = 500
let frame = 0

class Confeti {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.color = this.colores()
        this.angulo = Math.random() * CIRCLE
        this.vy = Math.floor(Math.random() * 5) + 1
        this.girar = Math.random() < 0.5 ? -1 : 1
    }

    draw() {
        ctx.save()
        ctx.beginPath()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angulo * Math.PI / CIRCLE * this.girar)
        ctx.fillStyle = this.color
        ctx.fillRect(0, 0, alto, ancho)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
        this.y += this.vy

        this.angulo += 10
        if (this.y > ch) {
            this.x = Math.floor(Math.random() * cw) - 50
            this.y = 0
        }
    }

    colores() {
        const r = Math.floor(Math.random() * 255)
        const g = Math.floor(Math.random() * 255)
        const b = Math.floor(Math.random() * 255)
        return `rgba(${r},${g},${b})`
    }
}

const initializeValues = () => {
    const cw = window.innerWidth
    const ch = window.innerHeight

    canvas.width = cw
    canvas.height = ch

    console.log('rezising')

}

const update = () => {
    if (confetis.length < conteoConfeti) {
        let confeti = new Confeti(Math.floor(Math.random() * cw), -50)
        confeti.draw()
        confetis.push(confeti)
    }

    ctx.clearRect(0, 0, cw, ch)

    let result = confetis.map(confeti => confeti.draw())

    requestAnimationFrame(update)
    frame++
}

update()


window.addEventListener('resize', initializeValues)
