<template>
	<div class="regisinfoquery-wrapper" v-on:keyup.enter="queryGameUserList"> 
      <zs-tip :tiptext='tipName'></zs-tip>          
    <nav>    
     
        <div class="nav-item">
              <label >机器人ID</label>
              <el-input style="width:160px" v-model="serachform.playerId" size="small" placeholder="用户ID"></el-input>
             
        </div>
       <div class="nav-item">
            <label class="subtitle">UID</label>
            <el-select style="width:160px" v-model="emailType" placeholder="UID"  size="small" >
              <el-option
                v-for="item in uidTypes"
                :label="item.label"
                :key="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div> 
     
   
          <div class="nav-item">
              <label>昵称</label>
              <el-input style="width:160px"  v-model="serachform.nickName" size="small" placeholder="昵称"></el-input>
        </div>  
        <div class="nav-item">
         <label >时间</label>
                 <el-date-picker
                v-model="serachform.startTime"
                type="datetime"
                :editable=false
                placeholder="选择日期时间">
              </el-date-picker>
        </div>
        <div class="nav-item">
         <label class="date-label">至</label>
         <el-date-picker
                v-model="serachform.endTime"
                type="datetime"
                 :editable=false
                placeholder="选择日期时间">
              </el-date-picker>
        </div>
      
       <br>
       
          <div class="nav-item">
            <el-button size="small" class='btn-search-s' type="primary"  @click="queryGameUserList">查询</el-button>
            </div>
            <div class="nav-item">
            <el-button size="small" class='btn-search-s' type="primary"  @click="queryGameUserList">导出EXCL</el-button>
            </div>
 
     

      
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData"   highlight-current-row row-class-name="cell-style" style="width: 100%">
      <!--   <el-table-column type=index label="序号" width="40">
        </el-table-column> -->
        <el-table-column  prop="playerId" label="机器人ID" >
        </el-table-column>
         <el-table-column  prop="channel" label="UID" >
        </el-table-column>
         <el-table-column  prop="nickname" label="昵称" >
        </el-table-column>
         <el-table-column  prop="account" label="性别">
        </el-table-column>
         <el-table-column  prop="chip" label="头像" min-width="120">
        </el-table-column>
         <el-table-column  prop="diamond" label="VIP等级" min-width="120">
        </el-table-column>
         <el-table-column  prop="createTime" label="当前筹码数" min-width="120">
        </el-table-column>
          <el-table-column  prop="devid" label="累计补充筹码数" min-width="130">
        </el-table-column>
         <el-table-column  prop="vip_level" label="累计赢得筹码数" min-width="130">
        </el-table-column>

        <el-table-column  prop="forbidLogin" label="注册时间" min-width="120" >
        </el-table-column>
         <el-table-column  prop="forbidChat" label="操作" >
             <template scope="scope">
          <el-button size="small"  type="primary"  @click="editOperation(scope.$index,scope.row)">编辑</el-button>

       
            </template>
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
          tipName:'机器人信息查询',
           tableData:null,//列表table
          allstartTime:'',
          channels:[],
          serachform:{
             
              playerId:'',//用户ID
              nickName:"",//昵称
              account:'',//账号
             
          },

           channels: [],
          uidTypes:[
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
      // mixins: [myMixin],
      methods:{
          editOperation(index,row){

          },
        
         queryGameUserList(){//查询用户列表
          let option = {};
              Object.assign(option,this.serachform)
              this.API.ApiqueryGameUserList(option).then((res)=>{
             let data = res.data.data
            
                     data.forbidLogin =  data.forbidLogin==0?"正常":"封号中"
                     data.forbidChat =  data.forbidChat==0?"正常":"禁言中"
                     data.createTime = hsdateUtil(data.createTime)
                
                 this.tableData =  [data]
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

