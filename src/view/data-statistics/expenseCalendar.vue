<template>
  <div class="activityMange-wrapper">
    <query-Bar @click="serachAction"></query-bar>
  
    <!-- table -->
    <el-table :data="tableData"  highlight-current-row row-class-name="cell-style" style="width: 100%">
  
  
      <el-table-column label="时间" align="center" prop="date">
  
      </el-table-column>
  
      <el-table-column prop="propName" label="道具名称">
      </el-table-column>
  
      <el-table-column prop="incomeOutlay" label="收入/支出">
      </el-table-column>
      <el-table-column prop="source" label="来源" >
      </el-table-column>
      <el-table-column prop="quantity" label="数量" >
      </el-table-column>
  
      <el-table-column prop="isLimitTime" label="是否限时" >
      </el-table-column>

    </el-table>
   
   <zspagination :total = total :pagesize="10" @click="handleCurrentChange"></zspagination>
  </div>
</template>

<script>


import { dateUtil } from '@/utils'


export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {

      vm.queryLists()
     
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
      total: 1, // 页码
      page: 1, //分页

      from: {
        starTime: '', // 开始日期
        endTime: '', // 结束日期
      },
      tableData: null,

    }
  },
  methods: {
     serachAction(option){
        console.log(option)
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val
      this.queryLists()
      this.page = 1
    },
      queryLists() {
      let option = {}
      option.page = this.page
 
                 this.API.ApiqueryCustomData(option).then((res)=>{
                    this.total = res.data.total

                 // res.data.rows.forEach((item)=>{
                    
                 //       item.xaddtime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd hh:mm:ss'):''
      
      
                 // })
      
                   this.tableData = res.data.rows
      
      
      
                },(res)=>{})
       
    },
 
    //日期提交
    onSubmit() {
      console.log(this.from)
    },
    changeStarTime(val) {
      // console.log(val)
      this.from.starTime = val
    },
    changeEndTime(val) {
      this.from.endTime = val
    },
    aaa() {
      console.log(arguments)
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~style/color.scss";
.toolbar {
  width: 100%;
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0px;
  text-align: center;
}

.slectWidth {
  width: 150px;
}
.el-input-group {
  width: 30%;
  margin-top: 4px
}
</style>

