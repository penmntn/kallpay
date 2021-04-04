<template>
    <div class="rounded-md relative" id="admin-app">
        <vs-sidebar  class="items-no-padding vs-sidebar-rounded" parent="#admin-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">
            <component :is="scrollbarTag" class="admin-scroll-area" :settings="settings" :key="$vs.rtl">
                <div class="flex flex-col p-4 space-y-2" id="filter-box-encuesta-module">
                    <span>Estado</span>
                    <div>
                        <vs-icon icon="person_outline" class="self-end" size="small"/>
                        <span class="align-top">Usuario que publico:</span>
                    </div>
                    <vs-select v-model="adminSel" class="w-full">
                        <vs-select-item :key="index" v-for="(admin, index) in admins" :text="admin.Rol_Carrera" :value="admin.id"/>
                    </vs-select>
                    <div>
                        <vs-icon icon="calendar_today" size="small"/>
                        <span class="align-top">Publiicado desde el:</span>
                    </div>
                    <flat-pickr v-model="filtroFI"/>
                    <div>
                        <vs-icon icon="calendar_today" size="small"/>
                        <span class="align-top">Hasta:</span>
                    </div>
                    <flat-pickr v-model="filtroFF" :config="fechaMinima"/>
                    <vs-button class="mt-4 ">Quitar filtros</vs-button>
                    
                </div>
            </component>
        </vs-sidebar>
        <div class="flex flex-col w-3/4 h-full space-y-2 no-scroll-content" :class="{'sidebar-spacer': clickNotClose}">
            <div class="mb-4 ring-offset-gray-400">
                <div class="shadow-md flex flex-row d-theme-dark-bg items-center rounded-lg md:ml-4 h-full">
                    <vs-input icon-no-border size="large" icon-pack="feather" placeholder="Search..." v-model="searchbar" class=" vs-input-no-border vs-input-no-show-focus w-full" @keydown.enter="buscar"/>
                    <vs-button icon="search" class=" h-full rounded-l-none w-1/12" @click="buscar"/>
                </div>
            </div>
            <component :is="scrollbarTag" class="admin-content-scroll-area" :settings="settings" :key="$vs.rtl">
                <div ref="taskListPS" class="absolute h-full w-full vs-con-loading__container">
                </div>
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
                <visor-encuesta v-if="switchVisE"/>
            </template>
        </siderp>

        <siderp :value="switchEstE" :ancho="800" @input="(val) => switchEstE = val" :identificador="'estadisticas-encuesta-sider'">
            <template v-slot:cuerpo>
                <estadisticas-encuesta v-if="switchEstE"/>
            </template>
        </siderp>

        <siderp :value="switchLisE" :ancho="1000" @input="(val) => switchLisE = val" :identificador="'lista-estudiantes-encuesta'">
            <template v-slot:cuerpo>
                <lista-estudiantes v-if="switchLisE" class=""/>
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
    import queryA from '../../querys/administrador'
    import flatPickr from 'vue-flatpickr-component'
    export default {
        beforeMount: function () {
        },
        mounted: function () {
            this.$vs.loading({
                container: this.$refs.taskListPS,
                scale: 1
            })
            let position = document.getElementById('filter-box-encuesta-module').getBoundingClientRect()
            document.getElementById('admin-app').style.height = (window.screen.availHeight - position.top - position.height/2 - 50 ).toString() + 'px'
            this.$http.post('/graphql',{'query': query.datgenEncuestas}).then( (res) => {
                this.surveys = res.data.data.encuestas
                this.$vs.loading.close(this.$refs.taskListPS)
            })
            this.$http.post('/graphql',{
                query: queryA.administradores,
            }).then((res) => {
                this.admins = res.data.data.administradorEscuelas
            })
        },
        computed: { 
            scrollbarTag () { return this.$store.getters.scrollbarTag},
            windowWidth ()  { return this.$store.state.windowWidth},
            searchQuery:   {
                get ()    { return this.$store.state.empresa.queryFiltrarAvisos  },
                set (val) { console.log(val) }
            },
            anuncios() {
                return this.$store.state.empresa.AvisoLaborales
            },
            fechaMinima: function () {
                return {
                    minDate: this.filtroFI
                }
            }

        },
        watch: {
            windowWidth () {
                this.setSidebarWidth()
            },
            adminSel: function () {
                this.buscarFiltro()
            },
            filtroFF: function (newData) {
                console.log(newData)
                this.buscarFiltro()
            },
            filtroFI: function () {
                this.buscarFiltro()
            }
        },
        methods: {
            buscarFiltro: function (){
                this.$vs.loading({
                    container: this.$refs.taskListPS,
                    scale: 1
                })
                let vars = {}
                if(this.adminSel != null){
                    vars.admin = this.adminSel
                }
                if(this.filtroFI != null && this.filtroFI != ''){
                    vars.fechaI = this.filtroFI
                }
                if(this.filtroFF != null && this.filtroFF != ''){
                    vars.fechaF = this.filtroFF
                }
                if(this.searchbar != null){
                    vars.titulo = this.searchbar
                }
                console.log(vars)
                this.$http.post('/graphql',{
                    query: query.filtroEnc,
                    variables: vars
                }).then((res)=>{
                    this.surveys = res.data.data.encuestas
                    this.$vs.loading.close(this.$refs.taskListPS)
                })
            },
            updateEncuesta: function (enc) {
                this.$http.post('/graphql',{
                    query : query.updateEncuesta,
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
                this.$vs.loading({
                    container: this.$refs.taskListPS
                })
                let res = await this.$http.post('/graphql',{
                    query: query.queryBusquedatitulo,
                    variables: {
                        titulo: this.searchbar
                    }
                })
                this.surveys = res.data.data.encuestas
                this.$vs.loading.close(this.$refs.taskListPS)
            },
            editar: function (temp) {
                this.$http.post('/graphql',{
                    query : query.encuestaJson, 
                    variables: {id :this.$store.state.administrador.encuestaSel} 
                }).then( (res) => {
                    this.encuestaResJson = res.data.data.encuesta.EncuestaJson.pages
                    this.switchEdiE = temp
                })
            },
            verEst: function (temp) {
                this.switchEstE = temp
            },
            verRes: function (temp) {
                this.switchVisE = temp
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
            sider,
            flatPickr,
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
                filtroFF: null,
                filtroFI: null,
                switchEdiE: false,
                switchVisE: false,
                switchEstE: false,
                switchLisE: false,
                encuestaResJson: null,
                admins: [],
                adminSel: null
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
