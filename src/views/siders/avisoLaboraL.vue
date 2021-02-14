<template>
	<div>
		<sider-p  identificador="OPORTUNIDADLABORAL"  :ancho="1000">
            <template slot="cuerpo"> 
                <div v-if="AvisoLaboral" >
                    <div>
                        <vs-card>
                            <div v-if="empresa && empresa.logo" class="flex w-full">
                                <div class="pr-4">
                                    <img class="rounded-full w-32 hover:rotate-45" :src="url+empresa.logo.url"  />
                                </div>
                                <div>
                                    <div>
                                        <span class="text-2xl text-primary font-bold">{{empresa.NombreEmpresa}}</span>
                                    </div>
                                    <div>
                                        <span class="text-base font-bold"> {{AvisoLaboral.Titulo }} </span> 
                                    </div>
                                </div>
                            </div>
                        </vs-card>
                     
                        <vs-card class="descripcion">
                            <vs-tabs>
                                <vs-tab label="Descripcion">
                                        <component :is="scrollbarTag" class="scroll-area--customizazt" :settings="settings" :key="$vs.rtl">
                                                <div class="mt-3" v-html="richttt" ></div>   
                                        </component>
                                        <vs-tabs class="detalles">
                                            <vs-tab label="Informacion">    
                                                <component :is="scrollbarTag" class="scroll-area--aaa" :settings="settings" :key="$vs.rtl">
                                                    <div class="columnas pt-3">
                                                        <div class="flex py-1 " v-if="AvisoLaboral && AvisoLaboral.TipoEmpleo">
                                                            <feather-icon class='w-5 mx-2 text-primary' icon="SlidersIcon" />
                                                            <span class="text-base font-medium 	capitalize "> {{` Tipo de Empleo : `}} </span>
                                                            <span class="text-base font-medium  capitalize ml-1">  {{  AvisoLaboral.TipoEmpleo ||  " No especificado"}}</span>
                                                        </div>                                                        
                                                        <div class="flex py-1 " v-if="AvisoLaboral && AvisoLaboral.Jerarquia">
                                                            <feather-icon class='w-5 mx-2 text-primary' icon="CompassIcon" />
                                                            <span class="text-base font-medium 	capitalize "> {{` Jerarquia : `}} </span>
                                                            <span class="text-base font-medium  capitalize ml-1">  {{  AvisoLaboral.Jerarquia ||  " No especificado"}}</span>
                                                        </div>                                                        
                                                        <div class="flex py-1 " v-if="AvisoLaboral && AvisoLaboral.Area">
                                                            <feather-icon class='w-5 mx-2 text-primary' icon="BriefcaseIcon" />
                                                            <span class="text-base font-medium 	capitalize "> {{` Area : `}} </span>
                                                            <span class="text-base font-medium  capitalize ml-1">  {{  AvisoLaboral.Area ||  " No especificado"}}</span>
                                                        </div>
                                                         <div class="flex py-1 " v-if="AvisoLaboral && AvisoLaboral.Salario">
                                                            <feather-icon class='w-5 mx-2 text-primary' icon="DollarSignIcon" />
                                                            <span class="text-base font-medium 	capitalize "> {{` Salario : `}} </span>
                                                            <span class="text-base font-medium  capitalize ml-1">  {{  AvisoLaboral.Salario ||  " No especificado"}}</span>
                                                        </div> 
                                                        <div class="flex py-1 " v-if="Direccion && Direccion.Pais && Direccion.Provincia && Direccion.Distrito">
                                                            <feather-icon class='w-5 mx-2 text-primary' icon="MapPinIcon" />
                                                            <span class="text-base font-medium 	capitalize "> {{` Ubicacion : `}} </span>
                                                            <span class="text-base font-medium  capitalize ml-1">  {{  Direccion.Pais + ' - ' + Direccion.Provincia + ' - ' + Direccion.Distrito ||  " No especificado"}}</span>
                                                        </div> 
                                                        <div class="flex py-1 ">
                                                            <feather-icon class='w-5 mx-2 text-primary' icon="HashIcon" v-if="AvisoLaboral && AvisoLaboral.NumeroVacantes" />
                                                            <span class="text-base font-medium 	capitalize "> {{` Cantidad de Vacantes : `}} </span>
                                                            <span class="text-base font-medium  capitalize ml-1">  {{  AvisoLaboral.NumeroVacantes ||  " No especificado"}}</span>
                                                        </div>                                                                                                               
                                                    </div>     
                                                </component>
                                            </vs-tab>
                                            <vs-tab label= "Requisitos">
                                                <component :is="scrollbarTag" class="scroll-area--aaa" :settings="settings" :key="$vs.rtl">
                                                    <div class="columnas pt-3">
                                                          <div class="flex py-1 " v-if="RequisitosTrabajo && RequisitosTrabajo.Genero">
                                                            <feather-icon class='w-5 mx-2 text-primary' icon="UsersIcon" />
                                                            <span class="text-base font-medium 	capitalize "> {{` Genero : `}} </span>
                                                            <span class="text-base font-medium  capitalize ml-1">  {{  RequisitosTrabajo.Genero ||  " No especificado"}}</span>
                                                        </div>                                                        
                                                        <div class="flex py-1 " v-if="RequisitosTrabajo && RequisitosTrabajo.edadMinima">
                                                            <feather-icon class='w-5 mx-2 text-primary' icon="ChevronsDownIcon" />
                                                            <span class="text-base font-medium 	capitalize "> {{` Edad Minima : `}} </span>
                                                            <span class="text-base font-medium  capitalize ml-1">  {{  RequisitosTrabajo.edadMinima + ' años'||  " No especificado"}}</span>
                                                        </div>                                                        
                                                        <div class="flex py-1 " v-if="RequisitosTrabajo && RequisitosTrabajo.EdadMaxima">
                                                            <feather-icon class='w-5 mx-2 text-primary' icon="ChevronsUpIcon" />
                                                            <span class="text-base font-medium 	capitalize "> {{` Edad Maxima : `}} </span>
                                                            <span class="text-base font-medium  capitalize ml-1">  {{  RequisitosTrabajo.EdadMaxima + ' años' ||  " No especificado"}}</span>
                                                        </div>
                                                         <div class="flex py-1 " v-if="RequisitosTrabajo && RequisitosTrabajo.LugardeResidencia">
                                                            <feather-icon class='w-5 mx-2 text-primary' icon="MapPinIcon" />
                                                            <span class="text-base font-medium 	capitalize "> {{` Lugar de Residencia  : `}} </span>
                                                            <span class="text-base font-medium  capitalize ml-1">  {{ RequisitosTrabajo.LugardeResidencia ||  " No especificado"}}</span>
                                                        </div> 
                                                        <div v-if="RequisitosTrabajo && RequisitosTrabajo.Idiomas.length ">
                                                            <div class="flex py-1" v-for="(item, index ) in RequisitosTrabajo.Idiomas" :key="'requisitos'+index">
                                                                <feather-icon class='w-5 mx-2 text-primary' icon="GlobeIcon" />
                                                                <span class="text-base font-medium 	capitalize "> {{` Idioma : `}} </span>
                                                                <span class="text-base font-medium  capitalize ml-1">  {{  item.Idioma + " - " + item.Hablado  ||  " No especificado"}}</span>
                                                            </div> 
                                                        </div>
                                                        <div class="flex py-1 " v-if="RequisitosTrabajo && RequisitosTrabajo.ExperienciaMinima">
                                                            <feather-icon class='w-5 mx-2 text-primary' icon="ActivityIcon" />
                                                            <span class="text-base font-medium 	capitalize "> {{` Experiencia Minima: `}} </span>
                                                            <span class="text-base font-medium  capitalize ml-1">  {{  RequisitosTrabajo.ExperienciaMinima + ' años'  ||  " No especificado"}}</span>
                                                        </div> 
                                                       <div v-if="RequisitosTrabajo && RequisitosTrabajo.Habilidades.length ">
                                                            <div class="flex py-1" v-for="(item, index ) in RequisitosTrabajo.Habilidades" :key="'habilidad'+index">
                                                                <feather-icon class='w-5 mx-2 text-primary' icon="ToolIcon" />
                                                                <span class="text-base font-medium 	capitalize "> {{` Idioma : `}} </span>
                                                                <span class="text-base font-medium  capitalize ml-1">  {{  item.Habilidad + " - " + item.Nivel  ||  " No especificado"}}</span>
                                                            </div> 
                                                        </div>                                                                                         
                                                    </div>  
                                                </component>
                                            </vs-tab>
                                        </vs-tabs> 
                             
                                </vs-tab>
                                <vs-tab label= "Sobre la empresa">
                                    <div v-if="empresa && empresa.RazonSocial">
                                         
                                        <span class="text-lg font-bold text-primary"> {{'ACERCA DE ' + empresa.RazonSocial}}</span>
                                    </div>
                                    <div class="flex py-2 " v-if="empresa && empresa.DescripcionDeLaEmpresa">
                                         <component :is="scrollbarTag" class="scroll-area--customizazt" :settings="settings" :key="$vs.rtl">
                                                <div class="mt-3" v-html="EmpresaDecription" ></div>   
                                        </component>
                                    </div>
                                    <div class="flex py-2 " v-if="empresa && empresa.cantida">
                                        <div>
                                            <feather-icon class='w-5 mx-2 text-primary' icon="ActivityIcon" />
                                             <span class="text-base font-medium 	capitalize text-primary"> {{` Descripcion Empresa : `}} </span>
                                        </div>
                                        <span class="text-base font-medium  capitalize ml-2 text-justify" >  {{  empresa.DescripcionDeLaEmpresa ||  " No especificado"}}</span>
                                    </div> 
                                </vs-tab>
                            </vs-tabs>
                        </vs-card>
                    </div>
                </div>
            </template>
        </sider-p>
	</div>
