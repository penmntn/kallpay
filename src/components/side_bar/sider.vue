<template>
    <div>
        <vs-sidebar parent="body" v-model="side_active" position-right :id="idmenu" click-not-close >
            <vs-chip color="danger" icon="close" closable :id="idboton">
                <feather-icon class='w-5 mr-2 text-white' icon="XCircleIcon" @click="side_active=!side_active"/>
                <span @click="side_active=!side_active"> {{"Cerrar"}} </span>
            </vs-chip>
        </vs-sidebar>
        <vs-sidebar v-model="side_active" parent="body" position-right v-bind:hidden-background="true"  :id="idcontenedor" click-not-close >
            <div class="h-full">
                <component :is="scrollbarTag" class="bg-gray-100 scroll-area--customizer" :settings="settings" :key="$vs.rtl">
                    <slot name="cuerpo">
                    </slot>
                </component>
            </div>
        </vs-sidebar >
    </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        components: {
            VuePerfectScrollbar,
        },
        props: {
            titulo : { type: String},
            identificador: {
                type: String,
                required: true
            },
            ancho: Number,
        },
        data () {
            return {
                zindice: 0,
                settings: {
                    maxScrollbarLength : 60,
                    wheelSpeed         :.40,
                }
            }
        },
        computed: {
            espacios: function () {
                return this.$store.state.siderbarTest.length
            },
            idmenu: function () {
                return 'menu' + this.identificador
            },
            idcontenedor: function () {
                return 'contenedor' + this.identificador
            },
            idboton: function () {
                return 'boton' + this.identificador
            },
            
            ///MODIFICACION WILLLLLL
            scrollbarTag() { return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar' },

            side_active: {
                get(){
                  return this.value
                },
                set(val){
                  this.$emit('input',val)
                }
            },
            count_indice(){
                return this.$store.state.siderbarTest.length
            }
        },
        watch: {
            side_active: function () {
                if(this.side_active){
                    this.zindice = this.count_indice * 2
                    let menu = document.getElementById(this.idmenu)
                    let cont = document.getElementById(this.idcontenedor)
                    menu.style.zIndex = (52000 + this.zindice).toString()
                    menu.children[1].style.width = (this.ancho + 75).toString()+"px"
                    menu.children[1].style.background = "rgba(0,0,0,0)"
                    menu.children[1].style.boxShadow = "0 0px 0px 0 rgba(0,0,0,0), 0 0px 0px 0 rgba(0,0,0,0.00)"
                    menu.children[1].style.maxWidth = "100%"
                    menu.style.position = "fixed"
                    cont.style.zIndex = (52000 + this.zindice + 1 ).toString()
                    cont.children[0].style.width = this.ancho.toString() + "px"
                    cont.children[0].style.maxWidth = "100%"
                    cont.style.position = "fixed"
                }
            },
            espacios: function (newV) {
                let bot = document.getElementById(this.idboton)
                let temp = (25* (newV - this.zindice/2)).toString() + "px"
                bot.style.top = temp
            }

        },
        methods: {
            
        }
    }
</script>

<style lang="scss">
.scroll-area--customizer {
  height: calc(100%);

  &:not(.ps) {
    overflow-y: auto;
  }
}

</style>
