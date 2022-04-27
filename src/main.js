import {createApp, reactive} from 'vue';
import firebase from 'firebase/compat/app';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {plugin as formKitPlugin, defaultConfig as formKitDefaultConfig} from '@formkit/vue';
import App from './App.vue';
import router from './router';
import store from './store';
import directives from '@/directives';
import components from '@/components';
import providers from '@/providers';
import {firebaseConfig, generalToastOptions} from '@/configs';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component);
});

directives.forEach(directive => {
  app.directive(directive.name, directive);
});

providers.forEach(provider => {
  app.provide(provider.name, provider);
});

app.use(store)
  .use(router)
  .use(Toast, generalToastOptions)
  .use(formKitPlugin, formKitDefaultConfig)
  .mount('#app');
