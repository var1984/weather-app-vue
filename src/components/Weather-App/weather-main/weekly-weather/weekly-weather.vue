<template>
	<v-container>
		<div class="d-flex">
			<v-bottom-navigation :value="value" color="primary">
				<v-btn @click="onToday">
					<span>Today</span>
				</v-btn>
				<v-btn @click="onWeek">
					<span>Week</span>
				</v-btn>
			</v-bottom-navigation>
			<v-spacer></v-spacer>
			<v-bottom-navigation :value="value" color="primary">
				<v-btn @click="onFahrenheit">
					<span>&deg;F</span>
				</v-btn>
				<v-btn @click="onCelsius">
					<span>&deg;C</span>
				</v-btn>
			</v-bottom-navigation>
		</div>
		<div v-if="changeDay" class="d-flex flex">
			<div class="d-flex flex" v-for="wetherInfo of weather5day.list" :key="wetherInfo.id">
				<v-card width="170" class="d-flex flex-column align-center">
					<v-list-item-subtitle>{{ setDays(wetherInfo) }}</v-list-item-subtitle>
					<v-img
						:src="`http://openweathermap.org/img/wn/${wetherInfo.weather[0].icon}@2x.png`"
						alt="Sunny image"
						width="92"
					></v-img>
					<v-list-item-subtitle v-if="changeDegrees">
						<span>{{ Math.round(wetherInfo.main.temp_min - 273) }}&deg;C - </span>
						<span>{{ Math.round(wetherInfo.main.temp_max - 273) }}&deg;C</span>
					</v-list-item-subtitle>
					<v-list-item-subtitle v-else>
						<span>{{ Math.round(1.8 * wetherInfo.main.temp_min - 457.87) }}&deg;F - </span>
						<span>{{ Math.round(1.8 * wetherInfo.main.temp_max - 457.87) }}&deg;F</span>
					</v-list-item-subtitle>
				</v-card>
			</div>
		</div>
		<div v-else>
			<v-card class="d-flex align-center">
				<v-list-item class="text-h6" v-if="weatherDay && weatherDay.sys">
					{{ weatherDay.name }}, {{ weatherDay.sys.country }}</v-list-item
				>
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
				<v-list-item v-if="weatherDay && weatherDay.weather">
					<span> {{ Math.round(weatherDay.main.temp_min - 273) }}&deg;C-</span>
					<span>{{ Math.round(weatherDay.main.temp_max - 273) }}&deg;C</span>
				</v-list-item>
			</v-card>
		</div>
	</v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'WeeklyWeather',
	props: {
		labels: {
			type: Array,
			require: true,
		},
	},
	data() {
		return {
			value: 1,
			changeDay: true,
			changeDegrees: true,
		};
	},
	methods: {
		...mapActions(['get_weather_5day', 'get_weather_day']),
		setDays(day) {
			const { dt } = day;
			return this.labels[new Date(dt * 1000).getDay()];
		},
		onToday() {
			this.changeDay = false;
		},
		onWeek() {
			this.changeDay = true;
		},
		onFahrenheit() {
			this.changeDegrees = false;
		},
		onCelsius() {
			this.changeDegrees = true;
		},
	},
	computed: {
		...mapGetters(['weather5day', 'weatherDay']),
	},
};
</script>
   <style lang="scss" scoped>
.v-btn:not(.v-btn--round).v-size--default {
	padding: 3px;
	min-width: 0;
}
.v-item-group.v-bottom-navigation {
	box-shadow: none;
}
</style>


	