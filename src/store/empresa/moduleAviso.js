
import state from './moduleAvisoState'
import mutations from './moduleAvisoMutation'
import actions from './moduleAvisoAction'
import getters from './moduleAvisoGetters'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
