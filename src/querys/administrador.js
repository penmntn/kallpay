export default {
    queryEncuestas: `query {
        encuestas {
            id,
            encuestaSurvey
        }
    }`,
    queryEstudiantes:`query {
        estudiantes{
            CodigoEstudiante,
            persona {
                Nombres,
                Apellidos,
                Genero
            }
        }
    }`,
    queryEmpresas: `query {
        empresas {
            NombreEmpresa,
              IndustriaEmpresa,
            Ruc,
            aviso_laborals{
              Titulo
            }
        }
    }`,
    administradores:`query {
        administradorEscuelas{
          id
          Rol_Carrera
          persona{
            Nombres,
            Apellidos
          }
        }
      }`

}