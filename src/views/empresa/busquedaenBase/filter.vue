<template>
    <div class="w-full mt-6">   
        <form-gen :model="model" :schema="esquema" :options="options"> </form-gen>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model :{
                PalabraClave : "",
                ConocimientosYHabilidades: "",
                Lugarderesidencia: "",
                Gradodeestudios: "",
                EdadMinima : "",
                EdadMaxima : "",
                Centrodeestudios: "",
                Area : "",
                Idiomas : "",  
                Genero:""
            },
            esquema : {
                fields :[
                    {
                        style: 'w-full',
                        name: "Estado",
                        type: 'radios',
                        label: 'Estado',
                        model: 'estado',
                        values : function (){
                            return [
                                { value : "Pulicado" , name :"Publicado"},
                                { value : "Revision" , name :"Revision"},
                                { value : "Culiminado" ,name:"Culiminado"},
                                { value : "Todos" , name :"Todos"}        
                            ]
                        },
                        settings: {
                            style: "w-full my-1"
                        }
                    },
                    {
                        style: 'w-full',
                        name: "Usuario",
                        type: 'select',
                        label: 'Usuario quien publico',
                        model: 'usuario',
                        values: function (){
                            return [
                                { name :  "Wilder Gutierrez", value : "Wilder Gutierrez"},
                                { name :  "Anderson Julian", value : "Anderson Julian"},
                                { name :  "Jose Vega", value : "Jose Vega"}
                            ]
                        },
                        settings : {
                            autocomplete : true
                        }
                    },
                    {
                        style: 'w-full',
                        name: "Usuario",
                        type: 'date',
                        label: 'Fecha de Inicio',
                        model: 'fechain',
                    },
                    {
                        style: 'w-full',
                        name: "Usuario",
                        type: 'date',
                        label: 'Fecha de Finalizacion',
                        model: 'fechafin',
                    }
                ]
            }
        }
    }
}
</script>