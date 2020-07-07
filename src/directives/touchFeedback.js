const NAMESPACE = 'touch-feedback'

function hover(event) {
  this.dispatchEvent(new Event(`${NAMESPACE}-hover`))
  event.currentTarget.classList.add('--hover')
}
function down(event) {
  this.dispatchEvent(new Event(`${NAMESPACE}-pressed`))
  event.currentTarget.classList.add('--hover')
  event.currentTarget.classList.add('--pressed')
}
function reset(event) {
  this.dispatchEvent(new Event(`${NAMESPACE}-reset`))
  event.currentTarget.classList.remove('--hover')
  event.currentTarget.classList.remove('--pressed')
}

export default {
  bind(el, _bindings, vnode) {
    // eslint-disable-next-line no-param-reassign
    el.$$touch = {
      vnode,
    }
    el.addEventListener('mousedown', down, { capture: true })
    el.addEventListener('mouseup', reset, { capture: true })
    el.addEventListener('touchstart', down, { capture: true, passive: true })
    el.addEventListener('touchend', reset, { capture: true, passive: true })
    el.addEventListener('mouseleave', reset)
    el.addEventListener('mouseenter', hover)
  },
  unbind(el) {
    el.removeEventListener('mousedown', down)
    el.removeEventListener('mouseup', reset)
    el.removeEventListener('touchstart', down)
    el.removeEventListener('touchend', reset)
    el.removeEventListener('mouseleave', reset)
    el.removeEventListener('mouseenter', hover)
  },
}
