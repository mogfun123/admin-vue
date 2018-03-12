<template>
  <div class="matchMange-wrapper">  
  <div class="nav-top">
       <el-button size="small"  type="primary" @click="dialogInfo=true,form.activityId=''">添加活动</el-button> 
  </div>
  
    <nav>     


        <div class="nav-item">
              <label for="userName">活动ID:</label>
              <el-input v-model="search.activityId" size="small" placeholder=""></el-input>
             
          </div>  
           <div class="nav-item">
            <label class="subtitle">游戏类型：</label>
            <el-select v-model="search.gameType" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in gametypes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
          <div class="nav-item">
              <label for="aid">主播ID:</label>
              <el-input v-model="search.anchorId" size="small" placeholder=""></el-input>
        </div>  
         <div class="nav-item">
              <label for="nickName">主播昵称:</label>
              <el-input v-model="search.aname" size="small" placeholder=""></el-input>
        </div>  
        <div class="nav-item">
            <label class="subtitle">比赛人数：</label>

            <el-select v-model="search.raceNumber" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in raceNumberes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
    <div class="nav-item">
            <label class="subtitle">报名费：</label>
            <el-select v-model="search.enrollChip" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in enrollChipes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
       <div class="nav-item">
            <label class="subtitle">活动状态：</label>
            <el-select v-model="search.activityStatus" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in anchorStatues"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
           <div class="nav-item">
            <el-button size="small"  type="primary" @click="queryLists">查询</el-button>
           </div>

     
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border style="width: 100%">
       
        <el-table-column prop="activityId" label="活动ID" width="120">
        </el-table-column>
         
         <el-table-column prop="xgameType" label="游戏类型" width="120">
        </el-table-column>
         <el-table-column prop="anchorId" label="主播ID" width="120">
        </el-table-column>
         <el-table-column prop="aname" label="主播昵称" width="200">
        </el-table-column>
          <el-table-column prop="raceNumber" label="比赛人数" width="100">
        </el-table-column>
          <el-table-column prop="openingNumber" label="开赛人数" width="200">
        </el-table-column>
          <el-table-column prop="enrollChip" label="报名费" width="120">
        </el-table-column>
          <el-table-column prop="xlimitCondition" label="特殊条件" width="120">
        </el-table-column>
         <el-table-column prop="xactivityStatus" label="活动状态" width="120">
          </el-table-column>
             <el-table-column prop="xstarttime" label="比赛时间" width="120">
          </el-table-column>
             <el-table-column prop="xupdTime" label="修改时间" width="120">
          </el-table-column>
           <el-table-column label="编辑" >
          <template scope="scope">
            <el-button size="small"  type="primary" @click="editorActionFist(scope.$index,scope.row)">修改</el-button>
            <el-button size="small"  type="primary" @click="deleteActionFirst(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
           <el-table-column label="操作" >
          <template scope="scope">
            
          <el-button size="small"  type="primary" @click="userDownUp(scope.$index,scope.row)">{{scope.row.activityStatus
=='1'?'下线':'上线'}}</el-button>
            </template>
          </el-table-column>
       
      </el-table>
<!-- table -->

