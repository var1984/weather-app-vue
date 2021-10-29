<template>
	<v-card class="mx-auto pa-3" max-width="400">
		<div v-for="(weatherInfo, index) of weatherDay" :key="weatherInfo.id">
			<div class="d-flex align-center">
				<v-text-field
					label="Search City"
					v-model="localCity"
					@keyup.enter="newCity(weatherInfo.coord)"
				></v-text-field>
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
					<v-list-item-title class="text-h5">
						{{ weatherInfo.name }}, {{ weatherInfo.sys.country }}</v-list-item-title
					>
					<v-list-item-subtitle></v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-card-text>
				<v-row class="align-center">
					<v-col class="text-h2" cols="6"> {{ Math.round(weatherInfo.main.temp - 273) }}&deg;C </v-col>
					<v-col cols="6">
						<v-img
							:src="`http://openweathermap.org/img/wn/${weatherInfo.weather[index].icon}@2x.png`"
							alt="Sunny image"
							width="92"
						></v-img>
					</v-col>
				</v-row>
			</v-card-text>
			<v-list-item v-for="(time, index) of onecall" :key="time.id">
				<v-list-item-subtitle
					>{{ setDays }}, <b>{{ setTime(time, index) }}</b>
				</v-list-item-subtitle>
			</v-list-item>

			<v-list-item>
				<v-list-item-icon>
					<v-icon>mdi-cloud-outline</v-icon>
				</v-list-item-icon>
				<v-list-item-subtitle>Clouds - {{ weatherInfo.clouds.all }}%</v-list-item-subtitle>
			</v-list-item>

			<v-list-item>
				<v-list-item-icon>
					<v-icon color="primary">mdi-record-circle-outline</v-icon>
				</v-list-item-icon>
				<v-list-item-subtitle>{{ weatherInfo.weather[index].description }}</v-list-item-subtitle>
			</v-list-item>
		</div>
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

	mounted() {
		this.get_weather_day(this.location);
		this.get_weather_5day(this.location);
	},
	computed: {
		...mapGetters(['weatherDay', 'onecall', 'location']),
		setDays() {
			return this.labels[new Date().getDay()];
		},
	},
	methods: {
		...mapActions(['get_weather_day', 'one_call_API', 'get_weather_5day']),
		newCity({ lat, lon }) {
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
		setTime(time, index) {
			return new Date(time.minutely[index].dt * 1000).toLocaleTimeString();
		},
	},
	watch: {
		weatherDay(weatherDay) {
			if (weatherDay) {
				this.one_call_API(weatherDay[0].coord);
				return weatherDay;
			}
		},
	},
};
</script>
<style lang="scss" scoped>
</style>