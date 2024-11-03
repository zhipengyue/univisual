<template>
    <div class="single-header-collapse-panle" ref="collapsePanelRef">
        <div class="single-panel-header" :class="{'close':!status}">
            <div class="title">{{ title }}</div>
            <div class="custom">
                <slot name="header"></slot>
            </div>
            <div class="arrow" @click="switchStatusHandle">
                <el-icon><ArrowDown class="arrow-icon" :class="{'arrowUp':!status}" /></el-icon>
            </div>
        </div>
        <div class="single-panle-body" ref="collapseBodyRef">
            <div class="body-con" :class="{'close':!status}">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {ref, onMounted, watch} from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
const props = defineProps({
    title:{
        type: String,
        default: ''
    },
    height:{
        type: Number,
        default: 0
    }
})
watch(()=>props.height,(newV)=>{
    if(collapseBodyRef.value&&status.value){
        collapseBodyRef.value.style.height = props.height + 'px'
    }
    
})
const emits = defineEmits(['active'])
const collapseBodyRef = ref<HTMLElement | null>(null)
const status = ref<boolean>(false)
// const bodyHeight = ref<number>(0)

onMounted(()=>{
    // bodyHeight.value = collapseBodyRef.value?.offsetHeight||0
})
const switchStatusHandle = ()=>{
    status.value = !status.value
    if(collapseBodyRef.value){
        if(status.value){
            collapseBodyRef.value.style.height = props.height + 'px'
        }else{
            collapseBodyRef.value.style.height = 0 + 'px'
        }
    }
    emits('active',status.value)
   // console.log(collapseBodyRef.value?.offsetHeight)
}
</script>
<style lang="scss" scoped>
.single-header-collapse-panle{
    .single-panel-header{
        // height: 32px;
        padding: 5px 5px;
        display: flex;
        align-items: center;
        border-bottom:1px solid #000;
        color:rgba(255,255,255,0.8);
        transition: all 0.2s ease;
        background-color: var(--eleven-cascade-bg1);
        border-radius: 4px;
        box-shadow: 4px 0px 4px 0px rgba(0,0,0,1);
        &.close{
            border-bottom: 1px solid rgba(0,0,0,0);
        }
        .title{
            font-size: 14px;
            user-select: none;
        }
        .custom{
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-right: 10px;
        }
        .arrow{
            
            .arrow-icon{
                transition: all 0.2s ease;
                &.arrowUp{
                    transform: rotate(180deg);
                }   
            }
            
        }
    }
    .single-panle-body{
        height: 0;
        border-bottom:1px solid #000;
        color:rgba(255,255,255,0.5);
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
        border-radius: 4px;
        .body-con{
            padding: 5px;
            // &.close{
            //     transform: translate(0,-100%);
            // }
            position: relative;
            height: 100%;
            bottom:0;
            padding-bottom:10px;
            
        }
    }
}
</style>