<template>
	<div class="regisinfoquery-wrapper" v-on:keyup.enter="queryGameUserList"> 
      <zs-tip :tiptext='tipName'></zs-tip>          
    <nav>    
     
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
     
     <div class="nav-item">
            <el-button size="small" class='btn-search-s' type="primary"  @click="queryGameUserList">查询</el-button>
            </div>
            <div class="nav-item">
            <el-button size="small" class='btn-search-s' type="primary"  @click="queryGameUserList">导出EXCL</el-button>
            </div>
 

      
    </nav>
<div class="billDetailed">
    <span>当前奖池总数0</span>
    <span>机器人赢取筹码总数0</span>
     <span>机器人补充筹码总数0</span>
     <span> 
      <el-button size="small"  type="primary">刷新</el-button></span>
</div>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData"   highlight-current-row row-class-name="cell-style" style="width: 100%">

        <el-table-column  prop="playerId" label="日期" >
        </el-table-column>
         <el-table-column  prop="channel" label="投放总数" >
        </el-table-column>
         <el-table-column  prop="nickname" label="总对局数" >
        </el-table-column>
         <el-table-column  prop="account" label="奖池变化" min-width="150">
        </el-table-column>
         <el-table-column  prop="chip" label="赢筹码" min-width="120">
        </el-table-column>
         <el-table-column  prop="diamond" label="补充筹码" min-width="120">
        </el-table-column>
         <el-table-column  prop="createTime" label="平均胜率" min-width="120">
        </el-table-column>
          <el-table-column  prop="devid" label="单个赢筹码均值" min-width="150">
        </el-table-column>
         <el-table-column  prop="vip_level" label="每局赢筹码均值" min-width="120">
        </el-table-column>
        <el-table-column  prop="forbidLogin" label="补充赢筹码均值"min-width="120">
        </el-table-column>
       
      </el-table>

       <zspagination :total = total :pagesize="10" @click="handleCurrentChange"></zspagination>
   

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
          tipName:'机器人统计',
           tableData:null,//列表table
          allstartTime:'',
          channels:[],
         serachform:{
              startTime:'',
              endTime:"",   
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
      // mixins: [myMixin],
      methods:{
          
        
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
        
         handleCurrentChange(val){

            this.pageNo = val
            this.queryGameUserList()
            this.pageNo = 1
         }
        
         
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
      .billDetailed{
    width: 100%;
    background: #ccc;
    height: 40px;
    line-height:40px;
    border-radius:5px;
    margin-bottom: 15px;
    // display: flex;
    // justify-content: space-between;

    span{
      display: inline-block;
      margin-left: 20px;
       margin-right: 20px;
      font-size: 14px;
    }
  }
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

