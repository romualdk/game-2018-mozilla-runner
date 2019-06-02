class Gamepad {
  constructor () {
    this.button = { A: false, B: false, C: false }
    this.init()
  }

  init () {
    this.initKeyboard()
    this.initClick()
    this.initTouch()
  }

  resetButtons () {
    for (let button in this.button) {
      this.button[button] = false
    }
  }

  initKeyboard () {
    let self = this

    document.addEventListener('keypress', function (event) {
      switch (event.key) {
        case 'z': self.button.A = true; break
        case 'x': self.button.B = true; break
        case 'c': self.button.C = true; break
      }
    })
  }

  initClick () {
    let self = this

    document.addEventListener('click', function (event) {
      let screenCenter = window.innerWidth / 2
      let x = event.clientX

      self.setByScreenHalf(x, screenCenter)
    })
  }

  initTouch () {
    let self = this

    document.addEventListener('touchstart', function (event) {
      let screenCenter = window.innerWidth / 2
      let x = event.changedTouches[0].pageX

      self.setByScreenHalf(x, screenCenter)
    })
  }

  setByScreenHalf (x, screenCenter) {
    if (x < screenCenter) {
      this.button.A = true
    } else {
      this.button.B = true
    }
  }
}

export default Gamepad
