const mutations = {
  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
    state.isVerticalNavMenuActive = value
  },
  TOGGLE_REDUCE_BUTTON(state, val) {
    state.reduceButton = val
  },
  UPDATE_MAIN_LAYOUT_TYPE(state, val) {
    state.mainLayoutType = val
  },
  UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
    state.verticalNavMenuItemsMin = val
  },
  UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
    state.verticalNavMenuWidth = width
  },

  UPDATE_STARRED_PAGE(state, payload) {

    const index = state.navbarSearchAndPinList["pages"].data.findIndex((item) => item.url == payload.url)

    state.navbarSearchAndPinList["pages"].data[index].is_bookmarked = payload.val

    // if val is true add it to starred else remove
    if (payload.val) {
      state.starredPages.push(state.navbarSearchAndPinList["pages"].data[index])
    }
    else {
      // find item index from starred pages
      const index = state.starredPages.findIndex((item) => item.url == payload.url)

      // remove item using index
      state.starredPages.splice(index, 1)
    }
  },

  ARRANGE_STARRED_PAGES_LIMITED(state, list) {
    const starredPagesMore = state.starredPages.slice(10)
    state.starredPages     = list.concat(starredPagesMore)
  },
  ARRANGE_STARRED_PAGES_MORE(state, list) {
    let downToUp                 = false
    let lastItemInStarredLimited = state.starredPages[10]
    const starredPagesLimited    = state.starredPages.slice(0, 10)
    state.starredPages           = starredPagesLimited.concat(list)

    state.starredPages.slice(0, 10).map((i) => {
      if (list.indexOf(i) > -1) downToUp = true
    })

    if (!downToUp) {
      state.starredPages.splice(10, 0, lastItemInStarredLimited)
    }
  },

  TOGGLE_CONTENT_OVERLAY(state, val) { state.bodyOverlay       = val   },
  UPDATE_PRIMARY_COLOR(state, val)   { state.themePrimaryColor = val   },
  UPDATE_THEME(state, val)           { state.theme             = val   },
  UPDATE_WINDOW_WIDTH(state, width)  { state.windowWidth       = width },
  UPDATE_WINDOW_SCROLL_Y(state, val) { state.scrollY           = val   },

  UDPATE_SIDER_STATE_ACTIVE(state, payload){
    if(!payload.active)
      state.window.pop()
    else{
      if(payload.level < state.window.length){
        let dif =  state.window.length - (payload.level)
        for(var i = state.window.length - dif -1; i < state.window.length ; i ++ )
          state.window.pop()
        state.window.push(payload)
      }
      else
        state.window.push(payload)
    }
  }, 
  DELETE_LAST_WINDOW(state){
    if(state.window.length)
      state.window.pop()
  },
  UPDATE_USER_INFO (state, payload) {

    // Get Data localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || state.AppActiveUser

    for (const property of Object.keys(payload)) {

      if (payload[property] !== null) {
        // If some of user property is null - user default property defined in state.AppActiveUser
        state.AppActiveUser[property] = payload[property]

        // Update key in localStorage
        userInfo[property] = payload[property]
      }


    }
    // Store data in localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  },
  AGREGAR_INDEX(state){
    state.indices += 1
  },
  QUITAR_INDEX (state) {
    state.indices -= 1
  },
  AGREGAR_ENCUESTA (state, payload) {
    state.encuestaJson = payload
  }
}

export default mutations

