class Obstacle {
  constructor (id, x, y, ground, tileset, removeObstacle) {
    let obstacleTiles = tileset.tileset.tiles.obstacles
    let tile = obstacleTiles[Math.floor(Math.random() * obstacleTiles.length)]
    let tilePos = tileset.tilePos(tile)

    this.id = id
    this.x = x
    this.y = y - 14
    this.sx = tilePos[0]
    this.sy = tilePos[1]
    this.width = 16
    this.height = 16

    this.vx = ground.speed

    this.removeObstacle = removeObstacle
  }

  update (dt) {
    this.x += this.vx * dt

    if (this.x < -this.width) {
      this.removeObstacle(this.id)
    }
  }
}

export default Obstacle
