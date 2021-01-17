<template>
    <vs-card>
        <div class="flex flex-row p-2 justify-between items-center">
            <p class="w-2/5 text-lg text-primary font-bold">{{ encuesta.Titulo }}</p>
            <div class="flex flex-col w-auto">
                <p><vs-icon icon="calendar_today"/>Fecha de inicio : {{encuesta.FechaInicio}}</p>
                <p><vs-icon icon="calendar_today"/>Fecha de cierre : {{encuesta.FechaFin}}</p>
                <p>Carrera : {{encuesta.carrera}}</p>
                <p>Creada por: {{encuesta.autor}}</p>
            </div>
            <div class="flex flex-col w-auto items-center">
                <p class="text-primary">Participantes</p>
                <p class="text-xl">{{encuesta.numPart}}</p>
                <p class="text-primary">Encuestas Respondidas</p>
                <p class="text-xl">{{encuesta.respondidas}}</p>
            </div>
            <div class="flex flex-wrap w-1/12 h-full">
                <div class="w-1/2"><vs-button class="w-1/4 h-8 m-1" icon="book"/></div>
                <div class="w-1/2"><vs-button class="w-1/4 h-8 m-1" icon="analytics"/></div>
                <div class="w-1/2"><vs-button class="w-1/4 h-8 m-1" icon="create"/></div>
                <div class="w-1/2"><vs-button class="w-1/4 h-8 m-1" icon="people"/></div>
            </div>
        </div>
    </vs-card>
</template>
<script>
    export default {
        props:{
            encuesta: Object
        },
    }
</script>