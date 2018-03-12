<template>
  <div>
    <zs-tip :tiptext='tipName'></zs-tip>
    <!-- table -->
    <nav>

         <div class="nav-item">
         <label >用户ID</label>
      <el-input size="small"  style="width:160px" v-model="serachform.playerId" placeholder="请输入(必填)">
            </el-input>
       </div>
          <div class="nav-item">
         <label >任务ID</label>
       <el-input size="small"  style="width:160px" v-model="serachform.growupid" placeholder="请输入">
            </el-input>
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
         <el-button type="primary" size="small" class='btn-search-s'  @click="queryRechargeLists" >查询</el-button>
           <el-button size="small" type="primary" class='btn-search-s' @click="preConfirmDownload">导出xlsx表格</el-button>
         </div>
      
      </nav>
<!-- <div class="billDetailed">
 <span>当前完成总次数{{diamondRate}}</span>
  <span>当前领取总次数 {{allPayMoney}}</span>
</div> -->
      <el-col :span="24">
        <el-table :data="tableData"  align='left' highlight-current-row row-class-name="cell-style" style="width: 100%">
         <el-table-column prop= 'selectDay' label="日期" >
          </el-table-column>
          <el-table-column prop="growupid" label="任务ID" >
          </el-table-column>
          <el-table-column prop="getReward" label="是否领取" >
          </el-table-column>
        </el-table>
      </el-col>
<el-col :span="24">
   <zspagination :total = total :pagesize="10" @click="handleCurrentChange"></zspagination>

     </el-col>
     
   
  
  </div>
</template>

<script>


import { hsdateUtil } from '@/utils'
import myMixin from '@/mixin/mixinchannel'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
     
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
     tipName:'个人成长活动统计',
      serachform:{
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
        endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),//
        growupid:'',
        playerId:'',
      },
      diamondRate:0,
      allPayMoney:0,
      channels:[],
   
      total: 0, // 页码
      pageNo: 1, //分页
     
      tableData: null,
  


    }
  },
    mixins: [myMixin],
  methods: {
    preConfirmDownload(){
       if (/(^[\s]*$)|([\D]+)/.test(this.serachform.playerId)) {
           this.$message('用户id请填写有效数字')
        return 
      }
        this.confirmDownload()
    },
     
   
      beginDownExcl(title){
           let keytitle  = {
            selectDay:'日期',
            growupid:'任务ID',
            getReward:'是否领取',
         
           } ,vm = this ;
         title = title||'表格'    
          this.exportLists('ApiplayerStatistic').then((res)=>{
              if (vm.validateExportData(res)) { return }
              this.dataHanding(res.data)
              this.downloadExl([keytitle,...res.data.rows],title)
           })
          
      

    },
     handleCurrentChange(val) {
            this.pageNo = val
      this.queryRechargeLists()
      this.pageNo = 1
    },
 
     dataHanding(data){
      let vm = this;
        data.rows.forEach(function(item){
              item.getReward = item.getReward==1?'已领取':'未领取'
          })
   },

  


  queryRechargeLists() {//用户
      let option = {}
      option.pageNo = this.pageNo
      option.pageSize = 10
      Object.assign(option,this.serachform)
      option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)
      if (/(^[\s]*$)|([\D]+)/.test(option.playerId)) {
           this.$message('用户id请填写有效数字')
        return 
      }
                this.API.ApiplayerStatistic(option).then((res)=>{
                  this.dataHanding(res.data)
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

<style lang="scss">
@import "~style/common.scss";

.el-input-group {
  width: 30%;
}
.payList {
  margin-right: 40px;
  font-weight: bold;
}
 .el-date-editor--daterange{
        .el-input__inner{
        width: 220px;
      }
    }
</style>

