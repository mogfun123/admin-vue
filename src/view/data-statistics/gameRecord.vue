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
              <!--  <el-button type="primary" size="small" @click="dialogFormVisible=true">修改事件名称</el-button>
                <el-button size="small" type="primary" @click="confirmDownload">导出xlsx表格</el-button> -->
                
              </div>

            
</nav>
         <el-table :data="tableData"  highlight-current-row style="width: 100%">
          <el-table-column prop= 'selectDay' label="日期" >
          </el-table-column>
          <el-table-column prop="channel" label="渠道" >
          </el-table-column>

          <el-table-column prop="consumeUser" label="参与人数" >
          </el-table-column>
      
         <!--  <el-table-column prop="vipLevel" label="新增消费用户数" >
          </el-table-column> -->
          <el-table-column prop="consumeDimanond" label="对局次数" >
          </el-table-column>
          <el-table-column prop="consumeCount " label="净胜筹码总产出量" >
          </el-table-column>
          <el-table-column prop="userAvgConsume" label="单句平均输赢" >
          </el-table-column>
      </el-table>
    
    <zspagination :total="total" :pagesize="18" @click="handleCurrentChange"></zspagination>

  </div>
</template>

<script>


import { hsdateUtil } from '@/utils'
import myMixin from '@/mixin/mixinchannel'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
     
     // vm.queryLists()
    
     
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
      tipName:'牌局统计',
      allstartTime:'',
      channels:'',
         serachform:{
              account:'',
              playerId:'',
              nickname:'',
              startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),
               endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),//
      },
     
      total: 0, // 页码
      pageNo: 1, //分页
       tableData:[],
     
    }
  },
    mixins: [myMixin],
  methods: {
      changTime(times){
      let arr = times.split('/')
      this.serachform.startTime = this.trunDateStr(arr[0])
      this.serachform.endTime = this.trunDateStr(arr[1])
     
    },
     trunDateStr(timestr){
        return (timestr||'')&&(timestr.split('-').join(''))
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
   dataHanding(data){

        data.rows.forEach(function(item){
              // item.startTime = hsdateUtil(item.startTime)
              // item.endTime = hsdateUtil(item.endTime)
              item.playerStatus == 0 ?'入局':'未入局'
          })
   },

    queryLists(val) {
      let option = {},
      vm = this;
        option.pageNo = this.pageNo
         option.pageSize = 18
         Object.assign(option,vm.serachform)
       option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)         
 
        this.queryProperty('ApiqueryPlayerHuntCountRecord',option,function(data){       
              if (!data||!data.rows||data.rows.length==0) {
              vm.tableData = []
              vm.serachform.playerId = ''
               vm.serachform.nickname = ''
                vm.serachform.account = ''
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
@import "~style/common.scss";

</style>

