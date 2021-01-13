<template>
	<div>
		<sider-p :value="val" :identificador="id_estudiante"  :ancho="1000" @input="activar" >
            <template slot="cuerpo"> 
                <div class="bg-gray-100 h-screen px-4">
                    <div class="w-full py-2">
                        <div class="text-center">
                            <span class="text-2xl text-primary font-bold"> </span>
                        </div>
                    </div>
                     <component :is="scrollbarTag" class="admin-content-scroll-area" :settings="settings" ref="taskListPS" :key="$vs.rtl">
                         KKAMDLALD,
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
            settings: {
                maxScrollbarLength : 60,
                wheelSpeed         : 0.30
            },
        }
    },
    props: {
        val:  { type: Boolean},
        id_estudiante: { type: String},
    },
    components: {
        siderP,
        VuePerfectScrollbar,
    }, 
    methods: {
        activar(value) {
            this.$emit('activar', value)
        }
    },
    computed:{
        scrollbarTag () { return this.$store.getters.scrollbarTag },
        postulantes: function () {
            console.log(this.$store.state.empresa.ListaPostulantes)
            return this.$store.state.empresa.ListaPostulantes
        }
    }
}
</script>