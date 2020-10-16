<template>
    <div>
        <div class="vx-col w-full">
            <label :for="name"> 
                <font-awesome-icon :icon="['fa', icono ]" sping /> {{label}}
            </label>
            <vs-input
            :v-validate="validate"
            :name="name"
            icon-no-border
            :class="estilo" 
            :type="typeInput"
            :placeholder="Placeholder" 
            v-model="value"
            />
            <span class="text-danger text-sm" v-show="errors.has(name)">{{ errors.first(name) }}</span>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        icono: String,
        label : String,
        name: String,
        Placeholder : String,
        type: String, 
        validate : String, 
        data : [],
        estilo: String,
        typeInput : String,
        valor:String
    },
    computed : {
        value : {
            get(){
                return this.valor
            },
            set(val){
                this.$emit(this.name, {value : val})
            }
        }  
    }

}
</script>