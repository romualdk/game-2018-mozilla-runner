const obstacleTiles = [34, 35, 36, 37, 40, 41, 42, 44, 45]

class Obstacle {
  constructor (id, x, y, groundSpeed, getTilePos, removeObstacle) {
    let tile = obstacleTiles[Math.floor(Math.random() * obstacleTiles.length)]
    let tilePos = getTilePos(tile)

    this.id = id
    this.x = x
    this.y = y - 14
    this.sx = tilePos[0]
    this.sy = tilePos[1]
    this.width = 16
    this.height = 16

    this.vx = groundSpeed

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
