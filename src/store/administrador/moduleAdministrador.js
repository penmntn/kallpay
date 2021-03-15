import state from './moduleAdministradorState'
import mutations from './moduleAdministradorMutations'
import actions from './moduleAdministradorAction'
import getters from './moduleAdministradorGetteers'

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}