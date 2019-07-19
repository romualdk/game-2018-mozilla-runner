class Tileset {
  constructor (tileset, spritesheet, image) {
    this.tileset = tileset
    this.spritesheet = spritesheet
    this.image = image
    this.initCanvas()
  }

  initCanvas () {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.tileset.imagewidth
    this.canvas.height = this.tileset.imageheight
    this.canvas.ctx = this.canvas.getContext('2d')
    this.canvas.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
  }

  tilePos (tile) {
    return [
      (tile % this.tileset.columns) * this.tileset.tilewidth,
      Math.floor(tile / this.tileset.columns) * this.tileset.tileheight
    ]
  }

  tilePosByName (tileName) {
    let tile = this.tileset.tiles[tileName] || 0
    return this.tilePos(tile)
  }

  colorByTileName (tileName) {
    let tile = this.tilePosByName(tileName)
    return this.tileColor(tile)
  }

  tileColor (tile) {
    return this.onePixelData(tile[0], tile[1])
  }

  onePixelData (x, y) {
    return this.canvas.ctx.getImageData(x, y, 1, 1).data
  }
}

export default Tileset
