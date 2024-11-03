<template>
    <prop-item  
    v-for="(item,index) in filterList" 
    :key="item" 
    :index="index"
    :styleObj="item" 
    ref="propItems"
    @keywords="(value)=>setKeywordsHandle(value,item)"
    @showTips="setShowTips"
    @tipCss="(value)=>tipCss = value"
    @selectIndex="selectCurrentIndex"
    @update:styleObj="(value)=>{
      Object.keys(value).forEach((key)=>{
        item[key] = value[key]
      })
    }"
    ></prop-item>
    <propTips
    v-if="showTips"
    :keywords="keywords"
    :index="currentIndex"
    :exceptItems="filterList"
    :tipCss="tipCss"
    :allList="allPropertyKeyList" 
    v-clickOutside="clickOutSideHandle"
    @selectWords="quickSelect"
    ></propTips>
</template>
<script lang="ts" setup>
import {ref,toRef,watch} from 'vue';
import propItem from './components/prop-item.vue';
import propTips from './components/prop-tips.vue';
const props = defineProps({
    filterList:{
      type: Array<any>,
      default: () => []
    },
    allPropertyKeyList:{
      type: Array<any>,
      default: () => []
    }
})
const emits = defineEmits(['update:filterList']);
const keywords = ref<string>('');
const showTips = ref<boolean>(false);
const tipCss = ref<any>({});
const currentIndex = ref<number>(-1);
const filterList = toRef<any[]>(props.filterList)
watch(()=>props.filterList,(newV)=>{
  filterList.value = newV
})
// console.log(filterList.value)
const propItems = ref<any[]>([]);
const selectCurrentIndex = (index:number)=>{
  currentIndex.value = index;
}
const quickSelect = (data:any)=>{
  propItems.value[currentIndex.value].setKey(data.value)
  clickOutSideHandle()
}
const clickOutSideHandle = () => {
    showTips.value = false
}
const setShowTips = () => {
  setTimeout(()=>{
    showTips.value = true
  },200)
}
const setKeywordsHandle = (value:any,item:any)=>{
  if(!value.value) return;
  if(value.type==='key'){
    keywords.value = value.value
    if(!item[keywords.value]){
      Object.keys(item).forEach((key)=>{
        delete item[key]
      })
      item[keywords.value] = ''
    }
  } else {
    const keyLength = Object.keys(item).length
    if(keyLength){
      Object.keys(item).forEach(key=>{
        item[key] = value.value
      })
    }
  }
  console.log(filterList.value)
  emits('update:filterList',filterList.value)
}
</script>
<style lang="scss">
.prop-item{
  .prop-name{
    display: flex;
  }
  .prop-value{
    display:flex;
    :deep(.el-select){width: 100%}
  }
}
</style>