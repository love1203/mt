<template>
	<div class="header" :style="'background:url('+poiInfo.head_pic_url+')'">
		<div class="header-top">
			<span class="iconfont header-left">&#xe624;</span>
			<form class="header-seach">
				<span class="iconfont seach">&#xe632;</span>
				<input type="text" placeholder="请输入商品名" />
			</form>
			<div class="header-right">
				<span class="header-pd">拼单</span>
				<span class="header-dian iconfont">&#xe63d;</span>
			</div>
		</div>
		<div class="header-sj">
			<div class="header-logo">
				<img :src="poiInfo.pic_url" />
			</div>
			<span class="sjname">{{poiInfo.name}}</span>
			<div class="shoucang">
				<span class="iconfont">&#xe601;</span>
				<span class="sctext">收藏</span>
			</div>
		</div>
		
		<div class="huodong" @click="hotShow()">
			<ul class="hot-list" v-if="poiInfo.discounts2">
				<li class="hot-item" v-for="(item,index) in poiInfo.discounts2" :key='index'>
					<span v-if="item.icon_url" class="xiaotubiao"><img :src="item.icon_url" /></span>
					{{item.info}}
				</li>
			</ul>
			<span class="hot-num" v-if="poiInfo.discounts2">{{poiInfo.discounts2.length}}个活动></span>
		</div>
		
		<transition name='fade'>
		<div class="hdwrap" v-show="showHot">
			<div class="zhuantiye" :style="'background:url('+poiInfo.poi_back_pic_url+')'">
				<div class="ztywrap">
					<img :src="poiInfo.pic_url" />
				</div>
				<p class="zty-title">{{poiInfo.name}}</p>
				<div class="pingfen">
					<Star :starData="poiInfo.wm_poi_score" /><i>{{poiInfo.wm_poi_score}}</i>
				</div>
				<div class="zty-info">
					<span>{{poiInfo.min_price_tip}}</span>|
					<span>{{poiInfo.shipping_fee_tip}}</span>|
					<span>{{poiInfo.delivery_time_tip}}</span>
				</div>
				<p class="ps-time">配送时间：{{poiInfo.shipping_time}}</p>
				<div class="zty-line"></div>
				<ul class="zty-list" v-if="poiInfo.discounts2">
					<li class="zty-item" v-for="(item,index) in poiInfo.discounts2" :key='index'>
						<span><img v-if="item.icon_url" :src="item.icon_url" /></span>
						{{item.info}}
					</li>
				</ul>
			</div>
			<div class="closeicon" @click="hotHidden()">x</div>
		</div>
		</transition>
	</div>
</template>

<script>
	 import Star from '../star/Star'
	export default {
		data(){
			return {
				showHot:false
			}
		},
		props:{
			poiInfo:Object
		},
		components:{
			Star
		},
		methods:{
			hotShow(){
				this.showHot=true
			},
			hotHidden(){
				this.showHot=false
			}
		}
	}
</script>

<style scoped> 
.header{width: 100%;padding-bottom: 3.5rem;height: 0;padding-top: 0.2rem;background-size: 100%!important;position: relative;z-index: 2;}

