<template>
    <vs-card>
        <div class="flex flex-row p-2 justify-between items-center">
            <p class="w-2/5 text-lg text-primary font-bold">{{ encuesta.Titulo }}</p>
            <div class="flex flex-col w-auto">
                <p><vs-icon icon="calendar_today"/> Fecha de inicio : {{encuesta.FechaInicio}}</p>
                <p><vs-icon icon="calendar_today"/> Fecha de cierre : {{encuesta.FechaFin}}</p>
                <p><vs-icon icon="calendar_today"/> Carrera : </p>
                <div v-for="(item,llave) in encuesta.carreras" :key="llave" class="ml-4">
                    {{ item }}
                </div>
                <p><vs-icon icon="account_box"/> Creada por: {{encuesta.autor}}</p>
            </div>
            <div class="flex flex-col w-auto items-center">
                <p class="text-primary">Participantes</p>
                <p class="text-xl">{{encuesta.numPart}}</p>
                <p class="text-primary">Encuestas Respondidas</p>
                <p class="text-xl">{{encuesta.respondidas}}</p>
            </div>
            <div class="flex flex-wrap w-1/12 h-full">
                <div class="w-1/2"><vs-button class="w-1/4 h-8 m-1" icon="book" @click="respuestas"/></div>
                <div class="w-1/2"><vs-button class="w-1/4 h-8 m-1" icon="analytics" @click="estadistica"/></div>
                <div class="w-1/2"><vs-button class="w-1/4 h-8 m-1" icon="create" @click="editar"/></div>
                <div class="w-1/2"><vs-button class="w-1/4 h-8 m-1" icon="people" @click="estudiantes"/></div>
            </div>
        </div>
    </vs-card>
</template>
<script>
    export default {
        props:{
            encuesta: Object
        },
        methods:{
            editar: function () {
                console.log('hello world')
                console.log(this.encuesta.id)
                this.$store.commit('administrador/SET_ENCUESTA_SEL', this.encuesta.id)
                this.$emit('editar',true)
                
            },
            respuestas: function () {
                this.$emit('respuestas', true, this.encuesta.encuestaJson, this.encuesta.respuestasTemp)
                this.$store.commit('administrador/SET_DATOS_ENCUESTA', this.encuesta)
                this.$store.commit('administrador/SET_ENCUESTA_SEL', this.encuesta.id)
            },
            estadistica: function () {
                this.$store.commit('administrador/SET_ENCUESTA_SEL', this.encuesta.id)
                this.$emit('estadistica', true)
            },
            estudiantes: function () {
                this.$emit('estudiantes', true)
                this.$store.commit('administrador/SET_ENCUESTA_SEL', this.encuesta.id)
                //this.$store.commit("administrador/SET_ENCUESTA_SEL", this.encuesta.encuestaJson)
                this.$store.commit("administrador/SET_RESPUESTAS_SEL", this.encuesta.respuestas_encuestas)
                this.$store.commit('administrador/SET_DATOS_ENCUESTA', this.encuesta)
            }
        },
        data () {
            return {
            }
        }

    }
</script>