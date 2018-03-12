<template>
  <div class="registration-wrapper"> 
  
   <zs-tip :tiptext='tipName'></zs-tip>
    <!-- table -->
    <nav>
    </nav>
<!-- 上导航栏 -->
<!-- 上导航栏 -->
 <el-table :data="tableData" border style="width: 100%;text-align:center">
       
        <el-table-column prop="serverIp" label="服务器ip" width="200">
        </el-table-column>
         
         <el-table-column prop="allowIp" label="服务器允许ip" min-width="200">
        </el-table-column>
           <el-table-column prop="xopenVist" label="服务器状态" width="200">
        </el-table-column>
   
       
         <el-table-column label="操作" min-width="250">
          <template scope="scope">
          <el-button size="small"  type="primary" @click="lockServerCheck(scope.$index,scope.row)">关闭服务器</el-button>
      <el-button size="small"  type="primary" @click="lockServerClearCache(scope.$index,scope.row)">重载基础属性</el-button>

           <el-button size="small"  type="primary" @click="setServer(scope.$index,scope.row)">设置服务器标示</el-button>

            </template>
          </el-table-column>
       
        
         
      </el-table>
<!-- table -->

    <el-dialog title="设置服务器标示" v-model="dialogServer" size="small" :modal-append-to-body = false>
      
        <el-form ref="forms" :model="forms" :rules="rules" label-width="100px">
              <el-form-item label="开启状态">
                    
                      <el-select v-model="forms.open" placeholder="请选择类型">
                            <el-option
                            v-for="item in opens"
                            :label="item.label"
                            :key="item.label"
                            :value="item.value">
                          </el-option>
                          </el-select>
                     
                </el-form-item>
                   <el-form-item label="ips" prop="ip" style='width:350px' v-if='forms.open=="false"'>
                
                    <el-input type ='textarea' :rows="3" placeholder="多个ip用逗号隔开" v-model="forms.ip"></el-input>
                 
                </el-form-item>
          </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('forms')">确定</el-button>
        <el-button type="primary" @click="resetForm('forms')">返回</el-button>
      </span>
    </el-dialog>
<!--   //dialog -->

  </div>
</template>

<script>



import {dateUtil} from '@/utils'


export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
          vm.checkServerState()
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
          tipName:'服务器',
          serverStatus:'',
          dialogServer:false,
          tableData:[],
           opens:[
          {
            value:'true',
            label:'是'
           },
            {
            value:'false',
            label:'否'
           },
           ],
         
          forms:{
             open:'true',
            ip:'',
          },
           rules: {
         
           ip: [
            { required: true, message: '请填写ip', trigger: 'blur' }, 
          ],
        }
          //表单
         
          //表单
        
        }
      },
      methods:{
          checkServerState(){
          let option ={},
          obj = {};
          this.API.APIcheckServerState(option).then((res)=>{
            let data = res.data
            obj = data.data
            obj.xopenVist = obj.openVist==false?'服务器已关闭':'服务器已开启'
            this.tableData = [obj]
            // console.log(data)
            // this.serverStatus = res.data.data.openVist
             this.$message(`${res.data.retmsg}`)


          },(res)=>{})

        },
        lockServerCheck() {
            this.$confirm('此操作将关闭服务器, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
             this.lockServer()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });          
            });
      },
       lockServerClearCache() {
            this.$confirm('此操作将重载基础属性, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
             this.clearCache()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });          
            });
      },
        lockServer(){
          let option ={}
          this.API.APIshutdownServer(option).then((res)=>{
             this.$message(`${res.data.retmsg}`)
             this.checkServerState()
          },(res)=>{})

        },
        setServer(index,row){
          this.dialogServer = true 
        },
         setServerAccess(){
          let option ={}
          Object.assign(option,this.forms)

          this.API.APIopenServerAccess(option).then((res)=>{
             this.$message(`${res.data.retmsg}`)
             this.dialogServer = false
              this.checkServerState()
          },(res)=>{
             
          })
         

        },
         clearCache(){
          let option ={}
          this.API.APIclearCache(option).then((res)=>{
             this.$message(`${res.data.retmsg}`)
              this.checkServerState()
          },(res)=>{})

        },
       
        submitForm(formName) {//表单确定

            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.setServerAccess()
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
       
         resetForm(formName) {//表单重置

        this.$refs[formName]?this.$refs[formName].resetFields():'';
            this.dialogServer = false
      
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
   // .formpost{
   //  display: flex;
   //  justify-content: center;

   // margin-top:150px; 
   //    .el-form {
   //       width: 500px;;
   //    }
       

   // }
 
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

