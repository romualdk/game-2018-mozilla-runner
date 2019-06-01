export function getGround (gamescreen, tileset, colorScheme, currentColorScheme, getTilePos) {
  let ground = document.createElement('canvas')
  ground.width = Math.ceil(gamescreen.width / 80) * 80
  ground.height = Math.floor(gamescreen.height / 4)
  ground.ctx = ground.getContext('2d')

  let scheme = colorScheme[currentColorScheme]
  let color = scheme.colors[scheme.groundColor]

  ground.ctx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
  ground.ctx.fillRect(0, 0, ground.width, ground.height)

  let stamps = Math.floor(5 + Math.random() * 3)
  let pos = getTilePos(70)

  let step = Math.floor(ground.width / stamps)
  let devStep = Math.floor(step / 3)
  let devVert = Math.floor(ground.height / 8)

  for (let i = 0; i < stamps; i++) {
    let dx = 16 + i * step + devStep - Math.floor(Math.random() * devStep * 2)
    let dy = Math.floor(ground.height / 3) + devVert - Math.floor(Math.random() * devVert * 2)
    ground.ctx.drawImage(tileset, pos[0], pos[1], 32, 32, dx, dy, 32, 32)
  }

  return ground
}

export function getSky (gamescreen, tileset, colorScheme, currentColorScheme, getTilePos, ground) {
  let sky = document.createElement('canvas')
  sky.width = ground.width
  sky.height = gamescreen.height - ground.height
  sky.ctx = sky.getContext('2d')

  let thirdHeight = Math.floor(sky.height / 3)

  var scheme = colorScheme[currentColorScheme]
  var color = scheme.colors[scheme.skyColor]

  sky.ctx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
  sky.ctx.fillRect(0, 0, sky.width, sky.height - thirdHeight)

  color = scheme.colors[scheme.cloudColor]

  sky.ctx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
  sky.ctx.fillRect(0, sky.height - thirdHeight, sky.width, thirdHeight)

  let pos = getTilePos(64)

  for (var i = 0; i < sky.width / 80; i++) {
    var dx = i * 80
    var dy = sky.height - thirdHeight - 32

    sky.ctx.drawImage(tileset, pos[0], pos[1], 80, 32, dx, dy, 80, 32)
  }

  return sky
}
