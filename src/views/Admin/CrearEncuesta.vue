<template>
    <div id='page-3-body' class="">
        <div class="flex flex-row space-x-2">
            <p>Kanban</p>
            <vs-switch v-model="esKanban"/>
            <div v-if="esKanban" class="flex flex-row space-x-2">
                <vs-button icon="view_agenda" class="w-8 h-8" @click="agregarGrupo"/>
                <vs-button icon="visibility" class="w-8 h-8" @click="mostrarPreview"/>
                <vs-button icon="save" class="w-8 h-8" />
            </div>
        </div>

        <div class="flex flex-col">
            <vs-card class="w-1/2 self-center">
                <vs-input class="w-full" label="Titulo" v-model="datosEncuestaJson.titulo"/>
                <div class="flex flex-row space-x-2 w-full justify-between">
                    <div>
                        <p>Fecha de Inicio</p>
                        <flat-pickr v-model="datosEncuestaJson.fecha_inicio"/>
                    </div>
                    <div>
                        <p>Fecha Final</p>
                        <flat-pickr v-model="datosEncuestaJson.fecha_fin"/>
                    </div>
                </div>
                <div>
                    <p>Descripcion</p>
                    <vs-textarea v-model="datosEncuestaJson.descripcion"/>
                </div>
            </vs-card>
            <div :class="(esKanban) ? 'flex justify-start h-full space-x-2 w-full':'flex justify-center h-full space-x-2'">
                <div :class="(esKanban) ? 'flex w-full h-full flex-row space-x-2':'flex max-w-full flex-col w-1/2 space-y-2'">
                    <div v-for="(grupo,index) in grupos" :key="grupo.id" :class="(esKanban)?'border border-solid w-1/4 h-full p-2':'max-w-screen space-y-2'">
                        <survey-section :numSection="index+1" v-model="grupo.titulo" @changeSection="cambiarFocusSection"/>
                        <draggable 
                        :list="grupo.preguntas" 
                        ghost-class="ghost-card" 
                        class="space-y-8 max-w-full" 
                        group="item"
                        handle=".handle-s"
                        @end="moveDrag"
                        :animation="200">
                            <transition-group name="shuffle" :data-grupo="index">
                            <survey-question 
                            v-for="(item,index) in grupo.preguntas" 
                            :key="item.id" 
                            :data="item.data"
                            v-model="grupo.preguntas"
                            :selectP="selP"
                            :selectG="selG"
                            :indexP="index"
                            :indexG="grupo.id"
                            :kanban="esKanban"
                            @focus="cambiarFocus"
                            class="mt-3">
                            </survey-question>
                            </transition-group>
                        </draggable>
                    </div>
                </div>
                <div v-if="!esKanban" class="flex flex-col self-center space-y-2">
                    <vs-button icon="add" class="w-8 h-8" @click="agregarPregunta"/>
                    <vs-button icon="view_agenda" class="w-8 h-8" @click="agregarGrupo"/>
                    <vs-button icon="visibility" class="w-8 h-8" @click="mostrarPreview"/>
                    <vs-button icon="save" class="w-8 h-8" @click="guardar"/>
                </div>
            </div>

        </div>
        <siderp :value="mostrarSurvey" @input="(val) => mostrarSurvey = val" :identificador="'weada-234'" :ancho="800">
            <template v-slot:cuerpo>
                <div v-if="mostrarSurvey">
                    <survey :survey="model"/>
                </div>
            </template>
        </siderp>
    </div>
</template>

