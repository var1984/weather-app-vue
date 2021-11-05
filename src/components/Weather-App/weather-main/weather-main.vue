<template>
	<div>
		<TodaysHighlights :labels="labels" />
	</div>
</template>
<script>
import TodaysHighlights from './todays-highlights/Todays-Highlights';
export default {
	name: 'WeatherMain',
	props: {
		labels: {
			type: Array,
			require: true,
		},
	},
	components: {
		TodaysHighlights,
	},
};
</script>
<style lang="scss" scoped>
</style>