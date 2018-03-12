<template>
  <div class="channel-wrapper">
    <zs-tip :tiptext='tipName'></zs-tip>
     <nav>  
    <el-row>
      <el-col>
        <div class="nav-item">    
         <el-button size="small"  type="primary" class='btn-search-s' @click='addChannel'>添加渠道</el-button>
         <!--  <el-button size="small"  type="primary" class='btn-search-s' @click='queryLists'>查询</el-button> -->
         </div>
      </el-col>
    </el-row>
     
    </nav>
    <!-- 导航栏 -->
 
           

<!-- 上导航栏 -->

  
     <el-table :data="tableData"   highlight-current-row row-class-name="cell-style" style="width: 100%">
       <el-table-column prop="id" label="id" min-width="150">
        </el-table-column>
         <el-table-column prop="channelName" label="渠道" min-width="150">
        </el-table-column>
         <el-table-column prop="channelIdentify" label="渠道标识" min-width="150">
        </el-table-column>
         <el-table-column prop="exchangeIdentify" label="兑换标识" min-width="150">
        </el-table-column>
        <el-table-column prop="creator" label="添加者" min-width="200">
        </el-table-column>
         <el-table-column prop="xaddtime" label="添加时间" min-width="200">
        </el-table-column>
      
    

         <el-table-column prop="name" label="操作" min-width="130">
          <template scope="scope">
              <el-button size="small"  type="primary" @click="deleteAction(scope.$index, scope.row)">删除</el-button>  
            <!--   <el-button size="small"  type="primary" @click="deditorAction(scope.$index, scope.row)">修改</el-button>     -->
      </template>
       </el-table-column>
      </el-table>

   
        <zspagination :total = total :pagesize="15" @click="handleCurrentChange"></zspagination>
 
<!--   //添加用户 -->
    <el-dialog :title='form.id?"修改渠道":"添加渠道"' v-model="dialogChannel"  :close-on-click-modal='false' size="tiny" :modal-append-to-body = false>
  
        <el-form :model="form" ref='form' :rules="rules" label-width="90px">
            <el-form-item label="渠道名" prop="channelName">
              <el-input v-model="form.channelName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="渠道标识" prop="channelIdentify">
              <el-input v-model="form.channelIdentify" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="兑换标识" prop="exchangeIdentify">
              <el-input v-model="form.exchangeIdentify" auto-complete="off"></el-input>
            </el-form-item>

            </el-form>
      <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="submitForm('form')">确定</el-button>
    
        <el-button  @click="resetForm('form')">取消</el-button>
      </div>
     
    </el-dialog>
<!--   //添加用户 -->

  </div>
</template>

<script>
import { hsdateUtil } from '@/utils'




export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
             
              vm.queryLists()
             
             
           next()
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
        pageNo:1,
        tipName:"渠道管理",
        form:{
            channelName:"",
            exchangeIdentify:'',
            channelIdentify:'',
            id:"",
          },
        dialogChannel:false,
        tableData:null,
          
 //表单验证
          rules: {
          channelName: [
            { required: true, message: '请输入渠道名', trigger: 'blur' },
            
          ],
           exchangeIdentify: [
            { required: true, message: '请输入兑换标识', trigger: 'blur' },
            
          ],
           channelIdentify: [
            { required: true, message: '请输入渠道标识', trigger: 'blur' },
            
          ],
         
        
        
          
        },
          //表单验证
        
        }
      },
      methods:{
        deditorAction(index,row){
        
          Object.assign(this.form,row)
          this.dialogChannel =true

        },
         addChannel(){
          this.dialogChannel = true
         },
          queryLists(){//获取管理员所有用户
            let vm = this,
              option = {} ;
            option.pageNo = this.pageNo;
            option.pageSize = 15
          this.API.Apiquerychannel(option).then((res)=>{
            if (res.data.rows.length>0) {
              res.data.rows.forEach((item)=>{item.xaddtime = hsdateUtil(item.addtime)})
              vm.tableData = res.data.rows
              vm.total = res.data.total
            
              // vm.tableData.forEach((item)=>{
                 
              // })
            }
               

          },(res)=>{

          })

         

          },
       
          handleCurrentChange(val) {

            this.pageNo = val
            this.queryLists()
            this.pageNo = 1
           
          },
          ensureAtion(index,row){//表单确认
            let option = {},api = 'ApiquerysaveChannel';

            Object.assign(option,this.form)
            if (this.form.id) {
              api='ApiupdateChannel'
            }
           
            this.API[api](option).then((res)=>{
                this.$message(`${res.data.retmsg}`)
                this.resetForm('form')
                this.queryLists()
            })
           
          },
         
         
         deleteAction(index,row){
              let vm = this
             
              this.$confirm(`确定要删除该渠道?`, '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  let option = {
                    id :row.id,                 
                  }
                vm.API.ApiquerydeleteChannel(option).then((res)=>{
                   this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {
                           this.queryLists()                       
                         }
                },(res)=>{})   
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消操作'
                });          
              });
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
         
          resetForm(formName) {//表单重置
            Object.assign(this.form,this.$options.data().form)
            this.$refs[formName].resetFields();
            this.dialogChannel=false
      },
      },
    


} 
</script>

<style lang="scss" scoped>
@import "~style/color.scss";
@import "~style/common.scss";
.channel-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;

 
.el-dialog__footer{
  text-align: center;
}


}
</style>

