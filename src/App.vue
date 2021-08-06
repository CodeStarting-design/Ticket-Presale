<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
	provide(){
		return{
			reload:this.reload
		}
	},
	data(){
		return{
			isRouterAlive:true
		}
	},
	methods: {
		reload() {
			this.isRouterAlive=false
			this.$nextTick(function(){
				this.isRouterAlive=true
			})
		}
	},
  mounted() {
  let that = this;
  window.onresize=function() {
    that.$store.state.screenWidth = document.documentElement.clientWidth; //窗口宽度
    that.$store.state.screenHeight = document.documentElement.clientHeight; //窗口高度
  }
}
}
</script>
<style>
#app {
  font-family: ”Microsoft YaHei”,Arial,Helvetica,sans-serif,”宋体”;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
