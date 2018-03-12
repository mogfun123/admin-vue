<template>
  <div class="activityMange-wrapper">

      <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="比赛监控" name="first">
               <div class="nav-top">
      <el-tag type="primary">当前奖池:803090</el-tag>
        <el-button size="small"  type="primary" @click="dialogPotInfo=true">调整奖池设置</el-button> 
        <!--  <el-button size="small"  type="primary" @click="dialogInfo=true">奖池调整记录</el-button>  -->
  </div>
         


    <nav>     
         <div class="nav-item">
              <label for="">场次ID:</label>
              <el-input v-model="search.screeningsId" size="small" placeholder=""></el-input>
             
          </div>  

        <div class="nav-item">
              <label for="">主播ID:</label>
              <el-input v-model="search.aid" size="small" placeholder=""></el-input>
             
          </div>  


         <div class="nav-item">
              <label for="">主播昵称:</label>
              <el-input v-model="search.aname" size="small" placeholder=""></el-input>
        </div>  
        <div class="nav-item">
            <label class="subtitle">对局人数：</label>
            <el-select v-model="search.gamesNumber" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in gamesNumberes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
        <div class="nav-item">

            <label class="subtitle">门票金额：</label>
            <el-select v-model="search.ticketAmount" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in ticketAmountes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div>
           <div class="nav-item">
              <label for="userName">获胜者ID:</label>
              <el-input v-model="search.winnerId" size="small" placeholder=""></el-input>
             
          </div> 
         <div class="nav-item">
            <div class="blocktime">
              <span class="demonstration">结束时间</span>
              <el-date-picker
                 v-model='search.startTime'
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                 @change="changStartTime"
                  >
                </el-date-picker>
              </div>
               <div class="blocktime">
               <span class="demonstration">至</span>
                <el-date-picker
                 v-model='search.endTime'
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                 @change="changEndTime"
                  >
                </el-date-picker>
              </div>
          </div>  
 
           <div class="nav-item">
            <el-button size="small"  type="primary" @click="queryLists">查询</el-button>
           </div>

     
    </nav>
    <div class="nav-top nav-change">
     <el-tag type="primary">奖池变化: {{jackpotSize}}</el-tag>
     
    </div>
<!-- 上导航栏 -->
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border style="width: 100%" >
           
            <el-table-column prop="screeningsId" label="场次ID" width="100">
              </el-table-column>
               <el-table-column prop="xgameType" label="游戏类型" width="100">
              </el-table-column>
              <el-table-column prop="aid" label="主播ID" width="100">
              </el-table-column>
               <el-table-column prop="aname" label="主播昵称" width="100">
              </el-table-column>
               <el-table-column prop="gamesNumber" label="对局人数" width="100">
              </el-table-column>
                 <el-table-column prop="ticketAmount" label="门票金额" width="100">
              </el-table-column>
               <el-table-column prop="bonusMultiple" label="奖金倍数" width="100">
              </el-table-column>
                <el-table-column prop="winnerId" label="获胜者ID" width="100">
              </el-table-column>
               <el-table-column prop="jackpotChange" label="奖池变化" width="100">
              </el-table-column>
               <el-table-column prop="xendtime" label="结束时间" >
              </el-table-column>
             
         
      </el-table>
     
       
<!-- table -->
<!--   //调整奖池设置 -->
    <el-dialog title="调整奖池设置" v-model="dialogPotInfo" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="jackpot"  :model="jackpot" :rules="rules" label-width="100px">
               <el-form-item label="调整方式" prop="type">
                <el-select v-model="jackpot.type" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in jackType"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>

              <el-form-item label="调整数量" prop="calculationSize">
                     <el-col :span="14">
                      <el-input v-model="jackpot.calculationSize" type="number" min=0></el-input>
                      </el-col>
                </el-form-item>
             
    
          
              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('jackpot')">确定</el-button>
      <!--   <el-button type="primary" @click="resetForm('form')">重置</el-button> -->
        <el-button type="primary" @click="resetForm('jackpot')">返回</el-button>
      </span>
    </el-dialog>
