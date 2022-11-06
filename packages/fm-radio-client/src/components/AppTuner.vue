<template>
  <div
    class="bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-full grid py-12"
  >
    <div
      class="w-[700px] bg-white text-black mx-auto rounded rounded-sm grid grid-rows-[200px_auto_200px] drop-shadow-2xl"
    >
      <div
        class="text-sky-400 text-left text-6xl font-thin pt-24 grid grid-flow-col justify-center"
      >
        <div class="grid items-start">
          <div>FM</div>
          <div>107.5</div>
        </div>
      </div>
      <div class="grid items-end">
        <div class="grid grid-flow-col relative">
          <div
            class="absolute border border-right h-32 w-px border-sky-500 left-1/2 top-[-90px]"
          />
          <div v-for="i in 12" :key="i" class="text-center text-sky-200">|</div>
        </div>
        <div class="self-start mt-4 mx-4">
          <div
            class="max-w-[650px] overflow-scroll h-20 text-sm snap-x snap-mandatory"
          >
            <span
              v-for="i in 200"
              :key="i"
              class="text-center text-sky-200 mr-1 snap-always snap-center"
            >
              {{ (800 + i) / 10 }}
            </span>
          </div>
        </div>
      </div>
      <div>
        <div class="grid justify-center text-blue-300 py-10">
          <div class="grid grid-flow-col justify-center">
            <font-awesome-icon icon="fa-solid fa-arrow-left-long" class="h-4" />
            <font-awesome-icon icon="fa-solid fa-hand-pointer" class="h-12" />
            <font-awesome-icon
              icon="fa-solid fa-arrow-right-long"
              class="h-4"
            />
          </div>
          <span>Drag left-right to tune</span>
        </div>
        <div
          class="grid grid-cols-[3.5rem_auto_3.5rem] bg-blue-600 h-full items-center h-14 text-blue-200"
        >
          <div
            class="bg-blue-700 h-full grid items-center justify-center cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-power-off" />
          </div>
          <div class="px-2 text-right">Stations List</div>
          <div class="h-full grid items-center justify-center cursor-pointer">
            <font-awesome-icon icon="fa-solid fa-bars" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
