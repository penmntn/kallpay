<template>
	<div>
		<sider-p  identificador="PERFILPOSTULANTE"  :ancho="1000">
            <template slot="cuerpo"> 
                <div class="px-8 py-2 h-full bg-white" v-if="!esNulo(Postulante)"> 
                    
                   <div class="flex w-full">
                        <div class="w-5/6">
                            <div v-if="persona">
                                <span class="text-2xl text-primary font-bold ">{{ persona.Nombres + " "+ persona.Apellidos | mayus }}</span>
                            </div>
                            <div v-if="Postulante" class="flex items-center">
                                <feather-icon class='w-4 mx-1 text-primary' icon="ClockIcon" />
                                <span class="text-sm "> {{'Ultima Actualizacion' }} {{Postulante.updatedAt | fechayHora }}</span>
                            </div>
                        </div>
                        <div class="flex justify-items-end items-center">
                            <div v-show="!activechip">
                                <vs-chip color="success">
                                    <span @click="activechip=!activechip"> {{select1}} </span>
                                </vs-chip>
                            </div>
                            <div v-show="activechip">
                                <vs-select :success="true" placeholder="Estado" class="selectExample" @change="activechip=!activechip" v-model="select1">
                                    <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in estadoAplicacion"/>
                                </vs-select>
                            </div>
                        </div>
                   </div>
                    <div class="w-full" v-if="persona && persona.perfil.length>=1">
                         <div class="flex justify-center">
                            <vs-avatar size="250px" :src="url+persona.perfil[0].url"/>
                         </div>
                    </div>
                   <div class="flex w-full pt-5">
                       <div v-if="persona" class="w-8/12">
                            <div>
                                <span class="text-lg text-primary font-semibold ">{{'DATOS DE CONTACTO'}}</span>
                            </div>
                            <div class="pl-10  flex items-center">
                                <feather-icon class='w-4 mx-1 text-primary' icon="UserIcon" />
                                <span class="text-sm font-bold pr-1"> {{'Nombres :' }}</span>  <span class="text-sm "> {{persona.Nombres + " "+ persona.Apellidos  || 'sin nonbres' }}</span>
                            </div>
                            <div class="pl-10  flex items-center">
                                <feather-icon class='w-4 mx-1 text-primary' icon="PhoneIcon" />
                                <span class="text-sm font-bold pr-1"> {{'Numero de Telefono :' }}</span>  <span class="text-sm "> {{persona.Numero_Celular  || 'sin telefono' }}</span>
                            </div>
                             <div class="pl-10  flex items-center">
                                <feather-icon class='w-4 mx-1 text-primary' icon="AtSignIcon" />
                                <span class="text-sm font-bold pr-1"> {{'Correo :' }}</span>  <span class="text-sm "> {{persona.user.email  || 'sin Correo Electronico' }}</span>
                            </div>
                             <div class="pl-10  flex items-center">
                                <feather-icon class='w-4 mx-1 text-primary' icon="MapPinIcon" />
                                <span class="text-sm font-bold pr-1"> {{'Residencia :' }}</span>  <span class="text-sm "> {{persona.Direccion[0].Pais + " - "+ persona.Direccion[0].Provincia  + " - "+  persona.Direccion[0].Distrito || 'Sin Lugar de Residencia Registrado' }}</span>
                            </div>
                             <div class="pl-10  flex items-center" v-if="persona.fecha_nac">
                                <feather-icon class='w-4 mx-1 text-primary' icon="CalendarIcon" />
                                <span class="text-sm font-bold pr-1"> {{'Edad :' }}</span>  <span class="text-sm "> {{ persona.fecha_nac |  edad }}</span>
                            </div>
                             <div class="pl-10  flex items-center">
                                <feather-icon class='w-4 mx-1 text-primary' icon="UsersIcon" />
                                <span class="text-sm font-bold pr-1"> {{'Genero :' }}</span>  <span class="text-sm "> {{persona.Genero  || 'Sin genero' }}</span>
                            </div>
                            <div class="pl-10  flex items-center" v-if="RedesSociales && RedesSociales.facebook">
                                <feather-icon class='w-4 mx-1 text-primary' icon="FacebookIcon" />
                                <a :href="RedesSociales.facebook" target="_blank">  
                                    <span class="text-sm font-bold pr-1" > {{'Facebook' }}</span>
                                </a>
                            </div>
                             <div class="pl-10  flex items-center"  v-if="RedesSociales && RedesSociales.twitter">
                                <feather-icon class='w-4 mx-1 text-primary' icon="TwitterIcon" />
                                <a :href="RedesSociales.twitter" target="_blank">  
                                    <span class="text-sm font-bold pr-1" > {{'Twitter' }}</span>
                                </a>
                            </div>
                            <div class="pl-10  flex items-center"  v-if="RedesSociales && RedesSociales.linkedin" >
                                <feather-icon class='w-4 mx-1 text-primary' icon="LinkedinIcon" />
                                <a :href="RedesSociales.linkedin" target="_blank">  
                                    <span class="text-sm font-bold pr-1" > {{'linkedin' }}</span>
                                </a>
                            </div>
                            <div class="pl-10  flex items-center"  v-if="RedesSociales && RedesSociales.pilar">
                                <feather-icon class='w-4 mx-1 text-primary' icon="GitBranchIcon" />
                                <a :href="RedesSociales.pilar" target="_blank">  
                                    <span class="text-sm font-bold pr-1" > {{'Directorio Pilar' }}</span>
                                </a>
                            </div>
                            <div class="pl-10  flex items-center"  v-if="RedesSociales && RedesSociales.webpersonal">
                                <feather-icon class='w-4 mx-1 text-primary' icon="GlobeIcon" />
                                <a :href="RedesSociales.webpersonal" target="_blank">  
                                    <span class="text-sm font-bold pr-1" > {{'Sitio Web Personal' }}</span>
                                </a>
                            </div>
                       </div>
                   </div>
                    <table class="table-auto pt-5 px-2" v-if="experienciaLaboral && experienciaLaboral.length>=1">
                        <tbody>
                            <tr name="TITULO EXPERICNIA LABORAL">
                                <span class="text-lg text-primary font-semibold ">EXPERIENCIA LABORAL</span>
                            </tr>
                            <tr name="cuerpo" v-for="(item, index) in experienciaLaboral" :key="index">
                                <td name="fecha" class="pl-10 w-3/12">
                                    <span class="text-base text-primary">{{ item.FechaInicio | fecha_mes | capitalize }} - {{ item.FechaFin | fecha_mes | capitalize}}</span>
                                </td>
                                <td name="cuerpo" class="pl-5 pb-5">
                                    <div class="pb-2">
                                        <span class="text-normal font-bold pr-2"> {{ item.PuestoCargo}} </span> 
                                        <span class="text-normal  font-bold pr-2"> del area </span>
                                        <span class="text-normal font-bold pr-2"> {{ item.Area}} </span>
                                        <span class="text-normal font-bold pr-2"> en </span>
                                        <span class="text-normal font-bold pr-2"> {{ item.empresa_donde_laboro}} </span>
                                    </div>
                                    <div class="text-justify">
                                        <span class="text-base"> {{ item.DescripcionResponsabilidades}} </span>
                                    </div>
                                </td>
                            </tr>

                            <tr name="TITULO EDUCACION" v-if="GradoAcademico && GradoAcademico.length>=1">
                                <span class="text-lg text-primary font-semibold ">ESTUDIOS</span>
                            </tr>
                            <tr name="cuerpo" v-for="(item, index) in GradoAcademico" :key="index">
                                <td name="fecha" class="pl-10 w-3/12">
                                    <span class="text-base text-primary">{{ item.FechaInicio | fecha_mes | capitalize }} - {{ item.FechaFin | fecha_mes | capitalize}}</span>
                                </td>
                                <td name="cuerpo" class="pl-5 pb-5">
                                    <div class="pb-2">
                                        <span class="text-normal font-bold pr-2"> {{ '( ' +  item.NivelDeEstudios}} </span> 
                                        <span class="text-normal font-bold pr-2"> {{ ' / ' +  item.Estado + ' )'}} </span>
                                        <span class="text-normal font-bold pr-2"> en </span>
                                        <span class="text-normal font-bold pr-2"> {{ item.AreaStudio}} </span>
                                    </div>
                                    <div  class="flex">
                                        <span class="text-base pr-2"> {{ item.CentroEstudios}} </span> -
                                        <span class="text-base pl-2"> {{ item.Pais}} </span>
                                    </div>
                                </td>
                            </tr>
                            <tr name="TITULO IDIOMAS" v-if="Idioma && Idioma.length>=1">
                                <span class="text-lg text-primary font-semibold ">IDIOMAS</span>
                            </tr>
                            <tr name="cuerpo" v-for="(item, index) in Idioma" :key="index">
                                <td name="fecha" class="pl-10 w-3/12">
                                    <span class="text-base text-primary">{{ item.Idioma | capitalize }}</span>
                                </td>
                                <td name="cuerpo" class="pl-5 pb-5">
                                    <div class="flex pb-2">
                                       <div class="px-2" v-if="item.Escritura">
                                           <vs-chip color="success"> {{'Escritura | ' + item.Escritura}}  </vs-chip>
                                       </div>
                                       <div class="px-2" v-if="item.Hablado">
                                           <vs-chip color="success"> {{'Hablado |' + item.Hablado}}  </vs-chip>
                                       </div>
                                       <div class="px-2" v-if="item.Escucha">
                                           <vs-chip color="success"> {{'Escucha | ' + item.Escucha}}  </vs-chip>
                                       </div>
                                    </div>
                                </td>
                            </tr>
                            
                            <tr name="TITULO HABILIDADES" v-if="habilidades && habilidades.length>=1 ">
                                <span class="text-lg text-primary font-semibold ">HABILIDADES</span>
                            </tr>
                            <tr name="cuerpo" v-if="habilidades"> 
                                <td name="fecha" class="pl-10 w-3/12">
                                </td>
                                <td name="cuerpo" class="pl-5 pb-5">
                                    <div class="flex">
                                       <div class="px-2" v-for="(item, index) in habilidades" :key="index">
                                           <vs-chip color="success"> {{ item.Habilidad +  ' | ' + item.Nivel}}  </vs-chip>
                                       </div>
                                    </div>
                                </td>
                            </tr>
                            
                            <tr name="TITULO REFERENCIAS" v-if="Referencias && Referencias.length>=1">
                                <span class="text-lg text-primary font-semibold ">REFERENCIAS</span>
                            </tr>
                            <tr name="cuerpo" v-for="(item, index) in Referencias" :key="index">
                                <td name="fecha" class="pl-10 w-3/12">
                                    <span class="text-base text-primary">{{ item.Relacion | capitalize }}</span>
                                </td>
                                <td name="cuerpo" class="pl-5 pb-5">
                                    <div >
                                       <div class="px-2" >
                                            <span class="text-base font-semiblod"> Nombres : </span> <span class="text-base pl-2">  {{ item.Nombres}} </span>
                                       </div>
                                       <div class="px-2" >
                                            <span class="text-base font-semiblod"> Correo : </span> <span class="text-base pl-2 text-primary">  {{ item.Correo}} </span>
                                       </div>
                                       <div class="px-2" >
                                            <span class="text-base font-semiblod"> Numero : </span> <span class="text-base pl-2">  {{ item.Numero}} </span>
                                       </div>
                                       <div class="px-2" >
                                            <span class="text-base font-semiblod"> Relacion :  </span> <span class="text-base pl-2">  {{ item.Relacion}} </span>
                                       </div>
                                    </div>
                                </td>
                            </tr>
                            
                             <tr name="TITULO OBJETIVO LABORAL" v-if="Postulante && Postulante.ObjetivoLaboral">
                                <span class="text-lg text-primary font-semibold "> OBJETIVO LABORAL </span>
                            </tr>
                            <tr name="cuerpo" v-if="Postulante && Postulante.ObjetivoLaboral">
                                <td name="fecha" class="pl-10 w-3/12">
                                </td>
                                <td name="cuerpo" class="pl-5 pb-5">
                                    <div >
                                       <div class="px-2  text-justify" >
                                            <span class="text-lg  font-semiblod italic"> {{Postulante.ObjetivoLaboral}} </span>
                                       </div>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>


                </div>
            </template>
        </sider-p>
	</div>
