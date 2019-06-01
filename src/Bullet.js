class Bullet {
  constructor (id, x, y, getTilePos, gamescreen, removeBullet) {
    var tilePos = getTilePos(38)

    this.id = id
    this.x = x
    this.y = y
    this.sx = tilePos[0]
    this.sy = tilePos[1]
    this.width = 5
    this.height = 5

    this.vx = 250

    this.gamescreen = gamescreen
    this.removeBullet = removeBullet
  }

  update (dt) {
    this.x += this.vx * dt

    if (this.x > this.gamescreen.width) {
      this.removeBullet(this.id)
    }
  }
}

export default Bullet
