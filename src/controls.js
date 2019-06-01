let keys = {
  'z': 'A',
  'x': 'B',
  'c': 'C'
}

let states = {
  'A': false,
  'B': false,
  'C': false
}

export function buttonState (button) {
  if (button in states) {
    return states[button]
  } else {
    return false
  }
}

export function initControls () {
  initKeyboard()
  initClick()
  initTouch()
}

export function resetButtons () {
  for (let key in keys) {
    setButton(key, false)
  }
}

function setButton (key, state) {
  if (key in keys) {
    let button = keys[key]
    states[button] = state
  }
}

function initKeyboard () {
  document.addEventListener('keypress', function (event) {
    setButton(event.key, true)
  })
}

function initClick () {
  document.addEventListener('click', function (event) {
    let screenCenter = window.innerWidth / 2
    let x = event.clientX

    if (x < screenCenter) {
      setButton('z', true)
    } else {
      setButton('x', true)
    }
  })
}

function initTouch () {
  document.addEventListener('touchstart', function (event) {
    let screenCenter = window.innerWidth / 2
    let x = event.changedTouches[0].pageX

    if (x < screenCenter) {
      setButton('z', true)
    } else {
      setButton('x', true)
    }
  })
}
