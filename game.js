import Loop from './src/Main/Loop.js'
import { renderHud, renderGameOver } from './src/hud.js'
import { sound } from './src/sound.js'
import { colorScheme } from './src/colorScheme.js'
import { getTilesetCanvas, colorizeTileset, getTilePos } from './src/tileset.js'

let currentColorScheme = 'grayscale'

const tileset = getTilesetCanvas()
//const tilesetCtx = tileset.getContext('2d')

/**
 * SCREEN
 */

var gamescreen = document.createElement('canvas')
var gamectx = gamescreen.getContext('2d')
gamescreen.width = 420
gamescreen.height = 180

var scale = 1

var canvas = document.getElementById('screen')
var ctx = canvas.getContext('2d')
canvas.width = gamescreen.width * scale
canvas.height = gamescreen.height * scale

var smoothing = 0

gamectx.mozImageSmoothingEnabled = smoothing
gamectx.msImageSmoothingEnabled = smoothing
gamectx.webkitImageSmoothingEnabled = smoothing
gamectx.imageSmoothingEnabled = smoothing

window.addEventListener('resize', resizeCanvas, false)

resizeCanvas()

function resizeCanvas () {
  scale = Math.floor(window.innerWidth / gamescreen.width)
  scale = scale < 1 ? 1 : (scale > 2 ? 2 : scale)

  canvas.width = gamescreen.width * scale
  canvas.height = gamescreen.height * scale

  document.getElementById('info').style.width = canvas.width + 'px'
}

/**
 * Layers
 */

var ground = document.getElementById('ground')
var groundCtx = ground.getContext('2d')

function initGround () {
  ground.width = Math.ceil(gamescreen.width / 80) * 80
  ground.height = Math.floor(gamescreen.height / 4)

  var scheme = colorScheme[currentColorScheme]
  var color = scheme.colors[scheme.groundColor]

  groundCtx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
  groundCtx.fillRect(0, 0, ground.width, ground.height)

  var stamps = Math.floor(5 + Math.random() * 3)
  var pos = getTilePos(70)

  var step = Math.floor(ground.width / stamps)
  var devStep = Math.floor(step / 3)
  var devVert = Math.floor(ground.height / 8)

  for (var i = 0; i < stamps; i++) {
    var dx = 16 + i * step + devStep - Math.floor(Math.random() * devStep * 2)
    var dy = Math.floor(ground.height / 3) + devVert - Math.floor(Math.random() * devVert * 2)
    groundCtx.drawImage(tileset, pos[0], pos[1], 32, 32, dx, dy, 32, 32)
  }
}

var sky = document.getElementById('sky')
var skyCtx = sky.getContext('2d')

function initSky () {
  sky.width = ground.width
  sky.height = gamescreen.height - ground.height
  var thirdHeight = Math.floor(sky.height / 3)

  var scheme = colorScheme[currentColorScheme]
  var color = scheme.colors[scheme.skyColor]

  skyCtx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
  skyCtx.fillRect(0, 0, sky.width, sky.height - thirdHeight)

  var color = scheme.colors[scheme.cloudColor]

  skyCtx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
  skyCtx.fillRect(0, sky.height - thirdHeight, sky.width, thirdHeight)

  var pos = getTilePos(64)

  for (var i = 0; i < sky.width / 80; i++) {
    var dx = i * 80
    var dy = sky.height - thirdHeight - 32

    skyCtx.drawImage(tileset, pos[0], pos[1], 80, 32, dx, dy, 80, 32)
  }
}

/**
 * MISC
 */
function isMobile () {
  if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true
  } else {
    return false
  }
}

var spritesheet = {
  player: {
    width: 32,
    height: 32,
    /* tiles: [
            0, // stand
            2, // walk 1
            4, // walk 2
            6, // dodge,
            8, // jump
            10, // look up
            12, // look back
            14 // hurt
        ], */
    animations: {
      stand: [0],
      walk: [0, 2, 0, 4],
      jump: [16],
      hurt: [22]
    },
    animationSpeed: 8,
    currentAnimation: 'stand'
  }
}

/**
 * SPRITE
 */
function Sprite (sprite) {
  this.x = 0
  this.y = 0
  this.vx = 0
  this.vy = 0
  this.ax = 0
  this.ay = 0
  this.jumping = false
  this.width = spritesheet[sprite].width
  this.height = spritesheet[sprite].height
  this.animations = {}
  this.animationSpeed = spritesheet[sprite].animationSpeed
  this.currentAnimation = spritesheet[sprite].currentAnimation
  this.currentAnimationTile = 0

  for (var a in spritesheet[sprite].animations) {
    this.animations[a] = []

    for (var i in spritesheet[sprite].animations[a]) {
      this.animations[a][i] = getTilePos(spritesheet[sprite].animations[a][i])
    }
  }
}

