<template>
	<v-container class="pa-0">
		<v-btn color="blue" dark @click="sheet = !sheet"> Open week weather </v-btn>
		<v-bottom-sheet v-model="sheet" overlay-color="black">
			<v-sheet class="text-center blue lighten-4" height="350px">
				<v-btn class="mt-6" text color="red" @click="sheet = !sheet"> close </v-btn>
				<v-row>
					<v-col cols="12" md="8" sm="4">
						<v-row>
							<v-col class="pa-0">
								<v-bottom-navigation :value="value" class="blue lighten-4 white--text">
									<v-btn @click="onToday">
										<span>Today</span>
									</v-btn>
									<v-btn @click="onWeek">
										<span>Week</span>
									</v-btn>
								</v-bottom-navigation>
							</v-col>
							<v-col class="pa-0">
								<v-bottom-navigation :value="value" class="blue lighten-4 white--text">
									<v-btn @click="onFahrenheit">
										<v-avatar size="36">
											<span>&deg;F</span>
										</v-avatar>
									</v-btn>
									<v-btn @click="onCelsius">
										<v-avatar size="36">
											<span>&deg;C</span>
										</v-avatar>
									</v-btn>
								</v-bottom-navigation>
							</v-col>
						</v-row>
						<v-row>
							<v-col v-if="changeDay">
								<v-sheet class="mx-auto" elevation="8" max-width="800" color="#bdddf0bb">
									<v-slide-group v-model="model" class="pa-4" active-class="success" show-arrows>
										<div class="d-flex">
											<div v-for="wetherInfo of weather5day.list" :key="wetherInfo.id">
												<v-card class="blue lighten-3 white--text ma-4">
													<v-list-item-subtitle>{{
														setDays(wetherInfo)
													}}</v-list-item-subtitle>
													<v-img
														:src="`http://openweathermap.org/img/wn/${wetherInfo.weather[0].icon}@2x.png`"
														alt="Sunny image"
														width="92"
													></v-img>
													<v-list-item-subtitle v-if="changeDegrees">
														<span
															>{{ Math.round(wetherInfo.main.temp_min - 273) }}&deg;C -
														</span>
														<span
															>{{
																Math.round(wetherInfo.main.temp_max - 273)
															}}&deg;C</span
														>
													</v-list-item-subtitle>
													<v-list-item-subtitle v-else>
														<span
															>{{
																Math.round(1.8 * wetherInfo.main.temp_min - 457.87)
															}}&deg;F -
														</span>
														<span
															>{{
																Math.round(1.8 * wetherInfo.main.temp_max - 457.87)
															}}&deg;F</span
														>
													</v-list-item-subtitle>
												</v-card>
											</div>
										</div>
									</v-slide-group>
								</v-sheet>
							</v-col>

							<v-col v-else>
								<v-card class="d-flex align-center blue lighten-5">
									<v-list-item class="text-h6" v-if="weatherDay && weatherDay.sys">
										{{ weatherDay.name }}, {{ weatherDay.sys.country }}</v-list-item
									>
									<v-list-item v-if="weatherDay && weatherDay.clouds">
										<v-list-item-icon>
											<v-icon>mdi-cloud-outline</v-icon>
										</v-list-item-icon>
										<v-list-item-subtitle color="grey"
											>Clouds - {{ weatherDay.clouds.all }}%</v-list-item-subtitle
										>
									</v-list-item>

									<v-list-item v-if="weatherDay && weatherDay.weather">
										<v-list-item-icon>
											<v-icon color="primary">mdi-record-circle-outline</v-icon>
										</v-list-item-icon>
										<v-list-item-subtitle>{{
											weatherDay.weather[0].description
										}}</v-list-item-subtitle>
									</v-list-item>
									<v-list-item v-if="weatherDay && weatherDay.weather">
										<span> {{ Math.round(weatherDay.main.temp_min - 273) }}&deg;C-</span>
										<span>{{ Math.round(weatherDay.main.temp_max - 273) }}&deg;C</span>
									</v-list-item>
								</v-card>
							</v-col>
						</v-row>
					</v-col>
					<v-col class="d-flex justify-center" cols="12" md="4" sm="8">
						<div class="map">
							<Map />
						</div>
					</v-col>
				</v-row>
			</v-sheet>
		</v-bottom-sheet>
	</v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Map from '../todays-highlights/map/Map';
export default {
	name: 'WeeklyWeather',
	props: {
		labels: {
			type: Array,
			require: true,
		},
	},
	components: {
		Map,
	},
	data() {
		return {
			value: 1,
			changeDay: true,
			changeDegrees: true,
			sheet: false,
			model: null,
		};
	},
	methods: {
		...mapActions(['getWeather5Day', 'getWeatherDay']),
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
@media (max-width: 600px) {
	.map {
		display: none;
	}
}
</style>


	