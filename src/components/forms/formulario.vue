<template>
    <div>
        <vs-card class="w-full">
            <div class="vx-row mb-4">
                <div class="vx-col">
                    <h4 class="text-primary"> 
                        <font-awesome-icon :icon="['fa', icono ]" sping /> {{valor}}
                    </h4>
                </div>
            </div>
            <div class="mb-4">
                <entrada 
                    :icono="'user-edit'"
                    :valor="valor"
                    :label="'saludo'"
                    :validate="'min:3'"
                    :Placeholder="'ingresa un saludo'"
                    :name="'saludo'"
                    @saludo="valor=$event.value"
                />
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
        titulo: String,
        icono : String,
        inputs : [Object]
    },
    data(){
        return{
            valor:''
        }
    },
    methods:{
        funcionPrueba : function(val){
            console.log(val)
        }
    }
}
</script>