<template>
  <div class="code-block-wrapper">
    <div v-if="language" class="code-header">
      <span class="code-lang">{{ language }}</span>
    </div>
    <pre class="code-block"><code
      ref="codeRef"
      :class="['hljs', language ? `language-${language}` : '']"
    >{{ codeContent }}</code></pre>
  </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, nextTick } from 'vue';
import hljs from 'highlight.js';

export default defineComponent({
  name: 'CodeBlock',
  props: {
    language: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const codeContent = ref(props.value);
    const codeRef = ref(null);

    const highlightCode = () => {
      nextTick(() => {
        if (codeRef.value && props.language && hljs.getLanguage(props.language)) {
          codeRef.value.innerHTML = hljs.highlight(props.value, {
            language: props.language
          }).value;
        }
      });
    };

    watch(() => props.value, (newValue) => {
      codeContent.value = newValue;
      highlightCode();
    }, { immediate: true });

    onMounted(() => {
      highlightCode();
    });

    return {
      codeContent,
      codeRef
    };
  }
});
</script>

<style scoped>
.code-block-wrapper {
  margin: var(--spacing-6) 0;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
}

.code-header {
  display: flex;
  align-items: center;
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.code-lang {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.code-block {
  margin: 0;
  padding: 0;
  background: transparent;
}

.code-block code {
  display: block;
  padding: var(--spacing-4);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  overflow-x: auto;
  background: transparent;
  color: var(--text-primary);
}

/* 响应式 */
@media (max-width: 768px) {
  .code-block code {
    font-size: var(--text-xs);
    padding: var(--spacing-3);
  }
}
</style>
