<template>
  <div class="login">
    <section>

        <h1>用户登录</h1>

   <div class="input-group">
        <span class="input-group-addon" id="basic-addon1">
          <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
        </span>
        <input type="text" class="form-control" @keyup.enter="saveLogin" autofocus v-model="username" placeholder="请输入用户名" aria-describedby="basic-addon1">
    </div>
    <div class="input-group">
        <span class="input-group-addon" id="basic-addon1">
           <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>

        </span>
        <input type="password"  @keyup.enter="saveLogin" class="form-control" v-model="password" placeholder="请输入密码" aria-describedby="basic-addon1">
    </div>

    <button class="btn btn-default" @click="saveLogin">登录</button>
</section>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Vue from 'vue'
import {setStore,getStore} from '@/utils'


export default {
  name: 'login',
  data () {
    return {
     fullscreenLoading:false,
     username:"",
     password:"",
    }
  },
  mounted(){
    let vm =this;
      if (process.env.NODE_ENV =='development') {
           this.username = 'admin'
           this.password = 'admin666666'

        }



  },
  methods:{


    saveLogin(){
     let loadingInstance = this.$loading({text:"登录中..."}),
       option = {
        username:this.username,
        password:this.password
      },
      vm = this;
      this.API.Apilogin(option).then(function(res){

        if (res.data.retcode==1) {
              setStore('isLogin',true)
              setStore("username",option.username)
              setStore("ALLOPER",res.data.data.allOper)
              setStore("MENUOPER",res.data.data.menuOper)
              Vue.$router = vm.$router
              loadingInstance.close()
               let isHas09 =  res.data.data.menuOper.some((item) => {
                    return item.opCode == '09'
                })
             
                  if (isHas09) {
                     
                      vm.$router.push({path:"home/dashboard"})
                  } else {
                      vm.$router.push({name:'home'})
                  }

            }else{

                loadingInstance.close();
                 vm.$message(res.data.retmsg);
            }

      },function(res){

            loadingInstance.close();
            vm.$message(res.data.retmsg);
      })



    }

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../style/color.scss";

  .login{
      width: 100%;
      height: 100%;
      background: url(../assets/images/bg.jpg);
      section{
          width: 300px;
          padding:20px;
          border-radius: 5px;
          // background:;
          position: absolute;
          left: 50%;
          top:50%;
          transform: translate(-50%,-50%);
          h1{
            font-size: 20px;
            margin: 10px auto;
          }
          .input-group{
            width: 80%;
            margin: 10%;
          }
          .btn-default{
            width: 80%;
           margin: 10%;
           margin-top: 0px;
          }
      }
  }



</style>
