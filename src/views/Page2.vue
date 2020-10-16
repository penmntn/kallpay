<template>
    <div class="md:w-1/2 sm:w-full">
        <formulario :titulo="form.titulo" :icono="form.icono" :grid="form.grid" >
        </formulario>
    </div>
</template>

<script>
import formulario from '../components/forms/formulario'

export default {
    components:{
        formulario
    },
    data(){
        return {
            form: {
                titulo : "Publicar Anuncio", 
                icono : "user-edit",
                grid: [
                    { 
                        icono: "user-edit",
                        label:"prueba 1",
                        name:"test1",
                        placeholder:"ingresa texto",
                        
                    }
                ]
            }
        }
    }
}
</script>