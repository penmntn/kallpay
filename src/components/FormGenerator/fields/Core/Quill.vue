
<template>
  <div class="example">
    <quill-editor
      class="editor"
      ref="myTextEditor"
      :content="content"
      :options="editorOption"
      @change="onEditorChange($event)"
    />
  </div>
</template>

<script>
  import dedent from 'dedent'
  import { quillEditor } from 'vue-quill-editor'
  import abstractField from "../abstractField";
  // import theme style
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    name: 'quill-example-bubble',
     mixins:[abstractField],
    title: 'Theme: bubble',
    components: {
      quillEditor
    },
    data() {
      return {
        editorOption: {
          theme: 'bubble',
          placeholder: "HOLA",
          modules: {
            toolbar: [
              ['bold', 'italic'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'header': [ 2,  false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['link'],
              ['clean']
            ]
          }
        },
        content: dedent`
          <h1 class="ql-align-center"><s class="ql-font-serif">I am bubble example!</s></h1><p><br></p><p><span class="ql-font-serif">Whenever you play the game of thrones, you either win or die. There is no middle ground.</span></p><p><strong class="ql-font-serif">Some war against sword and spear to win, and the others the crow and the paper to win.</strong></p><p><br></p><p><u class="ql-font-serif">Dead history is write in ink, the living sort in blood.</u></p><p><em class="ql-font-serif">They're only numbers. Numbers on paper. Once you understand that, it's easy to make them behave.</em></p><p><br></p><p><span class="ql-font-serif">Every time we deal with an enemy, we create two more.</span></p><p><span class="ql-font-serif">So the king has decreed. The small council consents.</span></p><p><br></p><p><span class="ql-font-serif">Chaos not is a pit, chaos is a ladder.</span></p><p><span class="ql-font-serif">A chain needs all sorts of metals, and a land needs all sorts of people.</span></p><p><br></p><p><span class="ql-font-serif">When the snows fall and the white winds blow, the lone wolf dies, but the pack survives.</span></p>
        `
      }
    },
    methods: {
      onEditorChange({ html, text }) {
        console.debug('editor change!', html, text)
        this.value = html
      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      }
    },
  }
</script>

<style lang="scss" scoped>
  .editor{
    height: 60vh;
    border: 1px solid #ccc;
     border-radius: 10px;
  }
</style>