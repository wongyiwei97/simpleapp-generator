import { defineNuxtPlugin } from "#app";
import axios from 'axios'
import PrimeVue from "primevue/config";
import SimpleAppAutocomplete from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppAutocomplete.vue'
import SimpleAppAutocompletemulti from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppAutocompletemulti.vue'
import SimpleAppCalendar from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppCalendar.vue'
import SimpleAppCheckbox from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppCheckbox.vue'
import SimpleAppChip from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppChip.vue'
import SimpleAppColor from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppColor.vue'
// import SimpleAppEditor from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppEditor.vue'
import SimpleAppForm from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppForm.vue'
import SimpleAppList from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppList.vue'
import SimpleAppListmulti from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppListmulti.vue'
import SimpleAppNumber from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppNumber.vue'
import SimpleAppPassword from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppPassword.vue'
import SimpleAppRadio from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppRadio.vue'
import SimpleAppRating from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppRating.vue'
import SimpleAppSelect from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppSelect.vue'
import SimpleAppSelectmulti from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppSelectmulti.vue'
import SimpleAppSlider from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppSlider.vue'
import SimpleAppSwitch from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppSwitch.vue'
import SimpleAppText from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppText.vue'
import SimpleAppTextarea from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppTextarea.vue'
import SimpleAppValue from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppValue.vue'
import SimpleFieldContainer from '@simitgroup/simpleapp-vue-component/src/components/SimpleFieldContainer.vue'
import SimpleAppDatatable from '@simitgroup/simpleapp-vue-component/src/components/SimpleAppDatatable.vue'
import mitt from 'mitt'
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
//import Quill from 'quill'
const emitter = mitt()



export default defineNuxtPlugin((nuxtApp) => {
  const { csrf } = useCsrf()    
  axios.defaults.headers.common = {"CSRF-TOKEN": csrf};

    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp
    .component("SimpleAppAutocomplete",SimpleAppAutocomplete)
    .component("SimpleAppAutocompletemulti",SimpleAppAutocompletemulti)
    .component("SimpleAppCalendar",SimpleAppCalendar)
    .component("SimpleAppCheckbox",SimpleAppCheckbox)
    .component("SimpleAppChip",SimpleAppChip)
    .component("SimpleAppColor",SimpleAppColor)
    // .component("SimpleAppEditor",SimpleAppEditor) // not suitable, will cause problem in ssr mode
    .component("SimpleAppForm",SimpleAppForm)
    .component("SimpleAppList",SimpleAppList)
    .component("SimpleAppListmulti",SimpleAppListmulti)
    .component("SimpleAppNumber",SimpleAppNumber)
    .component("SimpleAppPassword",SimpleAppPassword)
    .component("SimpleAppRadio",SimpleAppRadio)
    .component("SimpleAppRating",SimpleAppRating)
    .component("SimpleAppSelect",SimpleAppSelect)
    .component("SimpleAppSelectmulti",SimpleAppSelectmulti)
    .component("SimpleAppSlider",SimpleAppSlider)
    .component("SimpleAppSwitch",SimpleAppSwitch)
    .component("SimpleAppText",SimpleAppText)
    .component("SimpleAppTextarea",SimpleAppTextarea)
    .component("SimpleAppValue",SimpleAppValue)
    .component("SimpleFieldContainer",SimpleFieldContainer)
    //.component("Quill",Quill)  // cause problem in ssr mode
    .use(ToastService).use(ConfirmationService)
    ;
    return {
        provide: {
          event: emitter.emit, // Will emit an event
          listen: emitter.on // Will register a listener for an event
        }
    }
    //other components that you need
});
