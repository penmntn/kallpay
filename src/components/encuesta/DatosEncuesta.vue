<template>
    <div class="relative">
        <vs-button class="absolute top-0 right-0 " @click="() => show = !show">mostrar</vs-button>
        <p class="text-center">Encuesta</p>
        <div v-if="!show">
            son troudeson la fun de la season
        </div>
        <vs-card v-else>
            <div class="flex flex-col w-full space-y-2">
                <vs-input class="w-full" label="Titulo" v-model="value.Titulo"/>
                <vs-textarea label="Descripcion" v-model="value.Descripcion"/>
                <p>Fechas</p>
                <div class="flex flex-row space-x-2">
                    <flat-pickr v-model="value.FechaInicio" class=""/>
                    <flat-pickr v-model="value.FechaFin" class=""/>
                </div>
                <p>Publico objetivo</p>
                <div class="flex flex-row flex-wrap space-x-3">
                    <vs-select label="Estado del estudiante" class="">
                        <vs-select-item v-for="(estado, index) in estadosEst" :key="index" :text="estado" :value="estado"/>
                    </vs-select>
                    <!-- <vs-select label="hasta:" class="">
                        <vs-select-item v-for="(ciclo, index) in renData.ciclos" :key="index"/>
                    </vs-select>
                    <vs-select label="Escuela's" class="">
                        <vs-select-item v-for="(escuela, index) in renData.escuelas" :key="index"/>
                    </vs-select> -->
                </div>
                
            </div>
        </vs-card>
    </div>
</template>
<script>
    import flatPickr from 'vue-flatpickr-component'
    export default {
        mounted: function () {
            this.estadosEst = ['Estudiante','Egresado']
        },
        methods:{
        },
        props: {
            value: Object,
        },
        components:{
            flatPickr
        },
        data () {
            return{
                show: true,
                trash: "trash",
                estadosEst: null
            }   
        }
    }
</script>