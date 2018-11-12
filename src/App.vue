<template>
  <div id="app">
    <Header :poiInfo='poiInfo'></Header>
		<Nav :commentnum='commentnum'></Nav>
		<keep-alive>
			<router-view />
    </keep-alive>
		<Loading v-show="isLoaging" />
  </div>
</template>

<script>
	import Header from './components/header/Header'
	import Nav from './components/nav/Nav'
	import Loading from './components/jiazai/loading'
export default {
	data(){
		return{
			poiInfo:{},
			commentnum:0
		}
	},
	
	components:{
		Header,
		Nav,
		Loading
	},
	computed:{
		isLoaging(){
			return this.$store.getters.isLoaging
		}
	},
	created(){
		this.$axios.get('/api/goods')
		.then((res)=>{
			if(res.data.code==0){
				this.poiInfo=res.data.data.poi_info
			}
		})
		.catch((err)=>{
			console.log(err)
		})
		
		
		this.$axios.get('/api/ratings')
		.then((res)=>{
			if(res.data.code==0){
				this.commentnum=res.data.data.comment_num
			}
		})
		.catch((err)=>{
			console.log(err)
		})
		
		
	}

}
</script>

<style>

</style>
