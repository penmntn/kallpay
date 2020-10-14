<template>
    <div>
        <formulario :formulario="form" />
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
                icono : "queen"
            }
        }
    }
}
</script>