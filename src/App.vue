<template>
	<WeatherApp v-if="!isLoading" />
	<div v-else class="text-center">
		<v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
	</div>
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
		...mapActions(['get_weather_5day', 'one_call_API', 'get_weather_day']),

		async init() {
			await this.get_weather_5day(this.location);
			await this.get_weather_day(this.location);
			await this.one_call_API();
		},
	},
	computed: {
		...mapGetters(['isLoading', 'weatherDay', 'onecall', 'weather5day', 'location']),
	},
};
</script>
