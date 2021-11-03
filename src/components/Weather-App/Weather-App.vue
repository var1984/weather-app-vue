<template>
	<v-app>
		<v-main>
			<v-row>
				<v-col cols="3">
					<SearchWeatherSideBar :labels="labels" />
				</v-col>
				<v-col cols="9">
					<WeatherMain :labels="labels" />
				</v-col>
			</v-row>
		</v-main>
	</v-app>
</template>
<script>
import SearchWeatherSideBar from '../Weather-App/search-weather-sidbar/Search-Weather-SideBar';
import WeatherMain from '../Weather-App/weather-main/Weather-Main';
export default {
	name: 'Weather-App',
	components: {
		SearchWeatherSideBar,
		WeatherMain,
	},
	data() {
		return {
			labels: ['Sunday ', 'Monday', 'Tuesday', 'Wednesday ', 'Thursday ', 'Friday ', 'Saturday '],
		};
	},
};
</script>