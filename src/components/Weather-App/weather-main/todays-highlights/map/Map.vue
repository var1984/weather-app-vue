<template>
	<div class="maps">
		<GmapMap :center="center" :zoom="12" style="width: 400px; height: 300px"></GmapMap>
	</div>
</template>

<script>
export default {
	name: 'Map',
	data() {
		return {
			center: { lat: 45.508, lng: -73.587 },
		};
	},
};
</script>
<style lang="scss" scoped>
.maps {
	width: 400px;
	height: 300px;
}
</style>