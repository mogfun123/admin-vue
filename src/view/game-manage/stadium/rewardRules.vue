<template>
  <div class="activityMange-wrapper">
  
  <el-tabs v-model="activeName">
    <el-tab-pane label="主播赛场规则" name="first">
      <!--   //添加房间 -->
  
        <el-form ref="form"  :model="form" :rules="rules" label-width="100px">
           
              <el-form-item label="主播赛场规则">
                     <el-col :span="14">
                      <el-input v-model="form.name"  type="textarea"></el-input>
                      </el-col>
                </el-form-item>
          
          </el-form>         

        <el-button size="small" type="primary" @click="submitForm('form')">保存</el-button>
        
      
   
<!--   //添加房间 -->
    </el-tab-pane>
    <el-tab-pane label="押注规则" name="second">
      <!--   //添加房间 -->
  
        <el-form ref="form"  :model="form" :rules="rules" label-width="100px">
           
              <el-form-item label="押注规则">
                     <el-col :span="14">
                      <el-input v-model="form.name"  type="textarea"></el-input>
                      </el-col>
                </el-form-item>
          
          </el-form>         

        <el-button type="primary" size="small" @click="submitForm('form')">保存</el-button>
       
      
   
<!--   //添加房间 -->
    </el-tab-pane>
  </el-tabs>
<!-- 上导航栏 -->

       



  </div>
</template>

<script>

import zsTip from 'components/tip-header'
import {ApiqueryAdmin} from '@/api.js'



export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
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
           activeName: 'first',
           
           //表单
          form: {
           
          name:""
          },
          //表单
          //表单验证
          rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
         
        },
          //表单验证
        }
      },
      methods:{
          
       
          open2() {
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              })},
          submitForm(formName) {//表单确定
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            })
      },

        
         
      },
      components: {
         
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

