<template>
	<div class="balanceQuery-wrapper">
	  <zs-tip :tiptext='tipName'></zs-tip>
    <!--   <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
   
 
           
    <nav>
       
        <div class="nav-item">
              <label for="userName">用户ID</label>
              <el-input v-model="userName" style='width:160px' size="small" placeholder="用户ID"></el-input>
             
        </div>  
      
          <div class="nav-item">
              <label for="nickName">昵称</label>
              <el-input v-model="nickName" style='width:160px' id = "nickName" size="small" placeholder="昵称"></el-input>
        </div>  
       
          <div class="nav-item">
              <label for="mobile">手机号</label>
              <el-input v-model="mobile" style='width:160px' id = "mobile" :maxlength=11 size="small" placeholder="手机号"></el-input>
        </div>  
       

         <div class="nav-item">
            <el-button size="small" class='btn-search-s' type="primary" @click="queryGameUserList">查询</el-button>
        </div>  
     
      
    </nav>

<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData"  highlight-current-row row-class-name="cell-style" style="width: 100%">
      
        <el-table-column align="center" prop="gameUserid" label="用户ID" >
        </el-table-column>
         
         <el-table-column align="center" prop="nickname" label="昵称" >
        </el-table-column>
         <el-table-column align="center" prop="mobile" label="手机号" min-width="120">
        </el-table-column>
         <el-table-column align="center" prop="userType" label="用户类型" >
        </el-table-column>
        <el-table-column align="center" prop="diamond" label="钻石" >
        </el-table-column>
         <el-table-column align="center" prop="chip" label="筹码" >
        </el-table-column>
          <el-table-column align="center" prop="integral" label="德州排位积分" >
        </el-table-column>
      </el-table>
<!-- table -->
  
  <zspagination :total = pagtotal :pagesize="15" @click="handleCurrentChange"></zspagination>
	</div>
</template>

<script>


import {ApiqueryAdmin} from '@/api.js'



export default{
 	  beforeRouteEnter (to, from, next) {
  			next(vm =>{
          vm.queryGameUserList()
  			})
  		},
   	beforeRouteUpdate (to, from, next) {
        next()
  		},
  	beforeRouteLeave (to, from, next) {
      next()
  		},
      name:"balanceQuery",
  		data(){

  			return {
  				tipName:"用户余额查询",
          pagtotal:0,//页数
          pageNo:1,
          userName:'',//用户名
          nickName:"",//昵称
          mobile:'',//手机号
          tableData: null,

  		  }
      },
      methods:{
         queryGameUserList(){
          let option = {}
          option.pageNo = this.pageNo
          option.id = this.userName
          option.nickname = this.nickName
          option.mobile = this.mobile
           this.API.ApiqueryGameUserWallet(option).then((res)=>{
            this.pagtotal = res.data.total
            
            res.data.rows.forEach((item)=>{
              item.userType = item.userType==1?"普通":"主播"
            })
              this.tableData = res.data.rows
           },(res)=>{})
         },
         
         handleCurrentChange(val){
              this.pageON = val
              this.queryGameUserList()
               this.pageNo = 1
         }
        
        
         
      },
     


}	
</script>

<style lang="scss">
@import "~style/common.scss";
.balanceQuery-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
   


}
</style>

