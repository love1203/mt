<template>
	<div class="goodswrapbox">
		<div class="goods">
			<div class="goods-left" ref='goodsleft'>
				<ul class="nav-list">
					<li class="nav-item1" :class="{'coust':newindex==0}" @click="handletoel(0)">
						<img :src="goodsList.tag_icon" />
						<span>{{goodsList.tag_name}}</span>
					</li>
					<li class="nav-item1"  @click="handletoel(index+1)" :class="{'coust':newindex==index+1}" v-for="(item,index) in foodsList" :key='index'>
						<img v-if="item.icon" :src="item.icon" />
						<span>{{item.name}}</span>
						<i class="numicon" v-if="navnum(item.spus)">{{navnum(item.spus)}}</i>
					</li>
				</ul>
			</div>
			<div class="goods-right" ref='goodsright'>
				<ul class="goods-list">
					<li class="goods-hot new-list">
						<div class="hotimg" v-for="(item,index) in goodsList.operation_source_list" :key='index'>
							<img :src="item.pic_url" />
						</div>
					</li>
					
					<li class="goods-box  new-list" v-for="(item,index) in foodsList" :key='index'>
						<div class="goods-wrap">
							<h2>{{item.name}}</h2>
							<ul class="food-list">
								<li class="food-item" v-for="(option,index1) in item.spus" :key='index1' 
								@click="toproduct(option)">
									<div class="food-img">
										<img :src="option.picture" />
									</div>
									<div class="food-info">
										<h3>{{option.name}}</h3>
										<div class="food-tedian" v-if="option.description">{{option.description}}</div>
										<div class="xiaoliang">
											<span>{{option.month_saled_content}}</span>
											<span>{{option.praise_content}}</span>
										</div>
										<img v-if="option.product_label_picture" :src="option.product_label_picture" />
										<p><i>￥{{option.min_price}}</i>/{{option.unit}}</p>
									</div>
									<div class="jiajian">
										<Countpage :food='option'/>
									</div>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
			
		</div>
		<Shopcart :headerData='headerData' :cardata='cardata' />
		
		<Productdetail :food='productdetail' ref='productdele' />
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import Shopcart from '../shopcart/Shopcart'
	import Countpage from '../countpage/Countpage'
	import Productdetail from '../productdetail/Productdetail'
	export default {
		data(){
			return {
				goodsList:{},
				foodsList:[],
				listHeight:[],
				goodsBScroll:{},
				foodsBScroll:{},
				sheight:0,
				headerData:{},
				productdetail:{}
			}
		},
		components:{
			Shopcart,
			Countpage,
			Productdetail
		},
		methods:{
			getListHeight(){
				let newlist=document.getElementsByClassName('new-list')
				let height=0
				this.listHeight.push(0)
				for(let i=0;i<newlist.length;i++){
					height+=newlist[i].clientHeight
					this.listHeight.push(height)
				}
			},
			handletoel(index){
				let allright=document.getElementsByClassName('new-list')
				//console.log(allright.length)
				this.foodsBSscroll.scrollToElement(allright[index],250)
				
			},
			navnum(spus){
				let num=0
				spus.forEach((item)=>{
					if(item.count){
						num+=item.count
					}
				})
				return num
			},
			toproduct(option){
				this.productdetail=option
				this.$refs.productdele.showview()
			}
		},
		computed:{
			newindex(){
				//console.log(this.sheight)
				
				for(let i=0;i<this.listHeight.length;i++){
					let h1=this.listHeight[i]
					let h2=this.listHeight[i+1]
					if(!h2||(this.sheight>=h1&&this.sheight<h2)){
						return i
					}
				}
			},
			cardata(){
				let car=[]
				this.foodsList.forEach((item)=>{
					item.spus.forEach((food)=>{
						if(food.count){
							car.push(food)
						}
					})
				})
				return car
			}
			
		},
		created(){
			this.$axios.get('/api/goods')
			.then((res)=>{
				if(res.data.code==0){
					this.goodsList=res.data.data.container_operation_source
					this.foodsList=res.data.data.food_spu_tags
					this.headerData=res.data.data.poi_info
 					console.log(this.foodsList)
// 					console.log(this.foodsList)
					this.$nextTick(()=>{
						this.goodsBSscroll=new BScroll(this.$refs.goodsleft,{click:true})
						this.foodsBSscroll=new BScroll(this.$refs.goodsright,{probeType:3,click:true})
						this.getListHeight()
						this.foodsBSscroll.on('scroll',(pos)=>{
							//console.log(Math.abs(Math.round(pos.y)))
							this.sheight=Math.abs(Math.round(pos.y))
						})
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
	.goods{width: 100%;position: absolute;top: 4.6rem;left: 0;bottom: 1rem;display: flex;background: #fff;}
	.goods .goods-left{width: 1.7rem;height: 100%;overflow: hidden;background: #f3f3f3;}
	.goods .goods-right{flex: 1;height: 100%;overflow: hidden;}
	.goods .goods-left .nav-list{}
	.goods .goods-left .nav-list .nav-item1{border-bottom: 1px solid #e6e9ec;padding: 0.34rem 0.1rem;width: 1.5rem;overflow: hidden;position: relative;}
	.goods .goods-left .nav-list .nav-item1 .numicon{position: absolute;display: block;width: 0.3rem;height: 0.3rem;border-radius: 50%;background: #fe4d3d;top: 0.02rem;right: 0.02rem;font-size: 0.2rem;text-align: center;line-height: 0.3rem;color: #fff;}
	.goods .goods-left .nav-list .coust{background: #fff;}
	.goods .goods-left .nav-list .nav-item1 img{width: 0.32rem;display: block;float: left;}
	.goods .goods-left .nav-list .nav-item1 span{color: #666;font-size: 0.25rem;float:left;line-height: 0.3rem;-webkit-line-clamp: 2;display: -webkit-box;-webkit-box-orient: vertical;overflow: hidden;margin-left: 0.1rem;font-weight: 600;}
	
	.goods .goods-right .goods-list{}
	.goods .goods-right .goods-list .goods-hot{padding-top: 0.16rem;border-bottom: 1px solid #e6e9ec;}
	.goods .goods-right .goods-list .goods-hot .hotimg{width: 94%;margin: 0 auto;overflow: hidden;border-radius: 0.1rem;height: 2rem;margin-bottom: 0.16rem;}
	.goods .goods-right .goods-list .goods-hot .hotimg img{width: 100%;height: 100%;}
	
	.goods-box{padding-top: 0.2rem;}
	.goods-box .goods-wrap{width: 94%;margin: 0 auto;}
	.goods-box .goods-wrap h2{display: block;height: 0.3rem;font-size: 0.3rem;color: #222;border-left: 0.06rem solid #FFBB22;padding-left: 0.06rem;}
	.goods-box .goods-wrap .food-list{}
	.goods-box .goods-wrap .food-list .food-item{display: flex;padding: 0.3rem 0;position: relative;}
	.goods-box .goods-wrap .food-list .food-item .jiajian{position: absolute;bottom: 0.2rem;right: 0.1rem;}
	.goods-box .goods-wrap .food-list .food-item .food-img{display: block;height: 1.5rem;overflow: hidden;margin-right: 0.2rem;flex: 0 0 1.5rem;}
	.goods-box .goods-wrap .food-list .food-item .food-img img{width: 100%;}
	.goods-box .goods-wrap .food-list .food-item .food-info{flex: 1;overflow: hidden;}
	.goods-box .goods-wrap .food-list .food-item .food-info h3{font-size: 0.29rem;color: #222;}
	.goods-box .goods-wrap .food-list .food-item .food-info .food-tedian{font-size: 0.23rem;color: #777;line-height: 0.3rem;margin-top: 0.08rem;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
	.goods-box .goods-wrap .food-list .food-item .food-info .xiaoliang{height: 0.4rem;margin-top: 0.05rem;}
	.goods-box .goods-wrap .food-list .food-item .food-info .xiaoliang span{font-size: 0.2rem;color: #999;line-height: 0.4rem;float: left;margin-right: 0.2rem;}
	.goods-box .goods-wrap .food-list .food-item .food-info p{font-size: 0.24rem;color: #999;margin-top: 0.05rem;}
	.goods-box .goods-wrap .food-list .food-item .food-info p i{color: #ff5533;}
	.goods-box .goods-wrap .food-list .food-item .food-info img{width: 1.2rem;height: 0.32rem;display: block;margin-top: 0.00rem;}
</style>
