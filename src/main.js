import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles.scss'
import vuetify from './plugins/vuetify';
import x5GMaps from "x5-gmaps";

Vue.use(x5GMaps, {
	key: "AIzaSyBcpwZoBc0gh20auPp2iFLnU5cqrd0jTSc",
	libraries: ["places"]
});

Vue.config.productionTip = false;



new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