Sprite.prototype.update = function (dt) {
  this.currentAnimationTile = (this.currentAnimationTile + this.animationSpeed * dt) % this.animations[this.currentAnimation].length

  var ay = this.ay + (gravity * 100)

  this.vx += this.ax * dt
  this.vy += ay * dt

  this.x += this.vx * dt
  this.y += this.vy * dt

  if (this.y + this.height > spriteGroundY) {
    this.y = spriteGroundY - this.height
  }

  this.jumping = this.y + this.height < spriteGroundY

  if (this.jumping) {
    this.setCurrentAnimation('jump')
  } else {
    this.setCurrentAnimation('walk')
  }
}

Sprite.prototype.setCurrentAnimation = function (animation) {
  if (animation !== this.currentAnimation) {
    this.currentAnimation = animation
    this.currentAnimationTile = 0
  }
}

Sprite.prototype.getCurrentTile = function () {
  return this.animations[this.currentAnimation][Math.floor(this.currentAnimationTile)]
}

/**
 * PLAYER
 */
var player = new Sprite('player')

function initPlayer () {
  spriteGroundY = gamescreen.height - ground.height + 4
  player.x = 16
  player.y = spriteGroundY - player.height
  player.currentAnimation = 'walk'
}

player.jump = function () {
  this.vy = -300
  sound.jump.play()
}

player.shoot = function () {
  if (bullets.length < 20) {
    addBullet(this.x + 32, this.y + 18)

    sound.shoot.play()
  }
}

/**
 * BULLETS
 */
var bullets = []

function Bullet (id, x, y) {
  var tilePos = getTilePos(38)

  this.id = id
  this.x = x
  this.y = y
  this.sx = tilePos[0]
  this.sy = tilePos[1]
  this.width = 5
  this.height = 5

  this.vx = 250
}

Bullet.prototype.update = function (dt) {
  this.x += this.vx * dt

  if (this.x > gamescreen.width) {
    removeBullet(this.id)
  }
}

function addBullet (x, y) {
  var id = bullets.length
  bullets[id] = new Bullet(id, x, y)
  bullets[id].vx += Math.floor(10 - Math.random() * 20)
}

function removeBullet (id) {
  bullets.splice(id, 1)

  for (var i in bullets) {
    bullets[i].id = i
  }
}

/**
 * OBSTACLES
 */
var obstacleTiles = [34, 35, 36, 37, 40, 41, 42, 44, 45]
var obstacles = []
var obstacleTimer = 0
var obstacleWait = 3

function Obstacle (id, x, y) {
  var tile = obstacleTiles[Math.floor(Math.random() * obstacleTiles.length)]

  var tilePos = getTilePos(tile)

  this.id = id
  this.x = x
  this.y = y - 14
  this.sx = tilePos[0]
  this.sy = tilePos[1]
  this.width = 16
  this.height = 16

  this.vx = -groundSpeed
}

Obstacle.prototype.update = function (dt) {
  // this.x -= this.vx * dt;
  this.x += groundSpeed * dt

  if (this.x < -this.width) {
    removeObstacle(this.id)
  }
}

function addObstacle (x, y) {
  var id = obstacles.length
  obstacles[id] = new Obstacle(id, x + Math.floor(Math.random() * 50), y)
}

function removeObstacle (id) {
  obstacles.splice(id, 1)

  for (var i in obstacles) {
    obstacles[i].id = i
  }
}

/**
 * CONTROLS
 */
document.addEventListener('touchstart', function (event) {
  if (!isDead) {
    var touches = event.changedTouches

    // left half of the window click
    if (touches[0].pageX < window.innerWidth / 2 && !player.jumping) {
      player.jump()
    }
    // right half of the window click
    else if (touches[0].pageX > window.innerWidth / 2) {
      player.shoot()
    }
  } else {
    startGame()
  }
})

document.addEventListener('click', function (event) {
  if (!isDead) {
    // left half of the window click
    if (event.clientX < window.innerWidth / 2 && !player.jumping) {
      player.jump()
    }
    // right half of the window click
    else if (event.clientX > window.innerWidth / 2) {
      player.shoot()
    }
  } else {
    startGame()
  }
})

