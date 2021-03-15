<template>
    <div class="flex flex-col">
        <div>
            <h1> {{ titulo }} </h1>
        </div>
        <div>
            <vs-input icon="search" placeholder="busqueda" class="w-full mx-2"/>
        </div>
        <vs-card class="mx-2 my-1">
            <div class="flex flex-row items-center justify-self-center ">
                <span class="w-1/3 flex flex-row"> Nombres y Apellidos</span>
                <span class="w-1/3 flex flex-row"> Codigo    </span>
                <span class="w-1/6 flex flex-row"> Completado </span>
            </div>
        </vs-card>
        <vs-card v-for="(estudiante,index) in estudiantes" :key="index" class="mx-2 my-1">
            <div class="flex flex-row items-center justify-self-center">
                <span class="w-1/3"> {{ estudiante.Apellidos + ' ' +  estudiante.Nombres }}</span>
                <span class="w-1/3"> {{ estudiante.codigo }}</span>
                <vs-checkbox v-model="estudiante.completado" color="rgb(92,153,200)" class="w-1/6"/>
                <div class="flex flex-row space-x-2 justify-end self-end">
                    <vs-button icon="auto_stories"/>
                    <vs-button icon="chat"/>
                </div>
            </div>
        </vs-card>
    </div>    
</template>

<script>
    export default {
        data () {
            return {
                estudiantes: []
            }
        },
        mounted: function () {
            for (var res of  this.$store.state.administrador.respuestasSel){
                this.$http.get('/estudiantes/'+ res.estudiante).then((data) =>{
                    this.estudiantes.push(data.data.persona)
                    this.estudiantes[this.estudiantes.length - 1].codigo = data.data.CodigoEstudiante
                    this.estudiantes[this.estudiantes.length - 1].completado = res.Completado             
                })
            }
        },
        computed:{
            titulo: function () {
                return this.$store.state.administrador.datosEncuesta.Titulo
            }
        }
    }
</script>