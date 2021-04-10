<template>
  <ais-menu :attribute="attribute">
    <vs-select  v-model="dato" slot-scope="{ items, canRefine, refine }"  @change="input(refine, dato)" class="w-full select-large"  v-bind="settings" :disabled="!canRefine">
        <vs-select-item  
             v-for="item in items"
             :key="item.value"
            :value="item.value" 
            :text="item.value" 
            :is-selected.sync="item.isRefined"
            class="w-full"  />
    </vs-select>
  </ais-menu>
</template>
<script>

import {AisMenu} from 'vue-instantsearch'
import {get , debounce } from 'lodash'

export default {
  
  created() {
    this.$store.commit('empresa/UDPATE_CHIPS_FILTRO_BUSQUEDA_BASE', {id :  this.id ,  value : '' , instancia : this})
  },
  
  computed: {
    dato : {
      set(val ){
        this.$store.commit('empresa/UDPATE_CHIPS_FILTRO_BUSQUEDA_BASE',  { id :  this.id ,  value : val , instancia : this } )
      },
      get(){ 
        return get(this.$store.state.empresa.chip_filter, this.id )
      }
    }
  },
  components: {
    AisMenu
  },
  props: {
    id: {
      type : String,
      required : true
    },
    attribute: {
      type: String,
      required: true,
    },
    settings : {
      type:  Object,
    },
  },
  methods: {
    input :  debounce(function(refine, val ){
        refine(val)
    }, 500)
  }
};
</script>