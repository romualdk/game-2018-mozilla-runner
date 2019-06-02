/* global Image */

class Tileset {
  constructor (tileset, colorSchemes, spritesheet) {
    this.tileset = tileset
    this.colorSchemes = colorSchemes
    this.spritesheet = spritesheet
    this.loadImage()
    this.initCanvas()
    this.colorize('grayscale')
  }

  loadImage () {
    this.image = new Image()
    this.image.src = this.tileset.image
  }

  initCanvas () {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.tileset.imagewidth
    this.canvas.height = this.tileset.imageheight
    this.canvas.ctx = this.canvas.getContext('2d')
  }

  colorize (schemeName) {
    if (!(schemeName in this.colorSchemes)) {
      return false
    }

    this.currentColorScheme = schemeName

    const BYTES_PER_PIXEL = 4
    let scheme = this.colorSchemes[schemeName]

    this.canvas.ctx.drawImage(this.image, 0, 0)
    let imageData = this.canvas.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    let data = imageData.data

    for (var y = 0; y < this.canvas.height; y++) {
      for (var x = 0; x < this.canvas.width; x++) {
        var index = (y * this.canvas.width + x) * BYTES_PER_PIXEL
        var colorIndex = this.tileset.colormap[data[index]]
        var palMap = Math.floor(y / scheme.tileheight) * BYTES_PER_PIXEL + Math.floor(x / scheme.tilewidth)
        var pal = scheme.palleteMap[palMap] ? scheme.palleteMap[palMap] : 0
        var color = scheme.colors[scheme.palettes[pal][colorIndex]]

        data[index] = color[0]
        data[index + 1] = color[1]
        data[index + 2] = color[2]
      }
    }

    this.canvas.ctx.putImageData(imageData, 0, 0)
  }

  tilePos (tile) {
    return [
      (tile % this.tileset.columns) * this.tileset.tilewidth,
      Math.floor(tile / this.tileset.columns) * this.tileset.tileheight
    ]
  }
}

export default Tileset
