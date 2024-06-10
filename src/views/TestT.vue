<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue Native HTML Popup</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <style>
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
    }

    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="app">
    <button @click="openModal">Open Modal</button>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p>This is a simple modal popup in Vue.js!</p>
      </div>
    </div>
  </div>

  <script>
    new Vue({
      el: '#app',
      data: {
        showModal: false
      },
      methods: {
        openModal() {
          this.showModal = true;
        },
        closeModal() {
          this.showModal = false;
        }
      }
    });
  </script>
</body>
</html>
