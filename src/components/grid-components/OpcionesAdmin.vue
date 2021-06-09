<template>  
    <div class="flex flex-row space-x-2 justify-center content-center mt-px self-center opciones-box">
        <vs-button class="h-6 w-6 self-center" icon="settings" @click="verEmpresa"/>
        <vs-button class="h-6 w-6 self-center" icon="not_interested" @click="bloquear"/>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default Vue.extend({
        methods: {
            bloquear: function (){
                console.log('presiono bloquear')
                this.$store.dispatch('botonEmpresa', 'bloquear')
                console.log(this.params)

                for (let x in this.params.data){
                    console.log(x)
                }

            },
            verEmpresa: function () {
                console.log('presiono ver perfil')
                this.$store.dispatch('botonEmpresa', 'verEmpresa')
            }
        },
        computed: {
            
        }
    })
</script>

<style scoped>
    .opciones-box {
        height: 100%;
    }
</style>