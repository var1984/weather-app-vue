<template>
	<v-card class="mx-auto pa-3" max-width="400" color="#bdddf0bb">
		<div class="d-flex align-center">
			<v-text-field
				label="Search City"
				v-model="localCity"
				@change="newCity()"
				@keyup.enter="newCity()"
				id="autoCompaleInputSelector"
			></v-text-field>
			<v-btn color="primary" fab small dark href="https://openweathermap.org/" target="_blank">
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
				>{{ getDays }}, <b v-if="onecall.minutely"> {{ getUiTime || load }}</b>
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
		};
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
		...mapActions(['getWeatherDay', 'oneCallApi', 'getWeather5Day']),
		newCity() {
			this.oneCallApi(this.weatherDay.coord);
			this.$store.commit('setLocation', this.localCity);
			this.getWeatherDay(this.location);
			this.getWeather5Day(this.location);
			this.localCity = '';
		},
	},
};
</script>
<style lang="scss" scoped>
</style>