<template>
	<div class="seller" ref='seller'>
		<div class="sellerbox">
			<div class="phone">
				<div class="phone-left">
					<span class="iconfont dizhiicon">&#xe61f;</span>
					<span class="dizhi">{{seller.address}}</span>
				</div>
				<div class="phone-right">
					<span class="iconfont">&#xe631;</span>
				</div>
			</div>
			
			<div class="dizhiimg" ref='dizhiimg'>
				<ul v-if="seller.poi_env" ref='imglist1'>
					<li v-for="(item,index) in seller.poi_env.thumbnails_url_list" :key='index' ref='dizhiimg1'>
						<img :src="item" />
					</li>
					
				</ul>
			</div>
			
			<div class="fengexian"></div>
			
			<div class="tedianwrap">
				<span class="iconfont">&#xe611;</span>
				<span>配送服务：{{seller.app_delivery_tip}}</span>
			</div>
			
			<div class="tedianwrap1">
				<span class="iconfont">&#xe60f;</span>
				<span>配送时间：{{seller.shipping_time}}</span>
			</div>
			
			<div class="fengexian"></div>
			
			<div class="tedianwrap2">
				<div class="tedain1">
					<span class="iconfont">&#xe770;</span>
					<span>商家服务</span>
				</div>
				<div class="tedain2" v-for="(item,index) in seller.poi_service" :key='index'>
					<img :src="item.icon" />
					<span>{{item.content}}</span>
				</div>
			</div>
			
			<div class="tedianwrap3">
				<ul>
					<li v-for="(item,index) in seller.discounts2" :key='index'>
						<img :src="item.icon_url" />
						<span>{{item.info}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		data(){
			return {
				seller:{}
			}
		},
		created(){
			this.$axios.get('/api/seller')
			.then((res)=>{
				if(res.data.code==0){
					this.seller=res.data.data
					console.log(this.seller)
					this.$nextTick(()=>{
						
						if(this.seller.poi_env.thumbnails_url_list){
							let imgw=this.$refs.dizhiimg1[0].clientWidth/50
							let magw=0.2
							this.$refs.imglist1.style.width=(imgw+magw)*this.seller.poi_env.thumbnails_url_list.length+'rem'
							this.scrollv = new BScroll(this.$refs.dizhiimg,{
								scrollX:true
							})
						}
						
						
						if(!this.scroll){
							this.scroll=new BScroll(this.$refs.seller)
						}else{
							this.scroll.refresh()
						}
					})
				}
			})
			.catch((err)=>{
				console.log(err)
			})
		}
	}
</script>

<style scoped>
	.fengexian{width: 100%;height: 0.2rem;background: #efefef;}
	.seller{position: absolute;top: 4.6rem;bottom: 0;left: 0;width: 100%;z-index: -1;}
	.seller .sellerbox{overflow: hidden;}
	.seller .sellerbox .phone{width: 96%;display: flex;margin: 0 auto;height: 1rem;border-bottom: 0.02rem solid #F2F2F2;color: #222;}
	.seller .sellerbox .phone .phone-left{flex: 1;line-height: 1rem;height: 1rem;}
	.seller .sellerbox .phone .phone-left span{font-size: 0.26rem;float: left;margin-right: 0.1rem;}
	.seller .sellerbox .phone .phone-right{flex: 0 0 1rem;line-height: 0.5rem;border-left: 0.02rem solid #F2F2F2;height: 0.5rem;margin-top: 0.25rem;}
	.seller .sellerbox .phone .phone-right span{font-size: 0.3rem;text-align: center;display: block;margin: 0 auto;}
	
	.dizhiimg{width: 96%;margin: 0 auto;overflow: hidden;height: 2rem;margin-top: 0.3rem;margin-bottom: 0.3rem;}
	.dizhiimg ul{overflow: hidden;}
	.dizhiimg ul li{float: left;width: 2rem;height: 2rem;margin-right: 0.2rem;}
	.dizhiimg ul li img{width: 100%;height: 100%;}
	
	.tedianwrap{width: 96%;margin: 0 auto;height: 1rem;border-bottom: 0.02rem solid #F2F2F2;line-height: 1rem;font-size: 0.26rem;color: #222;}
	.tedianwrap span{float: left;margin-right: 0.1rem;}
	
	.tedianwrap1{width: 96%;margin: 0 auto;height: 1rem;line-height: 1rem;font-size: 0.26rem;color: #222;}
	.tedianwrap1 span{float: left;margin-right: 0.1rem;}
	
	.tedianwrap2{width: 96%;margin: 0 auto;height: 1rem;line-height: 1rem;font-size: 0.26rem;color: #222;border-bottom: 0.02rem solid #F2F2F2;}
	.tedianwrap2 .tedain1{width: 1.7rem;float: left;height: 100%;}
	.tedianwrap2 .tedain1 span{float: left;margin-right: 0.1rem;}
	.tedianwrap2 .tedain2{height: 100%;}
	.tedianwrap2 .tedain2 img{width: 0.3rem;margin-top: 0.31rem;float: left;margin-right: 0.1rem;}
	.tedianwrap2 .tedain2 span{float: left;}
	
	.tedianwrap3{width: 96%;margin: 0.3rem auto 0;font-size: 0.26rem;color: #222;}
	.tedianwrap3 ul{}
	.tedianwrap3 ul li{overflow: hidden;display: flex;margin-bottom: 0.2rem;}
	.tedianwrap3 ul li img{width: 0.3rem;float: left;flex: 0 0 0.3rem;height: 0.3rem;}
	.tedianwrap3 ul li span{line-height: 0.36rem;float: left;flex: 1;padding-left: 0.1rem;}
</style>
