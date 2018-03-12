<template>
  <div class="registration-wrapper"> 
   <zs-tip :tiptext='tipName'></zs-tip>
    <nav >     
     <el-button type="primary"  class='btn-search-s' @click="queryPropAction">查询</el-button>
      <el-button type="primary"  class='btn-search-s' @click="addPropAction">添加道具</el-button>
       <el-button type="primary"  class='btn-search-s' @click="deletePropAction">删除道具</el-button>
   
    </nav>
<!-- 上导航栏 -->
 <el-table :data="tableData"  highlight-current-row row-class-name="cell-style" style="width: 100%">
       
        <el-table-column prop="id" label="编号" >
        </el-table-column>
         
         <el-table-column prop="propsId" label="道具id">
        </el-table-column>
         <el-table-column prop="propsCount" label="数量">
        </el-table-column>
         <el-table-column prop="xsendType" label="分类" >
        </el-table-column>
         <el-table-column prop="playerId" label="玩家id" >
        </el-table-column>
        <el-table-column prop="backpack" label="背包位置" >
        </el-table-column>
        <el-table-column prop="adminName" label="操作人" >
        </el-table-column>
         <el-table-column prop="xaddTime" label="添加时间" min-width="150">
        </el-table-column>
         <el-table-column label="操作" >
          <template scope="scope">
         <!--  <el-button size="small"  type="primary" @click="editOperation(scope.$index,scope.row)">编辑</el-button> -->

            <el-button size="small" v-if="scope.row.sendStatus==0&&scope.row.sendType==0" type="primary"  @click="sendOperation(scope.$index,scope.row)">确认发送</el-button>

           <el-button size="small" v-if="scope.row.sendStatus==0&&scope.row.sendType==1" type="primary" @click="deleteOperation(scope.$index,scope.row)">确认删除</el-button>

            <el-button size="small" v-if="scope.row.sendStatus!==0" :disabled="scope.row.sendStatus!==0" type="primary">{{scope.row.sendStatus==1?(scope.row.sendType==0?'发送成功':'删除成功'):scope.row.sendStatus==2?(scope.row.sendType==0?'发送失败':'删除失败'):''}}</el-button>

            </template>
          </el-table-column>
       
        
         
      </el-table>
<!-- table -->
 <el-dialog title="添加" v-model="addDialogProP" :close-on-click-modal=false size="small" :modal-append-to-body = false>
 <el-form ref="form"  :model="form"  :rules="rules"  label-width="100px">
            <el-form-item label="道具id" prop="propsId">
              <el-col :span="14">
                <el-input type="text" v-model="form.propsId"></el-input>
                </el-col>
              </el-form-item>
               <el-form-item label="背包" prop="backpack">
              <el-col :span="14">
                <el-input type="text" v-model="form.backpack"></el-input>
                </el-col>
              </el-form-item>
               <el-form-item label="数量" prop="propsCount">
              <el-col :span="14">
                <el-input type="text" v-model="form.propsCount"></el-input>
                </el-col>
              </el-form-item>
            <el-form-item label="玩家id" prop="playerId">
              <el-col :span="14">
                <el-input type="text" v-model="form.playerId"></el-input>
                </el-col>
              </el-form-item>
              
              <el-form-item label="">
                      <el-button type="primary" @click="submitForm('form')">确认</el-button>
                      <el-button type="primary" @click="resetForm('form')">取消</el-button>
              </el-form-item>


  </el-form>
</el-dialog>
 <el-dialog title="删除" v-model="deleteDialogProP" size="small" :close-on-click-modal=false :modal-append-to-body = false>
 <el-form ref="deleteform"  :model="deleteform"  :rules="rules"  label-width="100px">
            <el-form-item label="用户道具id" prop="propsId">
              <el-col :span="14">
                <el-input type="text" v-model="deleteform.propsId" placeholder='由技术人员核实确定记录id(此处非道具id)'></el-input>
                </el-col>
              </el-form-item>
               <el-form-item label="背包" prop="backpack">
              <el-col :span="14">
                <el-input type="text" v-model="deleteform.backpack"></el-input>
                </el-col>
              </el-form-item>
               <el-form-item label="数量" prop="propsCount">
              <el-col :span="14">
                <el-input type="text" v-model="deleteform.propsCount"></el-input>
                </el-col>
              </el-form-item>
            <el-form-item label="玩家id" prop="playerId">
              <el-col :span="14">
                <el-input type="text" v-model="deleteform.playerId"></el-input>
                </el-col>
              </el-form-item>
              
              <el-form-item label="">
                      <el-button type="primary" @click="submitForm('deleteform')">确认</el-button>
                      <el-button type="primary" @click="resetForm('deleteform')">取消</el-button>
              </el-form-item>


  </el-form>
