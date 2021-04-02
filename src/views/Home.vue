<template>
  <div>
      <ais-instant-search
          :search-client="searchClient"
          index-name="egresados_aviso_laboral" id="algolia-instant-search-demo">

                  <!-- AIS CONFIG -->
        <ais-configure :enable-rules.camel="false" :hits-per-page.camel="5">
          <div slot-scope="{ searchParameters, refine }">
            <button
              @click="refine({
                ...searchParameters,
                enableRules: !searchParameters.enableRules,
              })"
            >Toggle only query rules</button>
            Currently applied filters:
            <pre>{{ searchParameters }}</pre>
          </div>
        </ais-configure>

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
                <ais-search-box>
                        <div slot-scope="{ currentRefinement, isSearchStalled, refine }">
                          
                            <div class="mb-4 ring-offset-gray-400">
                              
                              <div class="flex d-theme-dark-bg items-center rounded-lg md:ml-4">
                                                         <!-- SEARCH INPUT -->
                                <vs-input class="w-full vs-input-shadow-drop vs-input-no-border d-theme-input-dark-bg" placeholder="Busca aqui" v-model="buscar_titulo" @input="refine($event)" @keyup.esc="refine('')" size="large" />
                                <!-- SEARCH LOADING -->
                                <p :hidden="!isSearchStalled" class="mt-4 text-grey">
                                  <feather-icon icon="ClockIcon" svgClasses="w-4 h-4" class="mr-2 align-middle" />
                                  <span>Loading...</span>
                                </p>

                                <!-- SEARCH ICON -->
                                <div slot="submit-icon" class="absolute top-0 right-0 py-4 px-6" v-show="!currentRefinement">
                                    <feather-icon icon="SearchIcon" svgClasses="h-6 w-6" />
                                </div>

                                <!-- CLEAR INPUT ICON -->
                                <div slot="reset-icon" class="absolute top-0 right-0 py-4 px-6" v-show="currentRefinement">
                                    <feather-icon icon="XIcon" svgClasses="h-6 w-6 cursor-pointer" @click="refine('')" />
                                </div>
                              </div>
         
                            </div>
                        </div>
                </ais-search-box>
                
                  <component :is="scrollbarTag" class="admin-content-scroll-area" :settings="settings" ref="taskListPS" :key="$vs.rtl">
                      <ais-hits>
                            <div slot-scope="{ items }">
                                <template>
                                    <div class="items-list-view mb-6 px-4" v-for="item in items" :key="item.objectID">
                                        <item-list-view :valores="item">
                                        </item-list-view>
                                    </div>
                                </template>
                            </div>
                      </ais-hits>
                  </component> 
                  <!-- /TODO LIST -->
              </div>
          </div>
      </ais-instant-search>
  </div>
</template>

<script>

import siderPerfil from './siders/avisoLaboraL.vue'
import cardAdmin from "./general/cardbolsa.vue"
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import adminFiltros from  './general/filtros.vue'

import {
  AisClearRefinements,
  AisConfigure,
  AisHierarchicalMenu,
  AisHits,
  AisInstantSearch,
  AisNumericMenu,
  AisPagination,
  AisRangeInput,
  AisRatingMenu,
  AisRefinementList,
  AisSearchBox,
  AisSortBy,
  AisStats
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'


export default {
  data() {
    return{ 
       searchClient: algoliasearch(
        'JWX412I666',
        '075501fed52a25ae7a01ec8308fbb8cf'
      ),
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
    ItemListView: () => import('./general/item_grid_view.vue'),
    VuePerfectScrollbar,
    adminFiltros,
    cardAdmin,
    siderPerfil,
    AisClearRefinements,
    AisConfigure,
    AisHierarchicalMenu,
    AisHits,
    AisInstantSearch,
    AisNumericMenu,
    AisPagination,
    AisRangeInput,
    AisRatingMenu,
    AisRefinementList,
    AisSearchBox,
    AisSortBy,
    AisStats
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
