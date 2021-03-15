<template>
    <div>
        <survey :survey="surveyJson" />
    </div>
</template>
<script>
    import * as SurveyVue from 'survey-vue'
    import "survey-vue/modern.css";
    SurveyVue.StylesManager.applyTheme("modern")
    var Survey = SurveyVue.Survey
    export default {        
        beforeMount: function () {
            console.log('visor de encuesta')
        },
        components: {
            Survey
        },
        props:{
            json: Object,
            respuestas: Object
        },
        data () {
            return {
            }
        },
        computed:{
            surveyJson: function () {
                let model = new SurveyVue.Model(this.json)
                console.log('respuestas')
                console.log(this.respuestas)
                model.data = this.respuestas
                return model
            }
        }
    }
</script>