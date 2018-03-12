<template>
  <div class="activityMange-wrapper">
    <!-- <zs-tip :tiptext='tipName'></zs-tip>
      <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
    <!-- 导航栏 -->
 
           
    <nav>     
        <div class="nav-item">
              <label for="keywords">赛季ID</label>
              <el-input v-model="sid" size="small" placeholder=""></el-input>
             
        </div>  
          <div class="nav-item">
            <div class="blocktime">
              <span class="demonstration">创建时间</span>
              <el-date-picker
                  v-model="startTime"
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
                  v-model="endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                 @change="changEndTime"
                  >
                </el-date-picker>
              </div>
          </div> 

       <el-button type="primary" size="small" @click="queryLists">查询</el-button>
        <el-button type="primary" size="small" @click="dialogAddInfo = true">添加信息</el-button>
     
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
         <el-table-column  prop="sid" label="赛季ID" width="155">
          </el-table-column>
        <el-table-column prop="seasonLength" label="赛季时长(天)" width="120">
        </el-table-column>
         
         <el-table-column prop="initialIintegral" label="初始积分" width="120">
        </el-table-column>
         <el-table-column prop="freeSubsidySize" label="免费补助(次)" width="120">
        </el-table-column>
          <el-table-column prop="paySubsidySize" label="付费补助(次)" width="120">
        </el-table-column>
         <el-table-column prop="owancePurchaseChip" label="补助购买费用" width="160">
        </el-table-column>
            <el-table-column prop="xaddTime" label="创建时间" width="200">
        </el-table-column>
            <el-table-column prop="xupdTime" label="修改时间" width="200">
        </el-table-column>
            <el-table-column prop="adminId" label="操作人" width="180">
        </el-table-column>
        
         <el-table-column label="操作" width="180">
          <template scope="scope">
          <el-button size="small"  type="primary" @click="editorActionFist(scope.$index,scope.row)">修改</el-button>
          <el-button size="small"  type="primary" @click="deleteActionFirst(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
         
      </el-table>
     
       
<!-- table -->
<!--   //添加房间 -->
    <el-dialog title="添加房间" v-model="dialogAddInfo" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
              <el-form-item label="赛季名称" prop="seasonName">
                     <el-col :span="14">
                      <el-input v-model="form.seasonName" ></el-input>
                      </el-col>
                </el-form-item>
             <el-form-item label="赛季时长" prop="seasonLength">
                     <el-col :span="14">
                      <el-input v-model="form.seasonLength" ></el-input>
                      </el-col>
                      天
                </el-form-item>
              <el-form-item label="初始积分" prop="initialIintegral">
                     <el-col :span="14">
                      <el-input v-model="form.initialIintegral" type="number" min="1"></el-input>
                      </el-col>
                    </el-form-item>
                <el-form-item label="免费补助" prop="freeSubsidySize">
                     <el-col :span="14">
                      <el-input v-model="form.freeSubsidySize" type="number" min="1"></el-input>
                      </el-col>
                      次
                </el-form-item>
                     <el-form-item label="付费补助" prop="paySubsidySize">
                     <el-col :span="14">
                      <el-input v-model="form.paySubsidySize" type="number" min="1"></el-input>
                      </el-col>
                      次
                </el-form-item>
           
                  </el-form-item>
                     <el-form-item label="补助购买费用"  prop="owancePurchaseChip">
                     <el-col :span="14">
                      <el-input v-model="form.owancePurchaseChip" type="number" min="1"></el-input>
                      </el-col>
                      筹码
                </el-form-item>
           
                  
             
         

          
              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button type="primary" @click="resetForm('form')">返回</el-button>
      </span>
    </el-dialog>
<!--   //添加房间 -->

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
        })
      },
    beforeRouteUpdate (to, from, next) {
        next()
      },
    beforeRouteLeave (to, from, next) {
      next()
      },
      name:"freezeMange",
      data(){

        return {
          tipName:"管理员",
           options: [{
                  value: '选项1',
                  label: '禁用'
                  }, 
                 {
                   value: '选项2',
                   label: '正常'
                  }],
         tableData:null,
       multipleSelection: [],//多选
       dialogAddInfo:false,
       sid:'',
       pagtotal:1,
       pagNo:1,
       startTime:'',
        endTime:'',           
          
    
           //表单
          form: {
           
            sid: '',
             seasonName:"",
            seasonLength: '',
            initialIintegral:0,
           freeSubsidySize:'',
            paySubsidySize: '',
            owancePurchaseChip:"",
         
          },
          //表单
          //表单验证
          rules: {
          sid: [
            { required: true, message: '请输入赛季名称', trigger: 'blur' },
           
          ],
          seasonName: [
            { required: true, message: '请输入赛季时长', trigger: 'blur' },
           
          ],
          seasonLength: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
           
          ],
           initialIintegral: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
           
          ],
           freeSubsidySize: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
           
          ],
           paySubsidySize: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
           
          ],
           owancePurchaseChip: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
           
          ],

        },
          //表单验证
        }
      },
      methods:{
        queryLists(){
            let option = {}
            option.sid = this.sid
            option.startTime = this.startTime
            option.endTime = this.endTime

            this.API.APIseasonQueryPage(option).then((res)=>{
                 res.data.rows.forEach((item)=>{
                 this.pagtotal = res.data.total
                    item.xaddTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd hh:mm:ss'):''
                    item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd hh:mm:ss'):''
                 

                    })
           
              this.tableData = res.data.rows
            })
         },
          editorActionFist(index,row){//1基础道具编辑
          this.dialogAddInfo = true
          for(let key in row){
             row[key] = (row[key]||'').toString()
          }

           Object.assign(this.form,row)
     


        },
        deleteActionFirst(index,row){
          let option = {}
          option.sids = row.sid
           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.APIdelSeason(option).then((res)=>{
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
        handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
        changEndTime(val){
           this.endTime = val
          if (this.startTime>val) {
              this.$message(`结束时间必须大于起始时间`)
              this.endTime = " "
          }
          
        },
        changStartTime(val){
         
          this.startTime = val
        },
        

         handleCurrentChange(){
             this.pageNo = val
            this.queryLists()
            this.pageNo = 1
         },
         
              ensuereAtion(){
                let option = {}

                Object.assign(option,this.form)
                
                this.API.APIsaveSeason(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)

                   if (res.data.retcode==1) {
                       
                        this.resetForm("form")
                        this.queryLists()
                     }

                })

              },
         submitForm(formName) {//表单确定
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.ensuereAtion()
              } else {
                
                return false;
              }
            })
      },
      resetForm(formName) {//表单重置
         this.dialogAddInfo = false
        this.$refs[formName].resetFields();
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

