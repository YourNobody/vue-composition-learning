import {createApp} from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import {plugin as formKitPlugin, defaultConfig as formKitDefaultConfig} from '@formkit/vue';
import App from './App.vue';
import router from './router';
import store from './store';
import directives from '@/directives';
import components from '@/components';
import {generalToastOptions} from '@/configs';

const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component);
});

directives.forEach(directive => {
  app.directive(directive.name, directive);
});

app.use(store)
  .use(router)
  .use(Toast, generalToastOptions)
  .use(formKitPlugin, formKitDefaultConfig)
  .mount('#app');