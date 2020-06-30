function hover(event) {
  event.currentTarget.classList.add('--hover')
  // event.stopPropagation()
}
function down(event) {
  event.currentTarget.classList.add('--hover')
  event.currentTarget.classList.add('--pressed')
  if (this.$$touch.stop) {
    event.stopPropagation()
    console.log('stop')
  }
}
function reset(event) {
  event.currentTarget.classList.remove('--hover')
  event.currentTarget.classList.remove('--pressed')
}

export default {
  bind(el, bindings) {
    // eslint-disable-next-line no-param-reassign
    el.$$touch = {
      stop: bindings.modifiers.stop,
    }
    el.addEventListener('mousedown', down, { capture: true })
    el.addEventListener('mouseup', reset, { capture: true })
    el.addEventListener('touchstart', down, {
      capture: false,
      passive: true,
    })
    el.addEventListener('touchend', reset, { capture: false, passive: true })
    el.addEventListener('mouseleave', reset, { capture: true })
    el.addEventListener('mouseover', hover, { capture: true })
  },
  unbind(el) {
    el.removeEventListener('mousedown', down)
    el.removeEventListener('mouseup', reset)
    el.removeEventListener('touchstart', down)
    el.removeEventListener('touchend', reset)
    el.removeEventListener('mouseleave', reset)
    el.removeEventListener('mouseover', hover)
  },
}
