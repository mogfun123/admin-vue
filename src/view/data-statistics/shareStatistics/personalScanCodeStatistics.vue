<template>
  <div>
    <zs-tip :tiptext='tipName'></zs-tip>
    <!-- table -->
    <nav>
  
        <div class="nav-item">
         <label >玩家ID</label>
    <el-input  style='width:160px' size="small" v-model="serachform.sharePlayer" placeholder="请输入玩家ID"></el-input>
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
        </el-col>//////

      </el-row> -->
      <el-col :span="24">
        <el-table :data="tableData"  align='left' highlight-current-row row-class-name="cell-style" style="width: 100%">
         <el-table-column prop= 'playerId' label="分享用户ID" >
          </el-table-column>
          <el-table-column prop="shareTotal" label="分享总次数" >
          </el-table-column>
          <el-table-column prop="shareChannel1" label="微信好友分享次数" >
          </el-table-column>
          <el-table-column prop="shareChannel2" label="朋友圈分享次数" >
          </el-table-column>
          <el-table-column prop="shareChannel3" label="QQ好友分享次数" >
          </el-table-column>
          <el-table-column prop="shareChannel4" label="QQ空间分享次数" >
          </el-table-column>
            <el-table-column prop="shareChannel5" label="微博分享次数" >
          </el-table-column>
          <el-table-column prop="browseTotal" label="好友进入分享页次数" >
          </el-table-column>
          <el-table-column prop="downloadTotal" label="好友下载游戏次数" >
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
     tipName:'个人分享统计',
      serachform:{
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
         endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),//
        sharePlayer:'',
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
              playerId:'分享用户ID',
            shareTotal:'分享总次数',
            shareChannel1:'微信好友分享次数',
            shareChannel2:'朋友圈分享次数',
             shareChannel3:'QQ好友分享次数',
            shareChannel4:'QQ空间分享次数',
             shareChannel5:'微博分享次数',
            browseTotal:'好友进入分享页次数',
              downloadTotal:'好友下载游戏次数',
    
           } ,vm = this ;
         title = title||'表格'    
          this.exportLists('ApishareSweepplayer').then((res)=>{
              if (vm.validateExportData(res)) { return }
              this.downloadExl([keytitle,...res.data.rows],title)
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


  queryRechargeLists() {//用户
      let option = {}
      option.pageNo = this.pageNo
      option.pageSize = 10
      Object.assign(option,this.serachform)
      option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)
                this.API.ApishareSweepplayer(option).then((res)=>{
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

