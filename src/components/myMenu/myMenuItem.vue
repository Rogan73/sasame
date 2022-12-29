<template

>
    <div 
    @click="emit('click')"  el_menu
    class=" cursor-pointer  font-normal px-1 py-2 text-black/50 text-xs  hover:bg-teal-100  hover:rounded-md"
    >
              <ChevronLeftIcon el_menu v-if="item.icon=='ChevronLeftIcon'"
               class="absolute h-5 w-5 top-3 text-slate-600 opacity-80 "
             />

              <ChevronRightIcon el_menu v-if="item.icon=='ChevronRightIcon'"
               class="absolute right-1 h-5 w-5 top-3 text-slate-600 opacity-80 "
             />
            

                <div el_menu class="text-left flex flex-start items-center"
                :class="{'py-2 justify-around': item.iconText==''}"
                >
                  <div v-if="item.iconText!=''" class="circle mx-3 ">{{item.iconText}}</div>
                  <span v-html="item.text"   el_menu></span>

                 <!-- si utilisamos los campos del submenu "SessionName","UserName","workTime"
                 <span class="font-bold">{{item.SessionName}}</span><span class="" >{{item.UserName}}</span>
                 <div  class="" >Hoy llevas {{item.workTime}}</div> -->

                </div>


    </div>
</template>

<script setup>
import { ChevronLeftIcon,ChevronRightIcon } from "@heroicons/vue/20/solid";


defineProps({
    item:Object
})
const emit = defineEmits(['click']);

</script>

