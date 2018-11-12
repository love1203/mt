<template>
	<div class="cart-wrap">
		<div class="cart">
			<div class="carticon iconfont" :class="{'carticon1':tolanum}" @click="showcr">
				&#xe602;
				<i v-if="tolanum">{{tolanum}}</i>
			</div>
			<div class="cart-text">
				<p class="pt1" v-if="tolaprice">￥{{tolaprice}}</p>
				<p class="pt2">另需{{headerData.shipping_fee_tip}}</p>
			</div>
			<div class="cart-right" :class="{'cart-right1':tolanum}">{{qisong}}</div>
		</div>
		<transition name='upmove'>
		<div class="shopcart" v-show="listshow">
			<div class="kongbai" @click="showcr"></div>
			
			<div class="shopcar">
				<div class="cart-top" v-if="headerData.discounts2">{{headerData.discounts2[0].info}}</div>
				<div class="cart-kd">
					<span class="cart-text1">一号口袋</span>
					<div class="cart-clear" @click="clearcart">
						<span class="iconfont">&#xe65d;</span>
						<span class="cart-text2">清空购物车</span>
					</div>
				</div>
				<div class="shopcarw" ref='shopcarw'>
					<ul class="cart-list">
						<li class="cart-item" v-for="(item,index) in cardata" :key='index'>
							<span class="cartlitext1">{{item.name}}</span>
							<span class="cartlitext2">￥{{getitemprice(item)}}</span>
							<div class="cart-jia">
								<Countpage :food='item' />
							</div>
							
						</li>
					</ul>
				</div>
			</div>
			
		</div>
		</transition>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import Countpage from '../countpage/Countpage'
	export default {
		data(){
			return {
				fold:true
			}
		},
		props:{
			headerData:Object,
			cardata:Array
		},
		components:{
			Countpage
		},
		computed:{
			tolanum(){
				let num=0
				this.cardata.forEach((item)=>{
					num+=item.count
				})
				return num
			},
			tolaprice(){
				let price=0
				this.cardata.forEach((item)=>{
					price+=item.count*item.min_price
				})
				return price
			},
			qisong(){
				if(this.cardata.length>0){
					return '去结算'
				}else{
					return this.headerData.min_price_tip
				}
			},
			listshow(){
				if(!this.tolanum){
					this.fold = true
					return false
				}
				let show=!this.fold
				if(show){
					this.$nextTick(()=>{
						if(!this.shopshow){
							this.shopshow=new BScroll(this.$refs.shopcarw,{click:true})
						}else{
							this.shopshow.refresh()
						}
						
					})
				}
				return show
			}
		},
		methods:{
			getitemprice(item){
				let price=0
				if(item.count){
					return item.min_price*item.count
				}
			},
			clearcart(){
				this.cardata.forEach((item)=>{
					item.count=0
				})
			},
			showcr(){
				if(this.tolanum){
					this.fold=!this.fold
				}
			}
		}
	}
</script>

<style scoped>
	.cart-wrap{}
	.cart{width: 100%;background: #25252e;position: absolute;bottom: 0;left: 0;height: 1rem;z-index: 906;}
	.cart .carticon{width: 1rem;height: 1rem;background: #919191;border-radius: 50%;text-align: center;line-height: 1rem;font-size: 0.5rem;color: #fff;margin-top: -0.3rem;margin-left: 0.2rem;position: relative;float: left;}
	.cart .carticon1{background: #FFBB22;}
	.cart .carticon i{display: block;width: 0.3rem;height: 0.3rem;border-radius: 50%;background: #fe4d3d;font-size: 0.16rem;text-align: center;line-height: 0.3rem;position: absolute;right: 0;top: 0;}
	.cart .cart-text{float: left;margin-left: 0.2rem;}
	.cart .cart-text .pt1{color: #fff;font-size: 0.36rem;margin-top: 0.13rem;}
	.cart .cart-text .pt2{color: #a8a8ab;font-size: 0.24rem;line-height: 0.4rem;position: absolute;bottom: 0.1rem;}
	.cart .cart-right{float: right;font-size: 0.3rem;line-height: 1rem;padding-left: 0.4rem;padding-right: 0.4rem;color: #a8a8ab;}
	.cart .cart-right1{background: #FFBB22;color: #fff;}
	
	.shopcart{position: absolute;width: 100%;top: 0;bottom: 1rem;background: rgba(37,37,46,0.5);z-index: 900;}
	.shopcart .kongbai{width: 100%;bottom: 0;position: absolute;height: 100rem;z-index: 901;}
	.shopcart .shopcar{position: absolute;bottom: 0;width: 100%;background: #fff;border-radius: 0.2rem 0.2rem 0 0;overflow: hidden;padding-bottom: 0.2rem;z-index: 903;}
	.shopcart .shopcar .shopcarw{max-height: 5.7rem;}
	.shopcart .shopcar .cart-top{width: 100%;height: 0.6rem;background: #f6edde;font-size: 0.24rem;text-align: center;line-height: 0.6rem;color: #333;z-index: 31;position: relative;}
	.shopcart .shopcar .cart-kd{width: 100%;height: 0.6rem;background: #efefef;border-left: 0.1rem solid #a1d341;box-sizing: border-box;z-index: 31;position: relative;}
	.shopcart .shopcar .cart-kd .cart-text1{float: left;font-size: 0.24rem;color: #333;line-height: 0.6rem;margin-left: 0.2rem;}
	.shopcart .shopcar .cart-kd .cart-clear{float: right;line-height: 0.6rem;margin-right: 0.2rem;}
	.shopcart .shopcar .cart-kd .cart-clear .cart-text2{font-size: 0.24rem;color: #666;float: left;}
	.shopcart .shopcar .cart-kd .cart-clear .iconfont{font-size: 0.24rem;color: #666;float: left;margin-right: 0.1rem;}
	.shopcart .shopcar .shopcarw{height: 100%;z-index: 30;}
	.shopcart .shopcar .cart-list{}
	.shopcart .shopcar .cart-list .cart-item{display: flex;height: 0.9rem;border-bottom: 0.02rem solid #e9e9e9;}
	.shopcart .shopcar .cart-list .cart-item .cartlitext1{flex: 1;font-size: 0.24rem;color: #333;line-height: 0.9rem;margin-left: 0.2rem;}
	.shopcart .shopcar .cart-list .cart-item .cartlitext2{font-size: 0.24rem;color: #333;line-height: 0.9rem;padding: 0 0.2rem;}
	.shopcart .shopcar .cart-list .cart-item .cart-jia{float: right;margin-top: 0.2rem;padding: 0 0.2rem 0 1.8rem;}
	
	.upmove-enter,.upmove-leave-to{bottom: -5rem;background: rgba(37,37,46,0);}
	.upmove-enter-active,.upmove-leave-active{transition: 0.5s all;}
	.upmove-enter-to,.upmove-leave{bottom: 1;background: rgba(37,37,46,0.5);}
</style>