.header .header-top{width: 100%;height: 0.8rem;display: flex;font-size: 0.32rem;color: #fff;}
.header .header-top .header-seach{flex: 1;height: 0.6rem;background: #ddd;margin-top: 0.1rem;border-radius: 0.3rem;padding: 0 0.2rem;display: flex;}
.header .header-top .header-seach .seach{line-height: 0.6rem;float: left;}
.header .header-top .header-seach input{height: 0.6rem;border: none!important;float: left;background: none;padding-left: 0.1rem;flex: 1;outline:none;color: #666666;}
.header .header-top .header-left{line-height: 0.8rem;padding-left: 0.2rem;padding-right: 0.2rem;}
.header .header-top .header-right{height: 100%;padding-right: 0.2rem;padding-left: 0.2rem;}
.header .header-top .header-right .header-pd{display: block;width: 0.7rem;height: 0.32rem;border: 1px solid #fff;text-align: center;line-height: 0.38rem;float: left;
font-size: 0.24rem;margin-right: 0.1rem;margin-top: 0.24rem;}
.header .header-top .header-right .iconfont{font-size: 0.4rem;line-height: 0.8rem;float: left;}

.header-sj{height: 2rem;margin-top: 0.24rem;}
.header-sj .header-logo{width: 1rem;height: 1rem;overflow: hidden;float: left;border-radius: 0.1rem;margin-top: 0.5rem;margin-left: 0.2rem;}
.header-sj .header-logo img{height: 100%;width: 100%;}
.header-sj .sjname{float: left;line-height: 2rem;font-size: 0.3rem;color: #fff;margin-left: 0.2rem;}
.header-sj .shoucang{width: 1rem;height: 1rem;float: right;}
.header-sj .shoucang .iconfont{color: #fff;text-align: center;font-size: 0.3rem;display: block;margin: 0 auto;padding-top: 0.6rem;}
.header-sj .shoucang .sctext{text-align: center;font-size: 0.26rem;color: #fff;display: block;margin: 0.1rem auto 0;}

.huodong{height: 0.5rem;position: absolute;bottom: 0;width: 100%;display: flex;}
.huodong .hot-list{flex: 1;font-size: 0.23rem;overflow: hidden;line-height: 0.5rem;padding-left: 0.1rem;color: #fff;}
.huodong .hot-list .xiaotubiao{display: block;width: 0.3rem;height: 0.3rem;float: left;margin-top: 0.05rem;margin-right: 0.1rem;}
.huodong .hot-list .xiaotubiao img{width: 100%;height: 100%;}
.huodong .hot-list .hot-item{white-space: nowrap;text-overflow: ellipsis;overflow: hidden;float: left;}
.huodong .hot-num{font-size: 0.23rem;line-height: 0.5rem;padding: 0 0.2rem 0 0.4rem;color: #fff;}

.hdwrap{width: 100%;height: 100vh;background: rgba(72,72,72,0.5);position: absolute;left: 0;top: 0;z-index: 999;}
.zhuantiye{width: 86vw;height: 60vh;background: #222;margin: 1rem auto 0;background-size: 100% 100%!important;border-radius: 0.2rem;padding-top: 1rem;}
.zhuantiye .ztywrap{margin: 0 auto;width: 1rem;height: 1rem;overflow: hidden;border-radius: 0.1rem;}
.zhuantiye .ztywrap img{width: 100%;height: 100%;}
.zhuantiye .zty-title{font-size: 0.3rem;text-align: center;color: #fff;text-align: center;margin-top: 0.2rem;}
.zhuantiye .zty-info{height: 0.5rem;text-align: center;line-height: 0.5rem;color: #ccc;font-size: 0.2rem;margin-top: 0.1rem;}
.zhuantiye .zty-info span{padding: 0 0.06rem;}
.zhuantiye .zty-line{width: 90%;height: 0.02rem;background: #ccc;margin: 0.2rem auto 0;}
.zhuantiye .zty-list{width: 86%;margin: 0.2rem auto 0;font-size: 0.18rem;color: #fff;}
.zhuantiye .zty-list .zty-item span{width: 0.3rem;height: 0.3rem;display: inline-block;float: left;margin-right: 0.1rem;margin-top: 0.05rem;}
.zhuantiye .zty-list .zty-item span img{width: 100%;height: 100%;}
.zhuantiye .zty-list .zty-item{line-height: 0.44rem;font-size: 0.22rem;}
.zhuantiye .ps-time{text-align: center;font-size: 0.2rem;color: #ccc;margin-top: 0.1rem;}
.zhuantiye .pingfen{text-align: center;line-height: 0.2rem;}
.zhuantiye .pingfen i{color: #ccc;font-size: 0.26rem;margin-left: 0.1rem;}

.hdwrap .closeicon{display: block;margin: 0.5rem auto 0;width: 0.7rem;height: 0.7rem;border: 1px solid #ccc;border-radius: 50%;text-align: center;line-height: 0.7rem;font-size: 0.4rem;color: #fff;flex-wrap: 100;background: #b2b2b2;}

.fade-enter,.fade-leave-to{opacity: 0;}
.fade-enter-active,.fade-leave-active{transition: 1s all;}
.fade-enter-to,.fade-leave{opacity: 1;}
</style>


