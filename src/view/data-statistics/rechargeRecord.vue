<template>
  <div class="activityMange-wrapper">
  
    <!-- table -->
    <el-row>
      <el-col :span="24" class="toolbar">
        <span class="payList">充值玩家列表</span>
       <!--  <el-input size="small" placeholder="请输入玩家ID、玩家账号、玩家昵称查询"><el-button slot="append" icon="search"></el-button></el-input> -->
       <el-input  style='width:160px' size="small" v-model="serachform.playerId" placeholder="请输入玩家ID、"></el-input>
        <el-input  style='width:160px' size="small" v-model="serachform.nickname" placeholder="请输入玩家昵称"></el-input>
        <el-input  style='width:160px' size="small" v-model="serachform.account" placeholder="请输入玩家账号"></el-input>
       <el-button type="primary" size="small" icon="search" @click="queryRechargeLists" >搜索</el-button>
      </el-col>
      </el-row>
      <el-col :span="24">
        <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
          <el-table-column prop= 'playerId' label="玩家ID" align="center">
          </el-table-column>
          <el-table-column prop="account" label="玩家账号" min-width='150' align="center">
          </el-table-column>

          <el-table-column prop="nickname" label="玩家昵称" align="center">
          </el-table-column>
      
          <el-table-column prop="vipLevel" label="VIP等级" align="center">
          </el-table-column>
          <el-table-column prop="currentDiamond" label="当前钻石" align="center">
          </el-table-column>
          <el-table-column prop="totalDiamond" label="总充钻石" align="center">
          </el-table-column>
          <el-table-column prop="totalCount" label="总充次数" align="center">
          </el-table-column>
          <el-table-column prop="registerTime" label="注册时间" min-width='150' align="center">
          </el-table-column>
          <el-table-column prop="loginCount" label="登录次数" align="center">
          </el-table-column>
          <el-table-column prop="totalOnline" label="累计在线时长" align="center">
          </el-table-column>

        </el-table>
      </el-col>

   <zspagination :total = totalo :pagesize="10" @click="handleCurrentAChange"></zspagination>

      <el-col :span="24" class="toolbar">
        <span class="payList">订单管理</span>
        <el-input  style='width:160px' size="small" v-model="serachformorder.playerId" placeholder="请输入玩家ID、"></el-input>
        <el-input  style='width:160px' size="small" v-model="serachformorder.playerName" placeholder="请输入玩家昵称"></el-input>
        <el-input  style='width:160px' size="small" v-model="serachformorder.payOrder" placeholder="请输入支付单号"></el-input>
       <!--  <el-button size="small" icon="search"></el-button> -->
       <el-button type="primary" size="small" icon="search" @click="queryLists" >搜索</el-button>
      </el-col>
     
        <el-table :data="orderFormList" border fit highlight-current-row style="width: 100%">
           <el-table-column prop="id" label="ID" width="120">
        </el-table-column>
         <el-table-column prop="playerId" label="玩家ID" width="120">
        </el-table-column>
         <el-table-column prop="playerName" label="玩家昵称" width="120">
        </el-table-column>
         <el-table-column prop="payOrder" label="支付单号" width="180">
        </el-table-column>
         <el-table-column prop="payMoney" label="支付金额" width="180">
        </el-table-column>
         <el-table-column prop="payStatus" label="订单支付状态" width="180">
        </el-table-column>
        <el-table-column prop="payType" label="支付类型" width="180">
        </el-table-column>
        <el-table-column prop="rechargeType" label="充值来源" width="180">
        </el-table-column>
        <el-table-column prop="remark" label="描述" width="180">
        </el-table-column>
         <el-table-column prop="propsId" label="道具ID" width="180">
        </el-table-column>
          <el-table-column prop="updateTime" label="修改时间" width="180">
        </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180">
        </el-table-column>

        </el-table>
     
   
    <zspagination :total = total :pagesize="10" @click="handleCurrentChange"></zspagination>
   <echartst :mapdata='mapdata' :echartext="echartext" @switchClick = 'switchClickAction'></echartst>
  
  </div>
</template>

<script>


import { hsdateUtil } from '@/utils'


export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {

      vm.queryLists()
      vm.queryDaypartingRecharge()
      vm.queryRechargeLists()
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
      dateToday: '', //j今日日期
      serachform:{
        account:'',
        playerId:'',
        nickname:'',
      },
      serachformorder:{
        playerId:'',
        playerName:'',
        payOrder:'',
      },
      total: 1, // 页码
      pageNo: 1, //分页
      totalo: 1, // 页码
      pageNoo: 1, //分页
       mapdata:null,
      echartext:'分时段充值人数/ARPU',
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
  methods: {
     handleCurrentAChange(val) {
            this.pageNoo = val
      this.queryRechargeLists()
      this.pageNoo = 1
    },

    // 分页
    handleCurrentChange(val) {
            this.pageNo = val
            this.queryLists()
            this.pageNo = 1
    },
     switchClickAction(val){
        this.queryDaypartingRecharge(val)
    },
     dataHanding(data){
      let vm = this;
        data.chargerList.forEach(function(item){
              item.payType = vm.payTypes[`type${item.payType}`]
              item.payStatus = vm.payStatues[`type${item.payStatus}`]
              item.rechargeType = vm.rechargeTypes[`type${item.rechargeType}`]
          })
   },

  queryDaypartingRecharge(val) {
      let option = {}
      option.type= val||0
 
      this.API.ApiqueryDaypartingRecharge(option).then((res)=>{
                  if (res.data.retcode==1) {
                    this.mapdata = res.data.data 
                  }
                },(res)=>{})
       
    },


  queryRechargeLists() {//用户
      let option = {}
      option.pageNo = this.pageNoo
      option.pageSize = 10
      Object.assign(option,this.serachform)
                this.API.ApiqueryRechargePlayer(option).then((res)=>{
                this.tableData = res.data.rows||[]
                this.totalo = res.data.total||0
      
                },(res)=>{})
       
    },
    //新增
    //订单
      queryLists(val) {
      let option = {},
      vm = this;
        option.pageNo = this.pageNo
         option.pageSize = 10
         Object.assign(option,vm.serachformorder)
          
 
        this.queryProperty('ApiqueryRechargeOrder',option,function(data){
           
              if (!data||!data.chargerList||data.chargerList.length==0) {
              vm.orderFormList = []
              vm.playerId = ''
              vm.total = 0
                vm.$message({
                  message: '数据结果为空',
                  type: 'warning'
                });
                return 
         }
          
          
           vm.dataHanding(data)
          vm.orderFormList = data.chargerList
          vm.total = data.total
        })
      
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
@import "~style/color.scss";
.toolbar {
  width: 100%;
  padding: 10px;
  margin: 10px 0px;
  text-align: left;
}
.el-input-group {
  width: 30%;
}
.payList {
  margin-right: 40px;
  font-weight: bold;
}
</style>

