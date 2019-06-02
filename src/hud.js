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

      gamescreen.ctx.drawImage(tileset, sx, sy, 8, 8, Math.floor(gamescreen.width / 2) - 36 + i * 8, 32, 8, 8)
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

    pointsCtx.drawImage(tileset, (code - 48) * 8, 160, 8, 8, i * 8, 0, 8, 8)
  }
}
