
import {forIn} from 'lodash'

export default {

    ///ADMIN AVISOS LABORALES 
    SET_AVISO_LABORAL_ID(state, payload ){
        state.AvisoLaboralID = payload
    },
    SET_CONTACTO_EMPRESA(state, payload ){
        state.contactoPersonaID = payload
    },

    SET_BUSSINESS_ID(state, payload ){
        state.bussinessID = payload
    },

    SET_BUSSINES_INFO(state, payload){
        state.bussinessINFO = payload
    },

    UDPATE_AVISOS_ADMIN(state, payload){
        state.AvisoLaborales.splice(0) 
        for (let item =0 ; item <  payload.length ; item++ ){
            state.AvisoLaborales.push(payload[item])
        }
    },
    UPDATE_AVISO_LABORAL(state, payload){
        state.AvisoLaboral = payload
    },

    UPDATE_LISTA_POSTULANTES(state, payload){
        state.ListaPostulantes.splice(0) 
        for (let item =0 ; item <  payload.length ; item++ ){
            state.ListaPostulantes.push(payload[item])
        }
    },
    UPDATE_POSTULANTE(state, payload){
        state.Postulante = payload
    },
    CLEAR_POSTULANTE(state){
        state.Postulante ={}
    },
    // BUQUEDA EN BASE
    
    UPDATE_LISTA_ESTUDIANTES(state, payload){
        state.ListaEstudiantes.splice(0) 
        for (let item =0 ; item <  payload.length ; item++ ){
            state.ListaEstudiantes.push(payload[item])
        }
    },
    UDPATE_CHIPS_FILTRO_BUSQUEDA_BASE(state, payload ){
        payload.instancia.$set(state.chip_filter , payload.id , payload.value)
    },
    CLEAR_ALL_CHIPS(state , payload){
        forIn(state.chip_filter , function(value, key) {
            payload.$set(state.chip_filter , key , '')
        })
    },
    DESTROY_ALL_CHIPS(state){
        state.chip_filter={}
    }
}