<template>
  <div class="registration-wrapper"> 
  <zs-tip :tiptext='tipName'></zs-tip>
   <el-form ref="form"  style='margin-top:20px' :model="form"  :rules="rules" label-width="100px">
            <el-form-item label="管理操作" prop="blockType">
              <el-select style="width:180px" v-model="form.blockType" placeholder="请选择类型">
                <el-option
                v-for="item in  blockTypes"
                :label="item.label"
                :key="item.label"
                :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="封禁至" prop="blockUpTime" v-if='form.blockType==4||form.blockType==2'>
               
                  <!-- <el-input v-model='form.blockUpTime' type = 'number'  placeholder="单位为秒计"></el-input> -->
                  <el-date-picker
                          v-model="form.blockUpTime"
                          type="datetime"
                           style="width:180px"
                          :editable= false
                          @change='dateChangeEvent'
                          :picker-options="pickerOptions0"
                          placeholder="封禁结束时间">
                        </el-date-picker>
                 
                </el-form-item>
              <el-form-item label="用户" v-if='/^[^167]$/.test(form.blockType)'>
                         
               <el-select  style="width:180px" v-model="form.playerType" placeholder="请选择类型">
                <el-option
                v-for="item in  playerTypes"
                :label="item.label"
                :key="item.label"
                :value="item.value">
              </el-option>
              </el-select>
              </el-form-item>

               <el-form-item label="" prop="players"  v-if='/^[^167]$/.test(form.blockType)'>
                <el-input style="width:250px" :maxlength = 800 :rows="5" type="textarea"  placeholder="多个用户用逗号(,)分开" v-model="form.players"></el-input>
               </el-form-item>
                <el-form-item label="用户id" prop="players"  v-if='form.blockType ==1'>
                <el-input style="width:250px" :maxlength= 800 :rows="5" type="textarea"  placeholder="多个用户用逗号(,)分开" v-model="form.players"></el-input>
                  </el-form-item>

                 <el-form-item label="用户id" prop="players"  v-if='/^[67]$/.test(form.blockType)'>
                <el-input style="width:250px"   :rows="2" type="number"   placeholder="单个用户id" v-model="form.players"></el-input>
               </el-form-item>
               <el-form-item label="备注" prop="operateNote">
                <el-input style="width:250px" :maxlength= 800 :rows="5" type="textarea"  placeholder="备注信息" v-model="form.operateNote"></el-input>
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
         var validatePass = (rule, value, callback) => {
          if (/^(\d+,)*[\d]+$/g.test(value)) {
            callback();
          } else { 
             return callback(new Error('请输入正确形式的文本'));
           
          }
        };
           

        return {
    
          tipName:'用户操作',
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
           {
            value:'6',
            label:'删除玩家'
          },
           {
            value:'7',
            label:'恢复玩家'
          },
          ],
          playerTypes:[
           {
            value:'0',
            label:'ID'
          },
           {
            value:'1',
            label:'账号'
          },
          {
            value:'2',
            label:'昵称'
          },
          ],
          form:{
           blockType:'1',
            players:'',
            blockUpTime:'',
            playerType:'0',
            operateNote:'',
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
            operateNote: [
            { required: true, message: '请填写备注信息', trigger: 'blur' }, 
          ],
           players: [
             { validator: validatePass, trigger: 'blur' },
            { required: true, message: '请填写正确格式名单', trigger: 'blur' }, 
          ],
          
           blockUpTime: [
            { required: true,  message: '请填写禁言/封禁结束时间', trigger: 'change' }, 
          ],
         
        }
        }
      },
      methods:{
         dateChangeEvent(val){
         
            this.form.blockUpTime = val
          
           
         },
        lockplayAction(){
             let option ={}
             // Object.assign(option,this.form) 
             option.operateNote = this.form.operateNote
             option.playerIdArr =  this.form.players.split(',') 
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
          deleteOrRecoverUserPlayer(api,option){
            
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
           option.operateNote = this.form.operateNote
           option.playerType = this.form.playerType
          if (vm.form.blockType ==1) {

              vm.lockplayAction()
          }
          if (/^[24]$/.test(vm.form.blockType)) {//封禁 禁言
            option.blockType = 0
            option.players =  vm.form.players
            option.blockUpTime = vm.form.blockUpTime
            if (vm.form.blockType==4) {
                   option.blockType = 1
            }
            vm.lockUserPlayer('APIblockPlayer',option)

          }
          if (/^[35]$/.test(vm.form.blockType)) {//解禁 解封
             option.blockType = 0
              option.players =  vm.form.players
               if (vm.form.blockType==5) {
                     option.blockType = 1
              }
              vm.lockUserPlayer('APIunblockPlayer',option)

          }
         
          if (/^[67]$/.test(vm.form.blockType)) {
            let option = {}
            let apistr = vm.form.blockType==6?'ApigameUserdeletePlayer':vm.form.blockType==7?'ApigameUserrecoverPlayer':''
            option.playerId = vm.form.players
            option.operateNote = vm.form.operateNote
            if (/^\d+$/g.test(option.playerId)) {
                vm.deleteOrRecoverUserPlayer(apistr,option)
               
            }else{
              vm.$message({
                  type: 'info',
                  message: '用户id不能含有特殊符号'
                }); 
            }
           
            
               
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
          this.form = this.$options.data().form
      
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

