export function getGround (gamescreen, tileset) {
  let ground = document.createElement('canvas')
  ground.width = Math.ceil(gamescreen.width)
  ground.height = Math.floor(gamescreen.height / 4)
  ground.ctx = ground.getContext('2d')

  let tile = tileset.tilePosByName('ground')
  let color = tileset.canvas.ctx.getImageData(tile[0], tile[1], 1, 1).data

  ground.ctx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
  ground.ctx.fillRect(0, 0, ground.width, ground.height)

  let stamps = Math.floor(5 + Math.random() * 3)
  let pos = tileset.tilePos(70)

  let step = Math.floor(ground.width / stamps)
  let devStep = Math.floor(step / 3)
  let devVert = Math.floor(ground.height / 8)

  for (let i = 0; i < stamps; i++) {
    let dx = 16 + i * step + devStep - Math.floor(Math.random() * devStep * 2)
    let dy = Math.floor(ground.height / 3) + devVert - Math.floor(Math.random() * devVert * 2)
    ground.ctx.drawImage(tileset.canvas, pos[0], pos[1], 32, 32, dx, dy, 32, 32)
  }

  return ground
}

const T_GAME_OVER = 'GAME OVER'

export function renderGameOver (gamescreen, tileset, isDead, highScore) {
  if (isDead === false || highScore === 0) {
    return false
  }

  for (var i = 0; i < T_GAME_OVER.length; i++) {
    var code = T_GAME_OVER.charCodeAt(i)

    if (code >= 65 && code <= 90) {
      var sx = Math.floor((code - 65) % 16) * 8
      var sy = 168 + Math.floor((code - 65) / 16) * 8

      gamescreen.ctx.drawImage(tileset.canvas, sx, sy, 8, 8, Math.floor(gamescreen.width / 2) - 36 + i * 8, 32, 8, 8)
    }
  }
}

export function renderHud (gamescreen, tileset, points) {
  renderPoints(tileset, points)
  gamescreen.ctx.drawImage(pointsCanvas, gamescreen.width - pointsCanvas.width - 4, 4)
}

const T_POINTS = '00000'
const pointsCanvas = document.createElement('canvas')
const pointsCtx = pointsCanvas.getContext('2d')
pointsCanvas.width = 5 * 8
pointsCanvas.height = 8

function renderPoints (tileset, points) {
  pointsCtx.clearRect(0, 0, pointsCanvas.width, pointsCanvas.height)

  var str = String(T_POINTS + Math.floor(points)).slice(-T_POINTS.length)

  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i)

    pointsCtx.drawImage(tileset.canvas, (code - 48) * 8, 160, 8, 8, i * 8, 0, 8, 8)
  }
}
