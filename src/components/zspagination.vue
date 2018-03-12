<!-- 菜单为：用户管理 - 管理员、群组设定、主播管理。房间收益 - 收益查询、贡献排行。结算中心 - 结算详情、账户信息。直播 - 设置管理、添加/管理禁言
 -->
<template>
   <el-row>
     <el-col style="text-align:center;padding:50px 2px;">
       <el-pagination
            layout="total, prev, pager, next, jumper"
             @current-change="handleClick"
            :total = total
            :page-size = pagesize>
          </el-pagination>
     </el-col>
   </el-row>
        

</template>

<script>
export default {
    props: {
      total: {
        type: Number,
        default: 1
      },
      pagesize:{
        type:Number,
        default:10
      }
    },
  data () {
    return {
      
   
      }
    },



  methods:{
      handleClick(val) {
        this.$emit('click', val);
       }
    },
  created () {
     
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
@import "~style/color.scss";


</style>
