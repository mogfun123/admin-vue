<template>
  <el-row>
 <el-col :span="24" style="text-align:left;">
      <el-form :inline="true" :model="from">
      
        <!--label="查询日期:" -->
        <el-form-item label="查询日期">
          <el-date-picker class="slectWidth" type="datetime" placeholder="选择起始日期" v-model="from.starTime" @change="changeStarTime" size="small">
          </el-date-picker>
          <span>&nbsp;至&nbsp;</span>
          <el-date-picker class="slectWidth" type="datetime" placeholder="选择结束日期" v-model="from.endTime" @change="changeEndTime" size="small">
          </el-date-picker>
          <el-button icon="check" type="primary" @click="handleClick" size="small">提交</el-button>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" size="small">全部</el-button>
            <el-button type="primary" size="small">今日</el-button>
            <el-button type="primary" size="small">7日</el-button>
            <el-button type="primary" size="small">15日</el-button>
            <el-button type="primary" size="small">30日</el-button>
  
          </el-button-group>
  
        </el-form-item>
  
      </el-form>
  
    </el-col>
    </el-row>
</template>

<script>
export default {

  data () {
    return {
      from: {
        starTime: '', // 开始日期
        endTime: '', // 结束日期
      },
    }
  },
  methods:{
    handleClick(evt){
      this.$emit('click', this.from);
    },
     //日期提交
    onSubmit() {
      console.log(this.from)
    },
    changeStarTime(val) {
     
      this.from.starTime = val
    },
    changeEndTime(val) {
      this.from.endTime = val
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
