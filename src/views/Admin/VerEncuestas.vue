<template>
    <div class="rounded-md relative" id="admin-app">
        <vs-sidebar  class="items-no-padding vs-sidebar-rounded" parent="#admin-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">
            <component :is="scrollbarTag" class="admin-scroll-area" :settings="settings" :key="$vs.rtl">
                <div class="flex flex-col p-4" id="filter-box-encuesta-module">
                    <p>Estado</p>
                    <p>Usuario que publico:</p>
                    <vs-input/>
                    <p>Fecha de Inicio</p>
                    <vs-input/>
                    <p>Fecha final</p>
                    <vs-input/>
                </div>
            </component>
        </vs-sidebar>
        <div class="flex flex-col w-3/4 h-full space-y-2 no-scroll-content" :class="{'sidebar-spacer': clickNotClose}">
            <div class="mb-4 ring-offset-gray-400">
                <div class="shadow-md flex flex-row d-theme-dark-bg items-center rounded-lg md:ml-4 h-full">
                    <vs-input icon-no-border size="large" icon-pack="feather" placeholder="Search..." v-model="searchbar" class=" vs-input-no-border vs-input-no-show-focus w-full" @keydown.enter="buscar"/>
                    <vs-button icon="search" class=" border-solid h-full rounded-l-none w-1/12" @click="buscar"/>
                </div>
            </div>
            <component :is="scrollbarTag" class="admin-content-scroll-area" :settings="settings" ref="taskListPS" :key="$vs.rtl">
                    <div v-for="(survey,index) in surveys" :key="index" class="md:ml-4">
                        <tarjeta-encuesta :encuesta="survey" :key="index" @editar="editar" @estadistica="verEst" @respuestas="verRes" @estudiantes="verLis"/>
                    </div>
            </component>
        </div>
        
        <siderp :value="switchEdiE" :ancho="800" @input="(val) => switchEdiE = val" :identificador="'editor-encuesta-sider'">
            <template v-slot:cuerpo>
                <editor-encuesta v-if="switchEdiE" :encuesta="encuestaResJson" @json="updateEncuesta"/>
            </template>
        </siderp>

        <siderp :value="switchVisE" :ancho="800" @input="(val) => switchVisE = val" :identificador="'visor-encuesta-sider'">
            <template v-slot:cuerpo>
                <visor-encuesta v-if="switchVisE" :json="encuestaResJson" :respuestas="encuestaTemp"/>
            </template>
        </siderp>

        <siderp :value="switchEstE" :ancho="800" @input="(val) => switchEstE = val" :identificador="'estadisticas-encuesta-sider'">
            <template v-slot:cuerpo>
                <estadisticas-encuesta/>
            </template>
        </siderp>

        <siderp :value="switchLisE" :ancho="800" @input="(val) => swtichLisE = val" :identificador="'lista-estudiantes-encuesta'">
            <template v-slot:cuerpo>
                <lista-estudiantes v-if="switchLisE"/>
            </template>
        </siderp>
    </div>
</template>

<script>
    import TarjetaEncuesta from '../../components/tarjetas/TarjetaEncuesta.vue'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import siderp from '../../components/side_bar/siderp.vue'
    import sider from '../../components/side_bar/sider.vue'
    import EditorEncuesta from '../../components/encuesta/EditorEncuesta.vue'
    import VisorEncuesta from '../../components/encuesta/VisorEncuesta.vue'
    import EstadisticasEncuesta from '../../components/encuesta/EstadisticasEncuesta.vue'
    import ListaEstudiantes from '../../components/encuesta/ListaEstudiantes.vue'
    import query from '../../querys/encuestas.js'
    export default {
        beforeMount: function () {
            console.log('antes de montar')
            this.$http.get('encuestas').then((res) => {
                this.surveys = res.data
                console.log(this.surveys)
            })
        },
        mounted: function () {
            let position = document.getElementById('filter-box-encuesta-module').getBoundingClientRect()
            document.getElementById('admin-app').style.height = (window.screen.availHeight - position.top - position.height/2 - 50 ).toString() + 'px'
        },
        computed: { 
            scrollbarTag () { return this.$store.getters.scrollbarTag},
            windowWidth ()  { return this.$store.state.windowWidth},
            searchQuery:   {
            get ()    { return this.$store.state.empresa.queryFiltrarAvisos  },
            set (val) { //this.$store.dispatch('todo/setTodoSearchQuery', val)
                        console.log(val)
            }
            },
            anuncios() {
            return this.$store.state.empresa.AvisoLaborales
            }

        },
        watch: {
            windowWidth () {
            this.setSidebarWidth()
            }
        },
        methods: {
            updateEncuesta: function (enc) {
                console.log('this bottom was pressed')
                this.$http.post('/graphql',{
                    query : query.updateEncuesta(),
                    variables: {
                        input: {
                            where: {
                                id: this.$store.state.administrador.datosEncuesta.id
                            },
                            data: {
                                EncuestaJson: {
                                    pages: enc
                                }
                            }
                        }
                    }
                })
            },
            buscar: async function () {
                let res = await this.$http.post('/graphql',{
                    'query': query.queryBusquedatitulo(this.searchbar)
                })
                console.log('buscars works')
                this.surveys = res.data.data.encuestas
            },
            editar: function (temp) {
                this.switchEdiE = temp
                this.encuestaResJson = this.$store.getters['administrador/getEncuestaSel']
            },
            verEst: function (temp) {
                console.log(temp)
                this.switchEstE = temp
            },
            verRes: function (temp, enc, res) {
                this.encuestaResJson = enc
                this.switchVisE = temp
                this.encuestaTemp = res
            },
            verLis: function (temp){
                this.switchLisE = temp
            },
            setSidebarWidth () {
            if (this.windowWidth < 992) {
                this.isSidebarActive = this.clickNotClose = false
            } else {
                this.isSidebarActive = this.clickNotClose = true
            }
            },
            toggleTodoSidebar (value = false) {
            if (!value && this.clickNotClose) return
            this.isSidebarActive = value
            }
        },
        components:{
            TarjetaEncuesta,
            VuePerfectScrollbar,
            siderp,
            EditorEncuesta,
            VisorEncuesta,
            EstadisticasEncuesta,
            ListaEstudiantes,
            sider
        },
        data() {
            return {
                surveys: [],
                isSidebarActive      : true,
                clickNotClose        : true,
                settings : {
                    maxScrollbarLength : 60,
                    wheelSpeed         : 0.30
                },
                searchbar: "",
                switchEdiE: false,
                switchVisE: false,
                switchEstE: false,
                switchLisE: false,
                encuestaResJson: null
                
            }
        },

    }
</script>

<style lang="scss" >
@import "@/assets/scss/vuexy/general/admin.scss";



@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar {
      border-radius: .5rem;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
      height: 500px;
    }

    .vs-sidebar--items {
      border-radius: .5rem;
    }
  }
}

</style>
