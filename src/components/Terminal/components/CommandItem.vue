<template>
  <div>
    <div class="comment" v-if="item.comment">{{ item.comment }}</div>

    <div v-for="i in item.list" :key="i" class="itemList">
      {{ i }}
    </div>
  </div>
</template>

<script setup>
  defineProps({
    item: {
      type: Object,
      default: () => {},
    },
  });
</script>

<style lang="scss" scoped>
  div {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 3px 3px;
  }
  .comment {
    max-width: 50%;
  }
  .itemList {
    margin-bottom: 5px;
  }
</style>