<template>
    <div class="flex py-4">
        <div class="flex flex-row w-full justify-between">
            <div class="flex flex-col space-y-1">
                <p>Preguntas: </p>
                <vs-input
                :label="index + '.'"
                v-for="(item,index) in value.p"
                v-model="value.p[index]"
                :key="index"
                />
                <vs-button icon="add" class="center" @click="addPregunta"/>
            </div>
            <div class="flex flex-col space-y-1">
                <p>Respuestas: </p>
                <vs-input
                :label="index + '.'"
                v-model="value.r[index]"
                v-for="(item,index) in value.r"
                :key="index"
                />
                <vs-button icon="add" @click="addRespuesta"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                value:{
                    p: this.row,
                    r: this.col,
                }
            }
        },
        props: {
            col: Array,
            row: Array
        },
        methods: {
            addPregunta: function () {
                this.value.p.push("")
            },
            addRespuesta: function () {
                this.value.r.push("")
            }
        },
        watch: {
            "value.p": function ( newData ) {
                this.$emit('updp',newData)
            },
            "value.r": function ( newData ) {
                this.$emit('updr',newData)
            }
        }
    }
</script>

<style>

</style>