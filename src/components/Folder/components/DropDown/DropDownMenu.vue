<template>
  <div class="menu">
    <div
      class="titleHaveChildren"
      :class="{ DropStatus: DropStatus }"
      v-if="data.path && data.children.length !== 0"
      @click="goToTargetFolder(data)"
    >
      <span @click="toggleDropStatus">&gt;</span>
      {{ data.name }}
    </div>
    <div
      class="titleNoChildren"
      v-if="data.path && data.children.length === 0"
      @click="goToTargetFolder(data)"
    >
      {{ data.name }}
    </div>
    <div class="content" v-if="children.length !== 0">
      <DropDownMenu v-for="item in children" :key="item" :data="item"></DropDownMenu>
    </div>
  </div>
  
</template>

<script setup>
  import useFolderStore from '@/store/folderStore'
  const props = defineProps(['data']);

  const data = props.data;
  let children = reactive([]);

  const DropStatus = ref(false);

  const toggleDropStatus = () => {
    if (children.length) {
      children.splice(0, children.length);
      DropStatus.value = false;
    } else {
      children.splice(0, 0, ...props.data.children);
      DropStatus.value = true;
    }
  };

  const store = useFolderStore();
  const goToTargetFolder = (data) => {
    store.changeCurrentFolder(data);
  };

  watch(
    () => store.storeCurrentFolder,
    (newValue) => {
    //   DropStatus.value = true;
      // console.log(newValue);
    },
    { deep: true }
  );
</script>

<style lang="scss" scoped>
  .menu {
    width: 95%;
    margin-left: 2%;
    white-space: nowrap;
    overflow: hidden;
    .titleHaveChildren {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 2em;
      width: 100%;
      padding-left: 0.5em;
      margin-left: 0.2em;
      border-radius: 0.2em;

      &:hover {
        background-color: #e3e3e3;
      }
    }

    span {
      font-size: 1.3em;
      margin-right: 5px;
    }

    .titleNoChildren {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 2em;
      margin-left: 0.2em;
      border-radius: 0.2em;

      &:hover {
        background-color: #e3e3e3;
      }
    }

    .content {
      padding-left: 10%;
      font-size: 12px;
    }
  }

  .DropStatus {
    span {
      transform: rotate(90deg);
    }
  }
</style>
