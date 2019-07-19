
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
  tiles: {
    sky: 69,
    cloud: 77,
    ground: 78,
    sand: 70,
    obstacles: [32, 33, 34, 35, 36, 37, 40, 41, 42, 43, 44, 45]
  }
}

export const mySpritesheet = {
  player: {
    width: 32,
    height: 32,
    animations: {
      stand: [0],
      walk: [0, 2, 0, 4],
      jump: [16],
      hurt: [22]
    },
    animationSpeed: 8,
    currentAnimation: 'stand'
  },
  cloud: {
    x: 0,
    y: 128,
    width: 80,
    height: 32
  }
}
