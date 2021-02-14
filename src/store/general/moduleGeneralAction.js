import query from "../../Querys/General.js"
import axios from "../../http/axios/index.js"


export default {
    getListaOportunidades({commit} , payload){
        return new Promise((resolve, reject)=>{
            axios.post('/graphql', {'query': query.QueryGetAvisosLaborales.format(payload.start || 0 , payload.limit || 25 )})
            .then((res)=>{
                let respuesta = res.data.data.avisoLaborals
                commit('UPDATE_LISTA_OPORTUNIDADES', respuesta)
                resolve(respuesta)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    },
    getAvisoLaboral({commit} , payload){
        return new Promise((resolve, reject)=>{
            axios.post('/graphql', {'query': query.QueryGetAvisoLaboral.format(payload)})
            .then((res)=>{
                let respuesta = res.data.data.avisoLaboral
                commit('SET_OPORTUNIDAD_LABORAL', respuesta)
                resolve(respuesta)
            })
            .catch((err)=>{
                commit('CLEAR_OPORTUNIDAD_LABORAL')
                reject(err)
            })
        })
    }
}