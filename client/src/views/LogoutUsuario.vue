<template>
</template>

<script>
import { deleteCookie } from '@/cookie.js';

	export default {
		mounted: function () {
			deleteCookie("user");
			this.$router.push({ path: '/' })
		}
	}
</script>

<style>
</style>