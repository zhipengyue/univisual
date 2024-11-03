import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { propertyClassify, propertyValues } from '@/data/property'
export const useStyleStore = defineStore('style', () => {
    const state = reactive<{propertyClassifyOptions: any[]}>({
        propertyClassifyOptions: [],
    })
    function convertData(data) {
        const result = [];
        for (const category in data) {
            const children = data[category].map(item => ({ value: item, label: item }));
            result.push({
                value: category.toLowerCase(),
                label: category,
                children
            });
        }
        return result;
    }
    function getPropertyClassifyOptions(){
        state.propertyClassifyOptions = convertData(propertyClassify) as any[]
        return state.propertyClassifyOptions
    }
    function getPropertyValuesByName(name: string) {
        return propertyValues[name]
    }
    function transferListToOptions(list:any[]){
        return list.map(item => ({ value: item, label: item }));
    }
  return { state, getPropertyClassifyOptions,getPropertyValuesByName,transferListToOptions}
})
