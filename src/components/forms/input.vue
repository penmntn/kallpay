<template>
        <div>
            <div v-if="type=='input'" >
                <label :for="name" :class="labelEtiqueta"> 
                    <font-awesome-icon :icon="[icono.pack, icono.icon]" :spin="active" :class="iconoActive" /> {{label}}
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
                @focus="active=1" @blur="active=0"
                />
                <span class="text-danger text-sm" v-show="errors.has(name)">{{ errors.first(name) }}</span>
            </div>
            <div v-if="type=='textarea'" >
                <div class="block">
                    <label :for="name" :class="labelEtiqueta"> 
                        <font-awesome-icon :icon="[icono.pack, icono.icon]" :spin="active" :class="iconoActive" /> {{label}}
                    </label>
                </div>
                <div class="block">   
                    <vs-textarea class="hover:border hover:border-primary" v-model="valor" :name="name" @focus="active=1" @blur="active=0" />
                </div>
            </div>
            <div v-if="type=='boleano'" class="my-2">
                <label :for="name" :class="labelEtiqueta"> 
                    <font-awesome-icon :icon="[icono.pack, icono.icon]" :spin="active" :class="iconoActive" /> {{label}}
                </label>
                <vs-switch v-model="valor" :name="name" @focus="active=1" @blur="active=0"/>
            </div>
            <div v-if="type=='fecha'"  class="block">
                <div class="block">
                    <label :for="name" :class="labelEtiqueta"> 
                        <font-awesome-icon :icon="[icono.pack, icono.icon]" :spin="active" :class="iconoActive"  /> {{label}}
                    </label>
                </div>
                <div class="block w-full">
                    <flat-pickr class="w-full"  :placeholder="Placeholder" v-model="valor" :name='name' @focus="active=1" @blur="active=0" /> 
                </div>
            </div>
             <div v-if="type=='desplegable'">
                <div class="block">
                    <label :for="name" :class="labelEtiqueta"> 
                        <font-awesome-icon :icon="[icono.pack, icono.icon]" :spin="active" :class="iconoActive"  /> {{label}}
                    </label>
                </div>
                <div class="block w-full">
                    <v-select :label="name"  :name="name" :options="data"  @focus="active=1" @blur="active=0" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
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
    data(){
        return{
            active:false
        }
    },
    props:{
        icono: Object,
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
        },
        labelEtiqueta: function(){
            return this.active?'text-primary text-base':'text-gray-500 text-base'
        }, 
        iconoActive : function(){
            return this.active?'text-base':''
        }
    }

}
</script>