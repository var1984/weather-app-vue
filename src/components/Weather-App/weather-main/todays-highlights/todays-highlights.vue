<template>
	<v-container>
		<v-col cols="12">
			<h3>Todays Highlights</h3>
		</v-col>
		<div class="d-flex">
			<div>
				<div class="card-line-1 d-flex mb-3">
					<v-card class="pa-2" height="160" width="225">
						<v-list-item-title class="mb-5 grey--text lighten-2"> UV index</v-list-item-title>
						<v-list-item class="d-flex justify-center">
							<div class="gauge">
								<div class="gauge-scale">
									<span>6</span>
									<span>9</span>
									<span>12</span>
								</div>
								<div class="gauge__body">
									<div
										class="gauge__fill"
										:style="{ transform: `rotate(${initSolarUVIndex}turn)` }"
									></div>
									<div class="gauge__cover" v-if="onecall && onecall.current">
										{{ onecall.current.uvi }}
									</div>
								</div>
							</div>
						</v-list-item>
					</v-card>

					<v-card class="pa-2 d-flex flex-column ml-3" height="160" width="225">
						<v-list-item-title class="grey--text lighten-2 align-self-start">
							Wind status</v-list-item-title
						>
						<v-list-item-title v-if="weatherDay && weatherDay.wind" class="text-h5 align-self-start">
							{{ initWindStatus }} km/h</v-list-item-title
						>
						<v-list-item-title v-if="weatherDay && weatherDay.weather" class="align-self-start mt-5">
							{{ weatherDay.weather[0].description }}</v-list-item-title
						>
					</v-card>

					<v-card class="pa-2 d-flex flex-column ml-3" height="160" width="225">
						<v-list-item-title class="grey--text lighten-2 align-self-start">
							Sunrise & Sunset</v-list-item-title
						>
						<v-list-item v-if="weatherDay && weatherDay.sys">
							<v-icon class="yellow--text">mdi-arrow-up-circle</v-icon>
							<v-list-item-title class="ml-5">{{ sunrise }}</v-list-item-title>
						</v-list-item>
						<v-list-item v-if="weatherDay && weatherDay.sys">
							<v-icon class="yellow--text">mdi-arrow-down-circle</v-icon>
							<v-list-item-title class="ml-5">{{ sunset }}</v-list-item-title>
						</v-list-item>
					</v-card>
				</div>
				<div class="card-line-2 d-flex">
					<v-card class="pa-4 d-flex flex-column" height="160" width="225">
						<v-list-item-title class="grey--text lighten-2 align-self-start"> Humidity</v-list-item-title>
						<div class="progress-wrap">
							<div>
								<span class="text-h5">{{ initScale }}</span>
								<span>%</span>
							</div>
							<div class="progress-bar">
								<div class="progress-scale" :style="{ height: initScale + '%' }"></div>
							</div>
						</div>
						<v-list-item-title class="align-self-start"> Misarable</v-list-item-title>
					</v-card>

					<v-card class="pa-4 d-flex flex-column ml-3" height="160" width="225">
						<v-list-item-title class="grey--text lighten-2 align-self-start">Visibility</v-list-item-title>
						<v-list-item-title v-if="weatherDay && weatherDay.visibility" class="text-h5 align-self-start">
							{{ weatherDay.visibility / 1000 }} km/h</v-list-item-title
						>
						<v-list-item-title class="align-self-start mt-5"> Good visibility</v-list-item-title>
					</v-card>

					<v-card class="pa-2 d-flex flex-column ml-3" height="160" width="225">
						<v-list-item-title class="grey--text lighten-2 align-self-start">
							Min & Max temperature</v-list-item-title
						>
						<v-list-item v-if="weatherDay && weatherDay.sys">
							<v-icon class="indigo--text">mdi-thermometer-low</v-icon>
							<v-list-item-title class="ml-5" v-if="weatherDay && weatherDay.main"
								>{{ Math.round(weatherDay.main.temp_min - 273) }} &deg;C
							</v-list-item-title>
						</v-list-item>
						<v-list-item v-if="weatherDay && weatherDay.main">
							<v-icon class="red--text">mdi-thermometer-high</v-icon>
							<v-list-item-title class="ml-5"
								>{{ Math.round(weatherDay.main.temp_max - 273) }} &deg;C
							</v-list-item-title>
						</v-list-item>
					</v-card>
				</div>
			</div>
			<div class="ml-3">
				<GoogleMap />
			</div>
		</div>
	</v-container>
</template>
<script>
import GoogleMap from './map/Map';
import { mapGetters } from 'vuex';
export default {
	name: 'TodaysHighlights',
	components: {
		GoogleMap,
	},
	data() {
		return {
			knowledge: 35,
		};
	},
	methods: {
		solarUVIndex() {
			if (this.onecall && this.onecall.current) return (this.onecall.current.uvi * 1) / 15 / 2;
		},
		windStatus() {
			if (this.weatherDay && this.weatherDay.wind) return Math.round((this.weatherDay.wind.speed / 1000) * 3600);
		},
		scale() {
			if (this.weatherDay && this.weatherDay.main) return this.weatherDay.main.humidity;
		},
	},
	computed: {
		...mapGetters(['onecall', 'weatherDay']),
		initSolarUVIndex() {
			return this.solarUVIndex();
		},
		initWindStatus() {
			return this.windStatus();
		},
		sunrise() {
			return new Date(this.weatherDay.sys.sunrise * 1000).toLocaleTimeString();
		},
		sunset() {
			return new Date(this.weatherDay.sys.sunset * 1000).toLocaleTimeString();
		},
		initScale() {
			return this.scale();
		},
	},
};
</script>


<style lang="scss" scoped>
.gauge {
	width: 100%;
	max-width: 150px;
	font-family: 'Roboto', sans-serif;
	font-size: 30px;
	color: #555552;
	height: 100px;
	position: relative;
	font-weight: 700;
	&-scale {
		position: absolute;
		font-size: 15px;
		top: -15px;
		left: 7px;
		display: flex;
		span {
			margin-left: 41px;
			&:last-of-type {
				margin-top: 28px;
				margin-left: 26px;
			}
		}
	}
	&__body {
		width: 100%;
		height: 0;
		padding-bottom: 50%;
		background: #b4c0be;
		position: relative;
		border-top-left-radius: 100% 200%;
		border-top-right-radius: 100% 200%;
		overflow: hidden;
		.gauge__fill {
			position: absolute;
			top: 100%;
			left: 0;
			width: inherit;
			height: 100%;
			background: #fffb00;
			transform-origin: center top;
			transform: rotate(0turn);
			transition: transform 0.2s ease-out;
		}

		.gauge__cover {
			width: 75%;
			height: 150%;
			background: #ffffff;
			border-radius: 50%;
			position: absolute;
			top: 25%;
			left: 50%;
			transform: translateX(-50%);

			/* Text */
			display: flex;
			align-items: center;
			justify-content: center;
			padding-bottom: 25%;
			box-sizing: border-box;
		}
	}
}
.progress-wrap {
	display: flex;
	justify-content: space-between;
	align-items: center;
	span:last-of-type {
		vertical-align: top;
	}
	.progress-bar {
		height: 90px;
		width: 14px;
		border: 3px solid black;
		border-radius: 15px !important;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		position: relative;
		.progress-scale {
			position: absolute;
			border-radius: 15px;
			background-color: rgb(19, 5, 218);
			height: 80px;
			width: 8px;
		}
	}
}
</style>
