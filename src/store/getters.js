const getters = {

  windowBreakPoint: state => {

    if (state.windowWidth >= 1200) return "xl"
    else if (state.windowWidth >= 992) return "lg"
    else if (state.windowWidth >= 768) return "md"
    else if (state.windowWidth >= 576) return "sm"
    else return "xs"
  },

  scrollbarTag: state => {
    return state.is_touch_device ? 'div' : 'VuePerfectScrollbar'
  },

  active_extra_window : (state) => (payload) => {
    if(state.window.length > payload.level){
        if(state.window[payload.level].id === payload.id)
            return state.window[payload.level].active
    } 
    else return false
  },

  getIndices: (state) => {
    return state.indices
  },
  getEncuesta: (state) => {
    return state.encuestaJson
  }

}

export default getters
