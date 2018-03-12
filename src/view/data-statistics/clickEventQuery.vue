<template>
  <div class="clickEvent" style="text-align:left">
    <zs-tip :tiptext='tipName'></zs-tip>
    <!-- table -->
    <nav>
 
        <div class="nav-item">
            <label>渠道</label>
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
      <label>事件ID</label>
        <el-input style="width:160px" size='small' v-model="serachform.eventId" placeholder="请输入查询事件ID" ></el-input> 
        </div>
       
         <div class="nav-item">
          <label>事件名称</label>
        <el-input style="width:160px" size='small' v-model="serachform.eventName" placeholder="请输入查询事件名称" ></el-input> 
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
              <el-button type="primary" size="small" class='btn-search-s' @click="queryInfoAction">查询</el-button>
               <el-button type="primary" size="small" class='btn-search-s' @click="dialogFormVisible=true">修改事件名称</el-button>
                <el-button size="small" type="primary" class='btn-search-s' @click="confirmDownload">导出xlsx表格</el-button>
                
              </div>

             
</nav>
<!-- 提交表单 -->
<el-dialog title="修改事件名称" size="mini" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
  <el-form :model="eventform">
    <el-form-item label="事件ID" >
      <el-input v-model="eventform.eventId" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="事件名称" >
      <el-input v-model="eventform.eventName" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="modeifyEventName">修改</el-button>

  </div>
</el-dialog>
<!-- 提交表单 -->
<div style='display:inline-block'>
         <el-table 
          :data="tableData" 
          highlight-current-row
           align='left'
          row-class-name="cell-style"
           style="width: 1100px">
        <el-table-column prop="clickDay" label="日期" width="180">
        </el-table-column>
         <el-table-column prop="channel" label="渠道" width="150">
        </el-table-column>
        <el-table-column prop="eventId" label="事件ID" width="200">
        </el-table-column>
         <el-table-column prop="eventName" label="事件名称" width="200">
        </el-table-column>
         <el-table-column prop="yesterdayClickCount" label="昨天消息数" width="200">
        </el-table-column>
         <el-table-column prop="clickCount" label="今日消息数">
        </el-table-column>
      

      </el-table>
    
           <zspagination :total = total :pagesize="15" @click="handleCurrentChange"></zspagination>
    
  </div>
  </div>
</template>

<script>


import { hsdateUtil } from '@/utils'
import myMixin from '@/mixin/mixinchannel'


export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
     
      //vm.queryLists()
    
     
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
      tipName:'事件统计',
       allstartTime:"",
      serachform:{
       eventId:'',
       eventName:'',
       channel:'',
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
        endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),//
     },
     channels:[],
     eventform:{
      eventId:'',
      eventName:'',
      
     },
      total: 0, // 页码
      pageNo: 1, //分页
      tableData:[],
      dialogFormVisible:false,
     
     
    }
  },
  mixins: [myMixin],
  
  methods: {
    beginDownExcl(title){
           let keytitle  = {
            clickDay:'日期',
            channel:'渠道',
            eventId:'事件ID',
            eventName:'事件名称',
           yesterdayClickCount:'昨天消息数',
            clickCount:'今日消息数',
           } ,vm = this;
         title = title||'表格'    
          this.exportLists('ApiqueryClieckEventStatisticsl').then((res)=>{
               if (vm.validateExportData(res)) { return }
              
              vm.downloadExl([keytitle,...res.data.rows],title)
             
           })
          
      

    },

      changTime(times){
      let arr = times.split('/')
      this.serachform.startTime = this.trunDateStr(arr[0])
      this.serachform.endTime = this.trunDateStr(arr[1])
     
    },
    trunDateStr(timestr){
        return (timestr||'')&&(timestr.split('-').join(''))
    },
    modeifyEventName(){
      this.modeifyEventAction()

       
    },
  
     queryInfoAction(){
       this.pageNo = 1    
      this.queryLists()
   },
   handleCurrentChange(val){
     
       this.pageNo = val
       this.queryLists()
   },
   modeifyEventAction(){
    let option = {},vm = this;
    Object.assign(option,vm.eventform)
    this.queryProperty('ApiupdateClickEventName',option,function(data){
      if (data.retcode==1) {
        vm.queryLists()
      }
        vm.$message(`${data.retmsg}`)
        vm.dialogFormVisible = false

    })

   },
    dataHanding(data){
      let vm = this;
        // data.chargerList.forEach(function(item){
        //       item.payType = vm.payTypes[`type${item.payType}`]
        //       item.payStatus = vm.payStatues[`type${item.payStatus}`]
        //        item.rechargeType = vm.rechargeTypes[`type${item.rechargeType}`]
        //   })
   },

  queryLists(val) {
      let option = {},
      vm = this;
        option.pageNo = this.pageNo
         option.pageSize = 15
         Object.assign(option,vm.serachform)
      option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)          
 
        this.queryProperty('ApiqueryClieckEventStatisticsl',option,function(data){

              if (!data||!data.rows||data.rows.length==0) {
              vm.tableData = []
              vm.total = 0
                vm.$message({
                  message: '数据结果为空',
                  type: 'warning'
                });
                return 
         }
          
          
           vm.dataHanding(data)
          vm.tableData = data.rows
          vm.total = data.total
        })
      
    },

       queryProperty(api,option,fn) {
          this.API[api](option).then((res)=>{
           fn(res.data)     
                },(res)=>{})
      },

  },

}
</script>

<style lang="scss" scoped>
// @import "~style/color.scss";
//@import "~style/common.scss";
.nav-item .el-select .el-input--small{
  width: 160px;
}

</style>

