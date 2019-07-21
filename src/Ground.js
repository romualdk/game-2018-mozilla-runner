import { createCanvas2d, fillWithColor, stampSprite } from './Canvas.js'

class Ground {
  constructor (screen, tileset) {
    this.screen = screen
    this.tileset = tileset
    this.reset()
  }

  reset () {
    this.resetImage()
    this.resetState()
  }

  resetState () {
    this.x = 0
    this.y = this.screen.height - this.image.height
    this.speed = 0
  }

  resetImage () {
    let screen = this.screen
    let tileset = this.tileset

    let width = screen.width
    let height = Math.floor(screen.height / 4)

    let ground = createCanvas2d(width, height)

    let groundColor = tileset.colorByTileName('ground')
    fillWithColor(ground, 0, 0, width, height, groundColor)
    fillWithSandMarks(ground, tileset)

    this.image = ground
  }

  update (dt) {  
    this.x += this.speed * dt
    if (this.x < 0) {
      this.x += this.image.width
    }
  }

  render () {
    let x = Math.floor(this.x)
    let y = this.y
    let width = this.image.width
    let height = this.image.height

    this.screen.ctx.drawImage(this.image, x, y)
    this.screen.ctx.drawImage(this.image, 0, 0, width, height, x - width, y, width, height)
  }
}

function fillWithSandMarks (ground, tileset) {
  let stamps = Math.floor(randomInRange(5, 8))

  let sprite = tileset.spritesheet.sand

  let xMargin = 16
  let yMargin = ground.height / 3

  let step = Math.floor(ground.width / stamps)
  let xDisplacement = Math.floor(step / 3)
  let yDisplacement = Math.floor(ground.height / 8)

  for (let i = 0; i < stamps; i++) {
    let x = xMargin + i * step + Math.floor(xDisplacement * randomInRange(-1, 1))
    let y = yMargin + Math.floor(yDisplacement * randomInRange(-1, 1))

    stampSprite(ground, x, y, tileset, sprite)
  }
}

function randomInRange (min, max) {
  return min + Math.random() * (max - min)
}

export default Ground
