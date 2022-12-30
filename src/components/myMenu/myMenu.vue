<template>

          <div class="relative" v-if="active">
            <myMenuItems class="mmenu" :active="active" :items="items" @click="selitem" />
            <myMenuSubItems :active="SubMenuAcitve && active" :items="submenu" :position="submenu.position" @click="selitem"/>
          </div>

</template>

<script setup>
import {ref,watch} from 'vue'
import myMenuItems from './myMenuItems.vue'
import myMenuSubItems from './myMenuSubItems.vue'
const props=defineProps({
    items: Array,
    active:Boolean
})

const emit = defineEmits(['click']);

let submenu = ref([])

const selitem = item =>{
    if ("submenu" in item){
        submenu.value=[...item.submenu.items]
        SubMenuAcitve.value=true;
        }else{
        SubMenuAcitve.value=false;    
        emit('click',item)
        }
    }

let SubMenuAcitve = ref(false);

watch(() => props.active,(v) => {
    if (!v)SubMenuAcitve.value=false; 
    });


</script>

<style scoped>
.mmenu::after {
    content: '';
    position: absolute;
    right: 30px;
    top: -15px;
    border: 5px solid transparent;
    border-bottom: 10px solid white;
   }
 
</style>