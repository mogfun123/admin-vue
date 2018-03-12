<template>
  <div class="rechargeMange-wrapper">    
   <zs-tip :tiptext='tipName'></zs-tip> 
    <nav> 
    
        <div class="nav-item">
              <label>用户ID</label>
              <el-input v-model="serachform.uid" size="small" placeholder="用户id"></el-input>
             
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
              <el-input v-model="serachform.nickname" size="small" placeholder="昵称"></el-input>
        </div>  
         
        <div class="nav-item">
            <label class="subtitle">订单状态</label>
            <el-select v-model="serachform.status" placeholder="请选择"  size="small" >
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
            <el-button size="small"  type="primary" class='btn-search-s' @click="queryRechargeOrder">查询</el-button>
              <el-button size="small" type="primary" class='btn-search-s' @click="confirmDownload">导出xlsx表格</el-button> 
           </div>
         
      
        
          

     
     
     
      

      
    </nav>
<!-- 上导航栏 -->
<div class="billDetailed">

<!--  <span>消耗积分总额{{allRechargeAmount*10}}</span>
  <span>兑换总额 {{allRechargeAmount}}</span> -->
  

<!-- <div class="right">
   <span>当前钻石数目{{nowDiamondNumber}}</span>
  <span>当前充值总额 {{nowRechargeAmount}}</span>
</div>
  -->
 

</div>
<!-- table -->
  <el-table :data="orderFormList"  highlight-current-row row-class-name="cell-style" style="width: 100%">
           <el-table-column prop="id" label="ID" width="80">
        </el-table-column>
         <el-table-column prop="uid" label="玩家ID" >
        </el-table-column>
         <el-table-column prop="channel" label="渠道" >
        </el-table-column>
        <el-table-column prop="nickname" label="昵称"  >
        </el-table-column>
         <el-table-column prop="pointsNumber" label="消耗积分" >
        </el-table-column>
         <el-table-column prop="tongbiNumber" label="获得通币" >
        </el-table-column>
         <el-table-column prop="status" label="订单状态" >
        </el-table-column>
        
        
          <el-table-column prop="addtime" label="创建时间" min-width="160">
        </el-table-column>
          

        </el-table>
<!-- table -->
   <zspagination :total = total :pagesize="15" @click="handleCurrentChange"></zspagination>

  </div>
</template>

<script>
import {hsdateUtil} from '@/utils'
import myMixin from '@/mixin/mixinchannel'


export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
         // vm.queryRechargeOrder()
          //vm.ApiqueryRechargeTotal()
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
          tipName:'兑换记录',
          allDiamondNumber:0,
          allRechargeAmount:0,
          orderFormList:[],
          total:0,
          pageNo:1,
          allTime:'',
           channels: [],
         tableData:null,
          serachform:{
              nickname:"",//
              uid:'',//用户名
              channel:'',//渠道
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
         endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),
              status:'',//订单状态
             
             
          },
           
          orderStates:[
          {
            value: '',
            label: '所有'
          },
          {
            value:'0',
            label:'未兑换'
          },
          {
            value:'1',
            label:'扣除道具失败'
          },
          {
            value:'2',
            label:'失败'
          },
          {
            value:'3',
            label:'成功'
          },
         ],//用户类型  
          payStatues:{
            type0:'未支付',
            type1:'已支付',
            type2:'支付失败',
            type3:'已支付未到账',
          },
         
        }
      },
      mixins: [myMixin],
      methods:{
         beginDownExcl(title){
           let keytitle  = {
            id:'id',
            uid:'玩家ID',
            channel:'渠道',
            nickname:'玩家昵称',
            pointsNumber:'消耗积分',
            tongbiNumber:'获得通币',
            status:'订单状态',

           } ,vm = this ; 
         title = title||'表格'    
         vm.serachform.pageNo = 1
        vm.serachform.pageSize =10000 
          this.exportLists('ApiqueryPointsExchangeData').then((res)=>{
              if (vm.validateExportData(res.data)) { return }
                  vm.dataHanding(res.data.data)
              this.downloadExl([keytitle,...res.data.data.rows],title)
           })
          
      

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
          dataHanding(data){
      let vm = this;
        data.rows.forEach(function(item){hsdateUtil
              // item.addtime =hsdateUtil(item.addtime)
              item.status = vm.orderStates[item.status + 1]['label']
          
          })
   },
   ApiqueryRechargeTotal(){//查询总额
    let vm = this;
      this.queryProperty('ApiqueryRechargeTotal',{},(data)=>{
        vm.allRechargeAmount = data.data.totalPayMoney||0
        
      })

   },
         queryRechargeOrder(){
          let option = {},vm =this;
        
         Object.assign(option,vm.serachform)
           option.pageNo = this.pageNo
          option.pageSize = 15
              option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)
          this.queryProperty('ApiqueryPointsExchangeData',option,function(res){
            let data = res.data
           
              if (!data||!data.rows||data.rows.length==0) {
              vm.orderFormList = []
              vm.total = 0
                vm.$message({
                  message: '数据结果为空',
                  type: 'warning'
                });
                return 
         }
          
          
            vm.dataHanding(data)
          vm.orderFormList = data.rows
          vm.total = data.records
        })

        
         
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
         // changStartTime(val){
         //    this.startTime = val

         // },
         // changEndTime(val){
         //    this.endTime = val

         // },
        
         
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