document.addEventListener('keypress', function (event) {
  if (!isDead) {
    // Z - jump
    if (event.key == 'z' && !player.jumping) {
      player.jump()
    }

    // X - shoot
    if (event.key == 'x') {
      player.shoot()
    }

    // C - switch color
    if (event.key == 'c' && currentColorScheme == 'standard') {
      currentColorScheme = 'grayscale'
      resetGameColors()
    } else if (event.key == 'c' && currentColorScheme == 'grayscale') {
      currentColorScheme = 'standard'
      resetGameColors()
    }
  } else {
    if (event.key == 'z' || event.key == 'x') {
      startGame()
    }
  }
})

/**
 * GAME LOGIC
 */
var gravity = 9.8
var groundPos = 0
var groundSpeed = -350
var spriteGroundY

var skyPos = 0
var skySpeed = Math.floor(groundSpeed / 10)

var isDead = false
var speedTimer = 0
var speedWait = 10

var points = 0
var highScore = 0

const state = {}
state.prepare = function () {} // NOOP
state.update = update
state.render = render

const gameLoop = new Loop(state)

resetGameColors()
resetGame()
isDead = true
gameLoop.start()

function resetGameColors () {
  colorizeTileset(tileset, colorScheme, currentColorScheme)
  initGround()
  initSky()
}

function resetGame () {
  bullets = []
  obstacles = []
  groundSpeed = -150
  skySpeed = -15
  points = 0
  initPlayer()
  isDead = false
}

function startGame () {
  currentColorScheme = 'standard'
  resetGameColors()
  resetGame()
  sound.powerup.play()
}

function update (dt) {
  for (var i in bullets) {
    bullets[i].update(dt)
  }

  if (isDead) {
    return false
  }

  points += 1.5 * dt

  speedTimer += dt
  obstacleTimer += dt

  if (speedTimer >= speedWait) {
    groundSpeed -= 50
    skySpeed = Math.floor(groundSpeed / 10)

    sound.powerup.play()

    speedTimer = 0
  }

  if (obstacleTimer >= obstacleWait) {
    addObstacle(gamescreen.width + 16, spriteGroundY)
    obstacleTimer = 0
  }

  for (var i in obstacles) {
    obstacles[i].update(dt)
  }

  groundPos += groundSpeed * dt
  if (groundPos < 0) {
    groundPos += ground.width
  }

  skyPos += skySpeed * dt
  if (skyPos < 0) {
    skyPos += sky.width
  }

  player.update(dt)

  // Collision detection
  var collision = false
  var i = 0
  while (!collision && i < obstacles.length) {
    // broead phase
    if (obstacles[i].x < 64) {
      // narrow phase
      var a = (obstacles[i].x + 8) - (player.x + 16)
      var b = (obstacles[i].y + 8) - (player.y + 16)
      var distance = Math.sqrt(a * a + b * b)

      if (distance <= 16) {
        collision = true
        isDead = true

        if (points > highScore) {
          highScore = points
        }

        player.setCurrentAnimation('hurt')
        sound.hurt.play()
      }
    }

    i++
  }
}

function render () {
  gamectx.clearRect(0, 0, gamescreen.width, gamescreen.height)

  // Ground
  gamectx.drawImage(ground, Math.floor(groundPos), gamescreen.height - ground.height)
  gamectx.drawImage(ground, 0, 0, ground.width, ground.height, Math.floor(groundPos - ground.width), gamescreen.height - ground.height, ground.width, ground.height)

  // Sky
  gamectx.drawImage(sky, Math.floor(skyPos), 0)
  gamectx.drawImage(sky, 0, 0, sky.width, sky.height, Math.floor(skyPos - sky.width), 0, sky.width, sky.height)

  // Obstacles
  for (var i in obstacles) {
    gamectx.drawImage(tileset, obstacles[i].sx, obstacles[i].sy, obstacles[i].width, obstacles[i].height, Math.floor(obstacles[i].x), Math.floor(obstacles[i].y), obstacles[i].width, obstacles[i].height)
  }

  // Player
  var tile = player.getCurrentTile()
  gamectx.drawImage(tileset, tile[0], tile[1], player.width, player.height, Math.floor(player.x), Math.floor(player.y), player.width, player.height)

  // Bullets
  for (var i in bullets) {
    gamectx.drawImage(tileset, bullets[i].sx, bullets[i].sy, bullets[i].width, bullets[i].height, Math.floor(bullets[i].x), Math.floor(bullets[i].y), bullets[i].width, bullets[i].height)
  }

  renderHud(gamectx, gamescreen, tileset, points)
  renderGameOver(gamectx, gamescreen, tileset, isDead, highScore)

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(gamescreen, 0, 0, gamescreen.width, gamescreen.height, 0, 0, canvas.width, canvas.height)
}
