<template>
  <div>
    <zs-tip :tiptext='tipName'></zs-tip>
    <!-- table -->
    <nav>
    <!-- table -->
   
        <div class="nav-item">
         <label >渠道</label>
      <el-select size="small"  style="width:160px" v-model="serachform.channel" placeholder="请选择"  >
              <el-option
                v-for="item in channels"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
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
           <el-button size="small" type="primary" class='btn-search-s' @click="confirmDownload">导出xlsx表格</el-button>
         </div>
      
      </nav>
<!-- <div class="billDetailed">
 <span>当前完成任务总人数{{diamondRate}}</span>
  <span>当前领取奖励总人数 {{allPayMoney}}</span>
</div> -->
      <el-col :span="24">
        <el-table :data="tableData"  align='left' highlight-current-row row-class-name="cell-style" style="width: 100%">
           <el-table-column prop= 'selectDay' label="日期" >
          </el-table-column>
          <el-table-column prop="growupid" label="任务ID" >
          </el-table-column>
           <el-table-column prop="channel" label="渠道" >
          </el-table-column>
          <el-table-column prop="finished" label="完成任务人数" >
          </el-table-column>
           <el-table-column prop="getReward" label="领取奖励人数" >
          </el-table-column>
          <el-table-column prop="getRate" label="领取人数占比" >
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
     tipName:'渠道成长活动统计',
      serachform:{
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
        endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),//
        channel:'',
        growupid:'',
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
             channel:'渠道',
            growupid:'任务ID',
            finished:'完成任务人数',
            getReward:'领取奖励人数',
            getRate:'完成人数占比',

           } ,vm = this ;
         title = title||'表格'    
          this.exportLists('ApichannelStatistic').then((res)=>{
              if (vm.validateExportData(res)) { return }
              this.downloadExl([keytitle,...res.data.rows],title)
           })
          
      

    },
     handleCurrentChange(val) {
            this.pageNo = val
      this.queryRechargeLists()
      this.pageNo = 1
      console.log(env)
    },
  
  
  queryRechargeLists() {//用户
      let option = {}
      option.pageNo = this.pageNo
      option.pageSize = 10
      Object.assign(option,this.serachform)
      option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)
                this.API.ApichannelStatistic(option).then((res)=>{
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

// .el-input-group {
//   width: 30%;
// }
// .payList {
//   margin-right: 40px;
//   font-weight: bold;
// }
//  .el-date-editor--daterange{
//         .el-input__inner{
//         width: 220px;
//       }
//     }
</style>

