<template>
	<div class="wrapper">
		<gmaps-map :options="mapOptions" @mounted="ready">
			<gmaps-marker v-if="start" :position="start" />
			<gmaps-marker v-if="end" :position="end" />
		</gmaps-map>
	</div>
</template>

<script>
import { gmaps, gmapsMap, gmapsMarker } from 'x5-gmaps';
import { mapGetters } from 'vuex';
export default {
	name: 'ExampleMarkerOptions',
	components: { gmapsMap, gmapsMarker },
	data: () => ({
		mapOptions: {
			center: { lat: -27, lng: 133 },
			zoom: 4,
			fullscreenControl: false,
			mapTypeControl: false,
			rotateControl: false,
			scaleControl: false,
			streetViewControl: false,
			zoomControl: false,
		},
		// Points
		start: null,
		end: null,
		// Search data
		autocomplete: null,
		places: null,
		map: null,
		// Waypoints
		directionsService: null,
		directionsRenderer: null,
		travelMode: null,
	}),
	computed: {
		...mapGetters(['autoCompleteInput']),
	},
	methods: {
		ready(map) {
			this.map = map;
			gmaps().then(maps => {
				// Points
				this.start = new maps.LatLng(-27, 153);
				// Search
				this.places = new maps.places.PlacesService(map);
				this.autocomplete = new maps.places.Autocomplete(document.querySelector(this.autoCompleteInput));
				this.autocomplete.addListener('place_changed', this.update);
				// Waypoints
				this.directionsService = new maps.DirectionsService();
				this.directionsRenderer = new maps.DirectionsRenderer();
				this.directionsRenderer.setMap(map);
				this.travelMode = maps.TravelMode.DRIVING;
			});
		},
		update() {
			const place = this.autocomplete.getPlace();
			// Set end point to selected address
			if (place.geometry) {
				this.map.panTo(place.geometry.location);
				this.end = place.geometry.location;
			}
			// Display waypoints
			if (this.directionsService && this.directionsRenderer) {
				this.directionsService.route(
					{
						origin: this.start,
						destination: this.end,
						travelMode: this.travelMode,
					},
					(result, status) => {
						if (status === 'OK') {
							this.directionsRenderer.setDirections(result);
						}
					}
				);
			}
		},
	},
};
</script>

<style scoped>
.wrapper {
	height: 300px;
	width: 300px;
}
</style>
