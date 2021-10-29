<template>
	<WeeklyWeather :labels="labels" :localCity="location" />
</template>
<script>
import WeeklyWeather from '../weather-main/weekly-weather/weekly-weather';
export default {
	name: 'WeatherMain',
	props: {
		labels: {
			type: Array,
			require: true,
		},
		location: {
			type: String,
		},
	},
	components: {
		WeeklyWeather,
	},
};
</script>
<style lang="scss" scoped>
</style>