<template>
    <div class="">
        <p @click="selectSection">Seccion Nro {{ numSection }}</p>
        <div class="entrada-q" @click="selectSection">
            <input class="border-none w-full" v-model="valueC"/>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            numSection: Number,
            value: String
        },
        data () {
            return {
                dato: ""
            }
        },
        computed:{
            valueC: {
                get: function () {
                    return this.value
                },
                set: function (param) {
                    this.$emit('input', param)
                }
            }
        },
        methods: {
            selectSection: function () {
                console.log(this.numSection)
                this.$emit('changeSection',this.numSection)
            }
        }
    }
</script>

<style scoped>
    .entrada-q {
        border-style: none;
        border-bottom-style: solid;
        border-width: 1px;
    }
</style>