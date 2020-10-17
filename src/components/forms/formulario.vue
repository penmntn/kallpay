<template>
    <div>
        <vs-card class="w-full">
            <div class="vx-row mb-4">
                <div class="vx-col">
                    <h4 class="text-primary"> 
                        <font-awesome-icon :icon="['fa', icono ]" sping /> {{titulo}}
                    </h4>
                </div>
            </div>
            <div class="mb-4">
                <div class="vx-row mb-2" v-for="(fila, key) in grid" :key="key">
                    <div :class="`vx-col ${col.estilo}`" v-for="(col, ki) in fila" :key="ki">
                        <slot :name="`${key}-${ki}`">
                            <entrada v-if="col.name"
                                :icono="col.key"
                                :valor="col.valor"
                                :label="col.label"
                                :validate="col.validate"
                                :Placeholder="col.placeholder"
                                :name="col.name"
                                :estilo="col.estilo"
                                :type="col.type"
                                :data="col.data"
                                @test1="valor=$event.value"
                            />
                        </slot>
                    </div>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-full">
                    <slot name="botones">
                        <vs-button class="mr-3 mb-2">Submit</vs-button>
                        <vs-button color="warning" type="border" class="mb-2" >Cancle</vs-button>
                    </slot>
                </div>
            </div>
        </vs-card>
    </div>
</template>

<script>
import entrada from './input.vue'

export default {
    components:{
        entrada
    },
    props: {
        id: String, 
        titulo: String,
        icono : String,
        grid: Array
    },
    data(){
        return{
            valor:'',
            name:'saludo'
        }
    },
    methods:{
        funcionPrueba : function(val){
            console.log(val)
        }
    }
}
</script>