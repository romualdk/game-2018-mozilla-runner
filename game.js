import Mainloop from './src/Mainloop.js'
import Gamepad from './src/Gamepad.js'
import { sound } from './src/sound.js'
import { getGamescreen, getCanvas, resizeCanvas } from './src/screen.js'
import { myTileset, myColorSchemes, mySpritesheet } from './src/tilesetData.js'
import Tileset from './src/Tileset.js'
import { getGround, getSky, renderGameOver, renderHud } from './src/layers.js'
import Player from './src/Player.js'
import Bullet from './src/Bullet.js'
import Obstacle from './src/Obstacle.js'

/**
 * SCREEN
 */
const SCREEN_WIDTH = 420
const SCREEN_HEIGHT = 180

let gamescreen = getGamescreen(SCREEN_WIDTH, SCREEN_HEIGHT)
let canvas = getCanvas('screen', gamescreen)

function onResize () {
  resizeCanvas(gamescreen, canvas, 'info')
}

window.addEventListener('resize', onResize, false)
onResize()

let tileset = new Tileset(myTileset, myColorSchemes, mySpritesheet)
let ground = getGround(gamescreen, tileset)
let sky = getSky(gamescreen, tileset, ground)

var gravity = 9.8
var groundPos = 0
var groundSpeed = -350
let spriteGroundY = gamescreen.height - ground.height + 4

var skyPos = 0
var skySpeed = Math.floor(groundSpeed / 10)

var started = false
var speedTimer = 0
var speedWait = 10

var points = 0
var highScore = 0

/**
 * PLAYER
 */
var player = new Player(tileset, gravity, spriteGroundY)

function playerShoot () {
  if (bullets.length < 20) {
    addBullet(player.x + 32, player.y + 18)

    sound.shoot.play()
  }
}

function playerJump () {
  if (player.jump()) {
    sound.jump.play()
  }
}

/**
 * BULLETS
 */
let bullets = []

function addBullet (x, y) {
  var id = bullets.length
  bullets[id] = new Bullet(id, x, y, tileset, gamescreen, removeBullet)
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
let obstacles = []
let obstacleTimer = 0
let obstacleWait = 3

function addObstacle (x, y) {
  let id = obstacles.length
  obstacles[id] = new Obstacle(id, x + Math.floor(Math.random() * 50), y, groundSpeed, tileset, removeObstacle)
}

function removeObstacle (id) {
  obstacles.splice(id, 1)

  for (var i in obstacles) {
    obstacles[i].id = i
  }
}

/**
 * GAME LOGIC
 */

const state = {}
state.prepare = function () {} // NOOP
state.update = update
state.render = render

const gameloop = new Mainloop(state)
const gamepad = new Gamepad()

resetGameColors()
resetGame()
gameloop.start()

function resetGameColors () {
  ground = getGround(gamescreen, tileset)
  sky = getSky(gamescreen, tileset, ground)
}

function resetGame () {
  bullets = []
  obstacles = []
  groundSpeed = -150
  skySpeed = -15
  points = 0
  player.reset()
  started = false
}

function startGame () {
  tileset.colorize('standard')
  resetGameColors()
  resetGame()
  sound.powerup.play()
  started = true
}

function handleControls () {
  if (started) {
    if (gamepad.button.A) {
      playerJump()
    } else if (gamepad.button.B) {
      playerShoot()
    } else if (gamepad.button.C) {
      if (tileset.currentColorScheme === 'standard') {
        tileset.colorize('grayscale')
        resetGameColors()
      } else if (tileset.currentColorScheme === 'grayscale') {
        tileset.colorize('standard')
        resetGameColors()
      }
    }
  } else {
    if (gamepad.button.A || gamepad.button.B) {
      startGame()
    }
  }
}

function resetControls () {
  gamepad.resetButtons()
}

function update (dt) {
  handleControls()
  resetControls()

  for (let i in bullets) {
    bullets[i].update(dt)
  }

  if (!started) {
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

  for (let i in obstacles) {
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
  let i = 0
  while (!collision && i < obstacles.length) {
    // broead phase
    if (obstacles[i].x < 64) {
      // narrow phase
      var a = (obstacles[i].x + 8) - (player.x + 16)
      var b = (obstacles[i].y + 8) - (player.y + 16)
      var distance = Math.sqrt(a * a + b * b)

      if (distance <= 16) {
        collision = true
        started = false

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
  gamescreen.ctx.clearRect(0, 0, gamescreen.width, gamescreen.height)

  // Ground
  gamescreen.ctx.drawImage(ground, Math.floor(groundPos), gamescreen.height - ground.height)
  gamescreen.ctx.drawImage(ground, 0, 0, ground.width, ground.height, Math.floor(groundPos - ground.width), gamescreen.height - ground.height, ground.width, ground.height)

  // Sky
  gamescreen.ctx.drawImage(sky, Math.floor(skyPos), 0)
  gamescreen.ctx.drawImage(sky, 0, 0, sky.width, sky.height, Math.floor(skyPos - sky.width), 0, sky.width, sky.height)

  // Obstacles
  for (let i in obstacles) {
    gamescreen.ctx.drawImage(tileset.canvas, obstacles[i].sx, obstacles[i].sy, obstacles[i].width, obstacles[i].height, Math.floor(obstacles[i].x), Math.floor(obstacles[i].y), obstacles[i].width, obstacles[i].height)
  }

  // Player
  var tile = player.getCurrentTile()
  gamescreen.ctx.drawImage(tileset.canvas, tile[0], tile[1], player.width, player.height, Math.floor(player.x), Math.floor(player.y), player.width, player.height)

  // Bullets
  for (let i in bullets) {
    gamescreen.ctx.drawImage(tileset.canvas, bullets[i].sx, bullets[i].sy, bullets[i].width, bullets[i].height, Math.floor(bullets[i].x), Math.floor(bullets[i].y), bullets[i].width, bullets[i].height)
  }

  renderHud(gamescreen, tileset, points)
  renderGameOver(gamescreen, tileset, !started, highScore)

  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.ctx.drawImage(gamescreen, 0, 0, gamescreen.width, gamescreen.height, 0, 0, canvas.width, canvas.height)
}
