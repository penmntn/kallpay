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
    updateEncuesta: function () {
        return `
            mutation UpdateEncuesta ($input: updateEncuestaInput){
                updateEncuesta( input: $input ){
                    encuesta{
                        id,
                        encuestaJson
                    }
                }
            }
        `
    }
}