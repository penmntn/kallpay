<template>
    <div class="flex py-4 flex-col justify-between">
        <div class="flex flex-col">
            <vs-input 
            label="Respuesta"
            v-for="(item,index) in value"
            v-model="value[index]"
            :key="index"/>
        </div>
        <vs-button icon="add" @click="addButton"/>
    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        props:{
            value: Array
        },
        methods: {
            addButton: function () {
                this.value.push("")
            }
        }
    }
</script>