<template>
  <div class="popup-cantainer" @click.stop>
    <transition :name="'popup-content-transition-' + dir">
      <slot v-if="isVisible"></slot>
    </transition>
    <div @click="isVisible = !isVisible">
      <template v-if="$slots.reference">
        <slot name="reference"></slot>
      </template>
    </div>
  </div>
</template>

<script>
export default {
    name: "Popup",
    setup () {
        const isVisible = ref(false);
        const emits = defineEmits(['show', 'hide']);
        defineProps({
            dir: {
                type: String,
                default: 'bottom',
            },
        });
        watch(isVisible, () => {
            if (isVisible.value) {
                emits('show')
            } else {
                emits('hide')
            }
        });
        document.addEventListener('click', function () {
            isVisible.value = false;
        });
        return {
            isVisible,
            emits,
            dir
        }
    }
}
</script>

<style lang="scss" scoped>
  .popup-content-transition-bottom-enter-from,
  .popup-content-transition-bottom-leave-to {
    height: 500px !important;
    opacity: 0;
  }

  .popup-content-transition-bottom-enter-active {
    transition: height 0.05s ease-in, opacity 0.05s ease-in;
  }

  .popup-content-transition-bottom-leave-active {
    transition: height 0.05s ease-out, opacity 0.05s ease-out;
  }
  .popup-content-transition-left-enter-from {
    left: -800px;
  }
  .popup-content-transition-left-leave-to {
    left: 0;
  }

  .popup-content-transition-left-enter-active {
    transition: left 1s;
  }

  .popup-content-transition-left-leave-active {
    transition: left 1s;
  }
</style>