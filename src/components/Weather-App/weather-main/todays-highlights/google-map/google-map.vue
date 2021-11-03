<template>
	<div class="maps">
		<GmapMap :center="center" :zoom="12" style="width: 400px; height: 335px"> </GmapMap>
	</div>
</template>

<script>
export default {
	name: 'GoogleMap',
	data() {
		return {
			center: { lat: 45.508, lng: -73.587 },
		};
	},
};
</script>
<style lang="scss" scoped>
.maps {
	width: 350px;
	height: 350px;
}
</style>