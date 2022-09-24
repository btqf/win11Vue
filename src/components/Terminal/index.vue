<template>
  <div class="Terminal FullBox">
    <ToolBar>命令提示符</ToolBar>
    <main>
      <CommandItem v-for="item in itemArray" :key="item" :item="item"></CommandItem>
      <div class="inputArea">
        <span>{{ path.join('/') }}></span>
        <textarea
          @input="input"
          @keydown.enter="enter"
          v-model="textarea"
          @keyup.up="upRecord"
          @keyup.down="tabCommand"
          @keyup.delete="tabArray.splice(0, tabArray.length)"
        >
        </textarea>
      </div>
    </main>
  </div>
</template>

<script setup>
  import ToolBar from '@/components/ToolBar'
  import { reactive } from 'vue'
  import CommandItem from './components/CommandItem.vue'
  import { responseAction, setPath, handleTabCommand } from '@/utils/terminal';
  import { handleInput } from '@/utils/terminal/handleInput';

  // 打印的信息
  const itemArray = reactive([]);
  // 路径信息
  let path = reactive(['C:', 'Users']);
  // 文本域
  let textarea = ref('');
  // 命令输入记录
  let record = [];

  setPath(path);

  const enter = (e) => {
    // 禁止回车换行
    e.preventDefault();
    const flag = textarea.value;
    const value = handleInput(flag, textarea);
    if (!value) {
      return;
    }
    const { actionOrigin, command } = value;
    // 如果是回退那么就不拆分
    const res = responseAction(path, { actionOrigin, command }, itemArray);
    // 记录栈
    record.push(`${actionOrigin} ${typeof command === 'object' ? command.join('/') : command}`);
    textarea.value = '';
  }

  // 记录当前是 record 数组的第几个元素
  let count = ref(0);
  
  // 回到上一个命令
  const upRecord = () => {
    if (count.value === record.length) {
      count.value = 0;
    }
    textarea.value = record[count.value++];
  }

  // 接受补全的数组
  let tabArray = reactive([]);

  const tabCommand = () => {
    // 为了处理输入的命令
    const flag = textarea.value;
    const value = handleInput(flag, textarea);
    if (!value) {
      return;
    }
    const { actionOrigin, command } = value;
    // 如果不是cd或是command为空 退出函数
    if (actionOrigin.toLocaleLowerCase() !== 'cd' || command[0] === '') {
      return;
    }
    // 如果补全的数组不为空，说明还没补全完毕,不退出
    // 但是如果中途切换了目录，但是数组未空，但是切换目录一定是要删除的
    // 所以监测删除建，如果删除，则立即情况补全数组
    if (tabArray.length) {
      textarea.value = `cd ${tabArray.pop()}`;
      return;
    }
    // 处理补全任务
    const res = handleTabCommand(path, command);
    if (!res.length) {
      return;
    }
    tabArray.splice(0, tabArray.length, ...res);
    textarea.value = `cd ${tabArray.pop()}`;
  };

  // 目的是更改大小
  const input = (e) => {
    const textarea = e.target;
    console.log(textarea.scrollHeight)
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
</script>

<style lang="scss" scoped>
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    height: 2em;
    border-radius: 5px;
    background-color: #777a7c;
  }

  .Terminal {
    background-color: rgba($color: #0b0b0b, $alpha: 0.98);
    box-shadow: 0 0 5px black;
    z-index: -1;
    user-select: auto;

    main {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: flex-start;
      color: white;
      overflow-y: scroll;
      padding: 10px;
      .inputArea {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom: 5px;

        span {
          margin-right: 10px;
        }

        textarea {
          background-color: transparent;
          outline: none;
          border: 0;
          color: white;
          font-size: 16px;
          resize: none;
          flex: 1;
          padding-top: 3px;
        }
      }
    }
  }
  :deep.topButton{
  background-color: white;
}
</style>