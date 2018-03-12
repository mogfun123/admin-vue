<template>
  <div>
  <zs-tip :tiptext='tipName'></zs-tip>
    <!-- table -->
    <nav>
    
        <div class="nav-item">
         <label >用户昵称</label>
        <el-input  style='width:160px' size="small" v-model="serachform.username" placeholder="请输入用户昵称"></el-input>
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
       
         <div class="nav-item">
         <el-button type="primary" size="small" class='btn-search-s' @click="queryRechargeLists" >查询</el-button>
         
         </div>
     
       
     </nav>
      <el-row>
      <el-col :span="24">
        <el-table :data="tableData"  align='left' highlight-current-row row-class-name="cell-style" style="width: 100%,text-align:left">
          <!-- <el-table-column prop= 'playerId' label="日期" >
          </el-table-column> -->
          <el-table-column prop="id" label="ID" width="80">
          </el-table-column>

          <el-table-column prop="username" label="请求用户" width="100">
          </el-table-column>
      
          <el-table-column prop="method" label="请求地址" >
          </el-table-column>
          <el-table-column prop="requestIp" label="请求ip" >
          </el-table-column>
          <el-table-column prop="params" label="请求参数" min-width= '120'>
          </el-table-column>
          <el-table-column prop="description" label="操作描述" >
          </el-table-column>
            <el-table-column prop="createDate" label="操作时间" min-width= '120' >
          </el-table-column>

        </el-table>
      </el-col>
</el-row>
   <zspagination :total = total :pagesize="15" @click="handleCurrentChange"></zspagination>

     
     
   
  
  </div>
</template>

<script>


import { hsdateUtil } from '@/utils'
import myMixin from '@/mixin/mixinchannel'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //vm.queryRechargeLists()
    })
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
  beforeRouteLeave(to, from, next) {
    next()
  },

  data() {

    return {
     tipName:'操作记录',
      serachform:{
        // channel:'',
        // playerId:'',
        // nickname:'',
        username:'',
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
         endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),
      },
      channels:[],
    allstartTime:'',
      total: 0, // 页码
      pageNo: 1, //分页
      tableData: null,
     


    }
  },
    //mixins: [myMixin],
  methods: {

    //   beginDownExcl(title){
    //        let keytitle  = {
    //         playerId:'用户ID',
    //         channel:'渠道',
    //         playerName:'玩家昵称',
    //         paymoney:'充值金额',
    //         payDiamond:'获得钻石数',
    //         payCount:'充值次数'

    //        } ,vm = this ; 
    //      title = title||'表格'    
    //       this.exportLists('ApiqueryLogList').then((res)=>{
    //           if (vm.validateExportData(res)) { return }
    //           this.downloadExl([keytitle,...res.data.rows],title)
    //        })
          
      

    // },
     handleCurrentChange(val) {
        this.pageNo = val
      this.queryRechargeLists()
      this.pageNo = 1
    },

   changTime(val){
    let vm = this;
          if (val) {
            let times = val.split('/')
              vm.serachform.startTime = times[0]
              vm.serachform.endTime = times[1]
          }else{
             vm.serachform.startTime = vm.serachform.endTime =''
          }
     
        },
    trunDateStr(timestr){
          return (timestr||'')&&(timestr.split('-').join(''))
    },
    

  
 


  queryRechargeLists() {//用户
      let option = {}
      option.pageNo = this.pageNo
      option.pageSize = 15
      Object.assign(option,this.serachform)
            option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)
                this.API.ApiqueryLogList(option).then((res)=>{
                this.tableData = res.data.rows||[]
                this.total = res.data.total||0
      
                },(res)=>{})
       
    },
   

    queryProperty(api,option,fn) {
      this.API[api](option).then((res)=>{  
           fn(res.data.data)     
            },(res)=>{})
      },
    //新增
  },

}
</script>

<style lang="scss" scoped>
@import "~style/common.scss";

.el-input-group {
  width: 30%;
}
// .el-message-box{
//   width:300px;
// }
.payList {
  margin-right: 40px;
  font-weight: bold;
}

 .el-date-editor--daterange{
        .el-input__inner{
        //width: 220px;
      }
    }
</style>

