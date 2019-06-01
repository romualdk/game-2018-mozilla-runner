class Player {
  constructor (spritesheet, getTilePos, gravity, spriteGroundY) {
    let sprite = 'player'
    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
    this.jumps = 0
    this.jumping = false
    this.width = spritesheet[sprite].width
    this.height = spritesheet[sprite].height
    this.animations = {}
    this.animationSpeed = spritesheet[sprite].animationSpeed
    this.currentAnimation = spritesheet[sprite].currentAnimation
    this.currentAnimationTile = 0
    this.gravity = gravity

    this.spriteGroundY = spriteGroundY
    this.reset()

    for (var a in spritesheet[sprite].animations) {
      this.animations[a] = []

      for (var i in spritesheet[sprite].animations[a]) {
        this.animations[a][i] = getTilePos(spritesheet[sprite].animations[a][i])
      }
    }
  }

  reset () {
    this.x = 16
    this.y = this.spriteGroundY - this.height
    this.currentAnimation = 'walk'
    this.jumps = 0
  }

  update (dt) {
    this.currentAnimationTile = (this.currentAnimationTile + this.animationSpeed * dt) % this.animations[this.currentAnimation].length

    let ay = this.ay + (this.gravity * 100)

    this.vx += this.ax * dt
    this.vy += ay * dt

    this.x += this.vx * dt
    this.y += this.vy * dt

    if (this.y + this.height > this.spriteGroundY) {
      this.y = this.spriteGroundY - this.height
    }

    this.jumping = this.y + this.height < this.spriteGroundY

    if (this.jumping) {
      this.setCurrentAnimation('jump')
    } else {
      this.setCurrentAnimation('walk')
      this.jumps = 0
    }
  }

  setCurrentAnimation (animation) {
    if (animation !== this.currentAnimation) {
      this.currentAnimation = animation
      this.currentAnimationTile = 0
    }
  }

  getCurrentTile () {
    return this.animations[this.currentAnimation][Math.floor(this.currentAnimationTile)]
  }

  jump () {
    if (this.jumps < 2) {
      this.vy = -300
      this.jumps++

      return true
    }

    return false
  }
}

export default Player
