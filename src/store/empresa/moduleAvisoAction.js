// eslint-disable-next-line no-unused-vars
import axios from "../../http/axios/index.js"
import query from "../../Querys/Empresa.js"

export default {

    getContactoEmpresa({  commit , state}){
        return new Promise((resolve, reject ) => {
            axios.post('/graphql', {'query': query.QueryContactoEmpresa.format(state.personaID)})
            .then((res)=>{
                let respuesta = res.data.data.contactoEmpresas[0]
                commit('SET_CONTACTO_EMPRESA', respuesta.id)
                commit('UDPATE_AVISOS_ADMIN', respuesta.empresa.aviso_laborals)
                commit('SET_BUSSINESS_ID', respuesta.empresa.id)
                commit('SET_BUSSINES_INFO', {
                    "nombre" :   respuesta.empresa.NombreEmpresa,
                    "razonSocial" :  respuesta.empresa.RazonSocial
                })
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },

    getListaPostulantes({commit} , payload){
        return new Promise((resolve, reject)=>{
            axios.post('/graphql', {'query': query.QueryListaPostulatesAvisoLaboral.format(payload)})
            .then((res)=>{
                let respuesta = res.data.data.aplicacions
                commit('UPDATE_LISTA_POSTULANTES', respuesta)
                resolve(respuesta)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    },
    
    getDataPostulante({commit} , payload){
        commit('CLEAR_POSTULANTE')
        return new Promise((resolve, reject)=>{
            axios.post('/graphql', {'query': query.QueryObtenerCvCompletoEstudiante.format(payload)})
            .then((res)=>{
                let respuesta = res.data.data.estudiante
                console.log(respuesta)
                commit('UPDATE_POSTULANTE', respuesta)
                resolve(respuesta)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    },

    ///LISTA DE ESTUDIANTESSSS
    getListaEstudiantes({commit} , payload){
        return new Promise((resolve, reject)=>{
            axios.post('/graphql', {'query': query.QueryListaEstudiantes.format(payload.start || 0 , payload.limit || 25 )})
            .then((res)=>{
                let respuesta = res.data.data.estudiantes
                console.log(respuesta)
                commit('UPDATE_LISTA_ESTUDIANTES', respuesta)
                resolve(respuesta)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
}