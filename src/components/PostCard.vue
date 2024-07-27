<template>
  <div class="PostCard">
    <h3 class="post-title">{{ post.title }}</h3>
    <!-- <div class="post-date">{{ formatDate(post.date) }}</div> -->
    <!-- <p>{{ post.excerpt }}</p> -->
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    post: {
        type: JSON,
        default: []
    },
  },
  setup() {
    return {};
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
  },
};
</script>

<style scoped>
.PostCard {
  color: #000;
  text-decoration: none;
  flex: 5 1 0%;
  min-width: 0;
  margin: 10px;
  background: linear-gradient(rgb(244, 244, 244), rgb(246, 246, 246));
  text-transform: capitalize;
  line-height: 1.2;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.PostCard:hover {
  cursor: pointer;
  transform: scale(1.01);
}

.post-title {
  display: block;
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 15px;
  height: 100%;
  width: 100%;
  font-size: large;
}

@media (max-width: 768px) {
  .PostCard {
    margin: 5px;
    padding: 10px;
    font-size: 0.9em;
  }

  .post-title {
    font-size: medium;
    white-space: normal;
    word-wrap: break-word;
  }
}

@media (max-width: 430px) {
  .PostCard {
    margin: 0;
    padding: 0;
    font-size: 0.9em;
  }

  .post-title {
    font-size: medium;
    white-space: normal;
    word-wrap: break-word;
  }
}
</style>
