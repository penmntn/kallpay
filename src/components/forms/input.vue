<template>
        <div>
            <div v-if="type=='input'">
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
                class="w-full"
                />
                <span class="text-danger text-sm" v-show="errors.has(name)">{{ errors.first(name) }}</span>
            </div>
            <div v-if="type=='textarea'" class="my-2">
                <vs-textarea :label="label" v-model="valor" :name="name" />
            </div>
            <div v-if="type=='boleano'" class="my-2">
                <label>{{label}}</label>
                <vs-switch v-model="valor" :name="name"/>
            </div>
            <div v-if="type=='fecha'"  class="inline-block">
                <div class="block">
                    <label>{{label}}</label>
                </div>
                <div class="block w-full">
                    <flat-pickr class="w-full"  :placeholder="Placeholder" v-model="date" :name='name'/> 
                </div>
            </div>
             <div v-if="type=='desplegable'">
                <div class="block">
                    <label>{{label}}</label>
                </div>
                <div class="block w-full">
                    <v-select :label="name"  :name="name" :options="data" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </div>
                 
             </div>
        </div>
</template>

<script>

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import vSelect from 'vue-select'

export default {
    components:{
        flatPickr,
        'v-select': vSelect,
    },
    props:{
        icono: String,
        label : String,
        name: String,
        Placeholder : String,
        type: String, 
        validate : String, 
        data : Array,
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