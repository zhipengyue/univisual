<template>
    <div class="border-button">
        <slot>

        </slot>
    </div>
</template>

<style lang="scss" scoped>
.border-button {
    padding: 4px 8px;
    border-radius: var(--eleven-button-radius);
    border: 1px solid var(--eleven-button-border-dark);
    box-sizing: border-box;
    margin-right: 4px;
}
</style>