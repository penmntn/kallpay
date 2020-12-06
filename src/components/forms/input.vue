<template lang="html">
        <div class="mb-2">
            <div v-if="type=='input'" >
                <label :for="name" >
                    <font-awesome-icon :icon="[icono.pack, icono.icon]" /> {{label}}
                </label>
                <vs-input
                    :v-validate="validate"
                    :name="name"
                    :class="'w-full'"
                    :placeholder="placeholder"
                    v-model="valor"
                    class="w-full"
                    v-bind="settings"
                />
                <span class="text-danger text-sm" v-show="errors.has(name)">{{ errors.first(name) }}</span>
            </div>
            <div v-if="type=='textarea'" >
                <div>
                    <label :for="name" >
                        <font-awesome-icon :icon="[icono.pack, icono.icon]" /> {{label}}
                    </label>
                </div>
                <div>
                    <vs-textarea class="mb-0"
                        v-model="valor"
                        :name="name"
                        v-bind="settings"
                    />
                </div>
            </div>
            <div v-if="type=='boleano'" class="my-2">
                <label :for="name" >
                    <font-awesome-icon :icon="[icono.pack, icono.icon]"/> {{label}}
                </label>
                <vs-switch
                    v-model="valor"
                    :name="name"
                    v-bind="settings"
                  />
            </div>
            <div v-if="type=='date'"  class="block">
                <div class="block">
                    <label :for="name" >
                        <font-awesome-icon :icon="[icono.pack, icono.icon]" /> {{label}}
                    </label>
                </div>
                <div class="block w-full">
                    <flat-pickr class="w-full"
                    :config="settings"
                    :placeholder="placeholder"
                    v-model="valor"
                    :name='name'/>
                </div>
            </div>
             <div v-if="type=='select'">
                <div class="block">
                    <label :for="name" >
                        <font-awesome-icon :icon="[icono.pack, icono.icon]" /> {{label}}
                    </label>
                </div>
                <div class="block w-full">
                    <vs-select v-model="valor" class="w-full select-large" v-bind="settings" >
                        <vs-select-item
                            :key="index"
                            :value="item.value"
                            :text="item.label"
                            v-for="(item,index) in data"
                            class="w-full" />
                    </vs-select>
                </div>
             </div>
             <div v-if="type=='checkbox'">
                <div>
                    <label :for="name" >
                        <font-awesome-icon :icon="[icono.pack, icono.icon]" /> {{label}}
                    </label>
                </div>
                 <ul class="demo-alignment  w-full" :name='name'>
                     <li v-for="(item, key) in data" :key="key" :class="`${settings.cols} my-2`">
                         <vs-checkbox v-model="valor"
                             :icon="item.icon"
                             :vs-value="item.value"
                             v-bind="settings"
                            >{{ item.name }}
                         </vs-checkbox>
                     </li>
                 </ul>
             </div>
            <div v-if="type=='radio'">
                <div>
                    <label :for="name" >
                        <font-awesome-icon :icon="[icono.pack, icono.icon]" /> {{label}}
                    </label>
                </div>
                 <ul class="demo-alignment  w-full" :name='name'>
                     <li v-for="(item, key) in data" :key="key" :class="`${settings.cols} mt-2`">
                         <vs-radio v-model="valor"
                            :vs-name="item.name"
                            :vs-value="item.value"
                            v-bind="item.settings"
                            >{{item.name}}
                         </vs-radio>
                     </li>
                 </ul>
             </div>
             <div v-if="type=='file'">
                <div>
                    <label :for="name" >
                        <font-awesome-icon :icon="[icono.pack, icono.icon]" /> {{label}}
                    </label>
                </div>
                <uppy :formId="'smamsmaksmas'"/>
                 <vs-upload  fileName="files" v-bind="settings"  :headers="headers"  text="Upload Multiple" action="http://localhost:1337/upload" @on-success="successUpload" @on-error="erroUpload" />
             </div>
        </div>
</template>

<script>
import uppy from './file'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import vSelect from 'vue-select'

export default {
    components:{
        uppy,
        flatPickr,
        'v-select': vSelect,
    },
    props:{
        icono: Object,
        label : String,
        name: String,
        placeholder : String,
        type: String,
        validate : String,
        data : Array,
        estilo: String,
        settings: Object,
        valor:{
            type:[Object, Array, String, Boolean, Number],
            requerid : true
        }

    },
    data(){
        return {
            headers :{
                'Host': ' http://localhost:8080/',
                'Origin': ' http://localhost:8080/',

            }
        }
    },
    methods:{
     successUpload(data){
     console.log(JSON.parse(data.target.response))
      this.$vs.notify({color:'success',title:'Upload Exitosa',text:'Se subio el archivo'})
    },
    erroUpload(data){
        console.log(data)
        this.$vs.notify({color:'warning',title:'Subida Fallida',text:'se fallo en la subida del archivo'})
    }
  }

}
</script>