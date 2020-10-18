<template>
    <div class="md:w-1/2 sm:w-full">
        <formulario :titulo="form.titulo" :icono="form.icono" :grid="form.grid" >
            <template slot="2-0">
                HOLA MUDNO
            </template>
        </formulario>
    </div>
</template>

<script>
import formulario from '../components/forms/formulario'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
    components:{
        formulario,
        flatPickr
    },
    data(){
        return {
            form: {
                titulo : "Publicar Anuncio", 
                icono : "user-edit",
                grid: [
                     [{
                        icono: {pack : 'fab' , icon : 'facebook'},
                        label:"prueba 1",
                        name:"test1",
                        placeholder:"ingresa texto",
                        valor: 'hds',
                        estilo:'w-1/3',
                        type: 'input',
                        validate: 'email',
                     },
                     {
                        icono: {pack : 'fab' , icon : 'facebook'},
                        label:"prueba 1",
                        name:"test1",
                        placeholder:"ingresa texto",
                        valor: 'hds',
                        estilo:'w-1/3',
                        type: 'boleano',
                        validate: 'email',
                     },
                     {
                        icono: {pack : 'fa' , icon : 'user-edit'},
                        label:"prueba 1",
                        name:"test1",
                        placeholder:"ingresa texto",
                        valor: 'hola mundo',
                        estilo:'w-1/3',
                        type: 'boleano',
                        data : [
                            { value : 1 , test1: "opcion 1"},
                            { value : 2 , test1: "opcion 2"},
                            { value : 3 , test1: "opcion 3"},
                            { value : -1 , test1: "opcion 4"}
                        ]
                     }
                    ],
                    [
                    {
                        icono: {pack : 'fa' , icon : 'user-edit'},
                        label:"prueba 1",
                        name:"test1",
                        placeholder:"ingresa texto",
                        valor: 'hola mundo',
                        estilo:'w-full',
                        type: 'textarea',
                     }
                    ], 
                    [
                    {
                        icono: {pack : 'fa' , icon : 'user-edit'},
                        label:"prueba 1",
                        name:"test2",
                        placeholder:"ingresa texto",
                        valor: 'hola mundo',
                        estilo:'w-1/2',
                        type: 'textarea',
                     },
                        {
                        icono: {pack : 'fa' , icon : 'user-edit'},
                        label:"prueba 1",
                        name:"test2",
                        placeholder:"ingresa texto",
                        valor: 'hola mundo',
                        estilo:'w-1/2',
                        type: 'textarea',
                        }
                    ]
                ]
            }
        }
    }
}
</script>