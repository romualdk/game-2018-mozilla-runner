let scale = 1

export function getGamescreen (width, height, smoothing = 0) {
  let gamescreen = document.createElement('canvas')
  gamescreen.width = width
  getGamescreen.height = height
  gamescreen.ctx = gamescreen.getContext('2d')

  gamescreen.ctx.mozImageSmoothingEnabled = smoothing
  gamescreen.ctx.msImageSmoothingEnabled = smoothing
  gamescreen.ctx.webkitImageSmoothingEnabled = smoothing
  gamescreen.ctx.imageSmoothingEnabled = smoothing

  return gamescreen
}

export function getCanvas (elementId, gamescreen) {
  let canvas = document.getElementById(elementId)
  canvas.width = gamescreen.width * scale
  canvas.height = gamescreen.height * scale
  canvas.ctx = canvas.getContext('2d')

  return canvas
}

export function resizeCanvas (gamescreen, canvas, infoElementId) {
  scale = Math.floor(window.innerWidth / gamescreen.width)
  scale = scale < 1 ? 1 : (scale > 2 ? 2 : scale)

  canvas.width = gamescreen.width * scale
  canvas.height = gamescreen.height * scale

  document.getElementById(infoElementId).style.width = canvas.width + 'px'
}
