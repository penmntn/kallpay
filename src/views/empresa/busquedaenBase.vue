<template>
    <div>
        <button @click="activa_side_function('PERFILPOSTULANTE')">activar </button>
        <sider-perfil></sider-perfil>
    </div>
</template>

<script>
import siderPerfil from '../siders/cvPostulante.vue'

export default {
    components :{
        siderPerfil
    },
    methods:{
         activa_side_function(val){
            this.$store.dispatch('empresa/getDataPostulante', '5ffdf5e55181b80e7019ecc7')
            this.$store.commit('UPDATE_SIDER', {id : val , state : true })
        }
    }
}
</script>