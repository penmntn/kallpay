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
    },
    watch:{
        Provincia(){ this.Distrito ="" ; this.getDistrito() },
        Pais(){ this.Provincia="" ; this.getProvincia()  }
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
        return {
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
                        values : [],
                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "Subearea",
                        type: 'select',
                        label: 'Subearea',
                        model: 'Subarea',
                        required:true,
                        values : [],
                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "Jearquia",
                        type: 'select',
                        label: 'Jearquia',
                        model: 'Jearquia',
                        required:true,
                        values : [],
                    },
                    {
                        style:'w-full md:w-1/2',
                        name: "TipoEmpleo",
                        type: 'select',
                        label: 'TipoEmpleo',
                        model: 'TipoEmpleo',
                        required:true,
                        values : [],
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
                        type: 'select',
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
            }
        }
    }
}
</script>