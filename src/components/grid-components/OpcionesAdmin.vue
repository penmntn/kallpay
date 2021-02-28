<template>
    <span class="flex flex-row space-x-2 h-full justify-center content-center mt-px">
        <vs-button class="h-6 w-6" icon="settings" @click="bloquear"/>
        <vs-button class="h-6 w-6" icon="not_interested"/>
    </span>
</template>

<script>
    import Vue from 'vue'
    export default Vue.extend({
        methods: {
            bloquear: function (){
                console.log('')
            }
        }
    })
</script>