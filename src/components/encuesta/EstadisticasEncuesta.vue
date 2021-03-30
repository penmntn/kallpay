<template>
    <div id="modulo-estadisticas" :class="'w-full h-full flex flex-col p-2'">
        <h1 class="text-center">Preguntas</h1>
        <div v-for="(que, index) in preguntas" :key="index" class="flex flex-col">
            <div class="flex flex-row justify-between">
                <h2>{{ index + 1 }}. {{ que.name }}</h2>
                <vs-button :icon="(expanseBools[index])? 'expand_less': 'expand_more'" @click="colapsar(index)"/>
            </div>
            <bar-chart v-show="expanseBools[index]" :chart-data="chartsData[index]" :options="chartOptions" class="p-16"/>
        </div>
        <div v-if="respuestas == null" class="absolute w-full h-full vs-con-loading__container" ref="moduloEstRef"/>
    </div>
</template>

<script>
    import BarChart from '../../components/charts/BarChart.js'
    import query from '../../querys/encuestas'
    export default {
        methods: {
            setData: function (enc) {
                for(let pag of enc.pages){
                    if (pag.name != null){
                        for(let que of pag.elements){
                            this.preguntas.push(que)
                            if(que.type === 'radiogroup' || que.type === "checkbox"){
                                let indices = {},i = 0
                                for( let cho of que.choices){
                                    indices[cho] = i++
                                    console.log('choices',cho)
                                }
                                let data = new Array(que.choices.length).fill(0);
                                for( let res of this.respuestas) {
                                    console.log(indices[res.Respuesta[que.name]]    )
                                    data[indices[res.Respuesta[que.name]]]++
                                }
                                console.log('hello world',data)
                                let temp = {
                                    labels: que.choices,
                                    datasets: [{
                                        backgroundColor: "#2d7cb9",
                                        data: data
                                    }]
                                }
                                this.chartsData.push(temp)
                            } else if (que.type === 'text' || que.type === 'comment'){
                                var dictio = {}, arr = []
                                for ( let res of this.respuestas){
                                    let words = res.Respuesta[que.name].split(' ')
                                    words.map( (x) => { dictio[x] = (dictio[x] == undefined)? 1 : dictio[x]++})
                                }
                                for ( let item in dictio) {
                                    arr.push([item, dictio[item]])
                                }
                                arr.sort(function compare(a, b) {
                                    return (a[1] < b[1])? -1 : 1 
                                })
                                let temp = {
                                    labels: arr.map( x => x[0]),
                                    datasets: [{
                                        backgroundColor: "#f87979",
                                        data: arr.map ( x => x[1]),
                                        barThickness: 50
                                    }]
                                }
                                this.chartsData.push(temp)
                            }
                        }
                    }
                }
            },
            colapsar: function (index) {
                this.$set(this.expanseBools, index, !this.expanseBools[index])
            }
        },
        beforeMount: function () {
            
        },
        mounted: function (){
            this.$vs.loading({
                container: this.$refs.moduloEstRef,
                scale: 1
            })
            this.$http.post('/graphql',{
                query: query.rptsEnc,
                variables: {
                    id: this.$store.state.administrador.encuestaSel
                }
            }).then((res) =>{
                this.respuestas = res.data.data.encuesta.respuestas_encuestas
                this.setData(res.data.data.encuesta.EncuestaJson)
                this.$vs.loading.close(this.$refs.moduloEstRef)
                this.expanseBools = new Array(this.preguntas.length).fill(true)
            })
        },
        components: {
            BarChart
        },
        data () {
            return {
                chartData: null,
                preguntas: [],
                chartsData: [],
                chartOptions: {
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    hover: {
                        mode: null
                    },
                    scales:{
                        yAxes:[{
                            ticks: {
                                suggestedMin: 0,
                                stepSize: 1
                            }
                        }],
                        xAxes:[{
                            ticks: {
                                suggestedMin: 0,
                                stepSize:1,
                                barPercentage: 0.2
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'estas son respuestas'
                            }
                        }]
                    }
                },
                respuestas: null,
                expanseBools: []
            }
        },
    }

</script>

<style lang="scss">


</style>
