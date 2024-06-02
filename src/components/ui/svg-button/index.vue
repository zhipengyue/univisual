<template>
  <div
    class="svg-button"
    :style="{ height: props.height + 'px', width: props.width + 'px' }"
    @mouseover="mouseIn = true"
    @mouseleave="mouseIn = false"
  >
    <div class="content">
      <slot>按钮</slot>
    </div>
    <svg width="100%" height="100%">
      <rect
        width="100%"
        height="100%"
        stroke="#fff"
        fill="transparent"
        stroke-dasharray="3 3"
        :rx="props.radius"
        :ry="props.radius"
      >
        <!-- <animate v-if="mouseIn" attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" -->
        <!-- values="0; 10;" calcMode="linear" /> -->
      </rect>
    </svg>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  width: {
    type: Number,
    default: 36
  },
  height: {
    type: Number,
    default: 36
  },
  radius: {
    type: Number,
    defualt: 0
  }
})
const mouseIn = ref<Boolean>(false)
</script>
<style lang="scss" scoped>
.svg-button {
  position: relative;
  display: inline-block;
  // height: 26px;
  background-color: transparent;
  cursor: pointer;

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    rect {
      transition: all 0.2s ease;
      border-radius: var(--eleven-button-radius);
      stroke: var(--eleven-button-border-dark);
    }
  }

  &:hover {
    svg {
      rect {
        stroke: var(--eleven-button-border-green);
        animation: dashAnimation 0.6s linear infinite;
      }
    }

    .content {
      color: var(--eleven-button-text-green);
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
    color: var(--eleven-button-text-dark);
    transition: all 0.2s ease;
    //color: var(--eleven-button-text-green);
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
</style>
