const hover = (event) => {
  event.currentTarget.classList.add('--hover')
}
const down = (event) => {
  event.currentTarget.classList.add('--hover')
  event.currentTarget.classList.add('--pressed')
}
const reset = (event) => {
  event.currentTarget.classList.remove('--hover')
  event.currentTarget.classList.remove('--pressed')
}

export default {
  bind (el) {
    el.addEventListener('mousedown', down, false)
    el.addEventListener('mouseup', reset, false)
    el.addEventListener('touchstart', down, false)
    el.addEventListener('touchend', reset, false)
    el.addEventListener('mouseleave', reset, false)
    el.addEventListener('mouseover', hover, false)
  },
  unbind (el) {
    el.removeEventListener('mousedown', down)
    el.removeEventListener('mouseup', reset)
    el.removeEventListener('touchstart', down)
    el.removeEventListener('touchend', reset)
    el.removeEventListener('mouseleave', reset)
    el.removeEventListener('mouseover', hover)
  },
}
