<template>
  <div :id="id">
    
    <vs-sidebar
      click-not-close	
      hidden-background
      position-right
      v-model="extra"
      class="items-no-padding">
      <div class="h-full">
        <slot name="iframe">
          <div class="customizer-header mt-6 flex items-center justify-between px-6">
            <slot name ="title">
              Titulo
            </slot>
            <feather-icon icon="XIcon" @click.stop="extra=!extra" class="cursor-pointer"></feather-icon>
          </div>
          <vs-divider class="mb-0"/>
          <component :is="scrollbarTag" class="scroll-area--customizer pt-4 pb-6" :settings="settings" :key="$vs.rtl">
              <div class="px-6">
                  <slot name="body">
                      Cuerpo
                  </slot>
              </div>
          </component>
          </slot>
        </div>
    </vs-sidebar>
  </div>
</template>
<script>

import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  props: {
      id:{ type: String },
      level:{ type: Number}
  },
  data() {
    return { 
        settings: {
        maxScrollbarLength : 60,
        wheelSpeed         :.40,
      }
    }
  },

  computed:{
    scrollbarTag() { return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar' },
    windowWidth(){  return this.$store.state.windowWidth },
    extra : {
      get() {
        if(this.$store.state.window.length > this.level){
            if(this.$store.state.window[this.level].id === this.id)
              return this.$store.state.window[this.level].active
            else return false
          }
          else return false 
        },
      set(val){
        let payload = {   id: this.id, active: val , level: this.level }
        this.$store.commit('UDPATE_SIDER_STATE_ACTIVE', payload)
      }
    }
  },
  
  components: {
    VuePerfectScrollbar,
  }
}
</script>

<style lang="scss">

.scroll-area--customizer {
  height: calc(100% - 5rem);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>

