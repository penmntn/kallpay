
<template>
    <div>
      <ais-instant-search   :search-client="searchClient" index-name="egresados_estudiante" id="algolia-instant-search-demo">
          <ais-configure :hits-per-page.camel="9" />

            <div id="admin-app" class=" rounded-md relative">

                <sider-perfil></sider-perfil>

                <div class="shadow-md rounded-md">
                    <vs-sidebar class="items-no-padding vs-sidebar-rounded" parent="#admin-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">
                        
                        <div class="header-sidebar" slot="header">
                            <div class="flex items-center">
                                <span class="text-2xl font-bold text-primary"> Filtros </span>
                            </div>
                        </div>
                        
                        <component :is="scrollbarTag" class="admin-scroll-area" :settings="settings" :key="$vs.rtl">
                            <admin-filtros @closeSidebar="toggleTodoSidebar"></admin-filtros>
                        </component>
     
      
                        <div class="footer-sidebar" slot="footer">
                            <ais-clear-refinements class="flex justify-center">
                              <vs-button class="w-full" slot-scope="{ canRefine, refine}"  icon="reply" color="primary" type="flat" @click.prevent="clear_chips(refine)" :disabled="!canRefine" >Limpiar Filtros</vs-button>
                          </ais-clear-refinements>
                        </div>

                    </vs-sidebar>
                </div>

              <div :class="{'sidebar-spacer': clickNotClose}" class="no-scroll-content  no-scroll-content" >
                
                <ais-search-box v-if="searchBox"  >
                        <div slot-scope="{ currentRefinement, isSearchStalled, refine }">
                          
                            <div class="mb-4 ring-offset-gray-400">
                              
                              <div class="flex d-theme-dark-bg items-center rounded-lg md:ml-4">
                                                         <!-- SEARCH INPUT -->
                                <vs-input class="w-full vs-input-shadow-drop vs-input-no-border d-theme-input-dark-bg" placeholder="Busca aqui" v-model="searchQuery" @input="deboun_search_query(refine, $event)" @keyup.esc="deboun_search_query(refine, '')" size="large" />
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


                <chips-filters ></chips-filters>

                <component :is="scrollbarTag" class="base-content-scroll-area" :settings="settings" ref="taskListPS" :key="$vs.rtl">
                          <ais-hits>
                              <div slot-scope="{items}"> 
                                  <template>
                                      <div class="items-list-view mb-4 md:ml-4" v-for="(item) in items" :key="item.objectID">
                                          <card-admin :valores="item"></card-admin>
                                      </div>
                                  </template> 
                              </div>
                          </ais-hits>
                </component>

                <ais-pagination>
                        <div slot-scope="{
                                currentRefinement,
                                nbPages,
                                refine,
                            }"
                        >

                        <vs-pagination

                            :total="nbPages"
                            :max="7"
                            :value="currentRefinement + 1"
                            @input="(val) => { refine(val - 1) }" />
                        </div>
                  </ais-pagination>

                </div>
            </div>


      </ais-instant-search>
    </div>
</template>

<script>

import siderPerfil from '../siders/cvPostulante.vue'
import chipsFilters from '@/components/chips_filter/chip.vue'
import cardAdmin from "./busquedaenBase/card"
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import adminFiltros from  './busquedaenBase/filter.vue'
import {debounce} from 'lodash'

import {
  AisAutocomplete,
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
  AisStats,
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'

export default {
  props: {
    searchBox: { type : Boolean , default : false}
  },
  data() {
    return{ 
      searchClient: algoliasearch(
        'JWX412I666',
        '075501fed52a25ae7a01ec8308fbb8cf'
      ),
      isSidebarActive      : true,
      clickNotClose        : true,
      searchQuery : "", 
      settings : {
        maxScrollbarLength : 60,
        wheelSpeed         : 0.30
      }
    }
  },
  computed: { 
    scrollbarTag () { return this.$store.getters.scrollbarTag              },
    windowWidth ()  { return this.$store.state.windowWidth                 },
     ttashahsahsb(){  return this.$store.state.empresa.chip_filter}
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
    deboun_search_query : debounce(function(refine, val ){
      refine(val)
    }, 500, false),
    clear_chips(refine){
      refine()
      this.$store.commit('empresa/CLEAR_ALL_CHIPS', this)
    }
  },
  beforeDestroy(){
    this.$store.commit('empresa/DESTROY_ALL_CHIPS')
  },
  components: {
    VuePerfectScrollbar,
    adminFiltros,
    cardAdmin,
    siderPerfil,
    AisAutocomplete,
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
    AisStats,
    chipsFilters
  }
}

</script>


<style lang="scss" >
@import "@/assets/scss/vuexy/general/admin.scss";

  .base-content-scroll-area {
      position: relative;
      margin: auto;
      width: 100%;
      height: calc(100% - 30px);

      &:not(.ps) {
        overflow-y: auto;
      }
  }

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
  
    .footer-sidebar{
        justify-content: space-between;
        width: 100%
    }
}
</style>
