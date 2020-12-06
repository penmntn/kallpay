<template>
    <div class="w-full h-screen">
        <vue-form :schema="schema" :model="model" :options="formOptions" :typeGroup="'vacio'">
        </vue-form>
        <div>
            {{model}}
        </div>
        <div>
            <vs-button color="warning" @click="enviardatos()">dsk</vs-button>
        </div>
    </div>
</template>

<script>

const component = require('../components/FormGenerator/index.js')


export default {
    components:{
        vueForm: component.component
    }
   ,
    methods :{
        async enviardatos(){
            await this.$http.post('http://localhost:1337/personas', this.model)
            .then(response =>{
                console.log(response)
            })
            .catch(err => [
                console.log(err)
            ])
        }
    },
    data(){
        return{
            model: {
                Tipo_doc :"sasaldsmdk",
                num_doc:"",
                Nombres:"",
                Apellidos:"",
                perfil:[],
            },
            schema: {
            groups: [
            {
                legend : {
                    label : 'INGRESAR NUEVA PERSONA',
                    icon : 'user-edit'
                },
                fields:[
                {
                    type: 'select',
                    label: 'Tipo Documento',
                    name: "ds",
                    model: 'Tipo_doc',
                    requerid : true,
                     values: function(){
                        return [
                            { value: "DNI", name: "DNI" },
                            { value: "CE ", name: "CE" },
                            { value: "PASAPORTE", name: "PASAPORTE" }
                        ]
                    },
                },
                {
                    name: "ddsadalsdls",
                    type: 'input',
                    label: 'Numero de Documento',
                    model: 'num_doc',
                },
                {
                    name: "dsakdmksamdksamk",
                    type: 'input',
                    label: 'Nombres',
                    model: 'Nombres',
                    validator: component.validators.email,
                    requerid : true,
                },
                {
                    name: "dsapdpsadlpsald",
                    type: 'input',
                    label: 'Apellidos',
                    model: 'Apellidos',
                    requerid : true,
                },
                {
                    name: "ddsadalsdldsdkskms",
                    type: 'file',
                    label: 'Foto de PERFIL ',
                    model: 'perfil',
                }
                ]
            },
            ],

        },
            formOptions: {
                validateAfterLoad: true,
                validateAfterChanged: true,
                validateAsync: true
            }
        }
    }
}
</script>