<template>
  <div>
    <div>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
  import dedent from 'dedent'

  // import theme style
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    props:{
      texto :  {type:String}
    },
    data() {
      return {
        content: dedent`
        
        `
      }
    },
    created(){
      this.content = dedent(this.texto)
    },
    watch:{
      texto(){
        this.content = dedent(this.texto)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editor,
  .output {
    height: 20rem;
    border: 1px solid #ccc;
  }

  .output {
    border-top: none;
  }
</style>