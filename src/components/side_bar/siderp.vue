<template>
    <div>
        <vs-sidebar parent="body" v-model="active" position-right :id="idmenu" click-not-close>
            <vs-button @click="cerrarSide()" icon="close" color="danger" :id="idboton"/>
        </vs-sidebar>
        <vs-sidebar v-model="active" parent="body" position-right v-bind:hidden-background="true" :id="idcontenedor" click-not-close >
            <component :is="scrollbarTag" class="scroll-area--customizer pt-4 pb-6" :settings="settings" :key="$vs.rtl">
                <div class="h-full">
                    <slot name="cuerpo"/>
                </div>
            </component>
        </vs-sidebar >
    </div>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    export default {
        props: {
            value: {
                type: Boolean,
                required: true,
            },
            identificador: {
                type: String,
                required: true
            },
            ancho: Number
        },
        data () {
            return {
                zindice: 0,
                active:false,
                settings: {
                    maxScrollbarLength : 60,
                    wheelSpeed         : 1,
                }
            }
        },
        methods: {
            cerrarSide () {
                this.$store.dispatch('subIndices')
                this.active = false
                this.$emit('input', this.active)
            }
        },
        computed: {
            espacios: function () {
                return this.$store.state.indices
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
            scrollbarTag: function () { 
                return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar'
            },
        },
        watch: {
            value: function () {
                if(this.value){
                    this.active = true
                    this.$store.dispatch('addIndices')
                    this.zindice = this.$store.getters.getIndices * 2
                    let menu = document.getElementById(this.idmenu)
                    let cont = document.getElementById(this.idcontenedor)
                    menu.style.zIndex = (52000 + this.zindice).toString()
                    menu.children[1].style.width = (this.ancho + 30).toString()+"px"
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
                let temp = (30 * (newV - this.zindice/2)).toString() + "px"
                bot.style.top = temp
            }

        },
        components: {
            VuePerfectScrollbar
        },
        mounted: function (){
            window.addEventListener('keydown', (e) =>{
                if(this.value && e.code == 'Escape'){
                    this.cerrarSide()
                }
            })
        },
        destroyed: function () {
            window.removeEventListener('keydown')
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
