<template>
</template>

<script>

	export default {
		mounted: function () {
			this.$removeCookie('user');
			this.$router.push({ path: '/' })
		}
	}
</script>

<style>
</style>