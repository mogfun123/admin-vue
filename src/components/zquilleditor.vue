<template>
  <div class="quill-editor">
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
  </div>
</template>

<script>
  require('quill/dist/quill.snow.css')
  require('quill/dist/quill.bubble.css')
  require('quill/dist/quill.core.css')
  if (!window.Quill) {
    window.Quill = require('quill/dist/quill.js')
  }
  export default {
    name: 'quill-editor',
    data() {
      return {
        _content: '',
        defaultModules: {
          toolbar: {
            container:[
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          handlers:{
            'image':this.imageHandler 
            }
          }
        }
      }
    },
    props: {
      content: String,
      value: String,
      disabled: Boolean,
      options: {
        type: Object,
        required: false,
        default() {
          return {}
        }
      }
    },
    mounted() {
      this.initialize()
    },
    beforeDestroy() {
      this.quill = null
    },
    methods: {
       selectLocalImage() {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();
      input.onchange = () => {
        const file = input.files[0];

        // file type is only image.
        if (/^image\//.test(file.type)) {
          this.saveToServer(file);
        } else {
           this.$message(`只能选择images`)
         
        }
      };
    },
    saveToServer(file) {
      const fd = new FormData();
      fd.append('image', file);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.API.UPLOADURL, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          const url = JSON.parse(xhr.responseText).data;
          if (!url) {
             this.$message(`图片上传异常`)
             return 
          }
          this.insertToEditor(url);
        }
      };
      xhr.send(fd);
    },
    insertToEditor(url) {
      const range = this.quill.selection.getRange()
      this.quill.editor.insertEmbed(range.index, 'image', `${url}`);
    },
      imageHandler (){
         this.selectLocalImage()
      },
      initialize() {

        if (this.$el) {

          // options and instance
          var self = this
          self.options.theme = self.options.theme || 'snow'
          self.options.boundary = self.options.boundary || document.body
          self.options.modules = self.options.modules || self.defaultModules
          self.options.modules.toolbar = self.options.modules.toolbar !== undefined 
                                          ? self.options.modules.toolbar 
                                          : self.defaultModules.toolbar
          self.options.placeholder = self.options.placeholder || 'Insert text here ...'
          self.options.readOnly = self.options.readOnly !== undefined ? self.options.readOnly : false
          self.quill = new Quill(self.$refs.editor, self.options)

          // set editor content
          if (self.value || self.content) {
            self.quill.pasteHTML(self.value || self.content)
          }

          // mark model as touched if editor lost focus
          self.quill.on('selection-change', (range) => {
            if (!range) {
              self.$emit('blur', self.quill)
            } else {
              self.$emit('focus', self.quill)
            }
          })

          // update model if text changes
          self.quill.on('text-change', (delta, oldDelta, source) => {
            var html = self.$refs.editor.children[0].innerHTML
            const text = self.quill.getText()
            if (html === '<p><br></p>') html = ''
            self._content = html
            self.$emit('input', self._content)
            self.$emit('change', {
              editor: self.quill,
              html: html,
              text: text
            })
          })

          // emit ready
          self.$emit('ready', self.quill)
        }
      }
    },
    watch: {
      'content'(newVal, oldVal) {
        if (this.quill) {
          if (!!newVal && newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if(!newVal) {
            this.quill.setText('')
          }
        }
      },
      'value'(newVal, oldVal) {
        if (this.quill) {
          if (!!newVal && newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if(!newVal) {
            this.quill.setText('')
          }
        }
      },
      'disabled'(newVal, oldVal) {
        if (this.quill) {
          this.quill.enable(!newVal)
        }
      }
    }
  }
</script>

<style>
  .quill-editor img {
    max-width: 100%;
  }
</style>
