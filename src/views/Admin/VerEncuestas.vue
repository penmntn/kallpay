<template>
    <div class=" flex flex-row w-full h-full">
        <div class="flex flex-col w-1/4">
            <p>Estado</p>
            <p>Usuario que publico:</p>
            <vs-input/>
            <p>Fecha de Inicio</p>
            <vs-input/>
            <p>Fecha final</p>
            <vs-input/>
        </div>

        <div class="flex flex-col w-3/4 h-full space-y-2">
            <vs-input class="w-full" icon="search"/>
            <tarjeta-encuesta v-for="(survey,index) in surveys" :encuesta="survey" :key="index"/>
        </div>
    </div>    
</template>

<script>
    import TarjetaEncuesta from '../../components/tarjetas/TarjetaEncuesta.vue'
    export default {
        components:{
            TarjetaEncuesta,
        },
        data() {
            return {
                surveys: [
                    {
                        inicio : "12/12/2021",
                        final : "12/12/2021",
                        carrera : "Ing. Sistemas",
                        autor : "usrAdolfo",
                        numPart : 129,
                        respondidas : 23
                    },  
                    {
                        inicio : "12/12/2021",
                        final : "12/12/2021",
                        carrera : "Ing. Sistemas",
                        autor : "usrAdolfo",
                        numPart : 129,
                        respondidas : 23
                    }
                ]
            }
        }
    }
</script>