<!--   //发邮件 -->
    <el-dialog title="添加活动" v-model="dialogInfo" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="游戏类型" prop="gameType">
              <el-select v-model="form.gameType" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in gametypes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="主播昵称" prop="aname">
              <el-select v-model="form.anchorId" @change="changeAname" placeholder="请选择活动区域">
                <el-option
                        v-for="item in playernicks"
                        :label="item.label"
                        :key="item.label"
                       
                        :value="item.value">
                      </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主播ID" prop="anchorId">
                  <el-col :span="14">
                  <el-input disabled  v-model="form.anchorId" ></el-input>
                  </el-col>
              </el-form-item>
                  <el-form-item label="比赛人数" prop="raceNumber">
                  <el-col :span="14">
                  <el-input v-model="form.raceNumber" type="number" min="1"></el-input>
                  </el-col>
              </el-form-item>
                  <el-form-item label="开赛人数" prop="openingNumber">
                  <el-col :span="14">
                  <el-input v-model="form.openingNumber" type="number" min="1"></el-input>
                  </el-col>
              </el-form-item>
                  <el-form-item label="报名费" prop="enrollChip">
                  <el-col :span="14">
                  <el-select v-model="form.enrollChip" placeholder="请选择"  size="small" >
                      <el-option
                        v-for="item in enrollChipes"
                        :label="item.label"
                        :key="item.label"

                        :value="item.value">
                      </el-option>
                  </el-select>
                  </el-col>
              </el-form-item>
                <el-form-item label="特殊条件" prop="limitCondition">
              <el-select v-model="form.limitCondition" placeholder="请选择"  size="small" >
                      <el-option
                        v-for="item in limitConditiones"
                        :label="item.label"
                        :key="item.label"

                        :value="item.value">
                      </el-option>
                  </el-select>
            </el-form-item>
              <el-form-item label="开始时间" prop="starttime">
                  <el-col :span="14">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="form.starttime" style="width: 100%;"  @change="changStartTime"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="结束时间" prop="endtime">
                  <el-col :span="14">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="form.endtime" style="width: 100%;"  @change="changEndTime"></el-date-picker>
                  </el-col>
                </el-form-item> 
           
        
         

          
              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button type="primary" @click="resetForm('form')">取消</el-button>
       
      </span>
    </el-dialog>
<!--   //发邮件 -->
 <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
           <el-pagination
           
            @current-change="handleCurrentChange"
          
            layout="total, prev, pager, next, jumper"
            :total="pagtotal">
          </el-pagination>
      </div>
     <!-- 分页 -->
  </div>
</template>

<script>
import {dateUtil} from '@/utils'



