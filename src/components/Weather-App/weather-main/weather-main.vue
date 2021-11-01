<template>
	<div>
		<WeeklyWeather :labels="labels" />
		<TodaysHighlights />
	</div>
</template>
<script>
import WeeklyWeather from '../weather-main/weekly-weather/weekly-weather';
import TodaysHighlights from './todays-highlights/todays-highlights';
export default {
	name: 'WeatherMain',
	props: {
		labels: {
			type: Array,
			require: true,
		},
	},
	components: {
		WeeklyWeather,
		TodaysHighlights,
	},
};
</script>
<style lang="scss" scoped>
</style>