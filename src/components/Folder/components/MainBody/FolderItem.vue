<template>
    <li
     ref="folderItemRef"
     @dblclick="goToTargetPath(data)"
     :title="`大小：${size}`"
    >
        <img :src="getSrcSetting(icon)" alt="" />
        <div>
            <span @click.right="changeName($event, data)">
                <em
                 v-for="item in name"
                 :key="item"
                 >
                 {{item}}
                </em>
            </span>
            <input type="text" :placeholder="`${name}${extension ? `.${extension}` : ''}`" />
        </div>
    </li>
</template> 

<script setup>
  import useFolderStore from '@/store/folderStore';
  import { getSrcSetting } from '@/utils/getSrc';
  import drag from '@/utils/ViewSize/drag';

  defineProps({
    icon: {
      type: String,
      default: 'folder.png',
    },
    data: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String,
      default: '0KB',
    },
    usageRate: {
      type: String,
      default: '0%',
    },
    name: {
      type: String,
      default: '新建文件夹',
    },
    extension: {
      type: String,
      default: '.',
    },
    folderItemDoms: {
      type: Array,
      default: () => [],
    },
    fullyData: {
      type: Array,
      default: () => [],
    },
  });

  const folderItemRef = ref(null);
  const isActive = ref(false);
  
  const store = useFolderStore();
  // 接受Emits，更新当前打开文件
  const goToTargetPath = (data) => {
      if (data.children) {
          store.changeCurrentFolder(data)
      }
  }

  // 文件改名
  const changeName = (e, item) => {
      // e.preventDefault();
    //   Desktop文件夹不能修改名字
      if (item.name === 'Desktop' || item.getPath()[1] === 'Desktop') {
          return;
      }

      const target = e.target.parentElement;
      const input = target.nextElementSibling;
      // 处理点击时样式
      input.style.display = 'block';
      input.style.display = 'none';
      input.focus();
      // 更改点击对象
      input.addEventListener('blue', (e) => {
          input.style.display = 'none';
          input.style.display = 'block';
          const value = e.target.value;
          // 如果输入不为空， 更改名字和路径
          if (value) {
              const res = item.changeName && item.changeName(value);
              // 判断名字是否在当前文件夹中重复
              if (!res) {
                  return;
              }
              item.setPath && item.setPath();
          }
      })
  }
</script>

<style lang="scss" scoped>
li {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    width: 6em;
    height: 6em;

    img {
      width: 3em;
      height: 3em;
    }

    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      span {
        font-size: 0.7em;
      }
    }
  }
  .active {
    background-color: #e1f3ff;
  }
  div {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    display: none;
    width: 100%;
    height: 20px;
    outline: 0;
  }
  .highLight {
    font-weight: 700;
    color: rgb(236, 15, 15);
  }
</style>