</el-dialog>

         <zspagination :total = total :pagesize="10" @click="handleCurrentChange"></zspagination>
     <!-- 分页 -->
  </div>


  </div>
</template>

<script>



import {dateUtil,hsdateUtil} from '@/utils'


export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
          vm.queryPropAction()
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
         
          addDialogProP:false,
          deleteDialogProP:false,
          tableData:[],
          tipName:'道具管理',
          pageNo:1,
          total:0,
          form:{
             playerId:'',
            backpack:'0',
              propsId:'',
            propsCount:'',
              sendType:'0',//发放
    
          },
            deleteform:{
             playerId:'',
            backpack:'0',
              propsId:'',
            propsCount:'',
              sendType:'1',//删除
    
          },
         
           rules: {
          propsId: [
            { required: true, message: '请填写道具id', trigger: 'blur' }, 
          ],
           playerId: [
            { required: true, message: '请填写玩家id', trigger: 'blur' }, 
          ],
           propsCount: [
            { required: true, message: '请填写道具数量', trigger: 'blur' }, 
          ],
           sendType: [
            { required: true, message: '请选择发放类型', trigger: 'blur' }, 
          ],
           backpack: [
            { required: true, message: '请填写背包值', trigger: 'blur' }, 
          ],
        }
      
      
        }
      },
      methods:{
          handleCurrentChange(val){
            this.pageNo = val
            this.queryPropAction()
            this.pageNo = 1
         },
         editOperation(index,row){//编辑
       
         },
         deletePropAction(){
          this.deleteDialogProP = true

         },
          deleteOperation(index,row){//删除
             let option = {}
          option.id = row.id
         
           this.$confirm('您要删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.APIdelPlayerProp(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                  

                      this.queryPropAction()
                    
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });          
              })

        },
          sendOperation(index,row){
           let option = {}
          option.id = row.id
         
           this.$confirm('您要推送该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.APIsendPlayerProp(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                   

                      this.queryPropAction()
                   
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });          
              })


         },
        queryPropAction(){
          let option ={}
          option.pageNo = this.pageNo
          this.API.APIqueryPlayerProp(option).then((res)=>{
           
             res.data.rows.forEach((item)=>{
                item.xaddTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):'' 
                item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd HH:mm:ss'):''
                item.xsendType = item.sendType==0?'发放':item.sendType==1?'删除':''
             })
             this.tableData = res.data.rows
             this.total = res.data.total
          },(res)=>{})

        },
         addPropAction(){
          this.addDialogProP = true
          // let option ={}
          // Object.assign(option,this.forms)

          // this.API.APIopenServerAccess(option).then((res)=>{
          //    this.$message(`${res.data.retmsg}`)
          //    this.dialogServer = false
          // },(res)=>{
             
          // })
         

        },
        ensurAction(ensurAction){
          let option = {} 
          Object.assign(option,this[ensurAction])
           this.API.APIaddPlayerProp(option).then((res)=>{
             this.$message(`${res.data.retmsg}`)
             if (res.data.retcode==1) {
              this.resetForm('form')
              this.resetForm('deleteform')
              this.queryPropAction()
             }
          },(res)=>{})

        },
        
       
        submitForm(formName) {//表单确定

            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.ensurAction(formName)
              
               
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
       
         resetForm(formName) {//表单重置
            let vm = this
           this.$refs[formName]? this.$refs[formName].resetFields():'';
            this.addDialogProP = false
            this.deleteDialogProP = false
            Object.assign(vm[formName],vm.$options.data()[formName])
      
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

