<template>
		<transition name='pro'>
		<div class="product" v-show="showproduct">
			<div class="product-box">
				<div class="product-top">
					<span class="iconfont icon1" @click="hiddenproduct">&#xe624;</span>
					<span class="iconfont icon2">&#xe60e;</span>
					<span class="iconfont icon2">&#xe609;</span>
				</div>
				<div class="newwrap"  ref='product'>
				<div class="newwrap1">
				<div class="product-img">
					<img :src="food.picture" />
				</div>
				<div class="product-info">
					<h2>{{food.name}}</h2>
					<p class="product-ye"><span>{{food.month_saled_content}}</span><span>{{food.praise_content}}</span><span v-if="food.rating">{{food.rating.like_ratio_desc}}{{food.rating.like_ratio}}</span></p>
					<p class="product-price">￥{{food.min_price}}</p>
					<div class="addcart" v-if="!food.count||food.count==0" @click="addpro">
						<span class="iconfont">&#xe635;</span>加入购物车
					</div>
					<div class="jiawrap">
						<Countpage :food="food" />
					</div>
				</div>
				<div class="miaosu">
					<h3>商品描述</h3>
					<p v-if="food.description">{{food.description}}</p>
					<p v-else>暂无商品描述</p>
				</div>
				
				<div class="pingjia">
					<div class="pingjia-top">
						<span class="pjtext1" v-if="food.rating">{{food.rating.title}}</span>
						<span class="pjtext2" v-if="food.rating">{{food.rating.snd_title}}></span>
					</div>
					<ul class="pj-list" v-if="food.rating&&food.rating.comment_list">
						<li class="pj-item" v-for="(item,index) in food.rating.comment_list" :key='index' v-if="food.rating&&food.rating.comment_list">
							<div class="touxiao">
								<img v-if="item.user_icon" :src="item.user_icon" />
							</div>
							<div class="pj-right">
								<div class="name-top">
									<p class="name">{{item.user_name}}</p>
									<span>{{item.comment_time}}</span>
								</div>
								<p class="pj-conter">{{item.comment_content}}</p>
							</div>
						</li>
					</ul>
				</div>
				</div>
				</div>
			</div>
		</div>
		</transition>
</template>

<script>
	import Countpage from '../countpage/Countpage'
	import BScroll from 'better-scroll'
	export default {
		data(){
			return {
				showproduct:false
			}
		},
		props:{
			food:Object
		},
		components:{
			Countpage
		},
		methods:{
			showview(){
				this.showproduct=true
				this.$nextTick(()=>{
					if(!this.productdata){
						this.productdata=new BScroll(this.$refs.product,{click:true})
					}else{
						this.productdata.refresh()
					}
					
					
				})
			},
			hiddenproduct(){
				this.showproduct=false
			},
			addpro(){
				this.$set(this.food,'count',1)
			}
		}
		
	}
</script>

<style scoped>
	.product{width: 100%;position: absolute;bottom: 1rem;background: #fff;top: 0;overflow: hidden;right: 0;z-index: 2;}
	.product .product-box{overflow: hidden;height: 100%;}
	.product .product-top{width: 100%;height: 1rem;line-height: 1rem;font-size: 0.4rem;color: #333;background: #fff;position: relative;z-index: 20;}
	.product .product-top .icon1{float: left;margin-left: 0.2rem;}
	.product .product-top .icon2{float: right;margin-right: 0.2rem;}
	.newwrap{height: 90%;position: absolute;top: 1rem;}
	
	.product-img{width: 94%;height: 5rem;border-radius: 0.1rem;margin: 0 auto;box-shadow: 0 0 0.1rem #999;overflow: hidden;margin-top: 0.3rem;}
	.product-img img{width: 100%;height: 100%;}
	
	.product-info{width: 94%;font-size: 0.3rem;margin: 0.4rem auto 0;border-bottom: 0.02rem solid #f2f2f2;padding-bottom: 0.2rem;position: relative;}
	.product-info h2{font-size: 0.4rem;color: #333;font-weight: 700;}
	.product-info .product-ye{font-size: 0.26rem;color: #999;line-height: 0.7rem;}
	.product-info .product-ye span{margin-right: 0.2rem;}
	.product-info .product-price{font-size: 0.4rem;color: #fe4d3d;font-weight: bold;}
	.product-info .addcart{position: absolute;right: 0;bottom: 0.2rem;width: 2rem;height: 0.5rem;background: #FFBB22;border-radius: 0.25rem;font-size: 0.25rem;color: #222;line-height: 0.54rem;z-index: 2;}
	.product-info .addcart span{float: left;margin: 0 0.01rem 0 0.16rem ;}
	.product-info .jiawrap{position: absolute;right: 0;bottom: 0.2rem;z-index: 1;}
	
	
	.miaosu{width: 94%;font-size: 0.3rem;margin: 0.4rem auto 0;}
	.miaosu h3{font-size: 0.32rem;color: #333;font-weight: 700;}
	.miaosu p{font-size: 0.26rem;color: #777;margin-top: 0.2rem;line-height: 0.32rem;}
	
	.pingjia{width: 94%;font-size: 0.5rem;margin: 0.6rem auto 0;}
	.pingjia .pingjia-top{width: 100%;height: 0.5rem;line-height: 0.5rem;}
	.pingjia .pingjia-top .pjtext1{font-size: 0.32rem;color: #333;font-weight: 700;float: left;}
	.pingjia .pingjia-top .pjtext2{font-size: 0.25rem;color: #888;float: right;}
	
	.pj-list{width: 100%;margin-top: 0.2rem;}
	.pj-list .pj-item{display: flex;width: 100%;border-bottom: 0.02rem solid #f2f2f2;padding: 0.28rem 0;}
	.pj-list .pj-item .touxiao{flex: 0 0 1rem;height: 1rem;border-radius: 50%;background: #F2F2F2;width: 1rem;margin-right: 0.2rem;overflow: hidden;}
	.pj-list .pj-item .touxiao img{width: 100%;height: 100%;}
	.pj-list .pj-item .pj-right{flex: 1;}
	.pj-list .pj-item .pj-right .name-top{height: 0.3rem;line-height: 0.3rem;}
	.pj-list .pj-item .pj-right .name{font-size: 0.28rem;color: #888;float: left;}
	.pj-list .pj-item .pj-right .name-top span{font-size: 0.22rem;color: #999;float: right;}
	.pj-list .pj-item .pj-right .pj-conter{font-size: 0.25rem;color: #666;line-height: 0.33rem;margin-top: 0.14rem;}
	
	.pro-enter,.pro-leave-to{right: -10rem;}
	.pro-enter-active,.pro-leave-active{transition: 0.5s all;}
	.pro-enter-to,.pro-leave{right: 0;}
</style>
