
<template>
    <div id="admin-app" class=" rounded-md relative">

        <sider-perfil></sider-perfil>
        <div class="shadow-md rounded-md">
            <vs-sidebar class="items-no-padding vs-sidebar-rounded" parent="#admin-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">
                <component :is="scrollbarTag" class="admin-scroll-area" :settings="settings" :key="$vs.rtl">
                    <admin-filtros @closeSidebar="toggleTodoSidebar" @filter-actua="actualizando_filtro"></admin-filtros>
                </component>
             </vs-sidebar>
        </div>
        <div :class="{'sidebar-spacer': clickNotClose}" class="no-scroll-content  no-scroll-content">
            <div class="mb-4 ring-offset-gray-400">
                <div class="shadow-md flex d-theme-dark-bg items-center rounded-lg md:ml-4">
                    <!-- TOGGLE SIDEBAR BUTTON -->
                    <feather-icon class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer" icon="MenuIcon" @click.stop="toggleTodoSidebar(true)" />
                    <!-- SEARCH BAR -->
                    <vs-input icon-no-border size="large" icon-pack="feather" icon="icon-search" placeholder="Search..." v-model="buscar_titulo" class="vs-input-no-border vs-input-no-shdow-focus w-full " />
                </div>
            </div>
            <!-- TODO LIST -->
            {{filtro}}
            <component :is="scrollbarTag" class="admin-content-scroll-area" :settings="settings" ref="taskListPS" :key="$vs.rtl">
                <div v-for="(item, key) in avisos" :key="key" class="md:ml-4">
                    <card-admin :valores="item" ></card-admin>
                </div>
            </component>
            <!-- /TODO LIST -->
        </div>
    </div>
</template>

<script>

import siderPerfil from './siders/avisoLaboraL.vue'
import cardAdmin from "./general/cardbolsa.vue"
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import adminFiltros from  './general/filtros.vue'

export default {
  data() {
    return{ 
      filtro_res : {},
      buscar_titulo: "",
      isSidebarActive      : true,
      clickNotClose        : true,
      settings : {
        maxScrollbarLength : 60,
        wheelSpeed         : 0.30
      }
    }
  },
  computed: { 
    scrollbarTag () { return this.$store.getters.scrollbarTag                   },
    windowWidth ()  { return this.$store.state.windowWidth                      },
    filtro() { return { titulo: this.buscar_titulo , ...this.filtro_res}        }  ,
    avisos() {
        try {
            return this.$store.state.general.BolsaTrabajo
        } catch (error) {
            return []
        }
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
    },
    actualizando_filtro(val){
        this.filtro_res = val
    },

  },
  components: {
    VuePerfectScrollbar,
    adminFiltros,
    cardAdmin,
    siderPerfil
  },
  created () {
    this.$store.dispatch('general/getListaOportunidades' , {start: 0 , limit : 25 })
  }
  
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
