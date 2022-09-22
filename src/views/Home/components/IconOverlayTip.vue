<template>
  <div class="deskTop-tip" v-if="store.tipIsVisible" ref="deskTopTipRef">
    {{ store.tipContent }}
  </div>
</template>

<script setup>
  import useIconOverlayTipStore from '@/store/iconOverlayTipStore'
  import { pagePos, getViewportSize } from '@/utils/ViewSize/desktop'
  import DragFeatrue from '@/utils/ViewSize/drag/DragFeatrue.js'

  const store = useIconOverlayTipStore();
  const deskTopTipRef = ref(null);
  document.addEventListener('mousemove', function (e) {
    if (store.tipIsVisible) {
      DragFeatrue.prototype.move.call(
        {
          mouseX: pagePos(e).X + 15,
          mouseY: pagePos(e).Y + 15,
          elem: deskTopTipRef.value,
        },
        0,
        0,
        {
          edgeWeight: getViewportSize().width,
          edgeHeight: getViewportSize().height,
        }
      );
    }
  });

</script>

<style lang="scss" scoped>
  .deskTop-tip {
    position: fixed;
    z-index: 1000;
    top: -999px;
    left: -999px;
    padding: 2px;
    font-size: 14px;
    color: #0033cc;
    background-color: $myWhite;
    border: 1px solid #000;
  }
</style>