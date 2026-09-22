// Petite météo globale du ciel :
// au départ l'univers est presque éteint, il s'allume
// quand Djamila promet de rester jusqu'à la dernière page.
const state = { visible: false, on: 0 }
const listeners = new Set()

export const sky = {
  get visible() {
    return state.visible
  },
  // 0 = éteint (quasi noir) / 1 = allumé
  get on() {
    return state.on
  },
  set(on) {
    if (on === state.on) return
    state.on = on
    state.visible = on === 1
    listeners.forEach((l) => l(state.on))
  },
  subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}