<template>
  <div class="rechargeMange-wrapper">
   <zs-tip :tiptext='tipName'></zs-tip>
    <nav>

        <div class="nav-item">
              <label>用户ID</label>
              <el-input v-model="serachform.playerId" size="small" placeholder="用户id"></el-input>

        </div>

        <div class="nav-item">
            <label class="subtitle">渠道</label>
            <el-select  v-model="serachform.channel" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in channels"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div>

          <div class="nav-item">
              <label >昵称</label>
              <el-input v-model="serachform.playerName" size="small" placeholder="昵称"></el-input>
        </div>

        <div class="nav-item">
            <label class="subtitle">订单状态</label>
            <el-select v-model="serachform.payStatus" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in orderStates"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div>


       <br>
        <div class="nav-item">
            <label class="subtitle">充值类型</label>
            <el-select v-model="serachform.payType" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in recharges"
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
      <br>
           <div class="nav-item">
            <el-button size="small"  type="primary" class='btn-search-s' @click="queryRechargeOrder">查询</el-button>
             <el-button size="small" type="primary" class='btn-search-s' @click="confirmDownload">导出xlsx表格</el-button>
           </div>










    </nav>
<!-- 上导航栏 -->
<div class="billDetailed">

 <span>钻石数目{{diamondRate}}</span>
  <span>充值总额 {{allPayMoney}}</span>



</div>
<!-- table -->
  <el-table :data="orderFormList"  highlight-current-row row-class-name="cell-style" style="width: 100%">
         <el-table-column prop="playerId" label="玩家ID" >
        </el-table-column>
         <el-table-column prop="playerName" label="玩家昵称"  min-width="120">
        </el-table-column>
         <el-table-column prop="channel" label="渠道" >
        </el-table-column>
         <el-table-column prop="payOrder" label="支付单号" min-width="200">
           <template scope="scope">
               <el-tooltip class="item" effect="light" 
               placement="top"
               >
                  <el-button slot="content" @click='handleCopy(scope.row.payOrder)'>复制支付单号</el-button>
                  <span>{{scope.row.payOrder.slice(0,10) + '***'}}</span>
                </el-tooltip>
            </template>
        </el-table-column>
         <el-table-column prop="payMoney" label="支付金额" >
        </el-table-column>
         <el-table-column prop="xpayStatus" label="订单状态"  min-width="170">
        </el-table-column>

        <el-table-column prop="xpayType" label="支付类型" >
        </el-table-column>
        <el-table-column prop="xrechargeType" label="充值来源" min-width="150">
        </el-table-column>
        <el-table-column prop="remark" label="描述"  min-width="150">
        </el-table-column>
         <el-table-column prop="propsId" label="道具ID" >
        </el-table-column>

          <el-table-column prop="createTime" label="创建时间" min-width="160">
        </el-table-column>
          <el-table-column prop="updateTime" label="修改时间" min-width="160">
        </el-table-column>
         <el-table-column  label="补充值" min-width="100">
           <template scope="scope">
              <el-button size="small"  :disabled="scope.row.payStatus!==3" type="primary"  @click="editConfirmOperation(scope.$index,scope.row)">补充值</el-button>
            </template>
        </el-table-column>


        </el-table>
<!-- table -->
 <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @current-change="handleCurrentChange"
            layout="total,prev, pager, next, jumper"
            :total="total">
          </el-pagination>
      </div>
     <!-- 分页 -->
  </div>
</template>

<script>
import {dateUtil,hsdateUtil} from '@/utils'
import myMixin from '@/mixin/mixinchannel'
import {ApiqueryRechargeTotals, ApiqueryRechargePlayers} from '@/allApi.js'
import copy from 'copy-to-clipboard';

