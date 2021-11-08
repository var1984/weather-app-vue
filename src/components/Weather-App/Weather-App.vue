<template>
	<v-app>
		<v-main>
			<v-row>
				<v-col cols="12" sm="6" md="3">
					<SearchWeatherSideBar :labels="labels" />
				</v-col>
				<v-col cols="12" sm="6" md="9">
					<WeatherMain :labels="labels" />
				</v-col>
				<v-col cols="12" md="0" sm="0" class="d-flex justify-center">
					<div class="map">
						<Map />
					</div>
				</v-col>
			</v-row>
		</v-main>
	</v-app>
</template>
<script>
import SearchWeatherSideBar from '../Weather-App/search-weather-sidbar/Search-Weather-SideBar';
import WeatherMain from '../Weather-App/weather-main/Weather-Main';
import Map from '../Weather-App/weather-main/todays-highlights/map/Map';
export default {
	name: 'Weather-App',
	components: {
		SearchWeatherSideBar,
		WeatherMain,
		Map,
	},
	data() {
		return {
			labels: ['Sunday ', 'Monday', 'Tuesday', 'Wednesday ', 'Thursday ', 'Friday ', 'Saturday '],
		};
	},
};
</script>
<style lang="scss" scoped>
.map {
	display: none;
}
@media (max-width: 500px) {
	.map {
		display: block;
	}
}
</style>