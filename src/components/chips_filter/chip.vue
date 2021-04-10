<template lang="html">
  <div class="w-full px-4">
    <div v-for="(chip, key ) in chips" :key="'chip-'+ key">
        <div v-if="chip!== ''" >
            <vs-chip
                transparent
                :color="randomColor()"
                remove-icon="delete_forever"
                @click="remove(key)"
                closable close-icon="delete">                
                {{ chip }}
            </vs-chip>
        </div>
     </div>

  </div>
</template>

<script>
 
 import {random } from 'lodash' 
export default {
  data(){
    return {
        lista : ['primary', 'warning' , 'danger', 'sucess', '#0eb34d' , '#3684bf' , '#37a9bd']
    }
  },
  computed: {
      chips(){
          return this.$store.state.empresa.chip_filter
      }
  },
  methods: {
    remove (key ) {
      this.$store.commit('empresa/UDPATE_CHIPS_FILTRO_BUSQUEDA_BASE' , {id :  key ,  value : '' , instancia : this})
    },
    randomColor(){
        return this.lista[random(0, this.lista.length-1)]
    }
  }
}
</script>

<style lang="css">
.total {
  width: 100%
}
</style>