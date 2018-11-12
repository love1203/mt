<template>
	<div class="star">
		<span class="star-item" v-for="(item,index) in pflist" :class="item" :key='index'></span>
	</div>
</template>

<script>
	const qx='on'
	const bx='half'
	const kx='off'
	const Leng=5
	export default {
		props:{
			starData:Number
		},
		computed:{
			pflist(){
				let result=[]
				
				let num=Math.floor(this.starData*2)/2
				
				let bxnum=num%1!==0
				
				let qxnum=Math.floor(num)
				
				for(let i=0;i<qxnum;i++){
					result.push(qx)
				}
				
				if(bxnum){
					result.push(bx)
				}
				
				while(Leng>result.length){
					result.push(kx)
				}
				return result
				
			}
		}
	}
</script>

<style scoped>
	.star{display: inline-block;}
	.star .star-item{display: inline-block;width: 0.2rem;height: 0.2rem;margin: 0 0.02rem;}
	.star .on{background: url(img/star24_on@2x.png);background-size: 100% 100%;}
	.star .half{background: url(img/star24_half@2x.png);background-size: 100% 100%;}
	.star .off{background: url(img/star24_off@2x.png);background-size: 100% 100%;}
</style>
