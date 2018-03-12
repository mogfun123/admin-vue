<template>
  <div class="registration-wrapper"> 
  
   <el-form ref="form"  :model="form"  :rules="rules" label-width="100px">
            <el-form-item label="管理操作" prop="blockType">
              <el-select v-model="form.blockType" placeholder="请选择类型">
                <el-option
                v-for="item in  blockTypes"
                :label="item.label"
                :key="item.label"
                :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="封号或禁言的结束时间" prop="blockUpTime" v-if='form.blockType==4||form.blockType==2'>
                <el-col :span="6">
                  <!-- <el-input v-model='form.blockUpTime' type = 'number'  placeholder="单位为秒计"></el-input> -->
                  <el-date-picker
                          v-model="form.blockUpTime"
                          type="datetime"
                          :editable= false
                          @change='dateChangeEvent'
                          :picker-options="pickerOptions0"
                          placeholder="封禁结束时间">
                        </el-date-picker>
                  </el-col>
                </el-form-item>
            <el-form-item label="用户ID" prop="playerIdArr">
              <el-col :span="10">
                <el-input type="textarea"  placeholder="多个用户ID用逗号(,)分开" v-model="form.playerIdArr"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="">
                      <el-button type="primary" @click="submitForm('form')">确认</el-button>
                      <el-button type="primary" @click="resetForm('form')">重置</el-button>
              </el-form-item>


  </el-form>



  </div>
</template>

<script>



import {dateUtil} from '@/utils'


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
     
      data(){

        return {
    
          
           blockTypes:[
          {
            value:'1',
            label:'踢人'
           },
           {
            value:'2',
            label:'封禁'
          },
           {
            value:'3',
            label:'解禁'
          },
          
           {
            value:'4',
            label:'禁言'
          },
           {
            value:'5',
            label:'解除禁言'
          },
          ],
          form:{
             blockType:'1',
            playerIdArr:'',
            blockUpTime:'',
          },
          pickerOptions0:{
            disabledDate:function(time){
            
                return (new Date().getTime()>time.getTime())
            }
          },
         
           rules: {
          blockType: [
            { required: true, message: '请选择操作类型', trigger: 'blur' }, 
          ],
           playerIdArr: [
            { required: true, message: '请填写名单', trigger: 'blur' }, 
          ],
           blockUpTime: [
            { required: true,  message: '请填写禁言/封禁结束时间', trigger: 'change' }, 
          ],
         
        }
        }
      },
      methods:{
         dateChangeEvent(val){

            this.form.blockUpTime = String(this.form.blockUpTime)
           
         },
        lockplayAction(){
             let option ={}
             // Object.assign(option,this.form) 
             option.playerIdArr =  this.form.playerIdArr.split(',') 
           this.$confirm('是否确认?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.APIkickOff(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {
                      
                    }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });          
              })
        },
        lockUserPlayer(api,option){
            
           this.$confirm('是否确认?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {//
                this.API[api](option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {
                      
                    }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });          
              })

        },
        dispenseAction(){
          let vm = this,
           option = {};
          if (vm.form.blockType ==2||vm.form.blockType ==4) {//封禁 禁言
            option.blockType = 0
            option.playerIdArr =  vm.form.playerIdArr.split(',') 
            option.blockUpTime = vm.form.blockUpTime
            if (vm.form.blockType==4) {
                   option.blockType = 1
            }
            vm.lockUserPlayer('APIblockPlayer',option)

          }
          if (vm.form.blockType ==3||vm.form.blockType ==5) {//解禁 解封
             option.blockType = 0
              option.playerIdArr =  vm.form.playerIdArr.split(',') 
               if (vm.form.blockType==5) {
                     option.blockType = 1
              }
              vm.lockUserPlayer('APIunblockPlayer',option)

          }
          if (vm.form.blockType ==1) {
            vm.lockplayAction()
          }

        },
        submitForm(formName) {//表单确定

            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.dispenseAction()
               
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
       
         resetForm(formName) {//表单重置

        this.$refs[formName]?this.$refs[formName].resetFields():'';
      
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


}
</style>

