<template>
    <div>
        <div class="m-4  border-dashed rounded-lg border-2 border-opacity-75">
            <vs-upload
            :id="getFieldID(schema)"
            fileName="files"
            v-bind="schema.settings"
            text="Subida de Archivos"
            :action="dir"
            @on-success="successUpload"
            @on-error="erroUpload" />
        </div>
    </div>
</template>

<script>
import abstractField from "../abstractField";
// eslint-disable-next-line no-unused-vars
import {  exists , compact , concat, debounce, get as objGet, isFunction, isNumber } from "lodash";

export default {
    mixins:[abstractField],
    data(){
        return {
            dir : 'http://localhost:1337/upload',
            resultado: []
        }
    },
    methods:{
    successUpload(data){
        console.log(JSON.parse(data.target.response))
        try{
            if(this.schema.settings.multiple){
                var result = concat(JSON.parse(data.target.response), this.resultado)
                this.resultado = compact(result)
            }
            else{
                this.resultado = JSON.parse(data.target.response)
            }
        }
        catch{
            this.resultado = JSON.parse(data.target.response)
        }
        this.value = this.resultado
        this.$vs.notify({color:'success',title:'Subida Exitosa',text:'Se subio el archivo'})
    },
    erroUpload(data){
        console.log(data)
        this.$vs.notify({color:'warning',title:'Subida Fallida',text:'se fallo en la subida del archivo'})
    }
  }
}
</script>