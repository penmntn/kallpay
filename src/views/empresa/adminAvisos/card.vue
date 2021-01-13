<template>
    <div>
        <vs-card class="w-full" actionable >
            <div class="flex">
                <div class="w-8/12 mx-3">
                    <div>
                        <span class="text-lg  text-primary font-medium " @click="activar('LISTAPOSTULANTE')">  {{valores.Titulo}}</span>
                    </div>
                    <div>
                        Publicado por <span class="text-sm  text-primary font-medium capitalize ">  {{valores.contacto_empresa.persona.Nombres}}</span>
                    </div>
                     <div class="py-3 text-justify">
                        <span class="text-base 	capitalize ">  {{valores.Descripcion}}</span>
                    </div> 
                </div>
                <div class="w-4/12 mx-2">
                    <div class="flex py-1 ">
                        <feather-icon class='w-5 mx-2 text-primary' icon="DollarSignIcon" />
                        <span class="text-base font-medium 	capitalize "> {{" Salario : "}} </span>
                        <span class="text-base font-medium  capitalize ">  {{ valores.Salario ||  " No especificado"}}</span>
                    </div> 
                    <div class="flex  py-1 ">
                        <feather-icon class='w-5 mx-2 text-primary' icon="MapPinIcon" />
                        <span class="text-base font-medium 	capitalize "> {{" Ubicacion : "}} </span>
                        <span class="text-base font-medium  capitalize ">  {{ valores.Direccion.Provincia ||  " No especificado"}}</span>
                    </div>
                     <div class="flex  py-1 ">
                        <feather-icon class='w-5 mx-2 text-primary' icon="CalendarIcon" />
                        <span class="text-base font-medium 	capitalize "> {{" Fecha de Publicacion : "}} </span>
                        <span class="text-base font-medium  capitalize ">  {{ valores.FechaPublicacion ||  " No especificado"}}</span>
                    </div>
                     <div class="flex  py-1 ">
                        <feather-icon class='w-5 mx-2 text-primary' icon="CornerDownRightIcon" />
                        <span class="text-base font-medium 	capitalize "> {{" Tipo de empleo : "}} </span>
                        <span class="text-base font-medium  capitalize ">  {{ valores.TipoEmpleo ||  " No especificado"}}</span>
                    </div>
                    <div class="flex  py-1 ">
                        <feather-icon class='w-5 mx-2 text-primary' icon="HelpCircleIcon" />
                        <span class="text-base font-medium 	capitalize "> {{" Estado : "}} </span>
                        <span class="text-base font-medium  capitalize ">  {{ valores.Estado ||  " No especificado"}}</span>
                    </div>
                </div>
            </div>
        </vs-card>
    </div>
</template>

<script>


import listaPostulantes from "../../siders/postulantes.vue"

export default {
    props: {
        valores : { type: Object}
    },
    data() {
        return {
            activ: false,
        };
    },
    components:{
        listaPostulantes
    },
    methods : {
        activar(value){
            this.$store.commit('empresa/SET_AVISO_LABORAL_ID',  this.valores.id)
            this.$store.dispatch('empresa/getListaPostulantes', this.valores.id)
            this.$store.commit('UPDATE_SIDER', {id : value , state : true })
        }
    },
}
</script>