<template>
	<div>
		<sider-p :value="val" :identificador="id_aviso" :ancho="1000" @input="activar" >
            <template slot="cuerpo"> 
                <div>
                    <div class="mb-4 ring-offset-gray-400">
                        <div class="shadow-md flex d-theme-dark-bg items-center rounded-lg md:ml-4">

                            <!-- TOGGLE SIDEBAR BUTTON -->
                            <feather-icon class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer" icon="MenuIcon" @click.stop="toggleTodoSidebar(true)" />

                            <!-- SEARCH BAR -->
                            <vs-input icon-no-border size="large" icon-pack="feather" icon="icon-search" placeholder="Search..." v-model="searchQuery" class="vs-input-no-border vs-input-no-shdow-focus w-full " />
                        </div>
                    </div>
                     <component :is="scrollbarTag" class="admin-content-scroll-area" :settings="settings" ref="taskListPS" :key="$vs.rtl">
                            <transition-group class="admin-list" name="list-enter-up" tag="ul" appear>
                                <div v-for="(item, key) in 100" :key="key" class="md:ml-4">
                                    {{item}}
                                </div>
                            </transition-group>
                    </component>
                </div>
            </template>
        </sider-p>
	</div>
</template>

<script>
import siderP from "@/components/side_bar/siderp.vue"
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    data(){
        return{
            settings : {
                maxScrollbarLength : 60,
                wheelSpeed         : 0.30
            }
        }
    },
    props: {
        val:  { type: Boolean},
        id_aviso: { type: String}
    },
    components: {
        siderP,
        VuePerfectScrollbar

    }, 
    methods: {
        activar(value) {
            this.$emit('activar', value)
        }
    },
    computed:{
         scrollbarTag () { return this.$store.getters.scrollbarTag      },
    }
}
</script>