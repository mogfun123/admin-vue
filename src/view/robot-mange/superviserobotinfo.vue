<template>
  <div class="regisinfoquery-wrapper" v-on:keyup.enter="queryGameUserList"> 
      <zs-tip :tiptext='tipName'></zs-tip>          
    <nav>    
         <div class="nav-item">
            <el-button size="small" class='btn-search-s' @click='setSuperVisero' type="primary" >监控设置</el-button>
            </div>
            <br>
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
            <el-button size="small" class='btn-search-s' type="primary"  @click="queryGameUserList">查询</el-button>
            </div>
            <div class="nav-item">
            <el-button size="small" class='btn-search-s' type="primary"  @click="queryGameUserList">导出EXCL</el-button>
            </div>
 

      
    </nav>


<!-- 上导航栏 -->
<!--   //监控设置 -->
    <el-dialog title="监控设置" v-model="dialogVisible" :rules="rules"  size="small" :modal-append-to-body = false :close-on-click-modal= false>
        <el-form :model="form" ref='form' :rules="rules" label-width="100px">
          <el-form-item style='margin-bottom:0px' >
              <el-col :span="11">
                <span>单个机器人补充筹码上限</span>
              </el-col>
              <el-col :span="11">
               <span>所有机器人补充筹码上限</span>
              </el-col>
            </el-form-item>
            <el-form-item label="每日" >
              <el-col :span="11">
                <el-form-item prop="rolename">
                  <el-input v-model="form.rolename"   type="number"  auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="rolename">
                   <el-input v-model="form.rolename"  type="number"  auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="每周" prop="rolename" >
             <el-col :span="11">
                <el-form-item prop="rolename">
                  <el-input v-model="form.rolename"  type="number"  auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="rolename">
                   <el-input v-model="form.rolename"  type="number" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
             <el-form-item label="每月" prop="rolename" >
               <el-col :span="11">
                <el-form-item prop="rolename">
                  <el-input v-model="form.rolename"  type="number" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="rolename">
                   <el-input v-model="form.rolename" type="number" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
             

      </el-form>

      <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button  @click="resetForm('form')">取消</el-button>
      </div>
    </el-dialog>
<!--     监控设置 -->
<!-- table -->
   <el-table :data="tableData"   highlight-current-row row-class-name="cell-style" style="width: 100%">

        <el-table-column  prop="playerId" label="日期" >
        </el-table-column>
         <el-table-column  prop="channel" label="单机器人日警报" >
        </el-table-column>
         <el-table-column  prop="nickname" label="单机器人周警报" >
        </el-table-column>
         <el-table-column  prop="account" label="单机器人月警报" min-width="150">
        </el-table-column>
         <el-table-column  prop="chip" label="总机器人日警报" min-width="120">
        </el-table-column>
         <el-table-column  prop="diamond" label="总机器人周警报" min-width="120">
        </el-table-column>
         <el-table-column  prop="createTime" label="总机器人月警报" min-width="120">
        </el-table-column>
      </el-table>

       <zspagination :total = total :pagesize="10" @click="handleCurrentChange"></zspagination>
   

  </div>
</template>

<script>
import {hsdateUtil} from '@/utils'
import myMixin from '@/mixin/mixinchannel'

export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
          //vm.queryGameUserList()
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
         
            total:0,       
          pageNo:1,//查询页码
          tipName:'机器人监控',
           tableData:null,//列表table
          channels:[],
          dialogVisible:false,
          serachform:{
              startTime:'',
              endTime:"",   
          },
           channels: [],
        form:{
            rolename:'',
          },
           //表单验证
          rules: {
          rolename: [
            { required: true, message: '请输入角色名', trigger: 'blur' },
            
          ],
          roledesc: [
            { required: true, message: '请输入角色描述', trigger: 'change' }
          ],
        
        
          
        },
          //表单验证

                        
                       

        }
      },
      // mixins: [myMixin],
      methods:{
          
        setSuperVisero(){
          this.dialogVisible = true
        },
         queryGameUserList(){//查询用户列表
          let option = {};
              Object.assign(option,this.serachform)
              this.API.ApiqueryGameUserList(option).then((res)=>{
             let data = res.data.data
            
                  
                     // data.createTime = hsdateUtil(data.createTime)
                
                 this.tableData =  [data]
              },(res)=>{})
         },
          submitForm(formName) {//表单确定
            this.$refs[formName].validate((valid) => {
              if (valid) {
               this.ensureAtion()
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
      ensureAtion(){

      },
       resetForm(formName) {//表单重置
            this.$refs[formName].resetFields();
            this.dialogVisible=false
            Object.assign(this.form,this.$options.data().form)
      },
        
         handleCurrentChange(val){

            this.pageNo = val
            this.queryGameUserList()
            this.pageNo = 1
         }
        
         
      },
      


} 
</script>

<style lang="scss" scoped>
@import "~style/common.scss";
.regisinfoquery-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
      .billDetailed{
    width: 100%;
    background: #ccc;
    height: 40px;
    line-height:40px;
    border-radius:5px;
    margin-bottom: 15px;
    // display: flex;
    // justify-content: space-between;

    span{
      display: inline-block;
      margin-left: 20px;
       margin-right: 20px;
      font-size: 14px;
    }
  }
  .nav-item{
    label{
      width: 52px;
    }
    .el-input__inner{
      width: 160px;
    }
    .el-date-editor--datetimerange{
        .el-input__inner{
        width: 350px;
      }
    }
  }

}
</style>

