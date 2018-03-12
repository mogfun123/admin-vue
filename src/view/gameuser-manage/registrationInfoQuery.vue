<template>
	<div class="regisinfoquery-wrapper" v-on:keyup.enter="queryGameUserList"> 
      <zs-tip :tiptext='tipName'></zs-tip>          
    <nav>    
     
        <div class="nav-item">
              <label >玩家ID</label>
              <el-input style="width:160px" v-model="serachform.playerId" size="small" placeholder="用户ID"></el-input>
             
        </div>
      
     
   
          <div class="nav-item">
              <label>昵称</label>
              <el-input style="width:160px"  v-model="serachform.nickName" size="small" placeholder="昵称"></el-input>
        </div>  
        
        <!--   <div class="nav-item">
              <label >账号</label>
              <el-input style="width:160px"  v-model="serachform.account" size="small" placeholder="账号"></el-input>
        </div>  
        -->
      
       
       
          <div class="nav-item">
            <el-button size="small" class='btn-search-s' type="primary"  @click="queryGameUserList">查询</el-button>
            </div>
 
     

      
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData"   highlight-current-row row-class-name="cell-style" style="width: 100%">
      <!--   <el-table-column type=index label="序号" width="40">
        </el-table-column> -->
        <el-table-column  prop="playerId" label="用户ID" >
        </el-table-column>
         <el-table-column  prop="channel" label="渠道" >
        </el-table-column>
         <el-table-column  prop="nickname" label="昵称" >
        </el-table-column>
         <el-table-column  prop="account" label="账号" min-width="180">
        </el-table-column>
         <el-table-column  prop="chip" label="筹码" min-width="120">
        </el-table-column>
         <el-table-column  prop="diamond" label="钻石" min-width="120">
        </el-table-column>
         <el-table-column  prop="createTime" label="创建时间" min-width="120">
        </el-table-column>
        
         <el-table-column  prop="vip_level" label="VIP等级" >
        </el-table-column>
       <el-table-column  prop="deletable" label="是否删除" >
        </el-table-column>
        <el-table-column  prop="forbidLogin" label="登陆状态" >
        </el-table-column>
         <el-table-column  prop="forbidChat" label="禁言状态" >
        </el-table-column>
         
        
  
   
      </el-table>

   <!--     <zspagination :total = total :pagesize="10" @click="handleCurrentChange"></zspagination> -->
   

	</div>
</template>

<script>
import {hsdateUtil} from '@/utils'
import myMixin from '@/mixin/mixinchannel'

export default{
 	  beforeRouteEnter (to, from, next) {
  			next(vm =>{
          //vm.queryGameUserList()
  			})
  		},
   	beforeRouteUpdate (to, from, next) {
        next()
  		},
  	beforeRouteLeave (to, from, next) {
      next()
  		},
  		data(){

  			return {
         
            total:0,
                 
          pageNo:1,//查询页码
          tipName:'用户注册信息查询',
           tableData:null,//列表table
          allstartTime:'',
          channels:[],
          serachform:{
             
              playerId:'',//用户ID
              nickName:"",//昵称
            
             
          },
           channels: [],
          playerTypes:[
           {
            value:'',
            label:'所有',
          },{
            value:'1',
            label:'普通'
          },
          {
             value:'2',
            label:'主播'
          }],//用户类型
          forbidLogin:[
          
          {
            value:'0',
            label:'正常',
          },{
            value:'1',
            label:'封号中',
          }],//登陆状态
          forbidChatType:[
          
          {
             value:'0',
            label:'正常'
          },{
            value:'1',
            label:'禁言中',
          }],//禁言状态


                        
                       

  		  }
      },
      mixins: [myMixin],
      methods:{
          
        
         queryGameUserList(){//查询用户列表
          let option = {};
              Object.assign(option,this.serachform)
              this.API.ApiqueryGameUserList(option).then((res)=>{
             let data = res.data.data
             if (!data) {

                    this.tableData =null
                   }else{
                    data.forbidLogin =  data.forbidLogin==0?"正常":"封号中"
                     data.forbidChat =  data.forbidChat==0?"正常":"禁言中"
                      data.deletable =  data.deletable==0?"正常":"已删除"
                    
                      this.tableData =  [data]
                   }
            
                
                
              },(res)=>{})
         },
        
         // handleCurrentChange(val){

         //    this.pageNo = val
         //    this.queryGameUserList()
         //    this.pageNo = 1
         // }
        
         
      },
      


}	
</script>

<style lang="scss" scoped>
@import "~style/common.scss";
.regisinfoquery-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    
  .nav-item{
    label{
      width: 52px;
    }
    .el-input__inner{
      width: 160px;
    }
    .el-date-editor--datetimerange{
        .el-input__inner{
        width: 350px;
      }
    }
  }

}
</style>

