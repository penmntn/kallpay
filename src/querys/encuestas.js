export default {
    queryBusquedatitulo: function (titulo) {
        return `
            query {
                encuestas(where: {Titulo_contains: "`+ titulo + `"} ){
                    id,
                    Titulo,
                    encuestaJson
                }
            }
        `
    },
    updateEncuesta:
        `mutation UpdateEncuesta ($input: updateEncuestaInput){
                updateEncuesta( input: $input ){
                    encuesta{
                        id,
                        EncuestaJson
                    }
                }
            }`,
    //datos generales de encuesta
    datgenEncuestas: 
        `query {
            encuestas{
            id,
            Titulo,
            FechaFin,
            FechaInicio
          }
        }`,
    encuestaJson:
    `query BusquedaEncuesta($id: ID!){
        encuesta(id: $id){
        EncuestaJson
      }
    }`,
    // respuestas de la encuesta
    rptsEnc:
    `query BusquedaEncuestayRespuesta($id: ID!){
        encuesta(id: $id){
        EncuestaJson,
          respuestas_encuestas{
						Respuesta
          }
      }
    }`,
    //participantes de una encuesta dada
    partioEnc:
    `query Participantes($id: ID!){
        encuesta(id: $id){
          Titulo
          respuestas_encuestas{
            Completado
            estudiante{
              CodigoEstudiante
              persona{
                Nombres,
                Apellidos
              }
            }
          }
        }
      }`

}