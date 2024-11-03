<template>
    <div class="panel facade">
        <!-- // 添加按钮 -->
        <!-- <property-item></property-item> -->
        <template v-for="item in propertyClassList" :key="item">
            <single-header-collapse-panle :title="item" :height="(classifyStyle[item]?.length||1) * 32+4" @active="singlePanel">
                <template #header>
                    <el-icon title="添加属性" @click="addProperty(item)"><CirclePlus /></el-icon>
                </template>
                <template #body>
                    <propertyList :allPropertyKeyList="propertyClassify[item]" :filterList="classifyStyle[item]" @update:filterList="updateStyleHandle"/>
                </template>
            </single-header-collapse-panle>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { watch,computed,ref } from 'vue'
import propertyList from '@/components/ui/property-list/index.vue'
import SingleHeaderCollapsePanle from '@/components/ui/single-header-collapse-panle/index.vue'
import { propertyClassify } from '@/data/property'
import { CirclePlus } from '@element-plus/icons-vue'

const props = defineProps({
    modelValue:{
        type:Object,
        default:()=>{}
    }
})
const classifyStyle = ref<any>({})
watch(()=>props.modelValue,(newV)=>{
    splitCss(newV)
},{deep:true})
const propertyClassList:any = computed(()=>{
    return Object.keys(propertyClassify)||[]
})
const emits = defineEmits(['update:modelValue'])
const singlePanel = (status:boolean) => {

}
const splitCss = (obj:any) => {
    const properList:string[] = Object.keys(obj)
    const properClassNameList: string[] = propertyClassList.value
    properClassNameList.forEach((classifyName) => {
        classifyStyle.value[classifyName] =filterClassifyContentList(propertyClassify[classifyName],properList)
    })
}
const filterClassifyContentList = (filterList:string[],allList:string[]) => {
    const _list =  allList.filter(item => {
        return filterList.includes(item)
    })
    return  _list.map(item => {
        return {[item]:props.modelValue[item]}
    })
}
const addProperty = (item:string) => {
    if(!classifyStyle.value[item]) classifyStyle.value[item] = []
    classifyStyle.value[item].push({})
}
const updateStyleHandle = (value:any) => {
    let result = {};
    console.log(classifyStyle.value)
    Object.keys(classifyStyle.value).forEach((className)=>{
        classifyStyle.value[className].forEach((styleItem:any)=>{
            result = Object.assign(result,styleItem)
        })
    })
    console.log(result)
    emits('update:modelValue',result)
    splitCss(result)
}
</script>
<style lang="scss" scoped>
.contaienr{
    .list-move,.list-enter-active,.list-leave-active{
    transition: all 0.5s ease;
    }
}
.el-icon{
    cursor: pointer;
}
</style>