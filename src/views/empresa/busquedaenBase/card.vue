<template>
    <div>
      
    <vx-card class="list-view-item overflow-hidden" v-on="$listeners">
        <template slot="no-body">
            <div class="vx-row item-details no-gutter">
                <!-- IMG COL -->
                <div class="vx-col sm:w-2/12 w-full item-img-container bg-white flex items-center justify-center cursor-pointer" >
                    <img :src="url+persona.perfil[0].url" @click="activa_side_function('PERFILPOSTULANTE')" class="grid-view-img sm:w-2/3 w-1/3 rounded-full p-4">
                </div>
                <!-- ITEM NAME & DESC COL -->
                <div class="vx-col sm:w-10/12">
                    <div class="p-4">
                        <slot name="item-meta">
                            <div class="w-full">
                                <div class="my-1 vx-row">
                                    <span  class="text-xl text-primary font-medium">  {{persona.Nombres + " " +  persona.Apellidos}}</span>
                                </div>
                                <div class="my-1 vx-row" v-if="experiencia">
                                    <feather-icon class='w-5 mx-2 text-primary' icon="BriefcaseIcon"/>
                                    <span class="text-normal font-medium">  {{ experiencia.PuestoCargo}}  {{ ` en `}} {{ experiencia.empresa_donde_laboro}} - {{ experiencia.Area}}  </span> 
                                    <span class="text-normal font-medium text-primary"> {{" ("}} {{ experiencia.FechaInicio | fecha_mes | capitalize }} - {{ experiencia.FechaFin | fecha_mes | capitalize}}  {{") "}}</span> 
                                </div>
                                <div class="my-1 vx-row" v-if="estudios">
                                    <feather-icon class='w-5 mx-2 text-primary' icon="AwardIcon"/>
                                    <span class="text-normal font-medium">  {{ estudios.CentroEstudios}} </span> - <span class="text-normal font-medium text-primary">  {{ estudios.Estado | capitalize}}</span>  
                                </div>
                                <div class="my-1 vx-row" v-if="direccion">
                                    <feather-icon class='w-5 mx-2 text-primary' icon="MapPinIcon"/>
                                    <span class="text-normal font-medium">  {{ direccion.Pais | capitalize }}, {{ direccion.Provincia | capitalize }}  </span> 
                                </div>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
        </template>
    </vx-card>
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


<style lang="scss" scoped>
.list-view-item {
    .item-name, .item-description {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .item-name {
        -webkit-line-clamp: 2;
    }

    .item-description {
        -webkit-line-clamp: 5;
    }

    .grid-view-img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        transition: .35s;
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 4px 25px 0px rgba(0,0,0,.25);

        .grid-view-img{
            opacity: 0.9;
        }
    }
}
</style>
