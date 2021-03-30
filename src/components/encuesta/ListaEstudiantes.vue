<template>
    <div class="flex flex-col h-full">
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
        <div ref="listaDeEstudiantesVisor" class="flex flex-col h-full vs-con-loading__container" >
            <vs-card v-for="(estudiante,index) in estudiantes" :key="index" class="mx-2 my-1">
                <div class="flex flex-row items-center justify-self-center">
                    <span class="w-1/3"> {{ estudiante.estudiante.persona.Apellidos + ' ' +  estudiante.estudiante.persona.Nombres }}</span>
                    <span class="w-1/3"> {{ estudiante.estudiante.CodigoEstudiante }}</span>
                    <vs-checkbox v-model="estudiante.Completado" color="rgb(92,153,200)" class="w-1/6"/>
                    <div class="flex flex-row space-x-2 justify-end self-end">
                        <vs-button icon="auto_stories"/>
                        <vs-button icon="chat"/>
                    </div>
                </div>
            </vs-card>
        </div>
    </div>    
</template>

<script>
    import query from '../../querys/encuestas'
    export default {
        data () {
            return {
                data: null
            }
        },
        mounted: function () {
            this.$vs.loading({
                scale:1.25,
                container: this.$refs.listaDeEstudiantesVisor
            })
            this.$http.post('/graphql',{
                query: query.partioEnc,
                variables: { id : this.$store.state.administrador.encuestaSel}
            }).then( (res) => {
                this.data = res.data.data
                this.$vs.loading.close(this.$refs.listaDeEstudiantesVisor)
                console.log(this.data)
            })
        },
        computed:{
            titulo: function () {
                return (this.data == null) ? '' : this.data.encuesta.Titulo
            },
            estudiantes: function () {
                return (this.data == null) ? '' : this.data.encuesta.respuestas_encuestas
            }
        }
    }
</script>