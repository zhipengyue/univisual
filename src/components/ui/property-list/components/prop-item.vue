<template>
    <div class="prop-item">
        <div class="prop-key">
            <el-input v-model="key" placeholder="Please input" @focus="inputFocus" @change="inputChange"/>
        </div>
        <div class="prop-value">
            <el-input v-model="value" placeholder="Please input" @focus="inputValueFocus" @change="valueChange"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref,watch,defineExpose,getCurrentInstance } from 'vue'
const props = defineProps({
    index:{
        type: Number,
        default: 0
    },
    styleObj: {
        type: Object,
        default: ()=>{}
    },
})
const emits = defineEmits(['showTips','tipCss','keywords','selectIndex','update:styleObj']);
const key = ref<string>('')
const value = ref<string>('')
const instance =getCurrentInstance();
initData()
watch(()=>props.styleObj,(newV)=>{
    initData()
},{deep:true})
function initData(){
    const keys = Object.keys(props.styleObj)
    key.value = keys[0]
    value.value = props.styleObj[keys[0]]
}

const inputFocus = (event:any)=>{
    emits('showTips',true)
    emits('keywords',{value:key.value,type:'key'})
    emits('selectIndex',props.index)
    const position = event.target.getBoundingClientRect();
    emits('tipCss',{
        'top': position.y + position.height + 'px',
        'left': position.x - 11 + 'px',
        'width': position.width+22 + 'px',
    })
}
const inputValueFocus = (event:any)=>{
    emits('showTips',true)
    emits('keywords',{value:value.value,type:'value'})
    emits('selectIndex',props.index)
    const position = event.target.getBoundingClientRect();
    emits('tipCss',{
        'top': position.y + position.height + 'px',
        'left': position.x - 11 + 'px',
        'width': position.width+22 + 'px',
    })
}
const valueChange= (event:any) => {
    emits('keywords',{value:value.value,type:'value'})
    emits('selectIndex',props.index)
    emits('update:styleObj',{[key.value]:value.value})
}
const inputChange = (event:any)=>{
    emits('keywords',{value:key.value,type:'key'})
    emits('selectIndex',props.index)
    emits('update:styleObj',{[key.value]:value.value})
}
function setKey(value:string){
    key.value = value
    instance?.proxy?.$forceUpdate();
    emits('keywords',{value:key.value,type:'key'})
}
function setValue(_value:string){
    value.value = _value
    instance?.proxy?.$forceUpdate();
    emits('keywords',{value:value.value,type:'value'})
    if(key.value){
        emits('update:styleObj',{[key.value]:value.value})
    }
}
defineExpose({
    setValue,
    setKey
})
</script>
<style lang="scss" scoped>
.prop-item{
    display: flex;
    position:relative;
    .prop-key{
        flex:1;
        :deep(.el-input){
            border-radius: 0;
            .el-input__wrapper{
                border-radius: 0;
                box-shadow: none;
                background: var(--el-bg-color);;
            }
            input{
                height: 25px;
            }
        }
    }
    .prop-value{
        margin-left: 4px;
        flex:1;
        :deep(.el-input){
            border-radius: 0;
            .el-input__wrapper{
                border-radius: 0;
                box-shadow: none;
                background: var(--el-bg-color);;
            }
            input{
                height: 25px;
            }
        }

    }

}

.prop-item+.prop-item{
    margin-top: 4px;
}
</style>