</template>

<script>
import {isNil } from 'lodash'
import siderP from "@/components/side_bar/sider.vue"
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    created(){
        console.log(this.id_estudiante)
    },
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
    props: {
        val:  { type: Boolean},
        id_estudiante: { type: String},
    },
    components: {
        siderP,
        VuePerfectScrollbar,
    }, 
    computed:{
        scrollbarTag () { return this.$store.getters.scrollbarTag },
        url(){
            return this.$store.state.Media_URL_base
        },
        default(){
            return this.$store.state.Media_URL_default
        },
         estadoAplicacion(){
            try {
                return this.$store.state.empresa.estadoPostulante
            } catch (error) {
                return {}
            }
         },
        Postulante(){
            try {
                return this.$store.state.empresa.Postulante
            } catch (error) {
                return {}
            }
        },
        persona(){
            try {
                return this.$store.state.empresa.Postulante.persona
            } catch (error) {
                console.log(error)
                return {}
            }
        },
        experienciaLaboral: function () {
            try {
                return this.$store.state.empresa.Postulante.ExperienciaLaboral
            } catch (error) {
                return []
            }
        },
        GradoAcademico: function () {
            try {
                return this.$store.state.empresa.Postulante.GradoAcademico
            } catch (error) {
                return []
            }
        },
        RedesSociales: function () {
            try {
                return this.$store.state.empresa.Postulante.RedesSociales
            } catch (error) {
                return {}
            }
        },
        Referencias: function () {
            try {
                return this.$store.state.empresa.Postulante.Referencias
            } catch (error) {
                return []
            }
        },
        habilidades: function () {
            try {
                return this.$store.state.empresa.Postulante.habilidades
            } catch (error) {
                return []
            }
        },
        Idioma: function () {
            try {
                return this.$store.state.empresa.Postulante.Idioma
            } catch (error) {
                return []
            }
        },
    },
    methods:{
        esNulo(val){
            return isNil(val)
        }
    }
}
</script>