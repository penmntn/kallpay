<template>
  <ais-menu :attribute="attribute">
    <vs-select  v-model="dato" slot-scope="{ items, canRefine, refine }"  @change="refine(dato)" class="w-full select-large"  v-bind="settings" :disabled="!canRefine">
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

export default {
  data() {
    return {
      dato : ""
    }
  },
  components: {
    AisMenu
  },
  props: {
    attribute: {
      type: String,
      required: true,
    },
    settings : {
      type:  Object,
    },
  },
};
</script>