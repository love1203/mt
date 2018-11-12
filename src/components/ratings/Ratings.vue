<template>
	<div class="ratings" ref='ratings'>
		<div class="ratbox">
			<div class="ratingswrap">
				<div class="ratingstop">
					<div class="top-left">
						<p class="tl1">{{ratingsdata.comment_score}}</p>
						<p class="tl2">商家评分</p>
					</div>
					<div class="top-center">
						<div class="topcent1 topcent2">
							<span>口味</span>
							<Star :starData='ratingsdata.quality_score' />
							<span class="tc2">{{ratingsdata.quality_score}}</span>
						</div>
						<div class="topcent1 topcent3">
							<span>包装</span>
							<Star :starData='ratingsdata.pack_score' />
							<span class="tc2">{{ratingsdata.pack_score}}</span>
						</div>
					</div>
					<div class="borderright"></div>
					<div class="top-right">
						<p class="tr1">{{ratingsdata.delivery_score}}</p>
						<p class="tr2">配送满意度</p>
					</div>
				</div>
				<div class="fengexian"></div>
				
				<div class="ratings-nav">
					<div class="all" :class="{'active4':navindex==0}" @click="change(0)" v-if="ratingsdata.tab">{{ratingsdata.tab[0].comment_score_title}}</div>
					<div class="haveimg" :class="{'active4':navindex==1}" @click="change(1)" v-if="ratingsdata.tab">{{ratingsdata.tab[1].comment_score_title}}</div>
					<div class="dianping" :class="{'active4':navindex==2}" @click="change(2)" v-if="ratingsdata.tab">
						<img src="./img/icon_sub_tab_dp_normal@2x.png" v-if="navindex!=2" /><img src="./img/icon_sub_tab_dp_highlighted@2x.png"  v-if="navindex==2" /><span>{{ratingsdata.tab[2].comment_score_title}}</span>
					</div>
				</div>
				
				<div class="pltedian">
					<span v-for="(item,index) in ratingsdata.labels" :key='index'>{{item.content}}（{{item.label_count}}）</span>
				</div>
				
				<ul class="pj-list">
					<!-- {{changedata}} -->
					<li class="pj-item" v-for="(item1,index) in changedata" :key='index'>
						<div class="pjbox">
							<div class="touxiao">
								<img v-if="item1.user_pic_url" :src="item1.user_pic_url" />
							</div>
							<div class="pj-right">
								<div class="name-top">
									<p class="name">{{item1.user_name}}</p>
									<span>{{item1.comment_time}}</span>
								</div>
								<p class="pj-conter">{{item1.comment}}</p>
							</div>
						</div>
						<div class="pj-img">
							<img v-for="(img,index) in item1.comment_pics" :key='index' :src="img.url" />
						</div>
					</li>
					
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Star from '../star/Star'
	import BScroll from 'better-scroll'
	
	const all=0
	const haveimg=1;
	const dianping=2
	export default {
		data(){
			return {
				ratingsdata:{},
				navindex:all
			}
		},
		components:{
			Star
		},
		methods:{
			change(index){
				this.navindex=index
			}
		},
		computed:{
			changedata(){
				if(this.navindex==all){
					return this.ratingsdata.comments
				}else if(this.navindex==haveimg){
					let iteming=[]
					this.ratingsdata.comments.forEach((item)=>{
						if(item.comment_pics.length){
							iteming.push(item)
						}
					})
					return iteming
				}else{
					return this.ratingsdata.comments_dp.comments
				}
			}
		},
		created(){
			this.$axios.get('/api/ratings')
			.then((res)=>{
				if(res.data.code==0){
					this.ratingsdata=res.data.data
					console.log(this.ratingsdata)
					this.$nextTick(()=>{
						if(!this.scroll){
							this.scroll=new BScroll(this.$refs.ratings,{click:true})
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
	.ratings{position: absolute;left: 0;top: 4.6rem;bottom: 0;width: 100%;overflow: hidden;}
	.ratbox{overflow: hidden;}
	.ratings .ratingswrap{}
	.ratings .ratingswrap .ratingstop{display: flex;height: 1.5rem;}
	.ratings .ratingswrap .ratingstop .top-left{flex: 0 0 1.6rem;text-align: center;}
	.ratings .ratingswrap .ratingstop .top-left .tl1{font-size: 0.6rem;color: #FFBB22;margin-top: 0.24rem;}
	.ratings .ratingswrap .ratingstop .top-left .tl2{font-size: 0.22rem;color: #888;line-height: 0.5rem;}
	.ratings .ratingswrap .ratingstop .top-center{flex: 1;font-size: 0.22rem;color: #333;padding-left: 0.2rem;}
	.ratings .ratingswrap .ratingstop .top-center .topcent2{height: 0.5rem;margin-top: 0.4rem;}
	.ratings .ratingswrap .ratingstop .top-center .topcent1 .tc2{color: #FFBB22;}
	.ratings .ratingswrap .ratingstop .borderright{width: 0.02rem;height: 1.2rem;background: #EFEFEF;margin-top: 0.15rem;}
	.ratings .ratingswrap .ratingstop .top-right{flex: 0 0 2rem;text-align: center;}
	.ratings .ratingswrap .ratingstop .top-right .tr1{font-size: 0.6rem;color: #FFBB22;margin-top: 0.24rem;}
	.ratings .ratingswrap .ratingstop .top-right .tr2{font-size: 0.22rem;color: #888;line-height: 0.5rem;}
	
	.ratings-nav{width: 94%;height: 0.7rem;margin: 0 auto;display: flex;text-align: center;border: 0.02rem solid #FFBB22;border-radius: 0.1rem;font-size: 0.26rem;line-height: 0.7rem;font-weight: 700;margin-top: 0.4rem;}
	.ratings-nav .all{flex: 1;border-right: 0.02rem solid #FFBB22;color: #FFBB22;}
	.ratings-nav .haveimg{flex: 1;border-right: 0.02rem solid #FFBB22;color: #FFBB22;}
	.ratings-nav .dianping{flex: 1;color: #FFBB22;text-align: center;}
	.ratings-nav .dianping img{width: 0.3rem;display: block;margin-right: 0.1rem;margin-top: 0.2rem;float: left;margin-left: 0.4rem;}
	.ratings-nav .dianping span{display: block;float: left;}
	.ratings-nav .active4{background: #FFBB22;color: #222;}
	
	.pltedian{width: 94%;overflow: hidden;margin: 0.3rem auto 0;}
	.pltedian span{display: block;float: left;height: 0.4rem;background: #F2F2F2;font-size: 0.2rem;color: #666;line-height: 0.4rem;padding: 0 0.1rem;border-radius: 0.1rem;margin-right: 0.2rem;margin-bottom: 0.2rem;}
	
	.pj-list{width: 94%;margin: 0.2rem auto 0;}
	.pj-list .pj-item{width: 100%;border-bottom: 0.02rem solid #f2f2f2;padding: 0.28rem 0;}
	.pj-list .pj-item .pjbox{display: flex;width: 100%;}
	.pj-list .pj-item .pj-img{width: 100%;overflow: hidden;margin-left: 1.2rem;margin-top: 0.2rem;}
	.pj-list .pj-item .pj-img img{width: 1.5rem;height: 1.5rem;}
	.pj-list .pj-item .touxiao{flex: 0 0 1rem;height: 1rem;border-radius: 50%;background: #F2F2F2;width: 1rem;margin-right: 0.2rem;overflow: hidden;}
	.pj-list .pj-item .touxiao img{width: 100%;height: 100%;}
	.pj-list .pj-item .pj-right{flex: 1;}
	.pj-list .pj-item .pj-right .name-top{height: 0.3rem;line-height: 0.3rem;}
	.pj-list .pj-item .pj-right .name{font-size: 0.28rem;color: #888;float: left;}
	.pj-list .pj-item .pj-right .name-top span{font-size: 0.22rem;color: #999;float: right;}
	.pj-list .pj-item .pj-right .pj-conter{font-size: 0.25rem;color: #666;line-height: 0.33rem;margin-top: 0.14rem;}
</style>
