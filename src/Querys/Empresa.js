export default {
    
    QueryContactoEmpresa : `query{
        contactoEmpresas(limit : 1 , where: { persona : { id :  "{0}" } } ) {
          id,
          empresa{
          NombreEmpresa,
          RazonSocial,
          id,
          aviso_laborals {
            id
            Titulo,
            Descripcion,
            FechaFin,
            FechaInicio
            Area,
            salario,
            FechaPublicacion,
            TipoEmpleo,
            Direccion{
              Provincia
            },
            Estado,
            contacto_empresa {
              persona{
                Nombres
              }
            }
          }
        },
          persona{
          Nombres
        }
      }
    }
    `

  
}