<template>
    <div class="">
        <component :is="scrollbarTag">
        <div v-for="(que, index) in chartsData" :key="index" class="overflow-auto">
            <span> Pregunta Nro {{ index + 1 }}. </span>
            <span> {{ preguntas[index].name }} </span>
            <bar-chart :chart-data="que" :options="chartOptions"/>
        </div>
        </component>
    </div>
</template>

<script>
    import BarChart from '../../components/charts/BarChart.js'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    export default {
        methods: {
            setData: function (enc) {
                for(let pag of enc.pages){
                    if (pag.name != null){
                        for(let que of pag.elements){
                            let indices = {},i = 0
                            for( let cho of que.choices){
                                indices[cho] = i++
                                console.log('choices',cho)
                            }
                            console.log(indices)
                            let data = new Array(que.choices.length).fill(0);
                            for( let res of this.$store.state.administrador.respuestasSel) {
                                console.log(indices[res.Respuesta[que.name]]    )
                                data[indices[res.Respuesta[que.name]]]++
                            }
                            console.log(data)
                            let temp = {
                                labels: que.choices,
                                datasets: [{
                                    backgroundColor: "#f87979",
                                    data: data
                                }]
                            }
                            this.preguntas.push(que)
                            this.chartsData.push(temp)
                        }
                    }
                }
            }
        },
        beforeMount: function () {  
        },
        mounted: function (){ 
        },
        components: {
            BarChart,
            VuePerfectScrollbar
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
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.yLabel;
                            }
                        }
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
                                stepSize:1
                            }
                        }]
                    }
                }
            }
        },
        watch: {
            '$store.state.administrador.encuestaSel': function () {
                this.setData(this.$store.state.administrador.encuestaSel)
            }
        },
        computed:{
            scrollbarTag() { return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar' }
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