<!--   //添加房间 -->

 <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
           
            @current-change="handleCurrentChange"
          
            layout="total,  prev, pager, next, jumper"
            :total="pagtotal">
          </el-pagination>
      </div>
     <!-- 分页 -->
          </el-tab-pane>
          <el-tab-pane label="奖池调整记录" name="second">
      <div class="nav-top">
         
         <el-button size="small"  type="primary" :disabled="true">最新配置表</el-button> 
      </div>
         


    <nav>     
         <div class="nav-item">
              <label for="userName">操作者id:</label>
              <el-input v-model="jacksearch.adminId" size="small" placeholder=""></el-input>
             
          </div>  
 
        <div class="nav-item">
            <label class="subtitle">调整方式：</label>
            <el-select v-model="jacksearch.type" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in jackpottype"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
       
         <div class="nav-item">
            <div class="blocktime">
              <span class="demonstration">调整时间</span>
              <el-date-picker
                 
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  v-model="jacksearch.startTime"
                  @change="changJackStartTime"
                 
                  >
                </el-date-picker>
              </div>
               <div class="blocktime">
               <span class="demonstration">至</span>
                <el-date-picker
                  v-model="jacksearch.endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  @change="changJackEndTime"
                 
                  >
                </el-date-picker>
              </div>
          </div>  
 
           <div class="nav-item">
            <el-button size="small"  type="primary" @click="queryApijackpotQueryList">查询</el-button>
           </div>

     
    </nav>

<!-- 上导航栏 -->
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableNote" border style="width: 100%">
           
            <el-table-column prop="id" label="序号" width="100">
              </el-table-column>
               <el-table-column prop="xType" label="调整方式" width="100">
              </el-table-column>
              <el-table-column prop="xcalculationSize" label="调整内容" width="200">
              </el-table-column>
               <el-table-column prop="xoperationTime" label="调整时间" width="220">
              </el-table-column>
               <el-table-column prop="name" label="操作者">
              </el-table-column>
              
             
         
      </el-table>
       <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
           
            @current-change="handleJackCurrentChange"
          
            layout="total,  prev, pager, next, jumper"
            :total="jackpagtotal">
          </el-pagination>
      </div>

          </el-tab-pane>

        </el-tabs>






   
  </div>
</template>

<script>
import {dateUtil} from '@/utils'



