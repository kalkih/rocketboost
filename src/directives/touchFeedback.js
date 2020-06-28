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
    el.addEventListener('mousedown', down, { capture: true })
    el.addEventListener('mouseup', reset, { capture: true })
    el.addEventListener('touchstart', down, { capture: true, passive: true })
    el.addEventListener('touchend', reset, { capture: true, passive: true })
    el.addEventListener('mouseleave', reset, { capture: true })
    el.addEventListener('mouseover', hover, { capture: true })
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
