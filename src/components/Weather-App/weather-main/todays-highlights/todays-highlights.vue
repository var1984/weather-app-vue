<template>
	<v-row>
		<v-col cols="12">
			<h3>Todays Highlights</h3>
		</v-col>
		<v-col cols="12">
			<v-card class="pa-5">
				<div class="gauge">
					<div class="gauge-scale">
						<span>6</span>
						<span>9</span>
						<span>12</span>
					</div>
					<div class="gauge__body">
						<div class="gauge__fill"></div>
						<div class="gauge__cover">1</div>
					</div>
				</div>
			</v-card>
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: 'TodaysHighlights',
};
</script>
<style lang="scss" scoped>
.gauge {
	width: 100%;
	max-width: 150px;
	font-family: 'Roboto', sans-serif;
	font-size: 25px;
	color: #004033;
	height: 100px;
	&-scale {
		position: absolute;
		font-size: 15px;
		top: 4px;
		left: 10px;
		display: flex;
		span {
			margin-left: 50px;
			&:last-of-type {
				margin-top: 35px;
				margin-left: 35px;
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
			background: #009578;
			transform-origin: center top;
			transform: rotate(0deg);
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
</style>