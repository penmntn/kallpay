<template>
    <div class="flex flex-col items-center w-full h-full " name="modulo_editor_encuesta">
        <div class="flex flex-row max-w-full w-4/5 space-x-5 absolute">
            <div class="flex max-w-full flex-col space-y-2 w-full">

                <div v-for="grupo in grupos" :key="grupo.id" :class="'max-w-screen space-y-2'">
                    <survey-section :numSection="grupo.id" v-model="grupo.name" @changeSection="cambiarFocusSection"/>
                    <draggable 
                    :list="grupo.preguntas" 
                    ghost-class="ghost-card" 
                    class="space-y-8 max-w-full" 
                    group="item"
                    handle=".handle-s"
                    @end="moveDrag"
                    :animation="200">
                        <transition-group name="shuffle" :data-grupo="grupo.id">
                        <survey-question 
                        v-for="item in grupo.elements" 
                        :key="item.id" 
                        :data="item"
                        v-model="grupo.elements"
                        :selectP="selP"
                        :indexG="grupoId[item.id]"
                        @focus="cambiarFocus"
                        @selecionado="setOpPos"
                        @copiar="copiar"
                        class="mt-3">
                        </survey-question>
                        </transition-group>
                    </draggable>
                </div>
                
            </div>
            <div class="relative">
                <div class="space-y-2 opciones-edicion absolute" name="opciones_de_edicion">
                    <vs-button icon="view_agenda" @click="agregarGrupo"/>
                    <vs-button icon="add" @click="agregarPregunta"/>
                    <vs-button icon="visibility" @click="verJson"/>
                    <vs-button icon="save" @click="() => popup1 = true"/>
                </div>
            </div>
        </div>
        

        <vs-popup :active.sync="popup1" button-close-hidden title="Estas seguro que desea guardar">
            <div class="flex flex-row justify-end space-x-2">
                <vs-button color="dark" icon="clear" @click="cerrarPop">Cancelar</vs-button>
                <vs-button icon="done" @click="popup1Done">Continuar</vs-button>
            </div>
        </vs-popup>
    </div>
</template>

<script>
    import SurveyQuestion from '../../components/custom_card/SurveyQuestion.vue'
    import SurveySection from '../../components/custom_card/SurveySection.vue'
    import draggable from "vuedraggable"
    import _ from 'lodash'
    export default {
        components:{
            SurveyQuestion,
            SurveySection,
            draggable,
        },
        data () {
            return {
                grupos: [],
                selP: 0,
                nPreguntas:0,
                nGrupos:0,
                grupoId: [],
                popup1: false
            }
        },
        props: {
            encuesta: Array
        },
        methods: {
            popup1Done:function () {
                this.emitirJson()
                this.cerrarPop()
            },
            cerrarPop: function () {
                this.popup1 = false
            },
            cambiarFocusSection: function (param) {
                this.selP = this.grupos[param].elements[0].id
            },
            cambiarFocus: function (param) {
                this.selP = param
            },
            moveDrag: function (event){
                const elem = event.item.getAttribute("pregunta-id")
                const to = parseInt(event.to.getAttribute("data-grupo"))
                this.grupoId[elem] = to
            },
            setOpPos: function (pos) {
                let node = document.getElementsByName('opciones_de_edicion')[0]
                node.style.top = pos.offsetTop + 'px'
            },
            agregarGrupo: function () {
                this.grupos.push({
                    name: "",
                    elements: [],
                    id: this.grupos.length
                })
                this.agregarPregunta(this.grupos.length - 1)
            },
            agregarPregunta: function (g) {
                let selG = (typeof(g) == 'number' )? g : this.grupoId[this.selP]
                this.grupoId[this.nPreguntas] = selG
                this.selP = this.grupos[ selG ].elements.length
                this.grupos[ selG ].elements.push({
                    id: this.nPreguntas,
                    name: "",
                    choices: [],
                    columns: [],
                    rows: [],
                    rateValues: []
                })
                this.selP = this.nPreguntas++
            },
            validacion: function () {
                for(let g of this.grupos){
                    if(g.name != undefined){
                        for(let p of g.elements){
                            this.grupoId[this.nPreguntas] = this.nGrupos
                            p.id = this.nPreguntas++
                        }
                        g.id = this.nGrupos++
                    }
                }
                if( this.nGrupos === 0 ){
                    this.agregarGrupo()
                }
            },
            verJson: function () {
            },
            emitirJson: function () {
                this.$emit('json', this.grupos)
            },
            copiar: function (elem,pos) {
                let selG = this.grupoId[this.selP]
                this.grupos[selG].elements.splice(pos + 1, 0, _.cloneDeep(elem))
                this.grupos[selG].elements[ pos + 1 ].id = this.nPreguntas
                this.selP = this.nPreguntas++
            },
            cumulativeOffset: function (element) {
                var top = 0, left = 0;
                do {
                    top += element.offsetTop  || 0;
                    left += element.offsetLeft || 0;
                    element = element.offsetParent;
                } while(element);

                return {
                    top: top,
                    left: left
                };
            }
            
        },
        beforeMount: function () {
            this.grupos = this.encuesta
            this.validacion()
        },
        mounted: function () {
            this.$nextTick(() => {
                let node = document.getElementsByName('opciones_de_edicion')[0]
                node.style = (this.cumulativeOffset(node).left + node.offsetWidth).toString + 'px'
            })
        },
    }
</script>

<style scoped>

.opciones-edicion{
    transition: 0.5s top;
}

</style>