<template>
    <div ref="previewEnc" class="">
        <survey :survey="surveyJson" />
    </div>
</template>
<script>
    import query from '../../querys/encuestas'
    import * as SurveyVue from 'survey-vue'
    import "survey-vue/modern.css";
    SurveyVue.StylesManager.applyTheme("modern")
    var Survey = SurveyVue.Survey
    export default {
        mounted: function () {
            this.$vs.loading({
                container: this.$refs.previewEnc,
                scale: 1
            })
            this.$http.post('/graphql',{
                query: query.encuestaJson,
                variables:{ id: this.$store.state.administrador.encuestaSel }
            }).then( (res) => {
                this.json = res.data.data.encuesta.EncuestaJson
                this.$vs.loading.close(this.$refs.previewEnc)
            })
        },
        components: {
            Survey
        },
        data () {
            return {
                json: null
            }
        },
        computed:{
            surveyJson: function () {
                let model = new SurveyVue.Model(this.json)
                //model.data = this.respuestas //esto agrega respuestas
                return model
            }
        }
    }
</script>