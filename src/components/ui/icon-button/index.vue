<template>
    <border-button class="border-button" :style="{ '--eleven-hover-width': props.width + 'px' }">
        <span class="icon-layer">
            <slot name="icon">
                <icon-layer />
            </slot>
        </span>
        <span class="border-button-text">
            <slot>
            </slot>
        </span>
    </border-button>
</template>
<script lang="ts" setup>
import borderButton from '../border-button/index.vue'
import { IconLayer } from '@/components/icons'
const props = defineProps({
    width: {
        type: Number,
        default: 36
    },
    svgBorder: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="scss" scoped>
.border-button {
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    overflow: hidden;
    display: inline-block;
    //position: relative;

    &:hover {
        width: var(--eleven-hover-width);
        border: 1px solid var(--eleven-button-border-green);

        .icon-layer {
            fill: var(--eleven-button-text-green);
        }

        .border-button-text {
            color: var(--eleven-button-text-green);
            opacity: 1;
            transform: translate(0, -1px);
        }
    }

    &:active {
        border: 1px solid var(--eleven-button-border-green);
        background-color: var(--eleven-button-fill-green);
        box-shadow: 5px 5px 5px var(--eleven-button-fill-green);
        ;

        .icon-layer {
            fill: var(--eleven-button-text-green);
        }

        .border-button-text {
            color: var(--eleven-button-text-green);
        }
    }
}

.icon-layer {


    :deep(.icon) {
        width: var(--eleven-button-size);
        height: var(--eleven-button-size);
        transform: translate(0, 1px);
    }

    fill: var(--eleven-button-text-dark);
}

.border-button-text {
    transition: all 0.2s ease;
    opacity: 0;
    position: absolute;
    transform: translate(10px, -1px);
    margin-left: 2px;
    color: var(--eleven-button-text-dark);
    font-size: var(--eleven-button-font-size);
}
</style>