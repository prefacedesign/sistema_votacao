const Parse = require('parse');
Parse.initialize("gzJUUs9GDBjNshWTAgzXKTIgq3yqN0CdmYp6UI9e", "oxpwv0i6pxMFZSrFRnaNiVA5JIgybCbh47YLvxaR")
Parse.serverURL="https://parseapi.back4app.com/";

window.Parse = Parse;

import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
