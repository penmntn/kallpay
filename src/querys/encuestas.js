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
    updateEncuesta: function ( id, json ) {
        return `
            mutation{
                updateEncuesta(
                    input:{
                        where: {id : "`+ id +`"}
                        data: {encuestaJson: "` + JSON.stringify(json) + `"}
                    }
                ){
                    encuesta{
                        id
                    }
                }
            }
        `
    }
}