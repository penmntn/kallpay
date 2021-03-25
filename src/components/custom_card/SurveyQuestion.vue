<template>
    <vs-card :class="'rounded-lg max-w-full p-0 w-full'" :name="'tarjeta'+indexP" :pregunta-id="indexP">
        <div class="flex flex-col px-2 py-4 max-w-full">
            <div :class="(question.name.length > 0 && (indexP !== selectP))?'flex justify-between max-w-full m-1' : 'flex justify-center max-w-full m-1'" @click="selectDiv">
                <p v-if="kanban || (indexP !== selectP)">{{ question.name }}</p>
                <vs-icon icon="drag_indicator" size="small" style="" class="cursor-move handle-s"/>
            </div>
            
            <transition name="slide" appear v-on:after-enter="emitirPosicion" v-on:after-appear="emitirPosicion">
            <div v-show="!kanban && indexP === selectP" class="">

                <div class="flex flex-col justify-between">

                    <vs-input placeholder="Pregunta" v-model="question.name" class="w-full"/>

                    <div class="flex flex-row justify-end items-center space-x-1 my-2">
                    
                        <vs-button icon="content_copy" @click="copiar"/>
                        <vs-button icon="delete" @click="borrar"/>
                        <input type="file" ref="file" style="display: none" @change="verImagen">
                        <vs-button @click="$refs.file.click()" icon="insert_photo"/>
                        <div class="flex flex-row items-center space-x-1">
                            <label> Requerido </label>
                            <vs-switch v-model="question.isRequired"/>
                        </div>

                        <vs-select class="selectExample" label="Tipo de pregunta" v-model="question.type" selected="">
                            <vs-select-item :key="index" :value="item.valor" :text="item.texto" v-for="(item,index) in tipoPregunta"/>
                        </vs-select>
                    </div>
                </div>
                
                <div v-if="hasImage">
                    <vs-divider/>
                    <img :src="image" class="object-contain h-48 w-full"/>
                    <vs-button icon="clear" @mousedown="borrarImagen"/>
                </div>
                
                <div v-if="question.type === 'radiogroup' || question.type=== 'checkbox'">
                    <vs-divider/>
                    <survey-selection v-model="question.choices"/>
                </div>
                
                <div v-else-if="question.type === 'rating'">
                    <vs-divider/>
                    <survey-range v-model="question.rateValues"/>
                </div>
                <div v-else-if="question.type === 'matrix' || question.type === 'matrix'">
                    <vs-divider/>
                    <survey-matriz :row="question.rows" :col="question.columns" @updp="(val) => question.rows = val" @updr="(val) => question.columns = val"/>
                </div>
                
            </div>
            </transition>
        </div>
        <vs-alert :active.sync="tieneNombre" color="danger" icon="error">
            <span class="text-sm"> pregunta esta vacia </span>
        </vs-alert>
        <br>
        <vs-alert :active.sync="tieneTipo" color="danger" icon="error">
            <span class="text-sm">  Necesitas selecionar el tipo de pregunta </span>
        </vs-alert>
    </vs-card>
</template>
<script>
    import SurveySelection from './SurveySelection'
    import SurveyMatriz from './SurveyMatriz'
    import SurveyRange from './SurveyRange'
    export default {
        components:{
            SurveySelection,
            SurveyMatriz,
            SurveyRange
        },
        data () {
            return {
                tipoPregunta: [
                    {texto:"Entrada simple",valor:"text"},
                    {texto:"Parrafo",valor:"comment"},
                    {texto:"Seleccion",valor:"radiogroup"},
                    {texto:"Opciones multiples",valor:"checkbox"},
                    {texto:"Escala lineal",valor:"rating"},
                    {texto:"Cuadrilla varias opciones",valor:"matrix"},
                    {texto:"Cuadrilla de casillas",valor:"matrix"}
                ],
                question: this.data,
                focusOn: this.select,
                hasImage: false,
                image: null,
                indexP: this.data.id,
            }
        },
        props: {
            data: {
                type: Object,
                default: () => ({})
            },
            value: Array,
            selectP: Number,
            kanban: Boolean
        },
        methods: {
            copiar: function () {
                this.$emit('copiar',this.question,this.value.findIndex(x => x.id === this.indexP))
            },
            borrar: function () {
                this.value.splice(this.value.findIndex(x => x.id === this.indexP),1)
            },
            selectDiv: function () {
                this.focusOn = this.indexP
                this.$emit('focus',this.indexP)
            },
            verImagen: function (event) {
                const fileName = event.target.value
                const re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i
                if(re.exec(fileName)){
                    this.hasImage = true
                    this.image = URL.createObjectURL(event.target.files[0])

                    this.question.tieneImagen = this.image
                    console.log(this.question.tieneImagen)
                } else {
                    alert('el archivo no es un formato de imagen soportado')
                }
            },
            borrarImagen: function () {
                this.hasImage = false
                this.image = null
            },
            emitirPosicion: function () {
                this.$emit('selecionado',document.getElementsByName('tarjeta'+this.indexP)[0].getBoundingClientRect())
            }
        },
        watch: {
            question: {
                handler: function (newData) {
                    this.$emit('newData',newData)
                },
                deep: true
            }
        },
        computed: {
            
            tieneNombre : function () { return this.question.name == ''},
            tieneTipo : function () { return this.question.type == null}
        }

    }   
</script>

<style>
.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}
</style>