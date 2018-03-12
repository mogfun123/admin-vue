
<template>
  <div class="clickEvent" style="text-align:left">
  <zs-tip :tiptext='tipName'></zs-tip>
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
              <el-button type="primary" size="small" class='btn-search-s' @click="queryInfoAction">查询</el-button>
               <el-button size="small" type="primary" class='btn-search-s' @click="confirmDownload">导出xlsx表格</el-button>
              </div>

</nav>

<!-- 提交表单 -->
<div style='display:inline-block'>
         <el-table
          :data="tableData"
          highlight-current-row
          row-class-name="cell-style"
          align='left'
           style="width: 100%">
            <el-table-column prop="recordDate"   sortable label="日期" min-width="180">
        </el-table-column>
         <el-table-column prop="channel" label="渠道" min-width="180">
        </el-table-column>
         <el-table-column prop="sumCount"   sortable label="登录人数" min-width="150">
        </el-table-column>
        <el-table-column prop="avgCount"   sortable label=" 平均在线" min-width="150">
        </el-table-column>
         <el-table-column prop="maxCount"   sortable label="在线峰值" min-width="150">
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

//      vm.queryLists()


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
      tipName:'在线统计',
      serachform:{
       channel:'',
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
         endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),//
     },
     channels:[],

      total: 1, // 页码
      pageNo: 1, //分页
      tableData:[],
      dialogFormVisible:false,

    }
  },
   mixins: [myMixin],

  methods: {
     beginDownExcl(title){
           let keytitle  = {
            recordDate:'日期',
            channel:'渠道',
            sumCount:'登录人数',
            avgCount:'平均在线',
              maxCount:'在线峰值',
          
           } ,vm = this;
         title = title||'表格'
          this.exportLists('ApionlineStatistic').then((res)=>{
               if (vm.validateExportData(res)) { return }

              vm.downloadExl([keytitle,...res.data.rows],title)

           })



    },


     queryInfoAction(){
       this.pageNo = 1
      this.queryLists()
   },
   handleCurrentChange(val){

       this.pageNo = val
       this.queryLists()
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

        this.queryProperty('ApionlineStatistic',option,function(data){

              if (!data||!data.rows||data.rows.length==0) {
              vm.tableData = []
              vm.total = 0
                vm.$message({
                  message: '数据结果为空',
                  type: 'warning'
                });
                return
         }


        //   vm.dataHanding(data)
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
.nav-item{
  label{
    width: auto;
    text-align: center;

  }
}

</style>
