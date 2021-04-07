<template>
    <div id="modulo-estadisticas" :class="'w-full h-full flex flex-col p-2 bg-gray-200'">
        <h1 class="text-center">Preguntas</h1>
        <div v-for="(que, index) in preguntas" :key="index" class="flex flex-col">
            <div class="flex flex-row justify-between">
                <h2>{{ index + 1 }}. {{ que.name }}</h2>
                <vs-button :icon="(expanseBools[index])? 'expand_less': 'expand_more'" @click="colapsar(index)"/>
            </div>
            <transition name="slide" class="">
                <vx-card v-show="expanseBools[index]" class="border chart-container p-4">
                    <horizontal-bar-chart v-if="que.type === 'text' || que.type === 'comment'" :chart-data="chartsData[index]" :options="chartOptionsH" :styles="myStyles"/>
                    <bar-chart v-else :chart-data="chartsData[index]" :options="chartOptions" class="p-16"/>
                </vx-card>
            </transition>
        </div>
        <div v-if="respuestas == null" class="absolute w-full h-full vs-con-loading__container" ref="moduloEstRef"/>
    </div>
</template>

<script>
    import BarChart from '../../components/charts/BarChart.js'
    import HorizontalBarChart from '../../components/charts/HorizontalBarChart.js'
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
                                        backgroundColor: Array.from({length: arr.length}, (_, i) => i + 1).map( x => 'rgba(45,124,185,'+ ((arr.length - x + 1) / arr.length)+')'),
                                        data: arr.map ( x => x[1]),
                                        barThickness: 200 / arr.length
                                    }]
                                }
                                this.chartsData.push(temp)
                            } else if (que.type === 'rating'){
                                var dictio1 = {},i = 0
                                for (let res of que.rateValues){
                                    dictio1[res] = {v:0 , p:i++}
                                }
                                for (let res of this.respuestas){
                                    dictio1[res.Respuesta[que.name]].v++
                                }
                                var acumRes = new Array(i)
                                
                                for( let res in dictio1){
                                    acumRes[dictio1[res].p] = dictio1[res].v
                                }
                                console.log(acumRes)
                                let temp = {
                                    labels: que.rateValues,
                                    datasets: [{
                                        backgroundColor: "#2d7cb9",
                                        data: acumRes,
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
        computed:{
            myStyles: function () {
                return {
                    height: '50vh',
                    position: 'relative'
                }
            }
        },
        components: {
            BarChart,
            HorizontalBarChart
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
                                display: true
                            }
                        }]
                    }
                },
                chartOptionsH:{
                    maintainAspectRatio: false,
                    responsive: true,
                    legend: {display : false},
                    tooltips: {enabled: false},
                    hover: {mode: null},
                    scales:{
                        yAxes:[{
                            ticks: {
                                suggestedMin: 0,
                                stepSize: 1
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'estas son respuestas'
                            }
                        }],
                        xAxes:[{
                            ticks: {
                                suggestedMin: 0,
                                stepSize:1,
                                barPercentage: 0.2
                            },
                            
                        }]
                    },
                    height: 300
                },
                respuestas: null,
                expanseBools: [],
            }
        },
    }

</script>

<style lang="scss">
.chart_cotainer{
    flex-grow: 1;
    min-height: 0;
    > div {
        position: relative;
        height: 100%;
    }
}

</style>