export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
              vm.queryLists()
              vm.queryAnchorList()
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
         search:{
          activityId:'',
          gameType:'',
          aname:'',
          anchorId:'',
          raceNumber:'',
          enrollChip:'',
          activityStatus:'',


         },
         playernicks:[
        
         ],
          limitConditiones:[{
                  value: '0',
                  label: '不限注'
                  }, 
                 {
                   value: '1',
                   label: '限注'
                  },
                  ],
          gametypes: [{
                  value: '1',
                  label: '全平台'
                  }, 
                 {
                   value: '2',
                   label: '德州扑克'
                  }],
              enrollChipes: [
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
            raceNumberes: [
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
          anchorStatues:[
                {
                  value: '',
                  label: '所有'
                },
                {
                  value: '0',
                  label: '下线'
                  },
                   {
                  value: '1',
                  label: '上线'
                  },
            ],
         
         tableData:null,
            value:"",
      pagtotal:1,
      pagNo:1,
     
        dialogInfo:false,
          userName:'',//用户名
          nickName:"",//昵称
          iphone:'',//手机号
          //表单
          form: {
            activityId:'',
            anchorId:'',
            gameType:'',
            aname:'',
        
            raceNumber:'',
            openingNumber:'',
            enrollChip:'',
            limitCondition:'0',
            starttime:'',
            endtime:'',
           
          },
          //表单
          //表单验证
          rules: {
          anchorId: [
            { required: true, message: '请输入活动id', trigger: 'blur' },
           
          ],
           gameType: [
            { required: true, message: '请选择游戏类型', trigger: 'blur' },
           
          ],
           aname: [
            { required: true, message: '请选择主播昵称', trigger: 'blur' },
           
          ],
           aid: [
            { required: true, message: '主播id', trigger: 'blur' },
           
          ],
           raceNumber: [
            { required: true, message: '请输入比赛人数', trigger: 'blur' },
           
          ],
           openingNumber: [
            { required: true, message: '请输入开赛人数', trigger: 'blur' },
           
          ],
           enrollChip: [
            { required: true, message: '请输入报名费用', trigger: 'blur' },
           
          ],
           limitCondition: [
            { required: true, message: '请输入限注条件', trigger: 'blur' },
           
          ],
           starttime: [
            { required: true, message: '请输入活动开始时间', trigger: 'blur' },
           
          ],
            endtime: [
            { required: true, message: '请输入活动结束时间', trigger: 'blur' },
           
          ],
         
        },
          //表单验证
        }
      },
    
      methods:{
        changeAname(val){
         let arr = this.playernicks.filter((item)=>{
          return (item.value == val)
         })

          this.form.aname = arr[0].label.toString()

        },
          changEndTime(val){

           this.form.endtime = val
          if (this.form.starttime>val) {
              this.$message(`结束时间必须大于起始时间`)
              this.form.endtime = " "
          }
          
        },
        changStartTime(val){
         
          this.form.starttime = val
        },
         editorActionFist(index,row){//1基础道具编辑
          this.dialogInfo = true
          for(let key in row){
             row[key] = (row[key]||'').toString()
          }

           Object.assign(this.form,row)
        

        },
        queryAnchorList(){
            let option = {},
              arr = [];
          
          this.API.ApiqueryAnchorList(option).then((res)=>{
              if (res.data.retcode==1) {
                res.data.data.forEach((item)=>{
                    arr.push({value:`${item.playerId}`,label:item.nickname})
                    
                })
                  this.playernicks = arr
              }

          },(res)=>{})
        },
          queryLists(){
           let option = {}
           Object.assign(option,this.search)
            this.API.ApianchorActivityQueryPage(option).then((res)=>{

                 
                    this.pagtotal = res.data.total
                       res.data.rows.forEach((item)=>{
                           
                            item.xstarttime = item.starttime?dateUtil.format(item.starttime,'yyyy-MM-dd hh:mm:ss'):''
                             item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd hh:mm:ss'):''
                            item.xgameType = item.gameType==1?"全平台":item.gameType==2?"德州扑克":''
                            item.xlimitCondition = item.limitCondition==0?"不限注":item.limitCondition==1?"限注":''
                             item.xactivityStatus = item.activityStatus==0?"下线":item.activityStatus==2?"上线":''
                 
                           

                            })

                  
            
           
           
            
          
           
              this.tableData = res.data.rows


           },(res)=>{})

         },
        
         handleCurrentChange(val){
              this.pageNo = val
               this.queryLists()
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
            });
      },
     ensureAction(){
          let option = {};
          Object.assign(option,this.form)
            this.API.ApisaveAnchorActivity(option).then((res)=>{
                 this.$message(`${res.data.retmsg}`)
              if (res.data.retcode==1) {
                this.resetForm("form")
                
                 this.queryLists()
              
              }

            })




         },
      resetForm(formName) {//表单重置
        this.dialogInfo = false
        this.$refs[formName].resetFields();
      },
        deleteActionFirst(index,row){
          let option = {}
           option.activityIds = row.activityId
           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelAnchorActivity(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {

                      this.queryLists()
                    }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              })

        },
        userDownUp(index,row) {
          let option = {}
          option.activityId = row.activityId
              this.$confirm('修改活动状态, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApisetAnchorStatus(option).then((res)=>{
                     this.$message(`${res.data.retmsg}`)
                     this.queryLists()
                })
               
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });          
              })},
         
      },


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.matchMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    .block{//分页
    margin-top: 80px;
    text-align:center;
  }
   .el-dialog__footer{
  text-align: center;
}
  .nav-top{
    margin-left: 10px;
    margin-top: 10px;
  }
  nav{
  // height: 25px;
  line-height: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  font-size: 12px;
  margin: 20px auto;
  margin-top: 10px;
  .nav-item{
    display: flex;
     align-items:center;
     min-width: 150px;
     margin-left: 10px;
     margin-top: 10px;
      font-size: 12px;
        .blocktime{
            .demonstration{
              display: inline-block;
              margin:auto 10px;
              font-size: 12px;
              font-weight: bold;
            }
       }
        label{
          margin-bottom: 0px;
          min-width: 40px;
        }
        .subtitle{
          height: 25px;
        
         
          
          margin-bottom: 0px;
            
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

