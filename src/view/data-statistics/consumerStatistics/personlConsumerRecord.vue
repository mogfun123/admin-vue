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
         <label >用户ID</label>
       <el-input  style='width:160px' size="small" v-model="serachform.playerId" placeholder="请输入玩家ID"></el-input>
       </div>
      
        <div class="nav-item">
         <label >昵称</label>
        <el-input  style='width:160px' size="small" v-model="serachform.nickname" placeholder="请输入玩家昵称"></el-input>
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
         <el-button type="primary" size="small"  class='btn-search-s' @click="queryRechargeLists" >查询</el-button>
          <el-button size="small" type="primary" class='btn-search-s' @click="confirmDownload">导出xlsx表格</el-button>
         </div>
     
      </nav>
     <!--  <el-row>
        <el-col :span="24">
        <div class="totalsign">
           <div class="nav-item">
           <label for="">当前总金额</label>
            <span>{{0000000}}</span>
         </div>
          <div class="nav-item">
           <label for="">当前总金额</label>
            <span>{{0000000}}</span>
         </div>
        </div>
        </el-col>
      </el-row> -->
      <el-col :span="24">
        <el-table :data="tableData"  align='left' highlight-current-row row-class-name="cell-style" style="width: 100%">
         <!--  <el-table-column prop= 'selectDay' label="日期" >
          </el-table-column> -->
          <el-table-column prop="channel" label="渠道" >
          </el-table-column>

          <el-table-column prop="playerId" label="用户ID" >
          </el-table-column>
      
          <el-table-column prop="nickName" label="玩家昵称" >
          </el-table-column>
         <!--  <el-table-column prop="currentDiamond" label="充值金额" >
          </el-table-column>
          <el-table-column prop="totalDiamond" label="获得钻石数" >
          </el-table-column> -->
          <el-table-column prop="consumeMoney" label="消费金额" >
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
     tipName:'个人消费统计',
      serachform:{
        channel:'',
        playerId:'',
        nickname:'',
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
        endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),//
      },
      channels:[],
    allstartTime:'',
      total: 0, // 页码
      pageNo: 1, //分页
       payTypes:{
        type0:'支付宝',
        type1:'微信',
        type2:"苹果支付",
        type3:"阿里体育"
      },
      rechargeTypes:{
        type0:'CMS_SERVER',
        type1:'PAY_SERVER',
        type2:"GM_SERVER"
      },
      payStatues:{
        type0:'未支付',
        type1:'已支付',
        type2:'支付失败',
        type3:'已支付未到账',
      },
      tableData: null,
      orderFormList: null,


    }
  },
    mixins: [myMixin],
  methods: {
          beginDownExcl(title){
           let keytitle  = {
            selectDay:'日期',
            channel:'渠道',
            playerId:'用户ID',
            nickName:'玩家昵称',
            consumeMoney:'消费金额',
           } ,vm = this;
         title = title||'表格'    
          this.exportLists('ApiconsumeStatisticsplayer').then((res)=>{
                 if (vm.validateExportData(res)) { return }
              
              vm.downloadExl([keytitle,...res.data.rows],title)
             
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
    
     dataHanding(data){
      let vm = this;
        data.chargerList.forEach(function(item){
              item.payType = vm.payTypes[`type${item.payType}`]
              item.payStatus = vm.payStatues[`type${item.payStatus}`]
              item.rechargeType = vm.rechargeTypes[`type${item.rechargeType}`]
          })
   },

  


  queryRechargeLists() {//用户
      let option = {}
      option.pageNo = this.pageNo
      option.pageSize = 10
      Object.assign(option,this.serachform)
      option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)
                this.API.ApiconsumeStatisticsplayer(option).then((res)=>{
                this.tableData = res.data.rows||[]
                this.total = res.data.total||0
      
                },(res)=>{})
       
    },
    //新增
    //订单
    //   queryLists(val) {
    //   let option = {},
    //   vm = this;
    //     option.pageNo = this.pageNo
    //      option.pageSize = 10
    //      Object.assign(option,vm.serachformorder)
          
 
    //     this.queryProperty('ApiqueryRechargeOrder',option,function(data){
           
    //           if (!data||!data.chargerList||data.chargerList.length==0) {
    //           vm.orderFormList = []
    //           vm.playerId = ''
    //           vm.total = 0
    //             vm.$message({
    //               message: '数据结果为空',
    //               type: 'warning'
    //             });
    //             return 
    //      }
          
          
    //        vm.dataHanding(data)
    //       vm.orderFormList = data.chargerList
    //       vm.total = data.total
    //     })
      
    // },

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
// .nav-item{
//   label{
//     width: 70px;
//     text-align: left;

//   }
// }
 .el-date-editor--daterange{
        .el-input__inner{
        width: 220px;
      }
    }
</style>

