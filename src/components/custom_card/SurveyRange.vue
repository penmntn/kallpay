<template>
    <div class="flex flex-row space-x-2">
        <div v-for="(item,index) in value" :key="index" class="flex flex-row btn-group">
            <p class="self-center w-8 h-8">{{ item }}</p>
            <vs-button icon="clear" @mousedown="borrar(index)" class="w-8 h-8"/>
            <vs-button icon="edit" class="w-8 h-8"/>
        </div>
        <vs-button icon="add" @click="agregar"/>
    </div>
</template>

<script>
    export default {
        props: {
            value: Array
        },
        methods: {
            borrar: function (item) {
                this.value.splice(item,1)
            },
            agregar: function () {
                this.value.push(this.value.length + 1)
            }
        }
    }
</script>