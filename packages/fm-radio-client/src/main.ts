import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/style.less";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPowerOff,
  faBars,
  faArrowLeftLong,
  faArrowRightLong,
  faHandPointer,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPowerOff,
  faBars,
  faArrowLeftLong,
  faArrowRightLong,
  faHandPointer
);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
