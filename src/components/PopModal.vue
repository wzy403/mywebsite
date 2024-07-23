<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <span class="close-button" @click="close">&times;</span>
      <img :src="require(`@/assets/img/${imageName}`)" alt="Modal Image" height="600" width="350" />
    </div>
  </div>
</template>

<script scoped>
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
  methods: {
    close() {
      this.$emit("close");
    },
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>
