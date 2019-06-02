
export const myTileset = {
  image: 'img/tileset.png',
  imagewidth: 128,
  imageheight: 256,
  tilewidth: 16,
  tileheight: 16,
  columns: 8,
  tilecount: 128,
  margin: 0,
  spacing: 0,
  colormap: { 0: 0, 127: 1, 255: 2 }
}

export const mySpritesheet = {
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

export const myColorSchemes = {
  standard: {
    tilewidth: 32,
    tileheight: 32,
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
  },
  grayscale: {
    tilewidth: 32,
    tileheight: 32,
    colors: [
      [0, 0, 0], // black
      [160, 160, 160], // gray
      [247, 247, 247] // white
    ],
    groundColor: 1,
    skyColor: 2,
    cloudColor: 2,
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
}
