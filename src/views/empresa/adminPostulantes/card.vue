<template>
    <div>
        <vs-card class="w-full px-2" actionable v-if="persona">
            <cv :val="activar_sider_variable" @activar="activa_side_function" :id_estudiante="valores.estudiante.id"> </cv>
            <div class="flex items-center">
                <div class="md:w-2/12">
                    <vs-avatar size="150px" :src="url+persona.perfil[0].url" @click="activa_side_function(true)" />
                </div >
                <div class="md:w-full flex">
                    <div class="w-full">
                        <div class="my-1">
                            <span  class="text-xl text-primary font-medium" @click="activa_side_function(true)" >  {{persona.Nombres + " " +  persona.Apellidos}}</span>
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
                        <div class="my-1  w-full" v-if="habilidades">
                            <vs-chip v-for="(item, key) in habilidades" :key="key" transparent :color="randomColor()">
                                {{item.Habilidad| capitalize }} - {{item.Nivel| capitalize }}
                            </vs-chip>
                            <div class="flex justify-end" v-if="valores.Estado">
                                <vs-chip :color="'primary'">
                                    {{valores.Estado| capitalize }}
                                </vs-chip>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </vs-card>
    </div>
</template>

<script>
import cv from './cvPostulante.vue'

export default {
    components: {
        cv
    },
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
            if(this.valores.estudiante.ExperienciaLaboral.length)
            return this.valores.estudiante.ExperienciaLaboral[this.valores.estudiante.ExperienciaLaboral.length-1]
            else return {}
        },
        estudios(){
            if(this.valores.estudiante.GradoAcademico.length)
            return this.valores.estudiante.GradoAcademico[this.valores.estudiante.GradoAcademico.length-1] 
            else return {}
        },
        direccion(){
            if (this.valores.estudiante.persona.Direccion.length)
            return this.valores.estudiante.persona.Direccion[0]
            else return {}
        },
        persona(){
            return this.valores.estudiante.persona
        },
        habilidades(){
            try {
                return this.valores.estudiante.hbailidades
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
        getPostulantes(id){
            this.$store.dispatch('empresa/getDataPostulante', id)
        },
        activa_side_function(val){
            this.activar_sider_variable= val
        }
    }
}
</script>