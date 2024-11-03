<template>
    <div class="input-tips" :style="tipCss" @clickoutside="()=>{emits('close',null)}">
        <div class="list">
            <div class="item" v-for="item in searchList" :key="item" @click="()=>{selectKeywords(item)}">
                {{ item }}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, toRef,computed,watch } from 'vue';
const emits = defineEmits(['selectWords','close'])
const props = defineProps({
    keywords: {
        type: String,
        default: ''
    },
    tipCss: {
        type: Object,
        default: () => ({})
    },
    searchList: {
        type: Array<any>,
        default: () => []
    },
    allList: {
        type: Array<any>,
        default: () => []
    },
    currentIndex:{
        type: Number,
        default: 0
    },
    exceptItems:{
        type: Array<any>,
        default: () => []
    }
})
const searchList = computed(()=>{
    const _list = filterArray(props.exceptItems,props.allList)
    return _list.filter(item => {
        return item.indexOf(props.keywords)>-1
    })
})
const selectKeywords = (keywords:string)=>{
    emits('selectWords',{
        index:props.currentIndex,
        value:keywords
    })
}
function filterArray(a:any[], b:any[]) {
    if(!a.length||!b.length) return b;
    return b.filter(itemB => {
      return!a.some((itemA:any) => {
        for (let key in itemA) {
          if (itemA.hasOwnProperty(key) && itemA[key] === itemB[key]) {
            return true;
          }
        }
        return false;
      });
    });
  }
</script>
<style lang="scss" scoped>
.input-tips{
    position: fixed;
    width:50%;
    z-index:1;
    box-shadow: 2px 2px 10px 0 rgba(0,0,0,0.5);
    .list{
        width: 100%;
        background: #000;
        font-size: 12px;
        padding: 4px;
        max-height: 200px;
        overflow: auto;
        .item{
            color: #b1b1b1;
            height: 24px;
            line-height: 24px;
            transition: all 0.2s ease;
            cursor: pointer;
            user-select: none;
            &:hover{
                background-color: rgba(255,255,255,0.1);
            }
        }
    }
}
.input-tips-background{
    position: fixed;
    top: 0;
    left:0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
}
</style>