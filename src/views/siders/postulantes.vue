<template>
	<div>
		<sider-p identificador="LISTAPOSTULANTE" :ancho="1200" >
            <template slot="cuerpo"> 
                <div class="bg-gray-100 h-screen px-4">
                    <div class="w-full py-2">
                        <div class="text-center">
                            <span class="text-2xl text-primary font-bold">  {{titulo}} </span>
                        </div>
                    </div>
                    <div class="mb-4 ring-offset-gray-400">
                        <div class=" shadow-md flex d-theme-dark-bg items-center rounded-lg md:ml-4">
                            <!-- TOGGLE SIDEBAR BUTTON -->
                            <feather-icon class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer" icon="MenuIcon" @click.stop="toggleTodoSidebar(true)" />

                            <!-- SEARCH BAR -->
                            <vs-input icon-no-border size="large" icon-pack="feather" icon="icon-search" placeholder="Search..." v-model="searchQuery" class="vs-input-no-border vs-input-no-shdow-focus w-full " />
                        </div>
                    </div>
                     <component :is="scrollbarTag" class="admin-content-scroll-area" :settings="settings" ref="taskListPS" :key="$vs.rtl">
                       <div v-for="(item, key) in postulantes" :key="key" class="md:ml-4">
                            <card-p :valores="item"></card-p>
                        </div>
                    </component>
                </div>
            </template>
        </sider-p>
	</div>
</template>
<script>

import siderP from "@/components/side_bar/sider.vue"
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import cardP from '@/views/empresa/adminPostulantes/card.vue'

export default {
    data(){
        return{
            settings: {
                maxScrollbarLength : 60,
                wheelSpeed         : 0.30
            },
            searchQuery : ""
        }
    },
    components: {
        siderP,
        VuePerfectScrollbar,
        cardP
    },
    computed:{
        scrollbarTag () { return this.$store.getters.scrollbarTag },
        postulantes: function () {
            try {
                 return this.$store.state.empresa.ListaPostulantes
            } catch (error) {
                return []
            }
        },
        titulo(){
            try {
                return this.$store.state.empresa.ListaPostulantes[0].aviso_laboral.Titulo
            } catch (error) {
                return 'LISTA DE POSTULANTES'
            }
        }  
    },

}

</script>

<style lang="scss" >
@import "@/assets/scss/vuexy/general/admin.scss";
</style>
