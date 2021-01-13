<template>
    <div class="flex flex-row shadow-md p-8 w-full h-full justify-between items-center">
        <p class="w-2/5">{{ encuesta.titulo }} datos</p>
        <div class="flex flex-col w-auto">
            <p>Fecha de inicio : {{encuesta.inicio}}</p>
            <p>Fecha de cierre : {{encuesta.final}}</p>
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
            <div class="w-1/2"><vs-button class="w-10 m-1" icon="book"/></div>
            <div class="w-1/2"><vs-button class="w-10 m-1" icon="analytics"/></div>
            <div class="w-1/2"><vs-button class="w-10 m-1" icon="create"/></div>
            <div class="w-1/2"><vs-button class="w-10 m-1" icon="people"/></div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            encuesta: Object
        },
    }
</script>