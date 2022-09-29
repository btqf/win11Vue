<template>
  <transition name="message-box-fade">
    <div class="message-box" v-if="state.visible">
      <audio src="http://d.datouwang.com/uploads/file/yinxiao/2021/yinxiao5053.mp3" />
      <div class="message-box-modal-frame" @click="modalClickHandle">
        <div class="message-box-wrapper" :class="{ error: hasError }" @click.stop>
          <div class="title">
            {{ title }}
          </div>
          <content-view :field="field" class="content-view"></content-view>
          <div class="btn-group">
            <button class="cancel-btn" v-if="showCancelBtn" @click="cancelBtnClick">
              {{ cancelBtnText }}
            </button>
            <button class="confirm-btn" @click="confirmBtnClick">{{ confirmBtnText }}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
  import { HConfrimContent, HPromptContent } from './h';

  const state = reactive({
    visible: false,
    clickBtnType: '',
  });

  const promptValue = ref('');

  const props = defineProps({
    title: {
      type: String,
      default: '标题',
    },
    content: {
      type: String,
      default: '内容',
    },
    showCancelBtn: {
      type: Boolean,
      default: false,
    },
    cancelBtnText: {
      type: String,
      default: '取消',
    },
    confirmBtnText: {
      type: String,
      default: '确定',
    },
    field: {
      type: String,
      default: 'confrim',
    },
  });

  const setVisible = (isVisible) => {
    state.visible = isVisible;
  };

  const cancelBtnClick = () => {
    state.clickBtnType = 'cancel';
    setVisible(false);
  };

  const confirmBtnClick = () => {
    state.clickBtnType = 'confrim';
    setVisible(false);
  };

  const ContentView = ({ field }) => {
    switch (field) {
      case 'confrim':
        return HConfrimContent(props.content);
      case 'prompt':
        return HPromptContent(props.content, promptValue);
      default:
        break;
    }
  };

  const hasError = ref(false);
  // 点击蒙层提示用户处理当前的盒子
  const modalClickHandle = () => {
    hasError.value = true;
    document.querySelector('audio').play();
  };

  defineExpose({
    setVisible,
    state,
    promptValue,
  });
</script>

<style lang="scss" scoped>
  .message-box-fade-enter-from,
  .message-box-fade-leave-to {
    opacity: 0;
  }

  .message-box-fade-enter-active {
    transition: opacity 0.2s ease-in;
  }

  .message-box-fade-leave-active {
    transition: opacity 0.2s ease-out;
  }

  // 蒙层
  .message-box-modal-frame {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    // background-color: #ededed;
  }

  .message-box-wrapper {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 190px;
    background-color: $myWhite;
    box-shadow: 0 0 20px rgb(125, 124, 124);
    border-radius: 10px;
    user-select: none;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 22px;
      padding: 8px 5px 15px;
      font-weight: bold;
    }

    .content-view {
        padding-left: 130px;
    }
    .content-wrapper {
      flex: 1;
    }
    
    .btn-group {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 40px;
      background-color: $myBlue;
      border-radius: 5px 10px;

      button {
        float: right;
        margin: 10px;
        padding: 0;
        width: 5em;
        height: 1.8em;
        background-color: $myGray;
        border: 1px solid white;
        border-radius: 5px;

        &:hover {
          background-color: #0f8fee;
        }

        &:focus {
          color: black;
          background-color: white;
        }
      }
    }
  }

  .message-box-closed {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }

  .error {
    // border: 2px solid red;
    transition: 0.3s;
    box-shadow: 0 0 40px rgb(212, 84, 84);
  }

  audio {
    display: none;
  }
</style>
