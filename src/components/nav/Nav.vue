<template>
  <div class="nav">
    <router-link class="nav-item" to="/goods">
      点菜
      <i class="line"></i>
    </router-link>
    <router-link class="nav-item" to="/ratings">
      评价（{{commentnum}}）
      <i class="line"></i>    
    </router-link>
    <router-link class="nav-item" to="/seller">
      商家
      <i class="line"></i>    
    </router-link>
  </div>
</template>

<script>
export default {
  props:{
		commentnum:Number
	}
 
}
</script>

<style scoped>
.nav{
  display: flex;
  width: 100%;
  height: 0.9rem;
  line-height: 0.9rem;
  border-bottom: 0.02rem solid #e4e4e4;
	font-size: 0.3rem;
	box-sizing: border-box;
	background: #fff;
	position: relative;
}
.nav-item{
  flex:1;
  text-align: center;
  text-decoration:none;
  color: #666666;
  position: relative;
}

.nav .active{
  color: #ffbb22;
}

.nav .active .line{
  width: 0.4rem;
  height: 0.05rem;
  display: inline-block;
  background: #ffbb22;
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -0.2rem;
	border-radius: 0.025rem;

}



</style>
