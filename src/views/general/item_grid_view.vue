

<template>
    <vx-card class="list-view-item overflow-hidden" v-on="$listeners">

        <template slot="no-body">
            <div class="vx-row item-details no-gutter">

                <!-- IMG COL -->
                <div class="vx-col sm:w-2/12 w-full item-img-container bg-white flex items-center justify-center cursor-pointer" >
                    <img  :src="url+empresa.logo.url" @click="activa_side_function('OPORTUNIDADLABORAL')" class="grid-view-img sm:w-2/3 w-1/3">
                </div>

                <!-- ITEM NAME & DESC COL -->
                <div class="vx-col sm:w-8/12">
                    <div class="p-4 pt-6">
                        <slot name="item-meta">
                            <div class="flex">
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
                        </slot>
                    </div>
                </div>

                <!-- PURCHASE COL -->
                <div class="vx-col sm:w-2/12 w-full flex items-end">
                    <div class="my-4 flex" v-if="valores && valores.FechaPublicacion">
                        <feather-icon class='w-5 mx-2 text-primary' icon="CalendarIcon"/>
                        <span class="text-normal font-medium">Fecha : {{ valores.FechaPublicacion }}  </span> 
                    </div>
                </div>
            </div>
        </template>

    </vx-card>
</template>

<script>
 
export default {
    data(){
        return{
          activar_sider_variable : false
        }
    },
    props: {
        valores: {type:  Object},
        reaload : {type: Boolean , default : false}
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
            if(this.reaload  === false )
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
