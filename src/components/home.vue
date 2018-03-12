<template>
  <div class="home" v-cloak>

    <nav class="navbar navbar-default navbar-static-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">
              <img class="brand" v-if='isTaitan==0' alt="Brand" src="~assets/images/taitang.png">
              <img class="brand" v-if='isTaitan==1' alt="Brand" src="~assets/images/biying.png">

            </a>
             <a class="navbar-brand navbar-name" href="#">
             <!--  <img class="brand" alt="Brand" src="~assets/images/1.1.png"> -->
             <span class="iconword" v-if='isTaitan==0'>泰坦竞技管理系统</span>
             <span class="iconword" v-if='isTaitan==1'>必赢德扑管理系统</span>
                      
            </a>
            </div>
             <div class="nav-right">
              <div class="btn-group dropdown">
                      <button type="button" class="btn btn-default" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                       {{username}} <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu pull-left dropdown-lists">
                        <li><el-button style="width:100%" icon="edit"  @click='showRestDialog'>修改密码</el-button></li>
                      </ul>
                    </div>
                  <div class="btn-group" role="group" aria-label="...">
                    <button type="button" class="btn btn-default" @click="showDialog">
                    <i class="fa fa-circle-o-notch"></i>退出</button>
                  </div>
                  
                 
             </div>
          </div>
      </nav>
      <!--   //修改密码 -->
    <el-dialog title="修改密码" v-model="dialogRestword" size="tiny" :close-on-click-modal='false' :modal-append-to-body = false>
         <el-form :model="restFrom" :rules="rules" ref="restFrom" >
          <el-form-item label="  旧密码" prop = 'oldPassword' :label-width="formLabelWidth">
            <el-input v-model="restFrom.oldPassword" style="width:200px" type="password" size="small" placeholder="请输入旧密码"></el-input>
          </el-form-item>
           <el-form-item label="  新密码" prop='password1' :label-width="formLabelWidth">
            <el-input v-model="restFrom.password1" style="width:200px" type="password" size="small" placeholder="请输入密码,6-26个字符"></el-input>
          </el-form-item>
           <el-form-item label="确认新密码" prop='password2' :label-width="formLabelWidth">
             <el-input @keyup.enter="submitForm('restFrom')" v-model="restFrom.password2" style="width:200px" type="password" size="small" placeholder="请确认密码,6-26个字符"></el-input>
          </el-form-item>
        
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('restFrom')">确认</el-button>
    
         <el-button @click="resetForm('restFrom')">取消</el-button>
      </span>
    </el-dialog>
<!--   //修改密码 -->
     <!--   //退出 -->
     <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>您将退出当前用户</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmExit">确 定</el-button>
      </span>
    </el-dialog>
     <!--  //退出  -->
   <main>
     <div class="leftsidebar">
       <zb-Sidebar></zb-Sidebar>
     </div>
      <div class="main">
        <router-view></router-view>
      </div>
   </main>

  </div>
</template>

<script>
import zbSidebar from "./sidebar"
import {setStore,getStore,removeStore} from '@/utils'
 
export default {
    beforeRouteEnter (to, from, next) {
        next(vm =>{
             vm.username = getStore("username")
             
           next()
        })
      },
    beforeRouteUpdate (to, from, next) {

        next()
      },
    beforeRouteLeave (to, from, next) {
      next()
      },
  name: 'home',
  data () {
    let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.restFrom.password2 !== '') {
            this.$refs.restFrom.validateField('password2');
          }
          callback();
        }
      };
    let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.restFrom.password1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
     dialogVisible:false,
     dialogRestword:false,
     formLabelWidth:'100px',
     isTaitan:'2',
     restFrom:{
      oldPassword:'',
      password1:'',
      password2:'',
     },
     username:"",
     rules: {
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            
          ],
           password1: [
            { validator: validatePass, trigger: 'blur' }
          ],
           password2: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        
        },
    }
  },
  created(){
    let vm = this;
   this.API.Apicommongetenvironment().then((res)=>{
    vm.isTaitan = res.data.data
   

  
})
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.restpassSend()
          } else {
          
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogRestword = false
      },
    restpassSend(){
      let option = {},vm = this,options = {};
      option.userid = 
      option.oldPassword = this.restFrom.oldPassword
      option.newPassword = this.restFrom.password2
     

       this.API.ApiupdUserPwd(option).then((res)=>{
        this.$message(`${res.data.retmsg}`)
         if (res.data.retcode==1) {
              vm.resetForm('restFrom')
                vm.API.Apiadminout(options).then((res)=>{
                   vm.$router.push({name:'login'})
                },(res)=>{})
             
         }
      },(res)=>{})

    },
    cancelRestpass(){

    },
    showRestDialog(){
        this.dialogRestword = true
    },
    showDialog(){//显示退出对话框
      this.dialogVisible=true
    },
    confirmExit(){//确认退出
      this.dialogVisible=false
      let option = {}
      this.API.Apiadminout(option).then((res)=>{
        
      },(res)=>{})
      removeStore('isLogin username')

      this.$router.push({name:"login"})

    }
  },
  components: {
    zbSidebar
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../style/color.scss";
 .navbar{
        border: none;

     }
.container-fluid{
     background: #373D41;
     height: 50px;
     padding: 0px;



     a {
          /*color: #42b983;*/
       color: #42b983;
        }

     .navbar-brand{
      display: flex;
       width: 50px;
       height: 50px;

       margin-left: 0px!important;
       padding:0px;
      text-align: center;
      justify-content: center;
      align-items:center;
      cursor:default;
    // background-color:hsl(240,50%,80%);
       img{
        width: 45px;
        height: 45px;
        
      }
    }
    .navbar-name{
      width: 150px;
      // border-left:1px solid #000;
      // border-right:1px solid #000;
      .iconword{
         display: inline-block;
            background-color: transparent;
            padding: 0 5px;
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            color: #fff;
            border-radius: 4px;
           
            box-sizing: border-box;
            border: 1px solid transparent;
            margin-top: -5px;
                text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    letter-spacing: 0.02em;

      }
      img{
        width: 100%;
      }
    }
    .nav-right{
          position: absolute;
          right: 60px;
          top:0px;
          height: 100%;
          .btn-group{
            border:none;

          }
          .btn{
            height: 50px;
            background:transparent;
            border: none;
            box-shadow:none;
            color:#ffffff;
            font-size: 12px;
          }
                .btn:focus,
                .btn:active:focus,
                .btn.active:focus,
                .btn.active,
                .btn:active.focus,
                .btn.active.focus {
                    outline: none;
                     border: none;
                     box-shadow:none;
                    background:transparent;
                }

    }

}
.home{
 height: 100%;
  width:100%;
  .dropdown-lists{
    padding:0px;
    margin-top: 0px;
    border-top:0px;
   border-top-left-radius:0px;
   border-top-right-radius:0px;
   min-width:140px;
   width: 140px;
    li{
      button{
        border:none;
        width: 140px;
        height: 40px;
        font-weight: bold;
        &:hover{
          background:#F5F5F5;
        }
      }
    }
  }
 
    main{
     width: 100%;
      min-height: 100%;

      display: flex;
       transition:all .001s linear;
       overflow: auto;
      .leftsidebar{
        background:$color-asdebar;
         flex:0 0 auto;
          z-index: 2;
            transition:all .001s linear;
            display: flex;
      }
      .main{
        position:relative;
        background:$color-white;
        padding:15px 20px;
        padding-left:0px;
        margin-left: 20px;
          width: 80%;
       // min-width:1000px;
         transition:all .001s linear;
      
        flex-grow:1;
        z-index: 11;
      }
    }
}






</style>
