<template>
    <div class="w-full h-screen">
        <form-gen :schema="schema" :model="model" :options="formOptions" :typeGroup="'vacio'" @validated="validacion">
        </form-gen>
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
    methods :{
        async enviardatos(){
            await this.$http.post('http://localhost:1337/personas', this.model)
            .then(response =>{
                console.log(response)
            })
            .catch(err => [
                console.log(err)
            ])
        },
        validacion(isValid, errors){
            console.log(isValid)
            console.log(errors)
        },
        async customAsyncValidator(value){
            let estado = await this.$http.get("/personas", value)
                .then(response => {
                    if (response)
                    return true
                })
                .catch(err => {
                    if(err)
                    return "no existen registros"
                })
            return estado
        }
    },
    data(){
        return{
            model: {
                Tipo_doc:[],
                num_doc:"",
                Nombres:"",
                Apellidos:"",
                perfil:[],
                test : ""
            },
            schema: {
                groups :[
                {
                    legend : {
                        label: "Hola mundo",
                        icon:'icon-search'
                    },
                    fields:[
                    {
                        style: 'sm:w-1/3',
                        type: 'select',
                        label: 'Tipo Documento',
                        name: "ds",
                        model: 'Tipo_doc',
                        validator:component.validators.string,
                        required : true,
                        values: function(){
                            return [
                                { value: "DNI", name: "DNI" },
                                { value: "CE ", name: "CE" },
                                { value: "PASAPORTE", name: "PASAPORTE" }
                            ]
                        },
                    },
                    {
                        style: 'sm:w-1/3',
                        name: "ddsadalsdls",
                        type: 'input',
                        label: 'Numero de Documento',
                        model: 'num_doc',
                        help : "ingresa tu numero de documento",
                        validator : this.customAsyncValidator,
                        required:true
                    },
                    {
                        style: 'sm:w-1/3',
                        name: "dsakdmksamdksamk",
                        type: 'input',
                        label: 'Nombres',
                        model: 'Nombres',
                        help: "ingresa un correo del trabajo que termina en @gmail.com",
                        validator: [component.validators.email,
                                    component.validators.required],
                        required : true,
                    },
                    {
                        style: 'w-full',
                        name: "dsapdpsadlpsald",
                        type: 'input',
                        label: 'Apellidos',
                        model: 'Apellidos',
                        required: true,
                        disabled: true,
                        validator: component.validators.required,
                        autocomplete: true
                    },
                    {
                        style: 'w-full',
                        name: "ddsadalsdldsdkskms",
                        type: 'file',
                        label: 'Foto de PERFIL ',
                        model: 'perfil',
                        disabled: true
                    }
                    ]
                }
                ]
            },
            formOptions: {
                validateAfterLoad: true,
                validateAfterChanged: true,
                validateAsync: true,
                validateDebounceTime: 1000
            }
        }
    }
}
</script>