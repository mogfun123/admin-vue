<template>
  <div class="registration-wrapper"> 
  
    <nav >     
     <el-button type="primary" @click="queryRechargeRecord">查询</el-button>
      <el-button type="primary" @click="addPropAction">添加</el-button>
   
    </nav>
<!-- 上导航栏 -->
 <el-table :data="tableData" border style="width: 100%">
       
        <el-table-column prop="id" label="编号" width="100">
        </el-table-column>
         
         <el-table-column prop="playerNames" label="用户名" width="180">
        </el-table-column>
         <el-table-column prop="chip" label="筹码" width="150">
        </el-table-column>
         <el-table-column prop="diamond" label="钻石" width="120">
        </el-table-column>
        <el-table-column prop="adminName" label="操作人" width="120">
        </el-table-column>
         <el-table-column prop="xaddTime" label="添加时间">
        </el-table-column>
        <!--  <el-table-column prop="xupdtime" label="更新时间" width="120">
        </el-table-column> -->
       
       
        
         
      </el-table>
<!-- table -->
 <el-dialog title="添加" v-model="addDialogRecord" size="small" :modal-append-to-body = false>
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
            <el-form-item label="用户名" prop="playerNames">
              <el-col :span="14">
                <el-input type="textarea" placeholder = '多个用户名用(,)号分开' v-model="form.playerNames" ></el-input>
                </el-col>
              </el-form-item>
               
              <el-form-item label="">
                      <el-button type="primary" @click="submitForm('form')">确认</el-button>
                      <el-button type="primary" @click="resetForm('form')">取消</el-button>
              </el-form-item>


  </el-form>
</el-dialog>
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
           
            @current-change="handleCurrentChange"
           
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
      </div>
     <!-- 分页 -->
  </div>


  </div>
</template>

<script>



import {dateUtil} from '@/utils'


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
          pageNo:1,
          total:1,
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
          handleCurrentChange(val){
            this.pageNo = val
            this.queryRechargeRecord()
            this.pageNo = 1
         },
        //  editOperation(index,row){//编辑
       
        //  },
        //   deleteOperation(index,row){//删除
        //      let option = {}
        //   option.id = row.id
         
        //    this.$confirm('您要删除该记录, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //       }).then(() => {
        //         this.API.APIdelPlayerProp(option).then((res)=>{
        //             this.$message(`${res.data.retmsg}`)
                  

        //               this.queryPropAction()
                    
        //         })
                
        //       }).catch(() => {
        //         this.$message({
        //           type: 'info',
        //           message: '已取消'
        //         });          
        //       })

        // },
         //  sendOperation(index,row){
         //   let option = {}
         //  option.id = row.id
         
         //   this.$confirm('您要推送该记录, 是否继续?', '提示', {
         //        confirmButtonText: '确定',
         //        cancelButtonText: '取消',
         //        type: 'warning'
         //      }).then(() => {
         //        this.API.APIsendPlayerProp(option).then((res)=>{
         //            this.$message(`${res.data.retmsg}`)
                   

         //              this.queryPropAction()
                   
         //        })
                
         //      }).catch(() => {
         //        this.$message({
         //          type: 'info',
         //          message: '已取消'
         //        });          
         //      })


         // },
        queryRechargeRecord(){
          let option ={}
          option.pageNo = this.pageNo
          this.API.APIqueryRechargeRecord(option).then((res)=>{
           
             res.data.rows.forEach((item)=>{
                item.xaddTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):'' 
                // item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd HH:mm:ss'):''
                // item.xsendType = item.sendType==0?'发放':item.sendType==1?'删除':''
             })
             this.tableData = res.data.rows
             this.total = res.data.total
          },(res)=>{})

        },
         addPropAction(){
          this.addDialogRecord = true
          // let option ={}
          // Object.assign(option,this.forms)

          // this.API.APIopenServerAccess(option).then((res)=>{
          //    this.$message(`${res.data.retmsg}`)
          //    this.dialogServer = false
          // },(res)=>{
             
          // })
         

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

