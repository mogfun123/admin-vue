<template>
  <div class="clickEvent" style="text-align:left">
  <zs-tip :tiptext='tipName'></zs-tip>
  <nav>

        <div class="nav-item">
            <label>用户id</label>
            <el-input v-model="serachform.playerId" size="small" placeholder="用户id"></el-input>
        </div>
        
   
       
             <div class="nav-item" style='margin-left:20px;'>
              <el-button type="primary" size="small" class='btn-search-s' @click="queryInfoAction">查询</el-button>
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
        <el-table-column prop="propsId" label="用户道具id" min-width="200">
        </el-table-column>
         <el-table-column prop="baseId" label="道具编号" min-width="200">
        </el-table-column>
      
         <el-table-column prop="count" label="道具数量" min-width="200">
        </el-table-column>
         <el-table-column prop="name" label="道具名称" min-width="200">
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
      tipName:'用户背包',
      serachform:{
        playerId:'',
     },
      total: 0, // 页码
      pageNo: 1, //分页
      tableData:[],
     
     
    }
  },
 

  methods: {
  
     
   
  
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
         if (!option.playerId) {
              vm.$message({
                  message: '查询用户id不能为空',
                  type: 'warning'
                });
             
              return 
         }
        this.queryProperty('ApiqueryGameUserBackInfo',option,function(data){

              if (!data||!data.rows||data.rows.length==0) {
              vm.tableData = []
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
// @import "~style/color.scss";
//@import "~style/common.scss";
.nav-item .el-select .el-input--small{
  width: 160px;
}


</style>

