<template>
    <div class="flex py-4 flex-col justify-between">
        <div class="flex flex-col">
            <div v-for="(item,index) in value" :key="index" class="flex flex-row items-end">
            <vs-input 
                :label="'Respuesta Nro ' + (index + 1)"
                v-model="value[index]"
                class="my-1 w-1/2"/>
                
            <vs-button icon="clear" type="border" class="my-1 mx-2" @mousedown="deleteButton(index)"/>
            </div>
        </div>
        <vs-button icon="add" @click="addButton" class="my-2 w-1/2">Añadir Respuesta</vs-button>
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
            },
            deleteButton: function (param) {
                console.log(param)
                this.value.splice(param,1)
            }
        }
    }
</script>