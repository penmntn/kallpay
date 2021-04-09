export default {
    queryBusquedatitulo: `
        query BusquedaPorTitulo($titulo: String!){
          encuestas(where: {Titulo_contains: $titulo} ){
              id,
              Titulo,
              FechaFin,
              FechaInicio
          }
        }
        `,
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
            createdAt,
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
            id
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
      }`,
    filtroEnc:
    `query FiltroBuesquedas($admin: String,$fechaI: String, $fechaF: String,$titulo: String){
      encuestas(where:{
        createdAt_gt: $fechaI,
        createdAt_lt: $fechaF, 
        administrador_escuela: $admin,
        Titulo_contains:$titulo
      }){
        id
        Titulo
        FechaInicio
        FechaFin
        createdAt
      }
    }`,
    rptaEst:
    `query FiltroBuesquedas($enc: ID!,$es: ID!){
      encuesta(id: $enc){
        EncuestaJson
        respuestas_encuestas(where:{id: $es}){
          Respuesta
        }
      }
    }`,
    // estudiante buscado por codigo
    estpCodigo:
    `query BuesquedaEstEResp($enc: ID!,$es: ID!){
      encuesta(id: $enc){
        respuestas_encuestas(where:{
          estudiante:{CodigoEstudiante: $es}
        }){
          id
          Completado
          estudiante{
          CodigoEstudiante
            persona{
              Nombres
              Apellidos
            }
          }
        }
      }
    }`,
    // filtro de lista de estudiantes
    filtroEstL:
    `query BuesquedaEstEResp($enc: ID!,$apellidos: String, $nombres: String){
      encuesta(id: $enc){
        respuestas_encuestas(where:{
          estudiante:{
            
            persona: {
              Apellidos_contains: $apellidos
              Nombres_contains: $nombres
            }
          }
        }){
          id
          Completado
          estudiante{
            
          CodigoEstudiante
            persona{
              Nombres
              Apellidos
            }
          }
        }
      }
    }`

}