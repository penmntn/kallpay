<template>
	<div>
		HELLO WORLD
	</div>
</template>
<script>

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import sider from '../components/side_bar/sider.vue'
import formGen  from '../components/forms/antiguo'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import login from '../views/pages/login/Login'

export default {
	data(){

	},
	components : {
		sider,
		VuePerfectScrollbar,
		flatPickr,
		formGen,
		login
	},
	computed: {
		
	},
	methods : {
	}
}
</script>

<style lang="scss">

</style>
