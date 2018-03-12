<template>
  <div style="text-align:left">
    <zs-tip :tiptext='tipName'></zs-tip>

    <!-- 导航栏 -->


    <nav>

        <div class="nav-item">
              <label >用户ID</label>
              <el-input  style="width:160px" v-model="serachform.playerId" size="small" placeholder="用户ID"></el-input>

        </div>

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
            <label class="subtitle">消费方式</label>
            <el-select  style="width:160px" v-model="serachform.sourceType" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in sourceTypes"
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
            <el-button size="small"  type="primary"class='btn-search-s'  @click="queryCustomdata">查询</el-button>
              <el-button size="small" type="primary" class='btn-search-s' @click="confirmDownload">导出xlsx表格</el-button>
          </div>

    </nav>
<!-- 上导航栏 -->
<div class="billDetailed">
  <span>消费总额 {{allPayMoney}}</span>
   <span>消费总钻石 {{paydiamond}}</span>
</div>
<!-- table -->
<div style='display:inline-block'>
   <el-table :data="tableData"  highlight-current-row row-class-name="cell-style"  style="width: 1122px">
        <el-table-column  prop="playerId" label="用户ID" width="250">
        </el-table-column>
         <el-table-column prop="channel" label="渠道" width="120">
        </el-table-column>
        <!--  <el-table-column prop="mobile" label="手机号" width="150">
        </el-table-column> -->
          <el-table-column prop="consumptionmode" label="消费方式" width="250">
        </el-table-column>
          <el-table-column prop="treasure" label="消费数量" width="250">
        </el-table-column>
        <el-table-column prop="times" label="创建时间" width="250">
        </el-table-column>


      </el-table>

         <zspagination :total = pagtotal :pagesize="15" @click="handleCurrentChange"></zspagination>
         </div>
     <!-- 分页 -->
  </div>
</template>

<script>


import {hsdateUtil} from '@/utils'
import myMixin from '@/mixin/mixinchannel'
import {ApiqueryCustomdatas, ApiorderqueryCustomTotal} from '@/allApi.js'

export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
         // vm.queryCustomdata()
          //vm.queryApiqueryCustomTotal()
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
          allTime:'',
          tipName:"消费记录查询",
         now:0,
         all:0,
         tableData: null,
         pagtotal:0,
         pageNo:1,
          channels:[],
          serachform:{
            playerId:'',
            startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
              endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),
            channel:'',
            sourceType:''
          },

          sourceTypes:[
          {
            value: '',
            label: '所有'
          },
          {
            value:'12',
            label:' 首次开通VIP',
          },
           {
            value:'13',
            label:'升级VIP',
          },
           {
            value:'23',
            label:'续费VIP',
          },
          // {
          //   value:'0',
          //   label:'商城',
          // }
          ],//登陆状态

            allPayMoney: null,
            paydiamond: null

        }
      },
      mixins: [myMixin],
      methods:{
         beginDownExcl(title){
           let keytitle  = {
            playerId:'用户ID',
            channel:'渠道',
            consumptionmode:'消费方式',
            treasure:'消费数量',
            times:'创建时间',



           } ,vm = this ;
         title = title||'表格'
          this.exportLists('ApiqueryCustomdata').then((res)=>{
              if (vm.validateExportData(res)) { return }
               
                  vm.dataHanding(res.data.rows)
              this.downloadExl([keytitle,...res.data.rows],title)
           })



    },
        dataHanding(rows){
          let sourceTypess = {}
          this.sourceTypes.forEach((itemtype)=>{
            if (itemtype.value) {
              sourceTypess[itemtype.value] = itemtype.label
            }
          })
              rows.forEach((item)=>{
                item.treasure  = (item.beforeTreasure - item.afterTreasure)
                item.times = hsdateUtil(item.times)
                item.consumptionmode =sourceTypess[item.sourceType] 
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
        queryApiqueryCustomTotal(){
          let vm = this,
              option = {};

        this.API.ApiqueryCustomTotal(option).then((res)=>{
          vm.all = res.data.data.totalCustom

        })

        },

         queryCustomdata(){
             let _this = this
             let option = {}

          option.pageNo = this.pageNo
          option.pageSize = 15

        Object.assign(option,this.serachform)
      option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)
//           this.API.ApiqueryCustomdata(option).then((res)=>{
//            let data = res.data
//
//
//                this.pagtotal = data.total||0
//                this.pageNo = 1
//                data.rows.forEach((item)=>{
//              item.treasure  = (item.beforeTreasure - item.afterTreasure)
//              item.times = hsdateUtil(item.times)
//              item.consumptionmode = item.sourceType == 8?'VIP':'商城'
//
//
//            })
//              this.tableData = data.rows
//
//           },(res)=>{})

             axios.all([this.mergeAll(ApiqueryCustomdatas, option), this.mergeAll(ApiorderqueryCustomTotal, option)]).then(axios.spread(function (acct, perms) {
                 _this.pagtotal = acct.data.total || 0
                 _this.pageNo = 1
                  _this.dataHanding(acct.data.rows)
                 // acct.data.rows.forEach((item) => {
                 //     item.treasure  = (item.beforeTreasure - item.afterTreasure)
                 //     item.times = hsdateUtil(item.times)

                 //     item.consumptionmode = item.sourceType == 12?'VIP':'商城'
                 // })
                 _this.tableData = acct.data.rows
               

                 _this.paydiamond = perms.data.data.totalCustom
                 _this.allPayMoney = perms.data.data.totalCustom / perms.data.data.diamondRate

             }))

         },
          mergeAll(item, option) {
              return axios.post(item, option)
          },
          handleCurrentChange(val){
          this.pageNo = val
          this.queryCustomdata()

         },



      },



}
</script>

<style lang="scss" scoped>
@import "~style/common.scss";



    .nav-item{
    label{
      width: auto;
    }
  }
  .billDetailed{
    width: 1122px;
    background: #ccc;
    height: 40px;
    line-height:40px;
    border-radius:5px;
     margin-bottom: 15px;
     text-align: left;
    span{
      display: inline-block;
      margin-left: 20px;
      font-size: 14px;
    }
  }



</style>

