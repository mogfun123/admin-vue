<template>
  <div class="activityMange-wrapperr">
  <zs-tip :tiptext='tipName'></zs-tip>
  
    <nav>     

       <div class="nav-item">
          <el-button type="primary" class='btn-search-s' size="small"  @click="dialogAddActive = true">添加公告</el-button>
       </div>
     
    
    </nav>
<!-- 上导航栏 -->
<!-- table -->
<div style='display:inline-block'>
   <el-table :data="tableData" highlight-current-row row-class-name="cell-style" style="width:1000px">
         
        <el-table-column prop="id" label="公告ID" width="120">
        </el-table-column>
        <el-table-column prop="xbulletinType" label="公告类型" width="130">
        </el-table-column>
         
         <el-table-column  label="公告内容" width="300">
           <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p style='max-width:200px'>{{ scope.row.bulletinContent }}</p>
                <div slot="reference" class="name-wrapper" style='text-overflow:ellipsis; white-space:nowrap; overflow:hidden;'>
                 {{  scope.row.bulletinContent }}
                </div>
              </el-popover>
            </template>
        </el-table-column>
         <el-table-column prop="upTime" label="修改时间" width="180">
        </el-table-column>
         <el-table-column label="操作" >
          <template scope="scope">
          <el-button size="small"  type="primary" @click="editOperation(scope.$index,scope.row)">修改</el-button>
          <el-button size="small"  type="primary" @click="deleteAction(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
         
      </el-table>
       
<!-- table -->
<!--   //添加公告 -->
    <el-dialog title="添加公告" v-model="dialogAddActive" size="small" @close = 'resetForm("form")' :close-on-click-modal="false" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :label-position="labelPosition" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="公告类型" prop="bulletinType">
            <el-select v-model="form.bulletinType"  placeholder="请选择公告类型">
              <el-option label="登录公告" value="0"></el-option>
              <el-option label="维护公告" value="1"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="公告内容" style='width:350px' prop="bulletinContent">
           <el-input type="textarea"  :rows="3" v-model="form.bulletinContent"></el-input>
         </el-form-item>
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button type="primary" @click="resetForm('form')">返回</el-button>
      </span>
    </el-dialog>
<!--   //添加公告 -->

        <zspagination :total = total :pagesize="10" @click="handleCurrentChange"></zspagination>
      </div>
     <!-- 分页 -->
  </div>
</template>

<script>
import {hsdateUtil} from '@/utils'



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
      data(){

        return {
         
          tipName:'公告管理',
         tableData: null,
          dialogAddActive:false,
           total:0,
           pageNo:1,
          labelPosition:"left",
          form:{
            bulletinContent:'',
            bulletinType:'0',

          },
          //表单验证
          rules: {
          bulletinContent: [
            { required: true, message: '请输入公告内容', trigger: 'blur' },   
          ],
           bulletinType: [
            { required: true, message: '请选择', trigger: 'blur' },
           
          ],
        
        
       
          
        },
         
        
        
       
        }
      },
      methods:{
        queryLists(){
          let option = {};
         option.pageNo = 1
          this.API.ApiqueryBulletinLogin(option).then((res)=>{
            res.data.rows.forEach((function(item){
              item.upTime = hsdateUtil(item.upTime)
              item.xbulletinType = item.bulletinType==0?'登陆公告':item.bulletinType==1?'维护公告':''

            }))
                this.tableData = res.data.rows
                this.total = res.data.total

          },()=>{})

        },
        queryById(){
          let option = {}

          
        },
        editOperation(index,row){
          this.dialogAddActive = true
         
          Object.assign(this.form,row)
          this.form.bulletinType = `${this.form.bulletinType}`
          delete this.form.upTime
          delete this.form.xbulletinType
        },
   
       
       deleteAction(index,row) {
            let vm = this
              this.$confirm('此操作将删除该公告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
              
                vm.deleteSureAction(index,row)
               
              }).catch(() => {
                console.log("shibai")
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
      },
      deleteSureAction(index,row){
        let option = {};
        option.ids = row.id
        this.API.ApideleteBulletinLogin(option).then((res)=>{
            if (res.data.retcode==1) {
              this.queryLists()
              this.resetForm("form")
               this.$message(`${res.data.retmsg}`)
            }
        },()=>{})

      },
         handleCurrentChange(val){
          this.pageNo = val
          this.queryLists()  
          this.pageNo = 1

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
       let option = {},vm = this;
       Object.assign(option,this.form)

       this.API.ApisaveBulletinLogin(option).then((function(res){
              vm.queryLists()
              vm.resetForm("form")
              vm.$message(`${res.data.retmsg}`)
            
       }))


       
     
      

      },
      resetForm(formName) {//表单重置
       
           this.$refs[formName].resetFields();
           this.form.bulletinContent =''
            this.form.bulletinType =''
           delete this.form.id
           this.dialogAddActive = false
      },

         
      },

    

} 
</script>

<style lang="scss">
@import "~style/color.scss";
.activityMange-wrapperr{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
  
  nav{
  line-height: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  font-size: 12px;
  margin: 20px auto;
  .nav-item{
    display: flex;
     align-items:center;
     margin-left: 10px;
      font-size: 12px;
   margin-top: 0px;
      
 
        .form-control{
          width: 100px;
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

  }

}
</style>

