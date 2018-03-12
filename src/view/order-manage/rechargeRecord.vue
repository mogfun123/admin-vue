<template>
  <div class="registration-wrapper"> 
  <zs-tip :tiptext='tipName'></zs-tip>
    <nav >     
     <el-button type="primary"  class='btn-search-s' @click="queryRechargeRecord">查询</el-button>
      <el-button type="primary" class='btn-search-s'  @click="addPropAction">添加</el-button>
   
    </nav>
<!-- 上导航栏 -->
<div style='display:inline-block'>
 <el-table :data="tableData"  highlight-current-row row-class-name="cell-style">
       
        <el-table-column prop="id" label="编号" width="100">
        </el-table-column>
         
         <el-table-column prop="playerNames" label="玩家昵称" min-width="180">
        </el-table-column>
         <el-table-column prop="chip" label="筹码" min-width="150">
        </el-table-column>
         <el-table-column prop="diamond" label="钻石" min-width="120">
        </el-table-column>
        <el-table-column prop="adminName" label="操作人" min-width="120">
        </el-table-column>
         <el-table-column prop="xaddTime" label="添加时间" min-width="150">
        </el-table-column>
          <el-table-column  label="操作" min-width="220">
          <template scope="scope">
          <el-button size="small" :disabled="scope.row.payStatus!=0" type="primary" @click="handleClick(scope.$index,scope.row)">{{scope.row.payStatus==1?'已充值':scope.row.payStatus==2?'充值失败':'确认充值'}}</el-button>
            </template>
          </el-table-column>
        <!--  <el-table-column prop="xupdtime" label="更新时间" width="120">
        </el-table-column> -->
       
       
        
         
      </el-table>
<!-- table -->
 <el-dialog title="添加" v-model="addDialogRecord" size="small" :modal-append-to-body = false  :close-on-click-modal=false>
 <el-form ref="form"  :model="form"  :rules="rules"  label-width="100px">
           
               <el-form-item label="钻石" prop="diamond">
              <el-col :span="14">
                <el-input type="number" v-model="form.diamond"></el-input>
                </el-col>
              </el-form-item>
               <el-form-item label="筹码" prop="chip">
              <el-col :span="14">
                <el-input type="number" v-model="form.chip"></el-input>
                </el-col>
              </el-form-item>
            <el-form-item label="玩家昵称" prop="playerNames">
              <el-col :span="14">
                <el-input type="textarea" placeholder = '多个玩家昵称用(,)号分开' v-model="form.playerNames" ></el-input>
                </el-col>
              </el-form-item>
               
              <el-form-item label="">
                      <el-button type="primary" @click="submitForm('form')">确认</el-button>
                      <el-button type="primary" @click="resetForm('form')">取消</el-button>
              </el-form-item>


  </el-form>
</el-dialog>
 <!--     <div class="block">
          <el-pagination
           
            @current-change="handleCurrentChange"
           
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
      </div> -->
         <zspagination :total = total :pagesize="10" @click="handleCurrentChange"></zspagination>
   </div>
  </div>


  </div>
</template>

<script>



import {hsdateUtil} from '@/utils'


export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
          vm.queryRechargeRecord()
        })
      },
    beforeRouteUpdate (to, from, next) {
        next()
      },
    beforeRouteLeave (to, from, next) {
      next()
      },
     
      data(){
         var validateDiamond = (rule, value, callback) => {
        if (this.form.diamond === ''&& this.form.chip === '') {
          callback(new Error('钻石和筹码至少一项不能为空'));
        } else {

          callback();
        }
      };

        return {
         
          addDialogRecord:false,
          tableData:[],
            tipName:'后台充值管理',
          pageNo:1,
          total:0,
          form:{
             diamond:'',
             chip:'',
             playerNames:'',
          },
         
           rules: {
          diamond: [
            { validator: validateDiamond, message: '钻石和筹码至少一项不能为空', trigger: 'blur' }, 
          ],
           chip: [
            { validator: validateDiamond, message: '钻石和筹码至少一项不能为空', trigger: 'blur' }, 
          ],
           playerNames: [
            { required: true, message: '请填写用户名列表', trigger: 'blur' }, 
          ],
          
          
        }
      
      
        }
      },
      methods:{
        handleClick(index,row){
          let vm = this,option={};
          option.id = row.id

          this.API.APIconfimRecharge(option).then((res)=>{
               vm.queryRechargeRecord()
          })

        },
          handleCurrentChange(val){
            this.pageNo = val
            this.queryRechargeRecord()
            this.pageNo = 1
         },
 
        queryRechargeRecord(){
          let option ={}
          option.pageNo = this.pageNo
          this.API.APIqueryRechargeRecord(option).then((res)=>{
           
             res.data.rows.forEach((item)=>{
                item.xaddTime = hsdateUtil(item.addTime)
             })
             this.tableData = res.data.rows
             this.total = res.data.total
          },(res)=>{})

        },
         addPropAction(){
          this.addDialogRecord = true
        
         

        },
        ensurAction(){
          let option = {}
          Object.assign(option,this.form)
           this.API.APIaddRechargeRecord(option).then((res)=>{
             this.$message(`${res.data.retmsg}`)
             if (res.data.retcode==1) {
              this.resetForm('form')
              this.queryRechargeRecord()
             }
          },(res)=>{})

        },
        
       
        submitForm(formName) {//表单确定

            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.ensurAction()
              
               
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
       
         resetForm(formName) {//表单重置

       this.$refs[formName].resetFields();
            this.addDialogRecord = false
      
      },
        
        
      
    
     
     
      
      
      },
    


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.registration-wrapper{
  width: 100%;
  height: 100%;
   text-align: left;
  position: relative;

 
  .el-button {
    height: 25px;
    line-height: 25px;
    margin-left: 10px;
    span{
      font-size: 12px;
    }
    padding: 0px 10px;
  }
  // .cell .el-button--primary{
  //   margin-top: 10px;
  //   margin-bottom: 10px;
  // }
  nav{
  // height: 25px;
  // line-height: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  font-size: 12px;
  margin: 20px auto;
  // justify-content: center;
  .nav-item{
    display: flex;
     align-items:center;
     min-width: 150px;
     margin-left: 10px;
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
        line-height: 25px;
         
          
          margin-bottom: 0px;
            
        }
       
       
        .el-input--small{
          height: 25px;
          width: 120px;
        }
        .el-input__inner{
          height: 25px;
        } 

  }
 
  
  }

}
</style>

