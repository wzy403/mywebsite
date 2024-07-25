<template>
  <prism :language="language" line-numbers>
    {{ codeContent }}
  </prism>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
// import Prism from 'prismjs';
import 'prismjs/themes/prism-coy.min.css'; // 根据需要选择主题
// import PrismComponent from 'vue-prism-component';

export default defineComponent({
  name: 'CodeBlock',
  components: {
    // PrismComponent
  },
  props: {
    language: {
      type: String,
      default: 'javascript'
    },
    value: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const codeContent = ref(props.value);

    watch(() => props.value, (newValue) => {
      codeContent.value = newValue;
    }, { immediate: true });

    return {
      codeContent
    };
  }
});
</script>

<style scoped>
.prism {
  background-color: #f7f4eb !important;
  font-family: 'Fira Code, monospace';
}
</style>
