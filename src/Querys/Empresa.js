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
    `,
    QueryListaPostulatesAvisoLaboral : `query {
      aplicacions(where :{ aviso_laboral : { id : "{0}"}})
      {
        Estado
        aviso_laboral{
          Titulo
        },
        estudiante{
          id
          CodigoEstudiante,
          GradoAcademico{
            NivelDeEstudios
            Estado,
            AreaStudio,
            CentroEstudios,
            NivelDeEstudios
          },
          hbailidades {
            Habilidad,
            Nivel
          },
          RedesSociales {
            Nombre
          },
          ExperienciaLaboral{
            empresa_donde_laboro,
            FechaInicio,
            FechaFin,
            PuestoCargo,
            Area,
            SubArea,
            DescripcionResponsabilidades,
            Sueldo
          },
          persona{
            Nombres,
            Apellidos,
            perfil{
              previewUrl,
              url
            },
            Direccion{
              Pais
              Provincia
            }
          }
        }
      }
    }`,
    QueryObtenerCvCompletoEstudiante : `query {
      estudiante(id: "{0}"){
        updatedAt,
        GradoAcademico{
          NivelDeEstudios,
          Estado,
          TituloCarrera,	
          AreaStudio,	
          FechaInicio,	
          FechaFin,	
          CentroEstudios,	
          Pais
        },
        persona{
          Nombres,
          Apellidos,
          perfil{
            url
          },
          Direccion{
            Pais,
            Provincia,
            Distrito
          },
          Numero_Telefono,
          Numero_Celular,
          Genero,
          Nacionalidad,
          createdAt,
          fecha_nac,
          user{
            email
          }
        },
        Idioma{
          Hablado,
          Idioma
        },
        RedesSociales {
          facebook
          twitter,
          linkedin,
          pilar,
          twicth,
          instagram,
          webpersonal
        },
        Referencias{
          Nombres,
          Correo,
          Numero,
          Relacion
        },
        ExperienciaLaboral{
          FechaInicio,
          FechaFin,
          PuestoCargo,
          Area,
          SubArea,
          ActividadEmpresa,
          Sueldo,
          DescripcionResponsabilidades,
          empresa_donde_laboro
        },
        hbailidades {
          Habilidad,
          Nivel
        }
      }
    }
    `
}