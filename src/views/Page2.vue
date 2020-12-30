<template>
    <div>
        <div class="mb-10">
            <vs-card>
                <div slot="header">
                    <div class="text-center">
                        <span class="text-2xl text-primary font-semibold " > CUÉNTANOS QUE PERFIL ESTÁS BUSCANDO</span>
                    </div>
                </div>
                <div class="w-full">
                    <div>
                        <form-gen :model="ModelPublicarAnuncio" :schema="EsquemaPublicarAnuncio" :options="formOptionsPublicarAnuncio">
                        </form-gen>
                    </div>
                </div>
                <div>
                    <div class="w-full mb-3 mx-3">
                            <div class="flex justify-end mx-6">
                                <div class="mx-2">
                                    <vs-button :color="'#807e7a'" type="flat" > Publicar Anuncio</vs-button>
                                </div>
                                <div class="mx-2">
                                    <vs-button color="primary" type="flat"> Agregar Requisitos</vs-button>
                                </div>
                            </div>
                    </div>
                </div>
            </vs-card>
        </div>
        <div>
            <vs-card>
                <div slot="header">
                    <div class="text-center">
                        <span class="text-2xl text-primary font-semibold " > CUÉNTANOS MAS DE LOS REQUISITOS </span>
                    </div>
                </div>
                <div class="w-full">
                    <div>
                        <form-gen :model="ModelRequistosAdicionales" :schema="EsquemaRequisitosAdicionales" :options="formOptionsPublicarAnuncio">
                        </form-gen>
                        <form-gen :model="Modelidioma" :schema="EsquemaIdioma" :options="formOptionsPublicarAnuncio">
                        </form-gen>
                        <form-gen :model="ModelHabilidades" :schema="EsquemaHabilidades" :options="formOptionsPublicarAnuncio">
                        </form-gen>
                    </div>
                </div>
                <div>
                    <div class="w-full mb-3 mx-3">
                            <div class="flex justify-end mx-6">
                                <div class="mx-2">
                                    <vs-button :color="'primary'" type="flat" > Publicar Anuncio</vs-button>
                                </div>
                            </div>
                    </div>
                </div>
            </vs-card>
            {{ModelPublicarAnuncio}}
        </div>
    </div>
</template>

<script>

import {validators} from '../../src/components/FormGenerator/index'
import { uniqBy , compact } from 'lodash'

