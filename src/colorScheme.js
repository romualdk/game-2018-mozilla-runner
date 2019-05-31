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
