import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		weatherDay: [],
		weather5day: [],
		weatherOneCall: [],
		location: 'Kiev'
	},
	mutations: {
		set_weather_day(state, weatherDay) {
			const updateArr = []
			updateArr.push(weatherDay)
			state.weatherDay = updateArr
		},
		set_weather_5day(state, weather5day) {
			const getNeewWeek = (weather5day) => {
				const weathers = weather5day.list;
				let weatherByDay = [];
				for (let i = 0; i < weathers.length; i++) {
					const weatherLocaleDate = new Date(weathers[i].dt * 1000).toLocaleDateString();
					const isSameDate = weatherByDay.find(
						weather => new Date(weather.dt * 1000).toLocaleDateString() === weatherLocaleDate
					);
					if (!isSameDate) {
						weatherByDay.push(weathers[i]);
					}
				}
				return {
					...weather5day,
					list: weatherByDay
				}
			}

			console.log(getNeewWeek(weather5day));
			state.weather5day = getNeewWeek(weather5day)
			// console.log(state.weather5day);
		},
		set_one_call_API(state, weatherOneCall) {
			const updateArr = []
			updateArr.push(weatherOneCall)
			state.weatherOneCall = updateArr
		},
		set_location(state, location) {
			state.location = location
		}
	},
	actions: {
		async get_weather_day({ commit }, location) {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9bc0d27c6f2de79c6abfcef239e353da`
			try {
				const response = await axios
					.get(url)
				commit("set_weather_day", response.data);
			} catch (error) {
				console.log(error);
			}
		},
		async get_weather_5day({ commit }, location) {
			const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=9bc0d27c6f2de79c6abfcef239e353da`
			try {
				const response = await axios
					.get(url)
				commit("set_weather_5day", response.data)

			} catch (error) {
				console.log(error);
			}

		},
		async one_call_API(
			{ commit }, { lat, lon }) {
			const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=9bc0d27c6f2de79c6abfcef239e353da`
			try {
				const response = await axios
					.get(url)
				commit("set_one_call_API", response.data);
			} catch (error) {
				console.log(error);
			}
		},
	},
	getters: {
		weatherDay(state) {
			return state.weatherDay
		},
		weather5day(state) {
			return state.weather5day
		},
		onecall(state) {
			return state.weatherOneCall
		},
		location(state) {
			return state.location
		}
	},
	modules: {},
});