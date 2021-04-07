<template>
    <div class="flex flex-col h-full">
        <div>
            <span cl>Titulo</span>
            <h1 ref="tituloEncuesta" class="text-center h-12 vs-con-loading__container"> {{ titulo }} </h1>
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
                        <vs-button icon="auto_stories" @click="switchSider(index)"/>
                        <vs-button icon="chat"/>
                    </div>
                </div>
            </vs-card>
        </div>
        <siderp :value="sider" @input="(val) => sider = val"  :ancho="800" :identificador="'sider-respuesta-estudiante'">
            <template v-slot:cuerpo>
                <div v-if="respuestaJson !== null">
                    <survey :survey="respuestaJson" />
                </div>
            </template>
        </siderp>
    </div>    
</template>

<script>
    import query from '../../querys/encuestas'
    import siderp from '../../components/side_bar/siderp.vue'
    import * as SurveyVue from 'survey-vue'
    import "survey-vue/modern.css";
    SurveyVue.StylesManager.applyTheme("modern")
    var Survey = SurveyVue.Survey
    export default {
        methods: {
            switchSider: function (index){
                this.sider = !this.sider
                if( this.sider ){
                    console.log(this.sider)
                    this.$http.post('/graphql', {
                        query: query.rptaEst,
                        variables: {
                            enc: this.$store.state.administrador.encuestaSel,
                            es: this.data.encuesta.respuestas_encuestas[index].id
                        }
                    }).then( (res) => {
                        let model = new SurveyVue.Model(res.data.data.encuesta.EncuestaJson)
                        model.data = res.data.data.encuesta.respuestas_encuestas[0].Respuesta
                        this.respuestaJson = model
                    })
                }
            }
        },
        components: {
            siderp,
            Survey
        },
        data () {
            return {
                data: null,
                sider: false,
                respuestaJson: null
            }
        },
        mounted: function () {
            this.$vs.loading({
                scale:1.25,
                container: this.$refs.listaDeEstudiantesVisor
            })
            this.$vs.loading({
                scale: 0.5,
                container: this.$refs.tituloEncuesta
            })
            this.$http.post('/graphql',{
                query: query.partioEnc,
                variables: { id : this.$store.state.administrador.encuestaSel}
            }).then( (res) => {
                this.data = res.data.data
                console.log(this.data)
                this.$vs.loading.close(this.$refs.listaDeEstudiantesVisor)
                this.$vs.loading.close(this.$refs.tituloEncuesta)
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