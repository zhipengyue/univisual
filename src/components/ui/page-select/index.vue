<template>
  <div class="page-select">
    <svg width="100%" height="100%">
      <rect
        x="0"
        y="0"
        class="dashline1"
        width="100%"
        height="100%"
        stroke="#fff"
        stroke-width="3"
        fill="transparent"
        stroke-dasharray="3 3"
      ></rect>
      <!-- <rect
        class="dashline2"
        x="0"
        y="0"
        width="100%"
        height="100%"
        stroke="#000"
        fill="transparent"
        stroke-dasharray="3 3"
      ></rect> -->
    </svg>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
</script>
<style lang="scss" scoped>
.page-select {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  pointer-events: none;
  svg {
    width: calc(100% - 4px);
    height: calc(100% - 4px);

    rect.dashline1 {
      transition: all 0.2s ease;
      border-radius: var(--eleven-button-radius);
      stroke: var(--eleven-layer-item-hover-color);
      animation: dashAnimation 0.6s linear infinite;
    }
    rect.dashline2 {
      transition: all 0.2s ease;
      border-radius: var(--eleven-button-radius);
      stroke: #000;
      animation: dashAnimation2 0.6s linear infinite;
    }
  }

  //border: 1px solid var(--eleven-button-border-dark);
  box-sizing: border-box;
  margin-right: 4px;

  .content {
    //position: absolute;
    //width: 100%;
    //height: 100%;
    padding: 4px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    transition: all 0.2s ease;
    color: var(--eleven-button-text-green);
  }
}

@keyframes dashAnimation {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: 6;
  }
}
@keyframes dashAnimation {
  0% {
    stroke-dashoffset: 6;
  }

  100% {
    stroke-dashoffset: 12;
  }
}
</style>
