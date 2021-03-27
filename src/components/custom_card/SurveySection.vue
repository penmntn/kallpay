<template>
    <div class="">
        <p @click="selectSection">Seccion Nro {{ numSection }}</p>
        <div class="entrada-q relative p-2" @click="selectSection">
            <input class="border-none w-full" v-model="valueC"/>
            <div class="animador ldiv absolute left-0">
            </div>
            <div class="animador rdiv absolute right-0">
            </div>
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
    input:focus {
        top: 1px;
    }
    input {
        font-size: 26px;
        font-family: sans-serif;
        font-weight: 400;
        margin-bottom: 4px;
        background-color: rgba(0, 0, 0, 0);
    }
    input:focus ~ div {
        width: 50%;
    }
    .entrada-q {
        border-radius: 5px 0px 0px 5px;
        border-left-style: solid;
        border-left-color: #2d7cb9;
        border-left-width: 4px;
        border-width: 1px;
        border-bottom-style: solid;
        border-color: grey;
        background-color: white;
    }
    .animador {
        border-color: #2d7cb9;
        bottom: -1px;
        border-bottom-style: solid;
        transition: width 0.5s;
    }
    .ldiv {
        width: 0%;
    }
    .rdiv {
        width: 0%;
    }
</style>