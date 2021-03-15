export default {
    SET_ENCUESTA_SEL(state, payload) {
        state.encuestaSel = payload
    },
    SET_RESPUESTAS_SEL(state, payload){
        state.respuestasSel = payload
    },
    SET_DATOS_ENCUESTA(state, payload) {
        state.datosEncuesta = payload
    }
}