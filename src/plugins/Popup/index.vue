<template>
  <div class="popover-cantainer" @click.stop>
    <transition :name="'popover-content-transition-' + dir">
      <slot v-if="isVisible"></slot>
    </transition>
    <div @click="isVisible = !isVisible">
      <template v-if="$slots.reference">
        <slot name="reference"></slot>
      </template>
    </div>
  </div>
</template>

<script setup>
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
      emits('show');
    } else {
      emits('hide');
    }
  });

  document.addEventListener('click', function () {
    isVisible.value = false;
  });
</script>

<script>
  export default {
    name: 'Popup',
  };
</script>

<style scoped>
  /* bottom */
  .popover-content-transition-bottom-enter-from,
  .popover-content-transition-bottom-leave-to {
    width: 500px !important;
    opacity: 0;
  }

  .popover-content-transition-bottom-enter-active {
    transition: width 0.1s ease-in, opacity 0.1s ease-in;
  }

  .popover-content-transition-bottom-leave-active {
    transition: width 0.3s ease-out, opacity 0.3s ease-out;
  }


  .popover-content-transition-left-enter-from {
    right: 150px;
  }
  .popover-content-transition-left-leave-to {
    right: 0;
  }

  .popover-content-transition-left-enter-active {
    transition: right 1s;
  }

  .popover-content-transition-left-leave-active {
    transition: right 1s;
  }
</style>
