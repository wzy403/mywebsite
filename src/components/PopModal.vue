<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="visible" class="modal-overlay" @click.self="close">
        <div class="modal-content" role="dialog" aria-modal="true">
          <button class="close-button" @click="close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <img
            :src="require(`@/assets/img/${imageName}`)"
            alt="Modal Image"
            class="modal-image"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { watch, onMounted, onUnmounted } from 'vue';

export default {
  name: 'PopModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    imageName: {
      type: String,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const close = () => {
      emit('close');
    };

    const handleKeydown = (e) => {
      if (e.key === 'Escape' && props.visible) {
        close();
      }
    };

    watch(() => props.visible, (newVal) => {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown);
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    });

    return {
      close
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(44, 40, 37, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal-backdrop);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

[data-theme="dark"] .modal-overlay {
  background: rgba(0, 0, 0, 0.75);
}

.modal-content {
  position: relative;
  background: var(--bg-secondary);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 90vw;
  max-height: 90vh;
  z-index: var(--z-modal);
}

.modal-image {
  display: block;
  max-width: 100%;
  max-height: calc(90vh - var(--spacing-8));
  height: auto;
  width: auto;
  border-radius: var(--radius-md);
  object-fit: contain;
}

.close-button {
  position: absolute;
  top: calc(-1 * var(--spacing-3));
  right: calc(-1 * var(--spacing-3));
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
}

.close-button:hover {
  background: var(--accent-secondary);
  color: var(--text-primary);
  transform: scale(1.1);
}

.close-button svg {
  width: 18px;
  height: 18px;
}

/* Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity var(--transition-normal);
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform var(--transition-normal), opacity var(--transition-normal);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  opacity: 0;
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    padding: var(--spacing-3);
    margin: var(--spacing-4);
    max-width: calc(100vw - var(--spacing-8));
  }

  .close-button {
    top: calc(-1 * var(--spacing-2));
    right: calc(-1 * var(--spacing-2));
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: var(--spacing-2);
    border-radius: var(--radius-md);
  }
}
</style>
