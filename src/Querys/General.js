export default{
    QueryGetAvisosLaborales : `
        query{
        avisoLaborals( start : {0},  limit: {1} ){
        id,
        Titulo,
        Area,
        salario,
        TipoEmpleo,
        FechaPublicacion
        Direccion{
            Provincia,
            Pais
        },
        empresa{
            NombreEmpresa,
            logo{
            url
            }
        }
        }
    }
   `,
   QueryGetAvisoLaboral : `query{
   avisoLaboral( id:"{0}"){
   id,
   Titulo,
   Descripcion,
   Area,
   Jerarquia,
   TipoEmpleo,
   NumeroVacantes,
   RequisitosTrabajo{
       LugardeResidencia,
     ExperienciaMinima,
     edadMinima,
     EdadMaxima,
     Genero,
     Idiomas{
       Idioma,
       Hablado,
     },
     Habilidades{
       Habilidad,
       Nivel
     },
   },
   FechaPublicacion,
   FechaInicio,
   FechaFin,
   Estado,
   empresa{
    id,
    NombreEmpresa,
     RazonSocial,
     Ruc,
     DescripcionDeLaEmpresa,
     logo{
       url
     },
     CantidaddeEmpleados,
     Direccion{
       Pais,
       Provincia,
       Distrito,
       Direccion,
       CodigoPostal
     }
   },
   Direccion {
     Pais,
     Direccion,
     Provincia,
     Distrito,
     CodigoPostal
   },
   salario
 }
}`,

  masPublicacionesEmpresa: `query($id : ID!, $estado : String , $idn : ID! ){
    avisoLaborals(where:{
      empresa: {
        id : $id
      },
      Estado : $estado,
      id_ne: $idn 
    }){
      id,
      Titulo,
      Area,
      salario,
      TipoEmpleo,
      FechaPublicacion
      Direccion{
          Provincia,
          Pais
      },
      empresa{
          NombreEmpresa,
          logo{
          url
          }
      }
    }
  }`
}