import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		weatherDay: {},
		weather5day: {},
		weatherOneCall: {},
		location: 'Kiev',
		isLoading: false
	},
	mutations: {
		setWeatherDay(state, weatherDay) {
			if (weatherDay && weatherDay.coord) state.weatherDay = weatherDay;
		},
		setWeather5Day(state, weather5day) {
			const getNeewWeek = weather5day => {
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
					list: weatherByDay,
				};
			};
			state.weather5day = getNeewWeek(weather5day);
		},
		setOneCallApi(state, weatherOneCall) {
			state.weatherOneCall = weatherOneCall;
		},
		setLocation(state, location) {
			state.location = location;
		},
		setLoading(state, status) {
			state.isLoading = status;
		},
	},
	actions: {
		async getWeatherDay({ commit }, location) {
			commit(
				'setLoading',
				true);

			const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=da48d4c5d4c545a7cf499e9cd742e810`;
			try {
				const response = await axios.get(url);
				commit(
					'setWeatherDay',
					response.data);
				commit(
					'setLoading',
					false);
			} catch (error) {
				console.log(error);
			}
		},
		async getWeather5Day({ commit }, location) {
			const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=da48d4c5d4c545a7cf499e9cd742e810`;
			try {
				const response = await axios.get(url);
				commit('setWeather5Day', response.data);
			} catch (error) {
				console.log(error);
			}
		},
		async oneCallApi({ commit, state }) {
			console.log(state.weatherDay);
			const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${state.weatherDay.coord.lat}&lon=${state.weatherDay.coord.lon}&exclude=hourly,daily&appid=da48d4c5d4c545a7cf499e9cd742e810`;
			try {
				const response = await axios.get(url);
				commit('setOneCallApi', response.data);
			} catch (error) {
				console.log(error);
			}
		},
	},
	getters: {
		weatherDay(state) {
			return state.weatherDay;
		},
		weather5day(state) {
			return state.weather5day;
		},
		onecall(state) {
			return state.weatherOneCall;
		},
		location(state) {
			return state.location;
		},
		isLoading(state) {
			return state.isLoading
		}
	},
	modules: {},
});
