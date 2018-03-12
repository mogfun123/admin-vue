<template>
  <div>
    <zs-tip :tiptext='tipName'></zs-tip>
    <!-- table -->
    <nav>
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
     <!--  <el-row>
        <el-col :span="24">
        <div class="totalsign">
           <div class="nav-item">
           <label for="">当前消耗积分</label>
            <span>{{0000000}}</span>
         </div>
          <div class="nav-item">
           <label for="">当前获得通币</label>
            <span>{{0000000}}</span>
         </div>
         <div class="nav-item">
           <label for="">消耗积分总额</label>
            <span>{{0000000}}</span>
         </div>
         <div class="nav-item">
           <label for="">获得通币总额</label>
            <span>{{0000000}}</span>
         </div>
        </div>
        </el-col>
      </el-row> -->
      <el-col :span="24">
        <el-table :data="tableData"  align='left' highlight-current-row row-class-name="cell-style" style="width: 100%">
         <el-table-column prop= 'addData' label="日期" >
          </el-table-column>
          <el-table-column prop="channel" label="渠道" >
          </el-table-column>

          <el-table-column prop="userNumber" label="兑换用户数" >
          </el-table-column>
      
          <el-table-column prop="totalNumber" label="兑换总次数" >
          </el-table-column>
          <el-table-column prop="pointsNumber" label="消耗积分" >
          </el-table-column>
          <el-table-column prop="tongbiNumber" label="获得通币" >
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
     tipName:'渠道兑换统计',
      serachform:{
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
        endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),//
        channel:'',
      },
      channels:[],
    allstartTime:'',
      total: 0, // 页码
      pageNo: 1, //分页
      tableData: null,
      orderFormList: null,


    }
  },
    mixins: [myMixin],
  methods: {
     
   
      beginDownExcl(title){
           let keytitle  = {
            addData:'日期',
            channel:'渠道',
            userNumber:'兑换用户数',
            totalNumber:'兑换总次数',
            pointsNumber:'消耗积分',
            tongbiNumber:'获得通币',
    
           } ,vm = this ;
         title = title||'表格'  
           vm.serachform.pageNo = 1
          vm.serachform.pageSize =10000     
          this.exportLists('ApichannelpointsExchange').then((res)=>{
              if (vm.validateExportData(res.data)) { return }
              this.downloadExl([keytitle,...res.data.data.rows],title)
           })
          
      

    },
     handleCurrentChange(val) {
            this.pageNo = val
      this.queryRechargeLists()
      this.pageNo = 1
    },
    changTime(times){
          let arr = times.split('/')
          this.serachform.startTime = this.trunDateStr(arr[0])
          this.serachform.endTime = this.trunDateStr(arr[1])
     
        },
    trunDateStr(timestr){
          return (timestr||'')&&(timestr.split('-').join(''))
    },

   //   dataHanding(data){
   //    let vm = this;
   //      data.chargerList.forEach(function(item){
   //            item.payType = vm.payTypes[`type${item.payType}`]
   //            item.payStatus = vm.payStatues[`type${item.payStatus}`]
   //            item.rechargeType = vm.rechargeTypes[`type${item.rechargeType}`]
   //        })
   // },

  


  queryRechargeLists() {//用户
      let option = {}
     
      Object.assign(option,this.serachform)
       option.pageNo = this.pageNo
      option.pageSize = 10
      option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)
                this.API.ApichannelpointsExchange(option).then((res)=>{
                this.tableData = res.data.data.rows||[]
                 this.total = res.data.data.records||0
              
      
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