export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
         // vm.queryRechargeOrder()
          //vm.ApiqueryRechargeTotal()
          console.log(vm.arr)
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
          tipName:'充值订单管理',
          nowDiamondNumber:0,
          nowRechargeAmount:0,
          allDiamondNumber:0,
          allRechargeAmount: {},
          orderFormList:[],
          total:0,
          pageNo:1,
          allTime:'',
           channels: [],
         tableData:null,
            value:"",
          serachform:{
              playerName:"",//
              playerId:'',//用户名
              channel:'',//渠道
              startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
                endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),
              payStatus:'',//订单状态
              payType:'',//充值类型

          },

          orderStates:[
          {
            value: '',
            label: '所有'
          },
          {
            value:'0',
            label:'未支付'
          },
          {
            value:'1',
            label:'已支付已到账'
          },
          {
            value:'2',
            label:'支付失败'
          },
          {
            value:'3',
            label:'已支付未到账'
          },
         ],//用户类型
          recharges:[
          {
            value:'',
            label:'所有',
          },{
            value:'1',
            label:'支付宝',
          },{
            value:'2',
            label:'微信',
          },
          {
            value:'3',
            label:'苹果支付',
          },{
            value:'4',
            label:'阿里体育',
          },
          {
            value:'5',
            label:'应用宝',
          },
          {
            value:'6',
            label:'360',
          },
          {
            value:'7',
            label:'百度',
          },
          {
            value:'8',
            label:'阿里分发',
          },
          {
            value:'9',
            label:'小米',
          },
          {
            value:'10',
            label:'华为',
          },
           {
            value:'11',
            label:'vivo',
          },
           {
            value:'12',
            label:'oppo',
          },
           {
            value:'13',
            label:'联想',
          },
           {
            value:'14',
            label:'金立',
          },
           {
            value:'15',
            label:'酷派',
          },
           {
            value:'16',
            label:'乐视',
          },
          {
            value:'17',
            label:'联通沃商店',
          },
           {
            value:'18',
            label:'移动mm',
          },
          {
            value:'19',
            label:'阿里体育网页',
          },

         ],//登陆状态
          
          rechargeTypes:{
            type0:'CMS_SERVER',
            type1:'PAY_SERVER',
            type2:"GM_SERVER"
          },
          payStatues:{
            type0:'未支付',
            type1:'已支付已到账',
            type2:'支付失败',
            type3:'已支付未到账',
          },
            allPayMoney: null,
            diamondRate: null

        }
      },
      mixins: [myMixin],
      methods:{
          handleCopy(text){
              copy(text);
          },
         beginDownExcl(title){
           let keytitle  = {
            playerId:'玩家ID',
            channel:'渠道',
            playerName:'玩家昵称',
            payOrder:'支付单号',
            payMoney:'支付金额',
            xpayStatus:'订单状态',
            xpayType:'支付类型',
            xrechargeType:'充值来源',
            remark:'描述',
            propsId:'道具ID',
            createTime:'创建时间',
            updateTime:'修改时间'

           } ,vm = this ;
         title = title||'表格'
          this.exportLists('ApiqueryRechargePlayer').then((res)=>{
              if (vm.validateExportData(res)) { return }
                  vm.dataHanding(res.data)
              this.downloadExl([keytitle,...res.data.rows],title)
           })



    },

          dataHanding(data){
      let vm = this;
        data.rows.forEach(function(item){
              item.xpayType = vm.recharges[item.payType]?vm.recharges[item.payType]['label']:item.payType
              item.xpayStatus = vm.payStatues[`type${item.payStatus}`]
              item.xrechargeType = vm.rechargeTypes[`type${item.rechargeType}`]
          })
   },
   ApiqueryRechargeTotal(){//查询总额
    let vm = this;
      this.queryProperty('ApiqueryRechargeTotal',{},(data)=>{
        vm.allRechargeAmount = data.data.totalPayMoney||0

      })

   },
   editConfirmOperation(index,row) {
        this.$confirm('确定补充值, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.editOperation(index,row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
   editOperation(index,row){
     let option = {};
      option.id = row.id

      this.API.ApiqueryRecruitRecharge(option).then((res)=>{
        this.$message(`${res.data.retmsg}`)
        this.queryRechargeOrder()
      })
   },
         queryRechargeOrder(){
          let option = {},vm =this;
          option.pageNo = this.pageNo
         Object.assign(option,vm.serachform)
      option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)

             axios.all([this.mergeAll(ApiqueryRechargePlayers, option), this.mergeAll(ApiqueryRechargeTotals, option)]).then(axios.spread(function (acct, perms) {
//                 console.log(acct)
                 if (acct.data.rows.length == 0) {
                     vm.orderFormList = []
                     vm.playerId = ''
                     vm.total = 0
                     vm.$message({
                         message: '数据结果为空',
                         type: 'warning'
                     })
                   
                 } else {
                     vm.dataHanding(acct.data)
                     vm.orderFormList = acct.data.rows
                     vm.total = acct.data.total
                 }

                 if (perms.data.data) {
                 
                     vm.allPayMoney = perms.data.data.totalPayMoney
                     vm.diamondRate = perms.data.data.totalPayMoney *  perms.data.data.diamondRate
                 } else {
                 
                   vm.allPayMoney = vm.diamondRate = 0
                     
                 }
             }))


         },

          mergeAll(item, option) {
              return axios.post(item, option)
          },

          queryProperty(api,option,fn) {
          this.API[api](option).then((res)=>{
               fn(res.data)
                },(res)=>{})
          },
         handleCurrentChange(val){
          this.pageNo = val
          this.queryRechargeOrder()
           this.pageNo = 1

         },


      },



}
</script>

<style lang="scss">
@import "~style/color.scss";
@import "~style/common.scss";
.rechargeMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    .block{//分页
    margin-top: 80px;
    text-align:center;
  }
  .demonstration{
    display: inline-block;
    width: 66px;
  }
  .nav-item{
    label{
      width: 60px;
    }
  }
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


}
</style>

