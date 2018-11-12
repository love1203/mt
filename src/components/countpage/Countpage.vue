<template>
	<div class="countpage">
		<transition name='move'>
		<span class="iconfont dele" @click.stop.prevent="delecount" v-if="food.count>0">&#xe604;</span>
		</transition>
		<span class="countnum" v-if="food.count">{{food.count}}</span>
		<span class="iconfont add" @click.stop.prevent="addcount">&#xe605;</span>
	</div>
</template>

<script>
	export default {
		props:{
			food:Object
		},
		methods:{
			delecount(){
				this.food.count--
			},
			addcount(){
				if(!this.food.count){
					this.$set(this.food,'count',1)
				}else{
					this.food.count++
				}
			}
		}
	}
</script>

<style>
	.countpage{font-size: 0;height: 0.5rem;}
	.countpage span{font-size: 0.23rem;color: #333;line-height: 0.5rem;float: left;margin: 0 0.05rem;}
	.countpage .dele{font-size: 0.5rem;float: left;color: #999999;z-index: 9;}
	.countpage .add{font-size: 0.5rem;color: #FFBB22;float: left;z-index: 10;}
	
	.move-enter,.move-leave-to{transform: translateX(0.6rem);opacity: 0;}
	.move-enter-active,.move-leave-active{transition: 0.3s all;}
	.move-enter-to,.move-leave{transform: translateX(0);opacity: 1;}
</style>
