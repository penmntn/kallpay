<template>
    <div class="rounded-md relative" id="admin-app">
        <vs-sidebar class="items-no-padding vs-sidebar-rounded" parent="#admin-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">
            <component :is="scrollbarTag" class="admin-scroll-area" :settings="settings" :key="$vs.rtl">
                <div class="flex flex-col p-4">
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
        <div class="flex flex-col w-3/4 h-full space-y-2 no-scroll-contnent" :class="{'sidebar-spacer': clickNotClose}">
            <div class="mb-4 ring-offset-gray-400">
                <div class="shadow-md flex d-theme-dark-bg items-center rounded-lg md:ml-4">
                    <feather-icon class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer" icon="MenuIcon" @click.stop="toggleTodoSidebar(true)" />
                    <vs-input icon-no-border size="large" icon-pack="feather" icon="icon-search" placeholder="Search..." v-model="searchbar" class="vs-input-no-border vs-input-no-shdow-focus w-full " />
                </div>
            </div>
            <component :is="scrollbarTag" class="admin-content-scroll-area" :settings="settings" ref="taskListPS" :key="$vs.rtl">
                    <div v-for="(survey,index) in surveys" :key="index" class="md:ml-4">
                        <tarjeta-encuesta :encuesta="survey" :key="index"/>
                    </div>
            </component>
        </div>
    </div>    
</template>

<script>
    import TarjetaEncuesta from '../../components/tarjetas/TarjetaEncuesta.vue'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        beforeMount: function () {
            console.log('antes de montar')
            this.$http.get('encuestas').then((res) => {
                this.surveys = res.data
                console.log(this.surveys)
            })
        }
        ,
        computed: { 
            scrollbarTag () { return this.$store.getters.scrollbarTag              },
            windowWidth ()  { return this.$store.state.windowWidth                 },
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
        },components:{
            TarjetaEncuesta,
            VuePerfectScrollbar
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
                ],
                isSidebarActive      : true,
                clickNotClose        : true,
                settings : {
                    maxScrollbarLength : 60,
                    wheelSpeed         : 0.30
                },
                searchbar: "",
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
    }

    .vs-sidebar--items {
      border-radius: .5rem;
    }
  }
}
</style>