</template>

<script>
import test from "../../components/quill/quill-view.vue"
import dedent from 'dedent'
import VueMarkdown from 'vue-markdown'
import {isNil } from 'lodash'
import siderP from "@/components/side_bar/sider.vue"
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'

export default {
    data(){
        return{
            settings: {
                maxScrollbarLength : 60,
                wheelSpeed         : 0.30
            },
            select1 : "Pendiente",
            activechip: false,
        }
    },

    components: {
        siderP,
        VuePerfectScrollbar,
        VueMarkdown,
        test
    }, 

    computed:{
        scrollbarTag() { return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar' },
        richttt(){
           try {
               return  dedent(this.AvisoLaboral.Descripcion)
            } catch (error) {
                return ''
            }
        },
        EmpresaDecription(){
           try {
               return  dedent(this.empresa.Descripcion)
            } catch (error) {
                return ''
            }
        },
        url(){
            return this.$store.state.Media_URL_base
        },
        default(){
            return this.$store.state.Media_URL_default
        },
        AvisoLaboral(){
            try {
                return this.$store.state.general.oportunidadLaboral
            } catch (error) {
                return {}   
            }
        },
        RequisitosTrabajo(){
            try {
                return this.AvisoLaboral.RequisitosTrabajo
            } catch (error) {
                return {}
            }
        },
        empresa(){
            try {
                return this.AvisoLaboral.empresa
            } catch (error) {
                return {}
            }
        },
        Direccion(){
            try {
                return this.AvisoLaboral.Direccion
            } catch (error) {
                return {}
            }
        }
    },

    methods:{
        esNulo(val){
            return isNil(val)
        }
    }
}
</script>

<style lang="scss" scoped>
.descripcion{
    min-height: 60vh;
}

.detalles{
    height: 20vh;
    box-shadow: 0px -20px 30px 30px rgba(255, 255, 255, 0.9);
    border-top :  2px dotted #71787e9f;
}

.scroll-area--customizazt {
  height: 60vh;
  min-height: 50vh;

  &:not(.ps) {
    overflow-y: auto;
  }
}

.scroll-area--aaa {
  height: 15vh;
  min-height: 15vh;

  &:not(.ps) {
    overflow-y: auto;
  }
}

.columnas{
    column-count : 2
}


#OPORTUNIDADLABORAL{
    background-color: white;
}

</style>