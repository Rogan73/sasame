<template>
  <div class="top-16 w-auto bg-zinc-100 border border-slate-200">
    <div class="bg-zinc-200 rounded-full mx-4 my-4 py-2">
      <div as="div" class="relative inline-block flex flex-row mx-2 items-center">
        <div class="text-xs px-3">
          <span class="text-black/75">{{ resultTime }}</span>
          <span v-if="isLogin" class="text-black/50"><span v-if="resultTime"> / </span>{{ workTime }}</span>
        </div>

        <div v-if="!isLogin">
          <myBtn text="Entrar" type="success" @click="Entrar()" />
        </div>

        <div v-if="isLogin" class="relative">
          <myBtn :text="isPaused ? 'Continuar' : 'Pausar'" type="default"  @click="Pausar()"  />
          <div  v-if="isPaused"    class="absolute left-3 bg-yellow-400 opacity-90 h-4 w-4 rounded-full "  style="top: 5px" />
          <myBtn text="Salir" type="warining" @click="Salir()" />
        </div>

        <div class="border-l border-solid border-slate-400 h-5 mx-2"></div>

        <div class="relative">
          <img
            el_menu
            class="cursor-pointer h-6 w-6 ml-1 rounded-full bg-zinc-200 border border-slate-400"
            :src="avatar"
            @click.self="OpenMenu"
          />
          <div   class="absolute bg-green-500 opacity-90 h-2 w-2 rounded-full top-2 -right-1"  />
        </div>

        <div
          @click.self="OpenMenu"
          el_menu
          class="cursor-pointer inline-flex rounded-full bg-zinc-200 px-4 py-0 text-sm font-bold text-black/75 hover:bg-opacity-30 hover:text-black/100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {{ userName }}
          <ChevronDownIcon
            @click.self="OpenMenu"
            el_menu
            class="ml-2 -mr-1 h-5 w-5 text-slate-600 hover:text-black"
            aria-hidden="true"
          />
          <myMenu :active="MenuActive" :items="arMenuItems" @click="SelMenuItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import APIrequest from "./services/api";
import Geolocation from "./services/geo";
import myBtn from "./components/myBtn.vue";
import myMenu from "./components/myMenu/myMenu.vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

// Variables
let avatar = ref("assets/images/photo.jpg");
let isLogin = ref(false);
let isPaused = ref(false);
let employee = ref(null);
let workTime = ref("");
let resultTime = ref("");
let userName = ref("");
let LocalworkEntryIn;
let employeeId = "";

const api = new APIrequest("work-entries");




// los datos para el menu dropdown se puede cargar desde fuera y modificar
let arMenuItems = ref([
  {
    id: 1,
    text: "Mis cuentas",
    icon: "ChevronLeftIcon",
    iconText: "",
    cmd: "cuentas",
    submenu: {
      position: "left",
      items: [
        {
          // se puede usar el "text" o "SessionName","UserName","workTime"
          // el "text" es mas universal
          id: 101,
          text:
            '<strong>Sesame1</strong> Kelli Pierce<br><div class="">Hoy llevas 00:00</div> ',
          icon: "ArchiveIcon",
          cmd: "session1",
          iconText: "S1",
          SessionName: "Sesame1",
          UserName: "Kelli Pierce",
          workTime: "00:00",
        },
        {
          id: 102,
          text:
            '<strong>Sesame2</strong> Kelli Pierce<br><div class="">Hoy llevas 00:00</div> ',
          icon: "ArchiveIcon",
          cmd: "session2",
          iconText: "S2",
          SessionName: "Sesame2",
          UserName: "Kelli Pierce",
          workTime: "00:00",
        },
      ],
    },
  },
  { id: 2, text: "Vista Empleado", icon: "DuplicateIcon", cmd: "vistaemp", iconText: "" },
  { id: 3, text: "Mi perfil", icon: "EditIcon", iconText: "", cmd: "perfil" },
  { id: 4, text: "Cerrar session", icon: "DeleteIcon", iconText: "", cmd: "cerrar" },
]);

onMounted(() => {
  actualizar();
  //geo();



});

const ConvertTime = (v) => {
  let t = new Date(v);
  return (t.getHours() + ":" + ("0" + t.getMinutes()).slice(-2) + ":" + ("0" + t.getSeconds()).slice(-2));
};

