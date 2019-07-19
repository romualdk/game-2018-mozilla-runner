export function createCanvas2d (width, height) {
  let canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.ctx = canvas.getContext('2d')

  return canvas
}

export function fillWithColor (canvas, x, y, width, height, color) {
  canvas.ctx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
  canvas.ctx.fillRect(x, y, width, height)
}

export function stampSprite (canvas, x, y, tileset, sprite) {
  canvas.ctx.drawImage(tileset.canvas, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height)
}

export function repeatSpriteHorizontaly (canvas, tileset, sprite, y) {
  let stamps = Math.ceil(canvas.width / sprite.width)

  for (let i = 0; i < stamps; i++) {
    let x = i * sprite.width

    stampSprite(canvas, x, y, tileset, sprite)
  }
}
