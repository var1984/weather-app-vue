<template>
	<WeatherApp v-if="!isLoading" />
	<v-row v-else>
		<v-progress-circular :size="70" :width="7" color="purple" indeterminate class="loader"></v-progress-circular>
	</v-row>
</template>

<script>
import WeatherApp from './components/Weather-App/Weather-App.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'App',
	components: {
		WeatherApp,
	},
	mounted() {
		this.init();
	},
	methods: {
		...mapActions(['getWeather5Day', 'oneCallApi', 'getWeatherDay']),

		async init() {
			await this.getWeather5Day(this.location);
			await this.getWeatherDay(this.location);
			await this.oneCallApi();
		},
	},
	computed: {
		...mapGetters(['isLoading', 'weatherDay', 'onecall', 'weather5day', 'location']),
	},
};
</script>
<style lang="scss" scoped>
.loader {
	margin: 15% auto;
}
</style>
