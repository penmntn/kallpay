<template>
    <div class="rounded-md relative h-screen" id="modulo-avisosLaborales">
        <vs-sidebar class="items-no-padding vs-sidebar-rounded" parent="#modulo-avisosLaborales" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">
            <component :is="scrollbarTag" class="admin-scroll-area" :settings="settings" :key="$vs.rtl">
                <div>
                    Fitros
                </div>
            </component>
        </vs-sidebar>
        <div class="flex flex-col w-3/4 h-full space-y-2 no-scroll-content " :class="{'sidebar-spacer': clickNotClose}">
            <div class="mb-4 ring-offset-gray-400">
                <div class="shadow-md flex flex-row d-theme-dark-bg items-center rounded-lg md:ml-4 h-full">
                    <vs-input icon-no-border size="large" icon-pack="feather" placeholder="Search..." v-model="searchbar" class=" vs-input-no-border vs-input-no-show-focus w-full" @keydown.enter="buscar"/>
                    <vs-button icon="search" class=" h-full rounded-l-none w-1/12" @click="buscar"/>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    export default {
        components: {
            VuePerfectScrollbar
        },
        computed: {
            scrollbarTag () { return this.$store.getters.scrollbarTag},
            windowWidth ()  { return this.$store.state.windowWidth},
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
            buscar: function () {
                console.log('data')
            }
        },
        data () {
            return{
                isSidebarActive      : true,
                clickNotClose        : true,
                settings : {
                    maxScrollbarLength : 60,
                    wheelSpeed         : 0.30
                },
                searchbar: ''
            }
        },
        watch:{
            windowWidth () {
                this.setSidebarWidth()
            }
        },
        mounted: function () {
            this.$http.get()
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
      height: 500px;
    }

    .vs-sidebar--items {
      border-radius: .5rem;
    }
  }
}

</style>