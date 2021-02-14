export default {
    UPDATE_LISTA_OPORTUNIDADES(state, payload){
        state.BolsaTrabajo.splice(0) 
        for (let item =0 ; item <  payload.length ; item++ ){
            state.BolsaTrabajo.push(payload[item])
        }
    },
    SET_ID_LABORAL(state, payload){
        state.id_oportunidad = payload
    },
    SET_OPORTUNIDAD_LABORAL(state, payload){
        state.oportunidadLaboral = payload
    },
    CLEAR_OPORTUNIDAD_LABORAL(state){
        state.oportunidadLaboral = {}
    }
}