export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
          vm.queryLists()
          vm.queryApijackpotQueryList()
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
         
          jackpotSize:0,//奖池变化
          jackpagtotal:0,
          pageNo:1,
              ticketAmountes: [
                  {
                    value: '',
                    label: '所有'
                  },
                  {
                    value: '1000',
                    label: '1000'
                  }, 
                   {
                    value: '2000',
                    label: '2000'
                  }, 
                   {
                    value: '5000',
                    label: '5000'
                  }, 
                   {
                    value: '10000 ',
                    label: '10000 '
                  }, 
           
                 ],
                 jackpot:{
                  type:'1',
                  calculationSize:'',
                  jackpotConfigPath:'',
                 },
            gamesNumberes: [
            {
                    value: '',
                    label: '所有'
                  },
                  {
                    value: '2',
                    label: '2人'
                  }, 
                   {
                    value: '3',
                    label: '3人'
                  }, 
                   {
                    value: '4',
                    label: '4人'
                  }, 
                   {
                    value: '5',
                    label: '5人'
                  }, 
                   {
                    value: '6',
                    label: '6人'
                  }, 
                   {
                    value: '7',
                    label: '7人'
                  }, 
                  {
                    value: '8',
                    label: '8人'
                  }, 
                  {
                    value: '9',
                    label: '9人'
                  }, 
                 ],
                 search:{
                  screeningsId:'',
                  aid:'',
                   aname:'',
                  gamesNumber:'',
                   ticketAmount:'',
                  winnerId:'',
                   winnerId:'',
                  startTime:'',
                   endTime:'',

                 },
                 jacksearch:{
                   adminId:'',
                  type:'',
                   startTime:'',
                  endTime:'',
                  
                 },
                 jackpottype:[
                 {
                    value: '',
                    label: '所有'
                  }, 
                  {
                    value: '1',
                    label: '增加奖池'
                  }, 
                  {
                    value: '2',
                    label: '减少奖池'
                  },
                   {
                    value: '3',
                    label: '配置表'
                  }, 

                 ],
                   jackType:[
                
                  {
                    value: '1',
                    label: '增加奖池'
                  }, 
                  {
                    value: '2',
                    label: '减少奖池'
                  },
                  //  {
                  //   value: '3',
                  //   label: '配置表'
                  // }, 

                 ],
         tableData: null,
         tableNote:null,
          dialogPotInfo:false,
        pagtotal:0,
         
          activeName: 'first',

          //表单验证
          rules: {
          calculationSize: [
            { required: true, message: '请输入调整数量', trigger: 'blur' },
           
          ],
           type: [
            { required: true, message: '请选择调整', trigger: 'blur' },
           
          ],
         
        },
          //表单验证
        }
      },
      methods:{
         handleClick(tab, event) {
            let text = tab.name

            text=="first"?this.queryLists():text=="second"?this.queryApijackpotQueryList():''
          },
          changJackStartTime(val){
             this.jacksearch.startTime = val
          },
          changJackEndTime(val){
                  this.jacksearch.endTime = val
              if (this.jacksearch.startTime>val) {
                  this.$message(`结束时间必须大于起始时间`)
                  this.jacksearch.endTime = " "
              }
          },

      changEndTime(val){

           this.search.endTime = val
          if (this.search.startTime>val) {
              this.$message(`结束时间必须大于起始时间`)
              this.search.endTime = " "
          }
          
        },
        changStartTime(val){
         
          this.search.startTime = val
        },
        queryApijackpotQueryList(){
          let option = {}
          Object.assign(option,this.jacksearch)
           option.pageNo = this.pageNo
          this.API.ApijackpotQueryList(option).then((res)=>{
              // if (res.data.retcode==1) {
                  this.jackpagtotal = res.data.total
                  // this.jackpotSize = res.data.data.jackpotSize

                  res.data.rows.forEach((item)=>{
                     let contrast  = item.type
                     
                        item.xoperationTime = item.operationTime?dateUtil.format(item.operationTime,'yyyy-MM-dd hh:mm:ss'):''
                        item.xType = contrast==1?"增加奖池":contrast==2?"减少奖池":contrast==3?"配置文件":''
                        item.xcalculationSize = item.calculationSize|| item.jackpotConfigPath||'无'
                 

            })
              // }
              this.tableNote = res.data.rows




          },(res)=>{})


        },
      
  queryLists(){
           let option = {}
           Object.assign(option,this.search)
           option.pageNo = this.pageNo
            this.API.ApianchorStatistics(option).then((res)=>{
              if (res.data.retcode==1) {
                  this.pagtotal = res.data.data.page.total
                  this.jackpotSize = res.data.data.jackpotSize

                  res.data.data.page.rows.forEach((item)=>{
                     
                        item.xendtime = item.endtime?dateUtil.format(item.endtime,'yyyy-MM-dd hh:mm:ss'):''
                        item.xgameType = item.gameType==1?"全平台":item.gameType==2?"德州扑克":''
                 

            })
              }
              this.tableData = res.data.data.page.rows


           },(res)=>{})

         },
        
         handleCurrentChange(val){
           this.pageNo = val
           this.queryLists()
           this.pageNo = 1

         },
         handleJackCurrentChange(val){
             this.pageNo = val
             this.queryApijackpotQueryList()
             this.pageNo = 1
         },
         
         submitForm(formName) {//表单确定
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.ensureAction()
              } else {
                console.log('error submit!!');
                return false;
              }
            })
      },
      resetForm(formName) {//表单重置
        this.$refs[formName].resetFields();
        this.dialogPotInfo = false
      },
     ensureAction(){
          let option = {};

          Object.assign(option,this.jackpot)

        

            this.API.ApioperationJackpot(option).then((res)=>{
                 this.$message(`${res.data.retmsg}`)
              if (res.data.retcode==1) {
                this.resetForm("form")
                
                 // this.queryApijackpotQueryList()
              
              }

            })




         },
        
         
      },



} 
</script>

<style lang="scss">
@import "~style/color.scss";
.activityMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    .block{//分页
    margin-top: 80px;
    text-align:center;
  }
  .deletemint{
    margin-top: 40px;
  }
    .el-dialog__footer{
    text-align: center;
}
 .nav-change{
        padding-bottom:15px;
      }
  nav{
  // height: 25px;
  line-height: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  font-size: 12px;
  margin: 20px auto;
  .nav-item{
    display: flex;
     align-items:center;
     min-width: 150px;
     margin-left: 10px;
     margin-top: 20px;
      font-size: 12px;

   
        label{
          margin-bottom: 0px;
          min-width: 40px;
        }
 
        .form-control{
          width: 100px;
          // margin-left: 10px;
          height: 25px;
        }
          
        .el-input--small{
          height: 25px;
          width: 120px;
        }
        .el-input__inner{
          height: 25px;
        } 

    }
     .el-button {
          height: 25px;
          line-height: 25px;
          margin-left: 10px;
          span{
            font-size: 12px;
          }
          padding: 0px 10px;
    }

  
  }

}
</style>

