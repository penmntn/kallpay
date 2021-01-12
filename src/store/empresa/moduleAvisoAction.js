// eslint-disable-next-line no-unused-vars
import axios from "../../http/axios/index.js"
import query from "../../Querys/Empresa.js"

export default {
    getContactoEmpresa({  commit , state}){
        return new Promise((resolve, reject ) => {
            console.log(query.QueryContactoEmpresa.format(state.personaID))
            axios.post('/graphql', {'query': query.QueryContactoEmpresa.format(state.personaID) } )
            .then((res)=>{
                let respuesta = res.data.data.contactoEmpresas[0]
                console.log(respuesta)
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
    }
}