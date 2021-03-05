<template>
    <div>
        <vs-card class="w-full px-2"  actionable v-if="valores">
            <div>
                <div class="flex justify-between">
                   <div class="flex">
                        <div class="px-3 w-2/12 flex items-center" >
                            <img class="w-full" :src="url+empresa.logo.url" @click="activa_side_function('OPORTUNIDADLABORAL')" />
                        </div >
                        <div class="flex ">
                            <div>
                                <div class="my-1">
                                    <span  class="text-xl text-primary font-medium">  {{empresa.NombreEmpresa}}</span>
                                </div>
                                <div class="my-1 flex" v-if="valores">
                                    <feather-icon class='w-5 mx-2 text-primary' icon="BriefcaseIcon"/>
                                    <span class="text-normal font-medium">  {{ valores.Titulo}}  {{ ` en `}} {{ valores.Area}}  </span>  
                                </div>
                                <div class="my-1 flex" v-if="valores.salario">
                                    <feather-icon class='w-5 mx-2 text-primary' icon="DollarSignIcon"/>
                                    <span class="text-normal font-medium">Salario : s/ {{ valores.salario}} </span>
                                </div>
                                <div class="my-1 flex" v-if="direccion">
                                    <feather-icon class='w-5 mx-2 text-primary' icon="MapPinIcon"/>
                                    <span class="text-normal font-medium"> Ubicacion : {{ direccion.Pais | capitalize }}, {{ direccion.Provincia | capitalize }} </span> 
                                </div>
                                <div class="my-1 flex" v-if="valores && valores.TipoEmpleo">
                                    <feather-icon class='w-5 mx-2 text-primary' icon="ActivityIcon"/>
                                    <span class="text-normal font-medium"> Tipo empleo : {{ valores.TipoEmpleo }} </span> 
                                </div>
                            </div>
                        </div>
                   </div>
                    <div class="flex items-end">
                            <div class="my-1 flex" v-if="valores && valores.FechaPublicacion">
                                <feather-icon class='w-5 mx-2 text-primary' icon="CalendarIcon"/>
                                <span class="text-normal font-medium">Fecha: {{ valores.FechaPublicacion }}  </span> 
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
        empresa(){
            try {
                return this.valores.empresa
            } catch (error) {
                return {}
            }
        },
        direccion(){
            try {
                return this.valores.Direccion
            } catch (error) {
                return {}
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
            this.$store.dispatch('general/getAvisoLaboral', this.valores.id)
            this.$store.commit('UPDATE_SIDER', {id : val , state : true })
        }
    }
}
</script>

<style lang="scss" scoped>
.altura{
    height: 15vh;
}
.rounderr{
    border-radius: 10px; 
    object-fit: fill
}
</style>y
