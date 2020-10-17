<template>
    <div class="md:w-1/2 sm:w-full">
        <formulario :titulo="form.titulo" :icono="form.icono" :grid="form.grid" >
            <template slot="2-0">
                <div>
                    <label for="fecha"> 
                        <font-awesome-icon :icon="['fa', icono ]" sping /> {{label}}
                    </label>
                    <flat-pickr id="fecha" class="w-full"  v-model="fromDate" placeholder="Fecha inicio" @on-change="onFromChange" />
                </div>
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
                        icono: "user-edit",
                        label:"prueba 1",
                        name:"test1",
                        placeholder:"ingresa texto",
                        valor: 'hola mundo',
                        estilo:'w-1/2',
                        type: 'input',
                     },
                     {
                        icono: "user-edit",
                        label:"prueba 1",
                        name:"test1",
                        placeholder:"ingresa texto",
                        valor: 'hola mundo',
                        estilo:'w-1/2',
                        type: 'desplegable',
                        data : [
                            { value : 1 , test1: "opcion 1"},
                            { value : 2 , test1: "opcion 2"},
                            { value : 3 , test1: "opcion 3"}
                        ]
                     }
                    ],
                    [
                    {
                        icono: "user-edit",
                        label:"prueba 1",
                        name:"test1",
                        placeholder:"ingresa texto",
                        valor: 'hola mundo',
                        estilo:'w-1/2',
                        type: 'fecha',
                     }
                    ], 
                    [
                        {
                        estilo : "w-1/2"
                        },
                        {
                        estilo : "w-1/2"
                        }
                    ]
                ]
            }
        }
    }
}
</script>