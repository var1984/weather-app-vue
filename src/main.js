import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBcpwZoBc0gh20auPp2iFLnU5cqrd0jTSc',
		libraries: 'places',
	}
});
Vue.config.productionTip = false;



new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