export default {
    created(){
        this.getPais()
    },
    computed:{
        Pais: {
            get() {  return this.ModelPublicarAnuncio.Direccion.Pais },
            set(val) { this.ModelPublicarAnuncio.Direccion.Pais =  val}
        },
        Provincia:{
            get() {  return this.ModelPublicarAnuncio.Direccion.Provincia },
            set(val) { this.ModelPublicarAnuncio.Direccion.Provincia =  val}
        },
        Distrito:{
            get() {  return this.ModelPublicarAnuncio.Direccion.Distrito },
            set(val) { this.ModelPublicarAnuncio.Direccion.Distrito =  val}
        },
        idioma : {
            get(){ return this.Modelidioma}
        },
        Habilidades: {
            get() { return this.ModelHabilidades}
        },
        requisitosad:{
            get() {return this.ModelRequistosAdicionales}
        }

    },
    watch:{
        Provincia(){ this.Distrito ="" ; this.getDistrito() },
        Pais(){ this.Provincia="" ; this.getProvincia()  },
        idioma(){ this.ModelRequistosAdicionales.Idiomas[0] = this.Modelidioma },
        Habilidades(){ this.ModelRequistosAdicionales.Habilidades[0] = this.ModelHabilidades }, 
        requisitosad(){this.ModelPublicarAnuncio.requisitos = this.ModelRequistosAdicionales}
    },
    methods:{
        getPais: function(){
            this.$http.post('/graphql', { query : `query { geoPerusConnection { groupBy {  departamento{  key } } } }`})
            .then((data) => {
                        let resulta = []
                        data.data.data.geoPerusConnection.groupBy.departamento.map((value) => {
                        resulta.push({value: value.key, name : value.key  })
                    })
                    this.EsquemaPublicarAnuncio.fields[2].values = resulta
                    this.EsquemaRequisitosAdicionales.fields[3].values = resulta
            })
            .catch((err)=> {
                    console.error(err)
            })
        },
        getProvincia: function(){
            this.$http.post('/graphql', { query : `query { geoPerus( where : { departamento : "${this.Pais}" } , ) { provincia } }` })
            .then((data) => {
                    let resulta = uniqBy(data.data.data.geoPerus , 'provincia')
                    resulta = compact(resulta)
                    let res = []
                    resulta.map((item)=>{
                        if(item.provincia != "") res.push({value: item.provincia, name : item.provincia  })
                    })
                    this.EsquemaPublicarAnuncio.fields[3].values = res
            })
            .catch((err)=> {
                    console.error(err)
            })
        },
        getDistrito:  function(){
            this.$http.post('/graphql', { query : `query { geoPerus( where : { provincia : "${this.Provincia }" } , ) { distrito } }` })
            .then((data) => {
                    let resulta = uniqBy(data.data.data.geoPerus , 'distrito')
                    resulta = compact(resulta)
                    let res = []
                    resulta.map((item)=>{
                        if(item.distrito != "") res.push({value: item.distrito, name : item.distrito  })
                    })
                    console.log(res)
                    this.EsquemaPublicarAnuncio.fields[4].values = res
            })
            .catch((err)=> {
                    console.error(err)
            })
        }
    },
    data(){
        return{
            ModelPublicarAnuncio: {
                Titulo: "",
                Descripcion : "",
                Area : "", ///validar
                Subarea : "", ///validar
                Jerarquia :"",
                TipoEmpleo : "",
                NumeroVacantes:"",
                empresa :"",
                ConocimientosHabilidades: "", ///validar
                requisitos: {},
                Direccion: {
                    Pais: "",
                    Provincia: "",
                    Distrito: "",
                    Direccion: ""
                },
            },
            EsquemaPublicarAnuncio:{
                fields :[
                    {
                        style: 'w-full',
                        name: "Titulo",
                        type: 'input',
                        label: 'Puesto / Título del aviso',
                        model: 'Titulo',
                        help : "ingresa un titulo llamativo corto, que describa el puesto laboral ",
                        validator : validators.string,
                        required:true
                    },
                    {
                        style: 'w-full',
                        name: "Descripcion",
                        type: 'textarea',
                        label: 'Descripcion',
                        model: 'Descripcion',
                        validator : validators.string,
                        required:true,
                        settings: {
                            counter : 700,
                        }
                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "Departamento",
                        type: 'select',
                        label: 'Departamento',
                        model: 'Direccion.Pais',
                        required:true,
                        values : [],

                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "Provincia",
                        type: 'select',
                        label: 'Provincia',
                        model: 'Direccion.Provincia',
                        required:true,
                        values : [],
                        settings :{
                            success : true
                        }
                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "Distrito",
                        type: 'select',
                        label: 'Distrito',
                        model: 'Direccion.Distrito',
                        required:true,
                        values : [],
                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "Direccion",
                        type: 'input',
                        label: 'Dirección(Opcional)',
                        model: 'Direccion.Direccion',
                        values : [],
                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "Area",
                        type: 'select',
                        label: 'Area',
                        model: 'Area',
                        required:true,
                        values : function(){
                            return [
                                {value :"Ingenieria Civil y Contruccion" ,  name:"Ingenieria Civil y Contruccion"},
                                {value :"Comunicación, Relaciones Institucionales y Públicas" ,  name:"Comunicación, Relaciones Institucionales y Públicas"},
                                {value:"Educación, Docencia e Investigación" ,  name:"Educación, Docencia e Investigación"},
                                {value:"Ingenierías" ,  name:"Ingenierías"}
                            ]
                        },
                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "Subearea",
                        type: 'select',
                        label: 'Subearea',
                        model: 'Subarea',
                        required:true,
                        values : function(){
                            return [
                                {value : "Ingeniería  Automotriz" , name :"Ingeniería  Automotriz"}, 
                                {value : "Ingeniería  Eléctrica y Electrónica" , name :"Ingeniería  Eléctrica y Electrónica"}, 
                                {value : "Ingeniería  Textil" , name :"Ingeniería  Textil"}, 
                                {value : "Ingeniería  Mecánica" , name :"Ingeniería  Mecánica"}, 
                                {value : "Ingeniería  Industrial" , name :"Ingeniería  Industrial"}, 
                                {value : "Ingeniería  Metalurgica" , name :"Ingeniería  Metalurgica"}, 
                                {value : "Ingeniería de Producto" , name :"Ingeniería de Producto"}, 
                                {value : "Ingeniería de Ventas" , name :"Ingeniería de Ventas"}, 
                                {value : "Ingeniería Electromecánica" , name :"Ingeniería Electromecánica"}, 
                                {value : "Ingeniería Oficina Técnica / Proyecto" , name :"Ingeniería Oficina Técnica / Proyecto"}, 
                                {value : "Ingeniería Agrónoma" , name :"Ingeniería Agrónoma"}, 
                            ]
                        },
                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "Jearquia",
                        type: 'select',
                        label: 'Jearquia',
                        model: 'Jearquia',
                        required:true,
                        values : function(){
                            return [
                                {value: "Senior / Semi-Senior", name : "Senior / Semi-Senior"},
                                {value: "Junior", name : "Junior"},
                                {value: "Gerencia / Alta Gerencia / Dirección", name : "Gerencia / Alta Gerencia / Dirección"},
                                {value: "Jefe / Supervisor / Responsable", name : "Jefe / Supervisor / Responsable  "},
                                {value: "Otro", name : "Otro"},
                                {value: "Primer Empleo", name : "Primer Empleo"},
                            ]
                        },
                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "TipoEmpleo",
                        type: 'select',
                        label: 'TipoEmpleo',
                        model: 'TipoEmpleo',
                        required:true,
                        values : function(){
                            return [
                                {value: "Full-time", name : "Full-time"},
                                {value: "Part-time", name : "Part-time"},
                                {value: "Temporario", name : "Temporario"},
                                {value: "Pasantia", name : "Pasantia"},
                                {value: "Por Contrato", name : "Por Contrato"},
                                {value: "Voluntario", name : "Voluntario"},
                                {value: "Primer empleo", name : "Primer empleo"},
                                {value: "Por Horas", name : "Por Horas"},
                                {value: "Fines de Semana", name : "Fines de Semana"},
                            ]
                        },
                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "NombreEmpresa",
                        type: 'input',
                        label: 'Nombre de la empresa',
                        model: 'empresa',
                        required:true
                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "NumeroVacantes",
                        type: 'input',
                        label: 'Numero de vacantes',
                        model: 'NumeroVacantes',
                        required:true
                    },
                    {
                        style:'w-full',
                        name: "ConocimientosHabilidades",
                        type: 'input',
                        label: 'Conocimientos y Habilidades',
                        model: 'ConocimientosHabilidades',
                        values: [],
                        required:true
                    },

                ]
            },
            formOptionsPublicarAnuncio: {
                validateAsync: true,
                validateAfterChanged: true,
                validateDebounceTime: 1000
            },
            ModelRequistosAdicionales:{
                Genero : "",
                edadMinima: 18,
                EdadMaxima: 60,
                LugardeResidencia : "", 
                ExperienciaMinima : "",
                Idiomas : [],
                Habilidades : []
            }, 
            EsquemaRequisitosAdicionales:{
                fields : [
                   {
                        style:'w-full md:w-full',
                        name: "Genero",
                        type: 'radios',
                        label: 'Genero',
                        model: 'Genero',
                        required:true,
                        values : function(){
                            return [
                                {value :  "Masculino", name:"Masculino"},
                                {value :  "Femenino", name:"Femenino"},
                                {value :  "Indistinto", name:"Indistinto"},
                                {value :  "Otro", name:"Otro"}
                            ]
                        },
                   },
                   {
                        style:'w-full md:w-1/2',
                        name: "edadMinima",
                        type: 'input',
                        label: 'Edad Minima',
                        model: 'edadMinima',
                        required:true,
                   },
                   {
                        style:'w-full md:w-1/2',
                        name: "EdadMaxima",
                        type: 'input',
                        label: 'Edad Maxima',
                        model: 'EdadMaxima',
                        required:true,
                   },
                   {
                        style:'w-full md:w-full',
                        name: "LugardeResidencia",
                        type: 'select',
                        label: 'Lugar de Residencia',
                        model: 'LugardeResidencia',
                        required:true,
                        values:[]
                   },                  
                ]
            },
            Modelidioma:{
                Idioma : "",
                Hablado: ""
            },
            EsquemaIdioma:{
                fields : [
                   {
                        style:'w-full md:w-1/2',
                        name: "Idioma",
                        type: 'select',
                        label: 'Idioma',
                        model: 'Idioma',
                        required:true,
                        values : function(){
                            return [
                                {value :  "Ingles", name:"Ingles"},
                                {value :  "Portugues", name:"Portugues"},
                                {value :  "Frances", name:"Frances"},
                                {value :  "Quechua", name:"Quechua"},
                                {value :  "Chino Mandarin", name:"Chino Mandarin"},
                            ]
                        },
                   },
                   {
                        style:'w-full md:w-1/2',
                        name: "Hablado",
                        type: 'select',
                        label: 'Nivel',
                        model: 'Hablado',
                        required:true,
                        values : function(){
                            return [
                                {value :  "Avanzado", name:"Avanzado"},
                                {value :  "Intermedio", name:"Intermedio"},
                                {value :  "Basico", name:"Basico"},
                            ]
                        },
                   },
                ]
            },
            ModelHabilidades: {
                Habilidad: "",
                Nivel:""
            },
            EsquemaHabilidades:{
                 fields : [
                   {
                        style:'w-full md:w-1/2',
                        name: "Habilidad",
                        type: 'select',
                        label: 'Habilidad',
                        model: 'Habilidad',
                        required:true,
                        values : function(){
                            return [
                                {value :  "Secundario", name:"vSecundario"},
                                {value :  "Técnico", name:"Técnico"},
                                {value :  "Universitario", name:"Universitario"},
                                {value :  "Posgrado", name:"Posgrado"},
                                {value :  "Master", name:"Master"},
                                {value :  "Doctorado", name:"Doctorado"},
                                {value :  "Phd", name:"Phd"},
                            ]
                        },
                   },
                   {
                        style:'w-full md:w-1/2',
                        name: "Nivel",
                        type: 'select',
                        label: 'Estado',
                        model: 'Nivel',
                        required:true,
                        values : function(){
                            return [
                                {value :  "En Curso", name:"En Curso"},
                                {value :  "Graduado", name:"Graduado"},
                            ]
                        },
                   },
                ]
            }
        }
    }
}
</script>