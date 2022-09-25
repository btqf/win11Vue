<template>
  <div class="LeftNavRoot">
    <div class="MyComputor">
      <img src="@/assets/img/setting/thispc-sm.png" alt="" />
      <span>此电脑</span>
    </div>
    <DropDownMenuVue v-for="item in data" :key="item" :data="item"></DropDownMenuVue>
  </div>
</template>

<script setup>
  import DropDownMenuVue from './DropDownMenu.vue';
  import useFolderStore from '@/store/folderStore'

  let data = reactive([]);

  const store = useFolderStore();

  watch(
    () => store.storeCompletedFolder,
    (newValue) => {
      const length = data.length;
      data.splice(0, length, ...newValue);
    },
    { deep: true }
  );
  data = store.storeCompletedFolder;
</script>

<style lang="scss" scoped>
  .LeftNavRoot {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
  }
  .MyComputor {
      display: flex;
      justify-content: flex-start;
      font-size: 13px;
      margin-top: 1px;
      img {
        height: 1.5em;
        width: 1.5em;
        padding: 0 0.4em 0 0.6em;
      }
    }
</style>
