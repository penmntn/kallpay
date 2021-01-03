
<template>
    <div id="admin-empresas" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
        <vs-sidebar class="items-no-padding" parent="#admin-empresas" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">
            <component :is="scrollbarTag" class="admin-scroll-area" :settings="settings" :key="$vs.rtl">
                <admin-filtros @closeSidebar="toggleTodoSidebar"></admin-filtros>
            </component>
        </vs-sidebar>
        <div :class="{'sidebar-spacer': clickNotClose}" class="no-scroll-content border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light no-scroll-content">

            <div class="flex d-theme-dark-bg items-center border border-l-0 border-r-0 border-t-0 border-solid d-theme-border-grey-light">

                <!-- TOGGLE SIDEBAR BUTTON -->
                <feather-icon class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer" icon="MenuIcon" @click.stop="toggleTodoSidebar(true)" />

                <!-- SEARCH BAR -->
                <vs-input icon-no-border size="large" icon-pack="feather" icon="icon-search" placeholder="Search..." v-model="searchQuery" class="vs-input-no-border vs-input-no-shdow-focus w-full" />
            </div>

            <!-- TODO LIST -->
            <component :is="scrollbarTag" class="admin-content-scroll-area" :settings="settings" ref="taskListPS" :key="$vs.rtl">
                <transition-group class="admin-list" name="list-enter-up" tag="ul" appear>
                    <div v-for="(item, key) in 100" :key="key">
                        <vs-divider />
                        {{item}}
                    </div>
                </transition-group>
            </component>
            <!-- /TODO LIST -->
        </div>
    </div>
</template>

<script>

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import adminFiltros from  './adminAvisos/filtros.vue'
export default {
  data () {
    return {
      isSidebarActive      : true,
      clickNotClose        : true,
      settings : {
        maxScrollbarLength : 60,
        wheelSpeed         : 0.30
      }
    }
  },
  computed: { 
    scrollbarTag () { return this.$store.getters.scrollbarTag              },
    windowWidth ()  { return this.$store.state.windowWidth                 },
    searchQuery:   {
      get ()    { return this.$store.state.empresaAvisos.BusquedaAvisoConsulta        },
      set (val) { //this.$store.dispatch('todo/setTodoSearchQuery', val)
                console.log(val)
       }
    },
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
  },
  components: {
    VuePerfectScrollbar,
    adminFiltros
  },
}

</script>


<style lang="scss">
@import "@/assets/scss/vuexy/general/admin.scss";

.heigthcustom {
    height: inherit
}

</style>
