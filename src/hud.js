const pointsCanvas = document.createElement('canvas')
const pointsCtx = pointsCanvas.getContext('2d')
pointsCanvas.width = 5 * 8
pointsCanvas.height = 8

function renderPoints (tileset, points) {
  pointsCtx.clearRect(0, 0, pointsCanvas.width, pointsCanvas.height)

  var str = String('00000' + Math.floor(points)).slice(-5)

  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i)

    pointsCtx.drawImage(tileset, (code - 48) * 8, 160, 8, 8, i * 8, 0, 8, 8)
  }
}

export function renderHud (gamectx, gamescreen, tileset, points) {
  renderPoints(tileset, points)
  gamectx.drawImage(pointsCanvas, gamescreen.width - pointsCanvas.width - 4, 4)
}

export function renderGameOver (gamectx, gamescreen, tileset, isDead, highScore) {
  if (isDead === false || highScore === 0) {
    return false
  }

  var str = 'GAME OVER'
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i)

    if (code >= 65 && code <= 90) {
      var sx = Math.floor((code - 65) % 16) * 8
      var sy = 168 + Math.floor((code - 65) / 16) * 8

      gamectx.drawImage(tileset, sx, sy, 8, 8, Math.floor(gamescreen.width / 2) - 36 + i * 8, 32, 8, 8)
    }
  }
}