<script>
    import SurveyQuestion from '../../components/custom_card/SurveyQuestion.vue'
    import SurveySection from '../../components/custom_card/SurveySection.vue'
    import draggable from "vuedraggable"
    import * as SurveyVue from 'survey-vue'
    import siderp from '../../components/side_bar/siderp.vue'
    import "survey-vue/modern.css";
    import flatPickr from 'vue-flatpickr-component'
    SurveyVue.StylesManager.applyTheme("modern")
    var Survey = SurveyVue.Survey
    export default {
        components:{
            draggable,
            SurveyQuestion,
            SurveySection,
            siderp,
            Survey,
            flatPickr
        },
        data () {
            console.log(this.$store.getters.getEncuesta)
            const datos = (this.$store.getters.getEncuesta === 0) ? [
                    {   
                        id: 1,
                        titulo: "hola",
                        preguntas: [
                            {
                                id: 1,
                                data:{
                                    tipo: "",
                                    titulo: "",
                                    id: null,
                                    matrizP: {
                                        p: [],
                                        r: []
                                    },
                                    listaP: [],
                                    rango: [],
                                    esRequerido: null,
                                    tieneImagen: false,
                                    linkImagen: ""
                                }
                            }
                        ]
                    } 
                ] : this.$store.getters.getEncuesta
            return{
                nGrupos: 1,
                nPreguntas: 1,
                selG: 1,
                selP: 0,
                mostrarSurvey: false,
                esKanban: false,
                model: null,
                encuestaJson: null,
                datosEncuestaJson: {
                    titulo: "",
                    fecha_inicio: null,
                    fecha_fin: null,
                    descripcion: ""
                },
                grupos: datos
            }
        },
        methods:{
            moveDrag: function (event){
                const from = parseInt(event.from.getAttribute("data-grupo"))
                const to = parseInt(event.to.getAttribute("data-grupo")) + 1
                if( this.selG === to ){
                    if(this.selP !== event.oldIndex){
                        this.selP -= event.oldIndex <= this.selP
                        this.selP += event.newIndex <= this.selP
                    }
                    else
                        this.selP = event.newIndex
                } else if (this.selG === from) {
                    this.selP += (event.newIndex < this.selP)
                }
            },
            cambiarFocus: function (param) {
                this.selP = param.p
                this.selG = param.g
            },
            cambiarFocusSection: function (param) {
                this.selG = param
            },
            agregarGrupo: function () {
                this.selG = this.grupos.length + 1
                this.grupos.push({
                    id: ++this.nGrupos,
                    titulo: "",
                    preguntas: []
                })
                this.agregarPregunta()
                this.selP = 0
            },
            agregarPregunta: function () {
                this.grupos[this.selG - 1].preguntas.push({
                    id: ++this.nPreguntas,
                    data:{
                        tipo: "",
                        titulo: "",
                        id: "",
                        matrizP: {
                            p: [],
                            r: []
                        },
                        listaP: [],
                        rango: [],
                        esRequerido: "",
                        tieneImagen: false,
                        linkImagen: ""
                    }
                })
                this.selP = this.grupos[this.selG - 1].preguntas.length - 1
            },
            mostrarPreview: function () {
                let json = {pages: []}
                for(let g of this.grupos){
                    let temp = [];
                    for (let pre of g.preguntas){
                        temp.push({
                            type: pre.data.tipo.valor,
                            name: pre.data.titulo,
                            choices: pre.data.listaP,
                            rateValues: pre.data.rango
                        })
                        if(pre.data.tipo.tipo == "matrix"){
                            let temp = temp.pop()
                            temp.columns = pre.data.matrizP.r.map((x, index) => {return {value: index, text: x}})
                            temp.rows = pre.data.matrizP.p.map((x, index) => {return {value: index, text: x}})
                            temp.push(temp)
                        }
                        console.log(pre.data.tieneImagen)
                        if(pre.data.tieneImagen){
                            temp.push({
                                type: "image",
                                imageLink: pre.data.tieneImagen
                            })
                        }
                    }
                    json.pages.push({name: g.titulo,elements: temp})
                }
                this.mostrarSurvey = true
                this.model = new SurveyVue.Model(json)
            },
            guardar: function () {
                let json = {pages: []}
                for(let g of this.grupos){
                    let temp = [];
                    for (let pre of g.preguntas){
                        temp.push({
                            type: pre.data.tipo.valor,
                            name: pre.data.titulo,
                            choices: pre.data.listaP,
                            rateValues: pre.data.rango
                        })
                        if(pre.data.tipo.tipo == "matrix"){
                            let temp = temp.pop()
                            temp.columns = pre.data.matrizP.r.map((x, index) => {return {value: index, text: x}})
                            temp.rows = pre.data.matrizP.p.map((x, index) => {return {value: index, text: x}})
                            temp.push(temp)
                        }
                        
                    }
                    json.pages.push({name: g.titulo,elements: temp})
                }
                this.$store.commit('AGREGAR_ENCUESTA',this.grupos)
                let temp = this.$store.getters.getEncuesta
                console.log('post')
                this.$http.post('/encuestas',
                {
                    Titulo: this.datosEncuestaJson.titulo,
                    Descripcion: this.datosEncuestaJson.descripcion,
                    FechaInicio: this.datosEncuestaJson.fecha_inicio,
                    FechaFin: this.datosEncuestaJson.fecha_fin,
                    encuestaSurvey: temp,

                })
            }

        },
    }
</script>

<style lang="scss">
    .ghost-card {
        opacity: 0.5;
        background: #F7FAFC;
        border: 1px solid #4299e1;
    }
    .section-description {
        .vs-con-input{
            input {
                border-top-style: hidden;
            }
        }
    }
</style>