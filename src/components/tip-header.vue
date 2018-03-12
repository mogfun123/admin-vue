<template>
	<div class="zs-tip">
  <span> {{tiptext}}</span>
	 <slot></slot>
	</div>
</template>>

<script>
export default{
 	    name:'zs-tip',
  		data(){

  			return {
  				message:"你好吗"
  			}
  		},
      props:{
        tiptext:String,
      },


}	
</script>

<style lang="scss" scoped>
@import "~style/color.scss";
.zs-tip{
  width: 100%;
  padding-left: 15px;
  border-left: 2px solid red;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 15px;
}
</style>

