<template>
	<v-row>
		<v-col cols="12">
			<v-bottom-navigation :value="value" color="primary">
				<v-btn>
					<span>Today</span>
				</v-btn>
				<v-btn>
					<span>Week</span>
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn>
					<span>&deg;C</span>
				</v-btn>

				<v-btn>
					<span>&deg;F</span>
				</v-btn>
			</v-bottom-navigation>
		</v-col>
		<div class="d-flex flex" v-for="wetherInfo of weather5day.list" :key="wetherInfo.id">
			<v-col>
				<v-card>
					<v-list-item-subtitle>{{ setDays(wetherInfo) }}</v-list-item-subtitle>
					<v-img
						:src="`http://openweathermap.org/img/wn/${wetherInfo.weather[0].icon}@2x.png`"
						alt="Sunny image"
						width="92"
					></v-img>
					<v-list-item-subtitle>{{ Math.round(wetherInfo.main.temp - 273) }}&deg;C</v-list-item-subtitle>
				</v-card>
			</v-col>
		</div>
	</v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'weeklyWeather',
	props: {
		labels: {
			type: Array,
			require: true,
		},
	},
	data() {
		return {
			value: 1,
		};
	},
	methods: {
		...mapActions(['get_weather_5day']),
		setDays(day) {
			const { dt } = day;
			return this.labels[new Date(dt * 1000).getDay()];
		},
	},
	computed: {
		...mapGetters(['weather5day']),
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


