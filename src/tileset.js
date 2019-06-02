/* global Image */

const chrtable = new Image()
chrtable.src = 'data:image/png;base64,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'

const TILE_WIDTH = 16
const TILE_HEIGHT = 16
const TILES_HORIZONTAL = 8
const TILES_VERTICAL = 16
const COLORMAP_REGION_WIDTH = 32
const COLORMAP_REGION_HEIGHT = 32
const BYTES_PER_PIXEL = 4

export const spritesheet = {
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

export function getTilesetCanvas () {
  let tileset = document.createElement('canvas')
  tileset.width = TILE_WIDTH * TILES_HORIZONTAL
  tileset.height = TILE_HEIGHT * TILES_VERTICAL

  tileset.ctx = tileset.getContext('2d')

  return tileset
}

export function colorizeTileset (tileset, colorScheme, currentColorScheme) {
  tileset.ctx.drawImage(chrtable, 0, 0)
  var imageData = tileset.ctx.getImageData(0, 0, tileset.width, tileset.height)
  var data = imageData.data

  var scheme = colorScheme[currentColorScheme]

  for (var y = 0; y < tileset.height; y++) {
    for (var x = 0; x < tileset.width; x++) {
      var index = (y * tileset.width + x) * BYTES_PER_PIXEL
      var colorIndex = scheme.colorMap[data[index]]
      var palMap = Math.floor(y / COLORMAP_REGION_HEIGHT) * BYTES_PER_PIXEL + Math.floor(x / COLORMAP_REGION_WIDTH)
      var pal = scheme.palleteMap[palMap] ? scheme.palleteMap[palMap] : 0
      var color = scheme.colors[scheme.palettes[pal][colorIndex]]

      data[index] = color[0]
      data[index + 1] = color[1]
      data[index + 2] = color[2]
    }
  }

  tileset.ctx.putImageData(imageData, 0, 0)
}

export function getTilePos (tile) {
  return [
    (tile % TILES_HORIZONTAL) * TILE_WIDTH,
    Math.floor(tile / TILES_HORIZONTAL) * TILE_HEIGHT
  ]
}

/**
 * Color tables
 */
export const colorScheme = {}

colorScheme.standard = {
  colors: [
    [0, 0, 0], // black - outline
    [255, 156, 18], // orange - tone
    [255, 255, 255], // white - highlight,
    [250, 188, 32], // yellow - ground,
    [196, 98, 0], // brown - ground marks
    [66, 154, 215], // blue - sky,
    [127, 213, 205], // light-blue - sky anti-aliasing
    [247, 247, 247], // gray - clouds
    [53, 128, 0], // green - plants / animals
    [255, 41, 80] // red - enemies
  ],
  groundColor: 3,
  skyColor: 5,
  cloudColor: 7,
  colorMap: {
    0: 0,
    127: 1,
    255: 2
  },
  palettes: [
    [0, 1, 2], // sprites
    [5, 6, 7], // sky / clouds
    [0, 3, 4], // ground
    [0, 4, 1], // rocks
    [0, 8, 3], // plants
    [0, 8, 2], // animals
    [0, 9, 3] // read enemies
  ],
  // Palette index for each 32x32 px block on tileset
  palleteMap: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    3, 3, 4, 0,
    5, 6, 0, 0,
    1, 1, 1, 2,
    0, 0, 0, 0
  ]
}

colorScheme.grayscale = {
  colors: [
    [0, 0, 0], // black
    [160, 160, 160], // gray
    [247, 247, 247] // white
  ],
  groundColor: 1,
  skyColor: 2,
  cloudColor: 2,
  colorMap: {
    0: 0,
    127: 1,
    255: 2
  },
  palettes: [
    [0, 1, 2], // sprites
    [2, 2, 2], // sky / clouds
    [0, 1, 0] // ground
  ],
  // Palette index for each 32x32 px block on tileset
  palleteMap: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 1, 2
  ]
}
