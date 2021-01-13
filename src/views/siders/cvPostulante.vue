<template>
	<div>
		<sider-p  identificador="PERFILPOSTULANTE"  :ancho="900">
            <template slot="cuerpo"> 
                <div class="px-4 py-2 h-full bg-white"> 
                    
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
                   
                   <div class="flex w-full pt-10">
                       <div v-if="persona">
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
                             <div class="pl-10  flex items-center" v-if="">
                                <feather-icon class='w-4 mx-1 text-primary' icon="FacebookIcon" />
                                <span class="text-sm font-bold pr-1"> {{'Facebook :' }}</span>  <span class="text-sm "> {{persona.Nombres + " "+ persona.Apellidos  || 'sin nonbres' }}</span>
                            </div>
                             <div class="pl-10  flex items-center">
                                <feather-icon class='w-4 mx-1 text-primary' icon="LinkedinIcon" />
                                <span class="text-sm font-bold pr-1"> {{'Linkedin :' }}</span>  <span class="text-sm "> {{persona.Nombres + " "+ persona.Apellidos  || 'sin nonbres' }}</span>
                            </div>
                             <div class="pl-10  flex items-center">
                                <feather-icon class='w-4 mx-1 text-primary' icon="TwitterIcon" />
                                <span class="text-sm font-bold pr-1"> {{'Twitter:' }}</span>  <span class="text-sm "> {{persona.Nombres + " "+ persona.Apellidos  || 'sin nonbres' }}</span>
                            </div>
                       </div>
                   
                       <div>
                            
                       </div>
                   
                   </div>

                </div>
            </template>
        </sider-p>
	</div>
</template>

<script>
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
                return this.$store.state.empresa.Postulante.hbailidades
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


    }
}
</script>