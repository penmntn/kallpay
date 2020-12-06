<template>
    <div class="md:w-full sm:w-full">
        <formulario :titulo="form.titulo" :icono="form.icono" :grid.sync="form.grid" >
        </formulario>
         <vs-icon icon="fa fa-star" icon-pack="ex. FA4" > </vs-icon>
         <vs-button icon="fa-times-circle" icon-pack="fa4" > hola mudno</vs-button>
        <div v-for="(item, key) in dbs" :key="key">
            <h1>{{item.perfil}}</h1>
        </div>
    </div>

</template>

<script>
import formulario from '../components/forms/formulario'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import entrada from '../components/forms/input'

import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export default {
    components:{
        formulario,
        flatPickr,
        entrada
    },
    data(){
        return {
            data : [
                            { value : 1 , label: "opcion 1"},
                            { value : 2 , label: "opcion 2"},
                            { value : 3 , label: "opcion 3"},
                            { value : 7 , label: "opcion 4"},
                            { value : 9, label: "opcion 4"},
                            { value : 10 , label: "opcion 4"},
                            { value : 15 , label: "opcion 4"},
                            { value : 16 , label: "opcion 4"},
                        ],
            form: {
                titulo : "Publicar Anuncio",
                icono : "user-edit",
                grid: [
                    [{
                        icono: {pack : 'fab' , icon : 'facebook'},
                        label:"prueba 1",
                        name:"test1",
                        placeholder:"ingresa texto",
                        valor: '',
                        estilo:'sm:w-full md:w-1/2',
                        type: 'input',
                        validate: 'email',
                        settings:{
                            success: true,
                            icon:'search',
                            color:'warning'
                        }
                     },
                     {
                        icono: {pack : 'fa' , icon : 'user-edit'},
                        label:"prueba 2",
                        name:"test1",
                        placeholder:"ingresa texto",
                        valor: [1,3,7],
                        estilo:'sm:w-full md:w-1/2',
                        type: 'select',
                        settings: {
                            multiple: true
                        },
                        data : [
                            { value : 1 , label: "opcion 1"},
                            { value : 2 , label: "opcion 2"},
                            { value : 3 , label: "opcion 3"},
                            { value : 7 , label: "opcion 4"},
                            { value : 9, label: "opcion 4"},
                            { value : 10 , label: "opcion 4"},
                            { value : 15 , label: "opcion 4"},
                            { value : 16 , label: "opcion 4"},
                        ],
                     }],
                    [{
                        icono: {pack : 'fa' , icon : 'user-edit'},
                        label:"prueba 1",
                        name:"test1",
                        placeholder:"ingresa texto",
                        valor: 'hola mundo',
                        estilo:'w-full',
                        type: 'textarea',
                     }
                    ],
                    [{
                        icono: {pack : 'fa' , icon : 'user-edit'},
                        label:"prueba 1",
                        name:"test2",
                        placeholder:"ingresa texto",
                        valor: 'hola mundo',
                         estilo:'sm:w-full md:w-full',
                        type: 'date',
                        settings:{
                            enableTime: true,
                            dateFormat: 'd-m-Y H:i'
                            },
                    }],
                    [{
                        icono: {pack : 'fa' , icon : 'user-edit'},
                        label:"prueba 1",
                        name:"test2",
                        placeholder:"ingresa texto",
                        valor: [],
                        estilo:'w-full',
                        type: 'checkbox',
                        settings: {cols : 'md:w-1/6 w-1/3' },
                        data:[
                            {icon : 'sms ' , value:'papel' , name:'papel'},
                            {icon: 'user-edit', value: '1' , name : 'Wilder Anderson ' },
                            {icon: 'user-edit', value: '2' , name : 'montes haiucarya' },
                            {icon: 'user-edit', value: '3' , name : 'pasa' },
                            {icon: 'user-edit', value: '5' , name : 'pasa' },
                            {icon: 'user-edit', value: '6' , name : 'pasa' }
                            ]
                    }],
                    [{
                        icono: {pack : 'fa' , icon : 'user-edit'},
                        label:"prueba 1",
                        name:"test2",
                        placeholder:"ingresa texto",
                        valor: '',
                        estilo:'w-full',
                        type: 'radio',
                        settings: {cols : 'md:w-1/6 w-1/3' },
                        data:[
                            {value:'papel' , name:'papel' , settings : { color: 'warning' , disabled : true}},
                            {value: 'usersa' , name : 'Wilder Anderson ' },
                            {value: 'ds' , name : 'montes haiucarya' },
                            {value: 'user' , name : 'cabron' },
                            {value: 'sa' , name : 'red' },
                            {value: 'sadsdk' , name : 'malo' }
                            ]
                    }],
                    [{
                        icono: {pack : 'fa' , icon : 'user-edit'},
                        label:"prueba 1",
                        name:"test2",
                        type:"file",
                        estilo : 'w-full',
                        data: {
                            name:"hola mundo",
                        },
                        settings: {
                            multiple: true,
                            showUploadButton:true,
                            headers : {
                           'Origin': 'http://localhost:8080',
                            'Referer': 'http://localhost:1337/admin/plugins/upload'
                        }},
                        multiple: true
                    }]

                ]
            }
            ,
            dbs:Array
        }
    },
    async created(){

        // eslint-disable-next-line no-undef
        let aux = _.keys({key :{ hola : "hola", kola : "sa"}})
        console.log(aux)

        const auth = firebase.auth()
        console.log(auth.currentUser)
        const db = firebase.firestore()
        const ref = db.collection('USUARIOS');
        await ref.onSnapshot(data =>{
            let result = []
            data.forEach(doc => {
                result.push({
                    value: doc.data().perfil,
                    label: doc.data().perfil
                })
            })
            this.dbs=result;
        });
    }
}
</script>