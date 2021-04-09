<template>
    <div class="flex flex-col h-full">
        <div>
            <span cl>Titulo</span>
            <h1 ref="tituloEncuesta" class="text-center h-12 vs-con-loading__container"> {{ TituloEncuesta }} </h1>
        </div>  
        <vs-card class="mx-2 my-1">
            <div class="flex flex-row items-center justify-self-center space-x-2">
                <div class="w-1/5 flex flex-col">
                    <div class="flex flex-row">
                        <vs-input v-model="searchApellidos" @keydown.enter="busquedaNomyApe" class="w-full"/>
                        <vs-button icon="search"/>
                    </div>
                    <span class="text-lg"> Apellidos </span>
                </div>
                <div class="w-1/5 flex flex-col">
                    <vs-input icon="search" v-model="searchNombres" @keydown.enter="busquedaNomyApe"/>
                    <span class="text-lg"> Nombres </span>
                </div>
                <div class="w-1/5 flex flex-col">
                    <vs-input icon="search" v-model="searchCodigo" @keydown.enter="busquedaCodigo"/>
                    <span class="text-lg"> Codigo </span>
                </div>
                <div class="w-1/5 flex flex-col">
                    <span class="text-lg"> Completado </span>
                </div>
            </div>
        </vs-card>
        <div ref="listaDeEstudiantesVisor" class="flex flex-col h-full vs-con-loading__container " >
            <vs-card v-for="(estudiante,index) in estudiantes" :key="index" class="mx-2 my-1 ">
                <div class="flex flex-row items-center justify-self-center space-x-8">
                    <span class="w-1/5"> {{ estudiante.estudiante.persona.Apellidos }}</span>
                    <span class="w-1/5"> {{ estudiante.estudiante.persona.Nombres }}</span>
                    <span class="w-1/5"> {{ estudiante.estudiante.CodigoEstudiante }}</span>
                    <div class="w-1/5">
                        <vs-checkbox v-model="estudiante.Completado" color="rgb(92,153,200)" class="self-center"/>
                    </div>
                    <div class="flex flex-row justify-center space-x-4 w-1/5">
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
            },
            busquedaCodigo: function () {
                this.$vs.loading({
                    scale:1.25,
                    container: this.$refs.listaDeEstudiantesVisor
                })
                this.$http.post('/graphql',{
                    query: query.estpCodigo,
                    variables: {
                        enc: this.$store.state.administrador.encuestaSel,
                        es: this.searchBar
                    }
                }).then( (res) => {
                    this.data = res.data.data
                    this.$vs.loading.close(this.$refs.listaDeEstudiantesVisor)
                })
            },
            busquedaNomyApe: function () {
                this.$vs.loading({
                    scale:1.25,
                    container: this.$refs.listaDeEstudiantesVisor
                })
                this.$http.post('/graphql',{
                    query: query.filtroEstL,
                    variables: {
                        enc: this.$store.state.administrador.encuestaSel,
                        nombres: this.searchNombres,
                        apellidos: this.searchApellidos
                    }
                }).then( (res) => {
                    this.data = res.data.data
                    this.$vs.loading.close(this.$refs.listaDeEstudiantesVisor)
                })
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
                respuestaJson: null,
                searchApellidos: '',
                searchNombres: '',
                searchCodigo: null,
                TituloEncuesta: null,

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

                this.TituloEncuesta = res.data.data.encuesta.Titulo
                this.$vs.loading.close(this.$refs.listaDeEstudiantesVisor)
                this.$vs.loading.close(this.$refs.tituloEncuesta)
            })
        },
        computed:{
            estudiantes: function () {
                return (this.data == null) ? '' : this.data.encuesta.respuestas_encuestas
            }
        }
    }
</script>