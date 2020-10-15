<template>
    <div class="md:w-1/2 sm:w-full">
        {{form.titulo}}
        <formulario :titulo="form.titulo" :icono="form.icono">
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
                icono : "user-edit"
            }
        }
    }
}
</script>