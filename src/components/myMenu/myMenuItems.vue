<template>
    <div 
      v-if="active"
      class="absolute w-60  mt-7 right-0 -mr-2  divide-y divide-gray-200 rounded-md  bg-white shadow-lg  focus:outline-none">
            <myMenuItem  v-for="(item,i) in items" :key="i" :item="item" @click=" emit('click',item)"  />
    </div>
</template>

<script setup>
import myMenuItem from './myMenuItem.vue'
defineProps({
    items: Array,
    active:Boolean
})
const emit = defineEmits(['click']);
</script>