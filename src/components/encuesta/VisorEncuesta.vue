<template>
    <div ref="previewEnc" class="vs-con-loading__container h-full">
        <survey v-if="json !== null" :survey="json" />
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
                this.json = new SurveyVue.Model(this.json)
            }).catch((e) => {
                console.log(e)
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
    }
</script>