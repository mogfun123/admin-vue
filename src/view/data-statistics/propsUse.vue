<template>
  <div>
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
         <label>道具ID</label>
        <el-input style="width:160px" size='small' v-model="serachform.propsid" placeholder="请输入查询道具ID" ></el-input> 
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
        <el-button type="primary" size="small"  class='btn-search-s'  @click="queryInfoAction">查询</el-button>
        <el-button size="small" type="primary"  class='btn-search-s'  @click="confirmDownload">导出xlsx表格</el-button>
        </div>
   
</nav>

         <el-table :data="tableData"  align='left' highlight-current-row row-class-name="cell-style"  style="width: 100%">
        <el-table-column prop="selectDay" label="日期" min-width="120">
        </el-table-column>
         <el-table-column prop="propsid" label="道具ID" >
        </el-table-column>
         <el-table-column prop="propsname" label="道具名称" >
        </el-table-column>
         <el-table-column prop="channel" label="渠道" min-width="120">
        </el-table-column>
         <el-table-column prop="useCount" label="使用次数" >
        </el-table-column>
       
       
         
      </el-table>
    
    <zspagination :pagesize="15" :total="total" @click="handleCurrentChange"></zspagination>
       
    
  
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
      tipName:'道具统计',
      allstartTime:'',//占位
        channels:[],
      serachform:{
      propsid:'',
      channel:'',
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
        endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),
     },
      total: 0, // 页码
      pageNo: 1, //分页
      tableData: [],
      pickerOptions0: {
          disabledDate:function() {
            let isfirst = false;
            let cur = '';
            return function(time){
              cur = time.getDate()
             
           
              if (!isfirst) {
                  if (cur == 1) {
                   
                    isfirst = !isfirst 
                    return false
                  }else{
                    
                    return true
                  }

              }else{
                if (cur == 1) {
                    isfirst = !isfirst 
                     
                    return true

                  }else{
                     
                    return false
                  }


              }





            
              
            }
          }()
        },
     
    }
  },
     mixins: [myMixin],
  methods: {
     beginDownExcl(title){
           let keytitle  = {
            selectDay:'日期',
            propsid:'道具ID',
            propsname:'道具名称',
            channel:'渠道',
            useCount:'使用次数',
           } ,vm = this;
         title = title||'表格'    
          this.exportLists('ApiqueryqueryPropsStatistics').then((res)=>{
               if (vm.validateExportData(res)) { return }
              
              vm.downloadExl([keytitle,...res.data.rows],title)
             
           })
          
      

    },
    changTime(times){
      let arr = times.split('/')
      this.serachform.startTime = arr[0]
      this.serachform.endTime = arr[1]
    },

  
  queryInfoAction(){
       this.pageNo = 1    
      this.queryLists()
   },
   handleCurrentChange(val){
    
       this.pageNo = val
       this.queryLists()
        this.pageNo = 1
   },
   //  dataHanding(data){
   //      data.rows.forEach(function(item){  
   //            item.times = hsdateUtil(item.times)
   //        })
   // },
  queryLists(val) {
      let option = {},
      vm = this;
        option.pageNo = this.pageNo
        option.pageSize = 15
       
        Object.assign(option,vm.serachform)
      option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime) 
        this.queryProperty('ApiqueryqueryPropsStatistics',option,function(data){
         
      
         if (!data||data.rows.length==0) {
          vm.tableData = []
          vm.total = 0
            vm.$message({
              message: '数据结果为空',
              type: 'warning'
            });
            return 
         }
          //vm.dataHanding(data.logList)

         vm.tableData = data.rows||[]
        vm.total = data.total||0
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
@import "~style/common.scss";
.adclass{
    .el-date-range-picker__content.is-right{
      .el-date-table{
        display: none;
      }
      .el-date-range-picker__header{
        div{
          display: none;
        }
      }
    }
    .el-picker-panel__content.el-date-range-picker__content{
      width: 100%;
    }
}

// .el-date-range-picker.has-time.adclass{
//     min-width: 453px;
// }
// .el-date-range-picker .el-picker-panel__body {
//     min-width: 400px;
// }


</style>

