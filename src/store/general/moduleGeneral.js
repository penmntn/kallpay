
import state from './moduleGeneralState'
import mutations from './moduleGeneralMutation'
import actions from './moduleGeneralAction'
import getters from './moduleGeneralGetter'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
