
 
    <template>
  <div>

 <el-row :gutter="1">
    <el-col :span="6">
        <div class="nav-item">
        <label>玩家ID:</label>
         <el-input  style='width:160px' size="small" v-model="serachform.playerId" placeholder="请输入玩家ID"></el-input>
         </div>
         </el-col>
          <el-col :span="6">
        <div class="nav-item">
         <label>玩家昵称:</label>
        <el-input  style='width:160px' size="small" v-model="serachform.nickname" placeholder="请输入玩家昵称"></el-input>
        </div>
        </el-col>
          <el-col :span="6">
        <div class="nav-item">
         <label>玩家账号:</label>
        <el-input  style='width:160px' size="small" v-model="serachform.account" placeholder="请输入玩家账号"></el-input>
        </div>
        </el-col>
          <el-col :span="2">
        <div class="nav-item">
       <el-button type="primary" size="small" :disabled="!(serachform.account||serachform.playerId||serachform.nickname)" icon="search" @click="queryLists" >搜索</el-button>
       </div>
       </el-col>
   
  </el-row>

         <el-table :data="tableData"  style="width: 100% ;text-align:left">
          <el-table-column type="expand">
              <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="渠道:" aligin='left'>
                    <span>{{ props.row.channel }}</span>
                  </el-form-item>
                  <el-form-item label="设备号:">
                    <span>{{ props.row.devid }}</span>
                  </el-form-item>
                  <el-form-item label="最后登录IP:">
                    <span>{{ props.row.lastLoginIp }}</span>
                  </el-form-item>
                  <el-form-item label="昵称:">
                    <span>{{ props.row.nickname }}</span>
                  </el-form-item>
                  <el-form-item label="玩家ID:">
                    <span>{{ props.row.playerId }}</span>
                  </el-form-item>
                  <el-form-item label="玩家账号:">
                    <span>{{ props.row.account }}</span>
                  </el-form-item>
                  <el-form-item label="性别:">
                    <span>{{ props.row.sex }}</span>
                  </el-form-item>
                  <el-form-item label="充值状态:">
                    <span>{{ props.row.charge }}</span>
                  </el-form-item>
                  <el-form-item label="新手指导完成数据:">
                    <span>{{ props.row.guide }}</span>
                  </el-form-item>
                  <el-form-item label="筹码:">
                    <span>{{ props.row.chip }}</span>
                  </el-form-item>
                  <el-form-item label="钻石:">
                    <span>{{ props.row.diamond }}</span>
                  </el-form-item>
                  <el-form-item label="救济金次数:">
                    <span>{{ props.row.reliefFundCount }}</span>
                  </el-form-item>
                  <el-form-item label="上一次救济金时间:">
                    <span>{{ props.row.lastReliefFundTime }}</span>
                  </el-form-item>
                  <el-form-item label="签到天数:">
                    <span>{{ props.row.signDays }}</span>
                  </el-form-item>
                  <el-form-item label="上次签到时间:">
                    <span>{{ props.row.lastSignTime }}</span>
                  </el-form-item>
                  <el-form-item label="日成长值:">
                    <span>{{ props.row.dailyGrowUp }}</span>
                  </el-form-item>
                  <el-form-item label="周成长值:">
                    <span>{{ props.row.weekGrowUp }}</span>
                  </el-form-item>
                  <el-form-item label="上一次成长值修改时间:">
                    <span>{{ props.row.lastGrowUpdateTime }}</span>
                  </el-form-item>
                  <el-form-item label="是否删除:">
                    <span>{{ props.row.deletable }}</span>
                  </el-form-item>
                  <el-form-item label="删除时间:">
                    <span>{{ props.row.chip }}</span>
                  </el-form-item>
                  <el-form-item label="商品名称:">
                    <span>{{ props.row.deleteTime }}</span>
                  </el-form-item>
                  <el-form-item label="创建时间:">
                    <span>{{ props.row.createTime }}</span>
                  </el-form-item>
                  <el-form-item label="登陆时间:">
                    <span>{{ props.row.loginTime }}</span>
                  </el-form-item>
                  <el-form-item label="登出时间:">
                    <span>{{ props.row.logoutTime }}</span>
                  </el-form-item>
                  <el-form-item label="上次统计登陆时间:">
                    <span>{{ props.row.lastStatisticsLoginTime }}</span>
                  </el-form-item>
                  <el-form-item label="禁止登陆:">
                    <span>{{ props.row.forbidLogin }}</span>
                  </el-form-item>
                  <el-form-item label="禁言标志:">
                    <span>{{ props.row.forbidChat }}</span>
                  </el-form-item>
                    <el-form-item label="昵称修改次数:">
                    <span>{{ props.row.nicknameModifyCount }}</span>
                  </el-form-item>
                  <el-form-item label="当前在线时长:">
                    <span>{{ props.row.onlineTimes }}</span>
                  </el-form-item>
                  <el-form-item label="在线总时间:">
                    <span>{{ props.row.totalOnlineTimes }}</span>
                  </el-form-item>
                    <el-form-item label="离线时间:">
                    <span>{{ props.row.offlineTimes }}</span>
                  </el-form-item>
                  <el-form-item label="登录天数:">
                    <span>{{ props.row.loginDays }}</span>
                  </el-form-item>
                  <el-form-item label="登录次数:">
                    <span>{{ props.row.loginCount }}</span>
                  </el-form-item>
                    <el-form-item label="当前连续登陆下架时间:">
                    <span>{{ props.row.continueDays }}</span>
                  </el-form-item>
                  <el-form-item label="最大连续天数:">
                    <span>{{ props.row.continueMaxDays }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="avatar" label="头像" width="180">
            <template scope="scope">
              <img v-if="scope.row.avatar" :src="scope.row.avatar" class="avatar">
            </template>
            </el-table-column>
            <el-table-column
              label="昵称"
              prop="nickname">
            </el-table-column>
            <el-table-column
              label="玩家账号"
              prop="account">
            </el-table-column>
            <el-table-column
              label="玩家ID"
              prop="playerId">
            </el-table-column>
        <!-- <el-table-column prop="channel" label="渠道" width="120">
        </el-table-column>
         <el-table-column prop="devid" label="设备号" width="120">
        </el-table-column>
         <el-table-column prop="lastLoginIp" label="最后登录IP" width="120">
        </el-table-column>
         <el-table-column prop="nickname" label="昵称" width="180">
        </el-table-column>
         <el-table-column prop="playerId" label="玩家ID" width="180">
        </el-table-column>
        <el-table-column prop="account" label="玩家账号" width="180">
        </el-table-column>
        <el-table-column prop="avatar" label="头像" width="180">
            <template scope="scope">
              <img v-if="scope.row.avatar" :src="scope.row.avatar" class="avatar">
            </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="180">
        </el-table-column> 
        <el-table-column prop="charge" label="充值状态" width="180">
        </el-table-column>
        <el-table-column prop="guide" label="新手指导完成数据" width="180">
        </el-table-column>
         <el-table-column prop="chip" label="筹码" width="180">
        </el-table-column>
         <el-table-column prop="diamond" label="钻石" width="180">
        </el-table-column>
         <el-table-column prop="reliefFundCount" label="救济金次数" width="180">
        </el-table-column>
        <el-table-column prop="lastReliefFundTime" label="上一次救济金次数" width="180">
        </el-table-column>
         <el-table-column prop="signDays" label="签到天数" width="180">
        </el-table-column>
         <el-table-column prop="lastSignTime" label="上次签到时间" width="180">
        </el-table-column>
         <el-table-column prop="dailyGrowUp" label="日成长值" width="180">
        </el-table-column>
          <el-table-column prop="weekGrowUp" label="周成长值" width="180">
        </el-table-column>
         <el-table-column prop="lastGrowUpdateTime" label="上一次成长值修改时间" width="180">
        </el-table-column> 
        <el-table-column prop="deletable" label="是否删除" width="180">
        </el-table-column>
         <el-table-column prop="deleteTime" label="删除时间" width="180">
        </el-table-column>
         <el-table-column prop="createTime" label="创建时间" width="180">
        </el-table-column>
          <el-table-column prop="loginTime" label="登陆时间" width="180">
        </el-table-column>
         <el-table-column prop="logoutTime" label="登出时间" width="180">
        </el-table-column>
          <el-table-column prop="lastStatisticsLoginTime" label="上次统计登陆时间" width="180">
        </el-table-column>
          <el-table-column prop="forbidLogin" label="禁止登陆" width="180">
        </el-table-column>
         <el-table-column prop="forbidChat" label="禁言标志" width="180">
        </el-table-column>
          <el-table-column prop="nicknameModifyCount" label="昵称修改次数" width="180">
        </el-table-column>
          <el-table-column prop="onlineTimes" label="当前在线时长" width="180">
        </el-table-column>
           <el-table-column prop="totalOnlineTimes" label="在线总时间" width="180">
        </el-table-column>
           <el-table-column prop="offlineTimes" label="离线时间" width="180">
        </el-table-column>
           <el-table-column prop="loginDays" label="登录天数" width="180">
        </el-table-column>
             <el-table-column prop="loginCount" label="登录次数" width="180">
        </el-table-column>
           <el-table-column prop="continueDays" label="当前连续登陆下架时间" width="180">
        </el-table-column>
             <el-table-column prop="continueMaxDays" label="最大连续天数" width="180">
        </el-table-column> -->
      </el-table>

   <!--  <zspagination :total="total" :pagesize="10" @click="handleCurrentChange"></zspagination> -->
       
    
  
  </div>
</template>

<script>


import { hsdateUtil } from '@/utils'


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
      serachform:{
              account:'',
              playerId:'',
              nickname:'',
      },
      total: 0, // 页码
      pageNo: 1, //分页
      tableData: [],
     
    }
  },
  methods: {

   handleCurrentChange(val){
    
       this.pageNo = val
       this.queryLists()
        this.pageNo = 1
   },
    dataHanding(data){
        data.rows.forEach(function(item){
              item.deletable = item.deletable == 0 ?'未删除':item.deletable == 1 ?'已删除':''
              item.charge = item.charge == 0 ?'未充值':item.charge == 1 ?'已充值':''
              item.sex = item.sex== 0?"男":'女'
          })
   },
  queryLists(val) {
      let option = {},
       vm =this;
        option.pageNo = this.pageNo
        option.pageSize = 10
          Object.assign(option,vm.serachform)
        this.queryProperty('ApiqueryBasicInformationPlayer',option,function(data){
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
@import "~style/color.scss";
.avatar {
    width: 48px;
    height: 48px;
    display: block;
  }
    .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>



