<template>
          <button
            @click="emit('click') "
            type="button"
            :class="{ 'bg-teal-500' : type=='success', 'bg-slate-600' : type=='default', 'bg-red-500' : type=='warining' } "
            class="rounded-full  bg-opacity-60 px-2 py-1 mx-2 text-xs text-white w-28 hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            {{text}}
          </button>
</template>

<script setup >
defineProps({
    text:String,
    type:String
})
 const emit = defineEmits(['click'])
</script>