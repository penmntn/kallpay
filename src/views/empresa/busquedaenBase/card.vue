<template>
    <div>
        <vs-card class="w-full px-2" actionable v-if="persona">
            <div class="flex items-center">
                <div class="md:w-2/12" v-if="persona.perfil.length">
                    <vs-avatar size="100px" :src="url+persona.perfil[0].url" @click="activa_side_function('PERFILPOSTULANTE')" />
                </div >
                <div class="md:w-full flex">
                    <div class="w-full">
                        <div class="my-1">
                            <span  class="text-xl text-primary font-medium">  {{persona.Nombres + " " +  persona.Apellidos}}</span>
                        </div>
                        <div class="my-1 flex" v-if="experiencia">
                            <feather-icon class='w-5 mx-2 text-primary' icon="BriefcaseIcon"/>
                            <span class="text-normal font-medium">  {{ experiencia.PuestoCargo}}  {{ ` en `}} {{ experiencia.empresa_donde_laboro}} - {{ experiencia.Area}}  </span> 
                            <span class="text-normal font-medium text-primary"> {{" ("}} {{ experiencia.FechaInicio | fecha_mes | capitalize }} - {{ experiencia.FechaFin | fecha_mes | capitalize}}  {{") "}}</span> 
                        </div>
                        <div class="my-1 flex" v-if="estudios">
                            <feather-icon class='w-5 mx-2 text-primary' icon="AwardIcon"/>
                            <span class="text-normal font-medium">  {{ estudios.CentroEstudios}} </span> - <span class="text-normal font-medium text-primary">  {{ estudios.Estado | capitalize}}</span>  
                        </div>
                        <div class="my-1 flex" v-if="direccion">
                            <feather-icon class='w-5 mx-2 text-primary' icon="MapPinIcon"/>
                            <span class="text-normal font-medium">  {{ direccion.Pais | capitalize }}, {{ direccion.Provincia | capitalize }}  </span> 
                        </div>
                    </div>
                </div>
                
            </div>
        </vs-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
          activar_sider_variable : false
        }
    },
    props: {
        valores: {type:  Object}
    },
    created() {
        console.log(this.valores)
    },
    computed: { 
        url(){
            return this.$store.state.Media_URL_base
        },
        experiencia(){
            try {
                return this.valores.ExperienciaLaboral[this.valores.ExperienciaLaboral.length-1]
            } catch (error) {
                return {}
            }
        },
        estudios(){
            try {
                return this.valores.GradoAcademico[this.valores.GradoAcademico.length-1] 
            } catch (error) {
                return {}
            }
        },
        direccion(){
            try {
                return this.valores.persona.Direccion[0]
            } catch (error) {
                return {}
            }
        },
        persona(){
            try {
                return this.valores.persona
            } catch (error) {
                return {}
            }
        },
        habilidades(){
            try {
                return this.valores.habilidades
            } catch (error) {
                return []
            }
        }
    },
    methods: {
        randomColor(){
            let colores = ["primary", "success", "danger", "warning"] 
             var x = Math.floor((Math.random() * (colores.length-1)) + 0);
             return colores[x]
        },
        activa_side_function(val){
            this.$store.dispatch('empresa/getDataPostulante', this.valores.id)
            this.$store.commit('UPDATE_SIDER', {id : val , state : true })
        }
    }
}
</script>