<template>
	<v-card class="mx-auto pa-3" max-width="400">
		<div class="d-flex align-center">
			<v-text-field label="Search City" v-model="localCity" @keyup.enter="newCity()"></v-text-field>
			<!-- <input type="text" v-model="location" @keyup.enter="newCity(weatherInfo.coord)" /> -->
			<!-- <v-autocomplete
				dense
				label="Search City"
				class="mr-2"
				v-model="location"
				:items="weatherDay"
				@keyup.enter="newCity"
			></v-autocomplete> -->
			<v-btn color="primary" fab small dark>
				<v-icon>mdi-home</v-icon>
			</v-btn>
		</div>
		<v-list-item two-line>
			<v-list-item-content>
				<v-list-item-title class="text-h5" v-if="weatherDay && weatherDay.sys">
					{{ weatherDay.name }}, {{ weatherDay.sys.country }}</v-list-item-title
				>
			</v-list-item-content>
		</v-list-item>

		<v-card-text v-if="weatherDay && weatherDay.main">
			<v-row class="align-center">
				<v-col class="text-h2" cols="6"> {{ Math.round(weatherDay.main.temp - 273) }}&deg;C </v-col>
				<v-col cols="6">
					<v-img
						:src="`http://openweathermap.org/img/wn/${weatherDay.weather[0].icon}@2x.png`"
						alt="Sunny image"
						width="92"
					></v-img>
				</v-col>
			</v-row>
		</v-card-text>
		<v-list-item>
			<v-list-item-subtitle 
				>{{ getDays }}, <b v-if="onecall.minutely"> {{ getUiTime || load}}</b>
			</v-list-item-subtitle>
		</v-list-item>

		<v-list-item v-if="weatherDay && weatherDay.clouds">
			<v-list-item-icon>
				<v-icon>mdi-cloud-outline</v-icon>
			</v-list-item-icon>
			<v-list-item-subtitle>Clouds - {{ weatherDay.clouds.all }}%</v-list-item-subtitle>
		</v-list-item>

		<v-list-item v-if="weatherDay && weatherDay.weather">
			<v-list-item-icon>
				<v-icon color="primary">mdi-record-circle-outline</v-icon>
			</v-list-item-icon>
			<v-list-item-subtitle>{{ weatherDay.weather[0].description }}</v-list-item-subtitle>
		</v-list-item>
	</v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'SearchWeatherSideBar',
	props: {
		labels: {
			type: Array,
			require: true,
		},
	},
	data() {
		return {
			localCity: '',
			load: 'Loading......',
		};
	},
	mounted() {
		this.get_weather_day(this.location);
		this.get_weather_5day(this.location);
		// this.one_call_API(this.weatherDay.coord);
	},
	computed: {
		...mapGetters(['weatherDay', 'onecall', 'location']),
		getDays() {
			return this.labels[new Date().getDay()];
		},
		getUiTime() {
				return new Date(this.onecall.minutely[0].dt * 1000).toLocaleTimeString();
		},
	},
	methods: {
		...mapActions(['get_weather_day', 'one_call_API', 'get_weather_5day']),
		newCity() {
			const { lat, lon } = this.weatherDay.coord;
			const coord = {
				lat,
				lon,
			};
			this.one_call_API(coord);
			this.$store.commit('set_location', this.localCity);
			this.get_weather_day(this.location);
			this.get_weather_5day(this.location);
			this.localCity = '';
		},
	},
	watch: {
		weatherDay(weatherDay) {
			if (weatherDay) {
				this.one_call_API(weatherDay.coord);
			}
		},
	},
};
</script>
<style lang="scss" scoped>
</style>