<template>
  <div>
    <zs-tip :tiptext='tipName'></zs-tip>
    <!-- table -->
    <nav>

        <div class="nav-item">
         <label >下载页所在渠道</label>
      <el-select size="small"  style="width:160px" v-model="serachform.downloadChannel" placeholder="请选择"  >
              <el-option
                v-for="item in channels"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
       </div>
      
        <div class="nav-item">
         <label >社交渠道</label>
      <el-select size="small"  style="width:160px" v-model="serachform.socialChannel" placeholder="请选择"  >
              <el-option
                v-for="item in socialChannels"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
       </div>
     
        <div class="nav-item">
         <label >是否下载</label>
      <el-select size="small"  style="width:160px" v-model="serachform.isDownload" placeholder="请选择"  >
              <el-option
                v-for="item in isDownloads"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
       </div>
    
        <div class="nav-item">
         <label >分享玩家Id</label>
    <el-input  style='width:160px' size="small" v-model="serachform.sharePlayer" placeholder="请输入玩家ID"></el-input>
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
         <el-button type="primary" size="small" class='btn-search-s'  @click="queryRechargeLists" >查询</el-button>
           <el-button size="small" type="primary" class='btn-search-s' @click="confirmDownload">导出xlsx表格</el-button>
         </div>
     
      </nav>
     <el-row>
      <el-col :span="24">
        <el-table :data="tableData"  align='left' highlight-current-row row-class-name="cell-style" style="width: 100%">
            <el-table-column prop= 'id' label="id" >
          </el-table-column>
          <el-table-column prop="sharePlayer" label="分享玩家id" >
          </el-table-column>
         <el-table-column prop= 'downloadChannel' label="下载页所在渠道" >
          </el-table-column>
          <el-table-column prop="socialChannel" label="社交渠道" >
          </el-table-column>

          <el-table-column prop="sweepDevice" label="扫码设备" >
          </el-table-column>
      
          <el-table-column prop="sweepIp" label="扫码ip" >
          </el-table-column>
          <el-table-column prop="addTime" label="日期" >
          </el-table-column>
          <el-table-column prop="isDownload" label="是否下载" >
          </el-table-column>

        </el-table>
      </el-col>
<el-col :span="24">
   <zspagination :total = total :pagesize="10" @click="handleCurrentChange"></zspagination>
</el-col>
        </el-row>
     
   
  
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
     tipName:'分享记录',
      serachform:{
         startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
         endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),//
        downloadChannel:'',
        sharePlayer:'',
        socialChannel:'',
        isDownload:'',
      },
      socialChannels:[
      {
        value:"",
        label:"所有",
      },
      {
        value:"微信朋友圈",
        label:"微信朋友圈",
      },
       {
        value:"QQ好友",
        label:"QQ好友",
      },
       {
        value:"微信好友",
        label:"微信好友",
      },
       {
        value:"QQ空间",
        label:"QQ空间",
      },
       {
        value:"微博 ",
        label:"微博 ",
      },],
      isDownloads:[
       {
        value:'',
        label:'所有'
      },
      {
        value:'1',
        label:'是'
      },
      {
        value:'0',
        label:'否'
      },],
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
         
            id:'id',
            addTime:'日期',
            sharePlayer:'分享玩家id',
            downloadChannel:'下载页所在渠道',
            socialChannel:'社交渠道',
            sweepDevice:'扫码设备',
            sweepIp:'扫码ip',
            isDownload:'是否下载',
    
           } ,vm = this ;
         title = title||'表格'    
          this.exportLists('ApishareSweepall').then((res)=>{
              if (vm.validateExportData(res)) { return }
                this.dataHanding(res.data)
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

     dataHanding(data){
      let vm = this;
        data.rows.forEach(function(item){
              item.isDownload =item.isDownload==1?'已下载':'未下载'
          })
   },

  


  queryRechargeLists() {//用户
      let option = {}
      option.pageNo = this.pageNo
      option.pageSize = 10
      Object.assign(option,this.serachform)
            option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)
                this.API.ApishareSweepall(option).then((res)=>{
                 this.dataHanding(res.data)
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

