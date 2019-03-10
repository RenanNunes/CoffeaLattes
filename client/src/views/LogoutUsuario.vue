<template>
</template>

<script>

	export default {
		mounted: function () {
			this.$removeCookie('user');
			this.$removeCookie('token');
			this.$router.push({ path: '/' })
		}
	}
</script>

<style>
</style>