<template>
    <div id='page-3-body' class="w-full">
        <div class="flex flex-col h-full">
            <datos-encuesta :renData="{}" v-model="datosEncuestaJson"/> 
            <vs-button icon="search" @click="test"/>
            <editor-encuesta :encuesta="encuesta" @json="guardarEncuesta"/>
        </div>
    </div>
</template>

<script>
    import EditorEncuesta from '../../components/encuesta/EditorEncuesta'
    import DatosEncuesta from '../../components/encuesta/DatosEncuesta'
    import siderp from '../../components/side_bar/siderp.vue'
    import flatPickr from 'vue-flatpickr-component'
    export default {
        components:{
            siderp,
            flatPickr,
            DatosEncuesta,
            EditorEncuesta
        },
        data () {
            return{
                datosEncuestaJson: {},
                carreras: null,
                encuesta: []
            }
        },
        methods:{
            test: function () {
                console.log(this.datosEncuestaJson)
            },
            guardarEncuesta: function (param) {
                this.encuesta = param
                console.log(this.encuesta)
            }
        },
        beforeMount: function () {
            this.$http.get('/escuelas').then((res)=>{
                this.carreras = res.data
            })
        }
    }
</script>

<style lang="scss">
    .ghost-card {
        opacity: 0.5;
        background: #F7FAFC;
        border: 1px solid #4299e1;
    }
    .section-description {
        .vs-con-input{
            input {
                border-top-style: hidden;
            }
        }
    }
</style>