import navbarSearchAndPinList from "@/layouts/components/navbar/navbarSearchAndPinList"
import themeConfig from "@/../themeConfig.js"
import colors from "@/../themeConfig.js"

const userDefaults = {
    uid         : 0,          // From Auth
    displayName : 'John Doe', // From Auth
    about       : 'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
    photoURL    : require('@/assets/images/portrait/small/avatar-s-11.jpg'), // From Auth
    status      : 'online',
    userRole    : 'admin'
  }

const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || {}
  
const getUserInfo = () => {
const userInfo = {}

Object.keys(userDefaults).forEach((key) => {
    userInfo[key] = userInfoLocalStorage[key] ?  userInfoLocalStorage[key] : userDefaults[key]
})

Object.keys(userInfoLocalStorage).forEach((key) => {
    if (userInfo[key] === undefined && userInfoLocalStorage[key] !== null) userInfo[key] = userInfoLocalStorage[key]
})

return userInfo
}

const is_touch_device = () => {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
      return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch) {
      return true;
  }

  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

const state = {
    AppActiveUser           : getUserInfo(),
    bodyOverlay             : false,
    isVerticalNavMenuActive : true,
    is_touch_device         : is_touch_device(),
    mainLayoutType          : themeConfig.mainLayoutType || "vertical",
    navbarSearchAndPinList  : navbarSearchAndPinList,
    reduceButton            : themeConfig.sidebarCollapsed,
    verticalNavMenuWidth    : "default",
    verticalNavMenuItemsMin : false,
    scrollY                 : 0,
    starredPages            : navbarSearchAndPinList["pages"].data.filter((page) => page.is_bookmarked),
    theme                   : themeConfig.theme || "light",
    themePrimaryColor       : colors.primary,
    windowWidth             : null,
    window                  : [],
    indices                 : 0,
    encuestaJson            : 0,
    Media_URL_base          : "http://localhost:1337",
}

export default state
