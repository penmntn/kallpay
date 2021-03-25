<template>
    <div class="w-full mt-6">   
        <form-gen :model="model" :schema="esquema" :options="options" @model-updated="updated"> </form-gen>
    </div>
</template>

<script>


export default {
    data() {
        return {
            model :{
                
                lugarResidencia: "",
                GradoEstudios: "",
                Area : "",
                idiomas : "",
                rangoSueldoMin: "",
                RangoSueldoMax: "",
                empresa: "",
            },
            esquema : {
                fields :[
                    {
                        style: 'w-full',
                        name: "lugarRisidencia",
                        type: 'select',
                        label: 'Lugar de Residencia',
                        model: 'lugarResidencia',
                        values : [
                            { value : "sin datos",  name:"sin datos"}
                        ]
                    },
                    {
                        style: 'w-full',
                        name: "lugarRisidencia",
                        type: 'select',
                        label: 'Grado de Estudios',
                        model: 'GradoEstudios',
                        values : [
                            {value :  "Secundario", name:"Secundario"},
                            {value :  "Técnico", name:"Técnico"},
                            {value :  "Universitario", name:"Universitario"},
                            {value :  "Posgrado", name:"Posgrado"},
                            {value :  "Master", name:"Master"},
                            {value :  "Doctorado", name:"Doctorado"},
                            {value :  "Phd", name:"Phd"},
                        ]
                    },
                    {
                        style: 'w-full',
                        name: "areaEspecialidad",
                        type: 'select',
                        label: 'Area de especializacion',
                        model: 'Area',
                        values : [
                            { value : "sin datos",  name:"sin datos"}
                        ]
                    },
                    {
                        style: 'w-full',
                        name: "idiomas",
                        type: 'select',
                        label: 'Idioma Requerido',
                        model: 'idiomas',
                        values : [
                            { value : "Ingles",  name:"Ingles"},
                            { value : "Quechua",  name:"Quechua"},
                            { value : "Aymara",  name:"Aymara"},
                            { value : "Frances",  name:"Frances"},
                            { value : "Chino Mandarin",  name:"Chino Mandarin"},
                            { value : "Japones",  name:"Japones"},
                            { value : "Italiano",  name:"Italiano"},
                        ]
                    },
                    {
                        style: 'w-full',
                        name: "idiomas",
                        type: 'input',
                        label: 'Sueldo Minimo',
                        model: 'rangoSueldoMin',
                    },
                    {
                        style: 'w-full',
                        name: "idiomas",
                        type: 'input',
                        label: 'Sueldo Maximo',
                        model: 'RangoSueldoMax',
                    },
                    {
                        style: 'w-full',
                        name: "idiomas",
                        type: 'select',
                        label: 'Institucion o Empresa',
                        model: 'empresa',
                        values : [
                            { value : "sin datos",  name:"sin datos"}
                        ]
                    },
                ]
            }
        }
    },
    methods : {
        getLugarResidencia(){
            this.$http.post('/graphql', { query : `query { geoPerusConnection { groupBy {  departamento{  key } } } }`})
            .then((data) => {
                        let resulta = []
                        data.data.data.geoPerusConnection.groupBy.departamento.map((value) => {
                        resulta.push({value: value.key, name : value.key  })
                    })
                    this.esquema.fields[0].values = resulta
            })
            .catch((err)=> {
                    console.error(err)
            })
        },
        getEmpresas(){
            this.$http.post('/graphql', { query : `query{   empresas{  id NombreEmpresa  } }`})
            .then((data) => {
                        let resulta = []
                        data.data.data.empresas.map((value) => {
                        resulta.push({value: value.id , name : value.NombreEmpresa  })
                    })
                    this.esquema.fields[7].values = resulta
            })
            .catch((err)=> {
                    console.error(err)
            })
        },
        updated(){
            this.$emit("filter-actua", this.model) 
        }
    },
    created(){
        this.getEmpresas()
        this.getLugarResidencia()
    }
}
</script>