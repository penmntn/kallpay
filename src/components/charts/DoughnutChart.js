import { Doughnut, mixins } from 'vue-chartjs'
const {reactiveProp} = mixins

export default {
    extends: Doughnut,
    props: ["charData","options"],
    mixins: [reactiveProp],
    methods:{
        update: function () {
            this.$data._chart.update()
        }
    },
    mounted () {
        console.log('rendering doughnut')
        this.renderChart(this.chartData, this.options)
    }
};