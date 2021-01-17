<template>

    <vs-card class="rounded-lg max-w-full">
        <div class="flex flex-col px-16 py-4 max-w-full">
            <div :class="(question.titulo.length > 0)?'flex justify-between max-w-full' : 'flex justify-center max-w-full'" @click="selectDiv">
                <p>{{ question.titulo }}</p>
                <vs-icon icon="drag_indicator" size="medium" style="" class=" cursor-move handle-s"/>
            </div>
            
            <transition name="slide">
            <div v-show="!kanban && indexP === selectP && indexG === selectG">
                <div class="flex justify-between">
                    <vs-select class="selectExample self-center" label="Tipo de pregunta" v-model="question.tipo">
                        <vs-select-item :key="index" :value="item" :text="item.texto" v-for="(item,index) in tipoPregunta"/>
                    </vs-select>
                    <vs-input label="pregunta" placeholder="Pregunta" v-model="question.titulo"/>
                </div>
                <div v-if="hasImage">
                    <vs-divider/>
                    <img :src="image" class="object-contain h-48 w-full"/>
                    <vs-button icon="clear" @mousedown="borrarImagen"/>
                </div>
                
                <div v-if="question.tipo.id === 3 || question.tipo.id === 4">
                    <vs-divider/>
                    <survey-selection v-model="question.listaP"/>
                </div>
                
                <div v-else-if="question.tipo.id === 5">
                    <vs-divider/>
                    <survey-range v-model="question.rango"/>
                </div>
                <div v-else-if="question.tipo.id === 6 || question.tipo.id === 7">
                    <vs-divider/>
                    <survey-matriz v-model="question.matrizP"/>
                </div>
                    <vs-divider/>
                <div class="flex flex-row justify-end space-x-3">
                    <vs-button icon="content_copy" @click="copiar"/>
                    <vs-button icon="delete" @mousedown="borrar"/>
                    <input type="file" ref="file" style="display: none" @change="verImagen">
                    <vs-button @click="$refs.file.click()" icon="insert_photo"/>
                    <div class="flex flex-row items-center space-x-1">
                        <label> Requerido </label>
                        <vs-switch v-model="question.esRequerido"/>
                    </div>
                </div>
            </div>
            </transition>
            
        </div>
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
                    {id:1,texto:"Entrada simple",valor:"text"},
                    {id:2,texto:"Parrafo",valor:"text"},
                    {id:3,texto:"Seleccion",valor:"radiogroup"},
                    {id:4,texto:"Opciones multiples",valor:"checkbox"},
                    {id:5,texto:"Escala lineal",valor:"rating"},
                    {id:6,texto:"Cuadrilla varias opciones",valor:"matrix"},
                    {id:7,texto:"Cuadrilla de casillas",valor:"matrix"}
                ],
                question: this.data,
                focusOn: this.select,
                hasImage: false,
                image: null
            }
        },
        props: {
            data: {
                type: Object,
                default: () => ({})
            },
            value: Array,
            indexP: Number,
            indexG: Number,
            selectP: Number,
            selectG: Number,
            kanban: Boolean
        },
        methods: {
            copiar: function () {
                this.value.push({
                    id: this.value.length + 1,
                    data: this.question,
                })
            },
            borrar: function () {
                this.value.splice(this.indexP,1)
            },
            selectDiv: function () {
                this.focusOn = this.indexP
                this.$emit('focus',{p:this.indexP,g:this.indexG})
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
            }
        },
        watch: {
            question: {
                handler: function (newData) {
                    this.$emit('newData',newData)
                },
                deep: true
            }
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