const diffTime = (startTime, endTime, ShowDays = false) => {
  let t1 = new Date(startTime);
  let t2 = new Date(endTime);

  let delta = Math.floor((t2 - t1) / 1000);
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  let seconds = delta % 60;
  let d = days > 0 ? days + "d. " : "";
  if (ShowDays) {
    hours = hours + days * 24;
    d = "";
  }
  return `${d}${hours}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)} `;
};

// API
// en API no se dice nada como obtener ultimo estado del empleado
// al principio para obtener el nombre y el ID cojemos ultimo linia en Array
const actualizar = () => {
  api.get().then((data) => {
    let lastID = localStorage.getItem("lastID", data.id) || "";
    let foundLastId = false;

    if (data.length) {
      console.log("lastID", lastID);

      if (lastID != "") {
        employee.value = {
          ...data.filter((el) => {
            return el.id == lastID;
          })[0],
        };

        if (!Object.keys(employee.value).length === 0) {
          // found object
          console.log("found object");
          foundLastId = true;
          employee.value = { ...data[data.length - 1] };
        } else {
          // not found last ID
          console.log("not found object - get last record");
          employee.value = { ...data[data.length - 1] };
        }
      } else {
        employee.value = { ...data[data.length - 1] };
      }

      console.log("GET actualizar", employee.value);

      userName.value =employee.value.employee.firstName + " " + employee.value.employee.lastName;
      LocalworkEntryIn = "00:00:00";
      employeeId = employee.value.employee.id;

      if (foundLastId) {
        isLogin.value = employee.value.employee.workStatus == "online" ? true : false;
        isPaused.value = employee.value.employee.workStatus == "paused" ? true : false;
        workTime.value = !isLogin.value ? (workTime.value = diffTime( employee.value.workEntryIn.date, employee.value.workEntryOut.date )): "";
        LocalworkEntryIn = isLogin.value ? employee.value.workEntryIn.date : "00:00:00";
      }
    }
  });
};

const Entrar = () => {
  let obj = {
    employeeId: employeeId,
    workEntryIn: {
      coordinates: {
        latitude: position.latitude,
        longitude: position.longitude,
      },
    },
  };

  api.post("/clock-in", obj).then((data) => {
    console.log("POST Entrar :", data);
    if (data) {
      localStorage.setItem("lastID", data.id);
      isLogin.value = data.employee.workStatus == "online" ? true : false;
      workTime.value = "00:00:00";
      LocalworkEntryIn = data.workEntryIn.date;

      StartVirtualTimer();
    }else{ Salir() }
  });
};

// en API no hay peticione para Pausar
const Pausar = () => {
  isPaused.value = !isPaused.value;
  isPaused.value ? StopVirtualTimer() : StartVirtualTimer();
};

const Salir = () => {
  let obj = {
    employeeId: employeeId,
    workEntryOut: {
      coordinates: {
        latitude: position.latitude,
        longitude: position.longitude,
      },
    },
  };

  api.post("/clock-out", obj).then((data) => {
    console.log("POST Salir:", data);

    isLogin.value = data.employee.workStatus == "offline" ? false : true;
    //isLogin.value = false;
    resultTime.value = diffTime(data.workEntryIn.date, data.workEntryOut.date);
    isPaused.value = false;
    localStorage.removeItem("lastID");
    StopVirtualTimer();
  });
};


//Geolocation
let position = {};
new Geolocation().getLocation().then(data=>position={...data} );

// Menu
let MenuActive = ref(false);

const OpenMenu = () => MenuActive.value = true;


const SelMenuItem = (item) => {
  MenuActive.value = false;
  console.log(item.cmd);
};

document.addEventListener("click", (event) => {
  if (!event.target.hasAttribute("el_menu") && event.target.tagName != "svg")
    MenuActive.value = false;
});

// VirtualTImer
let VirtualTimer;
const StartVirtualTimer = () => {
  VirtualTimer = setInterval(() => {
    workTime.value = diffTime(LocalworkEntryIn, new Date().toString());
  }, 1000);
};
const StopVirtualTimer = () =>   clearInterval(VirtualTimer)

</script>
