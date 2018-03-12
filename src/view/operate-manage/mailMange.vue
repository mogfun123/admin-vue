<template>
  <div class="mailMange-wrapper">  
  <div class="nav-top">
       <el-button size="small"  type="primary" @click="resetFormAction">发邮件</el-button> 
  </div>
  
    <nav>     
        <div class="nav-item">
              <label for="">邮件ID:</label>
              <el-input v-model="id" size="small" placeholder=""></el-input>
             
          </div>  
           <div class="nav-item">
            <label class="subtitle">邮件类型：</label>
            <el-select v-model="emailType" placeholder="请选择"  size="small" >
            <el-option label="所有" value=""></el-option>
              <el-option
                v-for="item in emailTypes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
          <div class="nav-item">
              <label for="">邮件标题:</label>
              <el-input v-model="emailExplain" size="small" placeholder=""></el-input>
        </div>  
        <div class="nav-item">
            <label class="subtitle">附件类型：</label>
            <el-select v-model="accessoryType" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in accessoryTypes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
           <div class="nav-item">
              <label for="">玩家ID:</label>
              <el-input v-model="playIds" size="small" placeholder=""></el-input>
          </div>  
            <div class="nav-item">
              <label for="adminId">创建者:</label>
              <el-input v-model="adminId" size="small" placeholder=""></el-input>
          </div> 
          <div class="nav-item">
            <div class="blocktime">
              <span class="demonstration">创建时间</span>
              <el-date-picker
                  v-model="startTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                 @change="changStartTime" 
                  >
                </el-date-picker>
              </div>
               <div class="blocktime">
               <span class="demonstration">至</span>
                <el-date-picker
                  v-model="endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                   @change="changEndTime" 
                  >
                </el-date-picker>
              </div>
          </div> 

         <div class="nav-item">
              <el-button size="small"  type="primary" @click="queryLists">查询</el-button>
         </div>
      
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData"  border style="width: 100%">
       
      <!--   <el-table-column prop="xgameType" label="游戏类型" width="100">
        </el-table-column> -->
         
         <el-table-column align="center" prop="id" label="邮件ID" width="120">
        </el-table-column>
         <el-table-column align="center" prop="xemailType" label="邮件类型" width="100">
        </el-table-column>
         <el-table-column align="center" prop="emailExplain" label="邮件标题" width="200">
        </el-table-column>
         <el-table-column align="center" prop="emailContent" label="邮件内容" width="200">
        </el-table-column>
          <el-table-column align="center" prop="xaccessoryType" label="附件类型" width="100">
        </el-table-column>
          <el-table-column align="center" prop="xprops" label="附件内容" width="200">
        </el-table-column>
          <el-table-column align="center" prop="playIds" label="玩家名单" width="120">
        </el-table-column>
         
         <el-table-column align="center" prop="xaddtime" label="创建时间" min-width="160">
          </el-table-column>
           <el-table-column align="center" prop="adminName" label="创建者" >
        </el-table-column>
         <el-table-column label="邮件状态" width="160">
          <template scope="scope">
          <el-button size="small"  type="primary" :disabled="scope.row.emailStatus!==0" @click="editOperation(scope.$index,scope.row)">编辑</el-button>

          <el-button size="small"  type="primary" :disabled="scope.row.emailStatus!==0" @click="sendMail(scope.$index,scope.row)">{{scope.row.emailStatus==0?'发送':'已发送'}}</el-button>
            </template>
          </el-table-column>
       
      </el-table>
<!-- table -->

<!--   //发邮件 -->
    <el-dialog title="发邮件" v-model="dialogMail" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form"  :model="form" :rules="rules" label-width="100px">
            <el-form-item label="邮件类型" prop="emailType">
              <el-select v-model="form.emailType" placeholder="请选择活动区域">
                <el-option
                v-for="item in emailTypes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>

             <el-form-item label="附件类型" prop="accessoryType">
              <el-select v-model="form.accessoryType" placeholder="请选择活动区域">
               <el-option label="文本" value="4"></el-option>
                <el-option label="筹码" value="1"></el-option>
                <el-option :disabled="true"label="实物兑换" value="2"></el-option>
                <el-option  label="礼包" value="3"></el-option>
               
              </el-select>
            </el-form-item>
             <el-form-item label="邮件标题" prop="emailExplain">
                <el-input type="textarea" v-model="form.emailExplain"></el-input>
              </el-form-item>
             <el-form-item label="邮件内容" prop="emailContent">
                <el-input type="textarea" v-model="form.emailContent"></el-input>
              </el-form-item>

                <el-form-item label="钻石" v-if="form.accessoryType=='1'||form.accessoryType=='2'">
                     <el-col :span="10">
                      <el-input v-model="form.diamond "type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                    <el-form-item label="玩家ID"v-if="form.accessoryType=='2'"  prop="playIds">
                     <el-col :span="10">
                      <el-input v-model="form.playIds" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                     </el-form-item>
                <el-form-item label="礼包配置" v-if="form.accessoryType=='3'">
                    <!--  <el-col :span="10">
                      道具id
                      <el-input v-model="form.proobjA.propId" type="number" min="1"></el-input>
                      <el-input v-model="form.proobjB.propId" type="number" min="1"></el-input>
                      <el-input v-model="form.proobjC.propId" type="number" min="1"></el-input>
                      <el-input v-model="form.proobjD.propId" type="number" min="1"></el-input>
                      <el-input v-model="form.proobjE.propId" type="number" min="1"></el-input>
                      </el-col>
                      <el-col :span="10">
                      道具数量
                      <el-input v-model="form.proobjA.propSize" type="number" min="1"></el-input>
                      <el-input v-model="form.proobjB.propSize" type="number" min="1"></el-input>
                      <el-input v-model="form.proobjC.propSize" type="number" min="1"></el-input>
                      <el-input v-model="form.proobjD.propSize" type="number" min="1"></el-input>
                      <el-input v-model="form.proobjE.propSize" type="number" min="1"></el-input>
                      </el-col> -->
                       <el-col :span="10">
                      道具id
                       </el-col>
                        <el-col :span="10">
                      道具数量
                       </el-col>
                       <template v-for="item in form.props">
                        <el-col :span="10">
                        <el-input v-model="item.propId" type="number" min="1"></el-input>
                            </el-col>
                          <el-col :span="10">
                        <el-input v-model="item.propSize" type="number" min="1"></el-input>
                            </el-col>
                       </template>
                    
                      </el-col>
                  </el-form-item>
                <el-form-item label="筹码数量"v-if="form.accessoryType=='1'"  prop="chipSize">
                     <el-col :span="10">
                      <el-input v-model="form.chipSize" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
               <el-form-item label="玩家名单"v-if="form.accessoryType!=='2'&&form.emailType!=0"  prop="playIds" >
                <el-input type="textarea" v-model="form.playIds"  placeholder="填0时向当前全服玩家发送,多个玩家用逗号隔开" ></el-input>
              </el-form-item>
               <!--  <el-form-item label="邮件预览" prop="mailContent">
                <el-input type="textarea" v-model="form.mailContent"></el-input>
              </el-form-item> -->
          
            
           
        
         

          
              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button type="primary" @click="resetForm('form')">取消</el-button>
       
      </span>
    </el-dialog>
<!--   //发邮件 -->
 <!--  //分页 -->
     <div class="block">
          <el-pagination
        
            @current-change="handleCurrentChange"
            :size ='10'
            layout="total,  prev, pager, next, jumper"
            :total="pagtotal">
          </el-pagination>
      </div>
     <!-- 分页 -->
  </div>
</template>

<script>
import {dateUtil} from '@/utils'


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
      name:"freezeMange",
      data(){

        return {
          tipName:"管理员",
          emailType:'',
          accessoryType:'',
          accessoryTypes:[{
                  value: '',
                  label: '所有'
                  },{
                  value: '4',
                  label: '文本'
                  }, 
                 {
                   value: '1',
                   label: '筹码类'
                  },
                   {
                   value: '2',
                   label: '实物兑换券类'
                  },
                   {
                   value: '3',
                   label: '礼包类'
                  }],
          emailTypes: [
                   {
                  value: '0',
                  label: '系统邮件'
                  }, 
                {
                   value: '1',
                   label: '个人'
                  },
                   {
                   value: '2',
                   label: '节日'
                  }],         
          gametypes: [{
                  value: '1',
                  label: '全平台'
                  }, 
                 {
                   value: '2',
                   label: '德州扑克'
                  }],
         tableData: null,
        dialogMail:false,
          mid:'',
          id:'',
          // plaryIds:"",
          emailExplain:'',
          pagtotal:0,
          pageNo:1,
          playIds:'',
          adminId:'',
          // gameType:'1',
          userName:'',
          startTime:'',
          endTime:'',
          //表单
          form: {
            emailType: "0",
            emailExplain: '',
            emailContent:'',
            accessoryType:'4',
            mailContent:'',
            playIds:'',
            id:'',
            // plaryIds:'',
            chipSize:'',
            // palyers:'',
            diamond:'',
            props:[
                {propId:'',propSize:0},
                {propId:'',propSize:0},
                {propId:'',propSize:0},
                {propId:'',propSize:0},
                {propId:'',propSize:0},
            ]
            // proobjA:{propId:'',propSize:0},
            // proobjB:{propId:'',propSize:0},
            // proobjC:{propId:'',propSize:0},
            // proobjD:{propId:'',propSize:0},
            // proobjE:{propId:'',propSize:0},
          },
          //表单
          //表单验证
          rules: {
          emailType: [
            { required: true, message: '请选择邮件类型', trigger: 'blur' },
            
          ],
           emailContent: [
            { required: true, message: '请选择邮件内容', trigger: 'blur' },
            
          ],
          accessoryType: [
            { required: true, message: '请选择附件类型', trigger: 'blur' }
          ],
          emailExplain: [
            { required: true, message: '请填写邮件标题', trigger: 'blur' }
          ],
          
           mailContent: [
            { required: true, message: '请输入邮件预览', trigger: 'blur' }
          ],
          //  palyers: [
          //   { required: true, message: '请选输入玩家名单', trigger: 'blur' }
          // ],
           playIds: [
            { required: true, message: '请输入玩家id', trigger: 'blur' }
          ],
           chipSize: [
            { required: true,  message: '请输入筹码数量', trigger: 'blur' }
          ],
           propId: [
            { required: true, message: '请填写道具id', trigger: 'blur' }
          ],
        
        },
          //表单验证
        }
      },
      methods:{
      resetFormAction(){
        this.resetForm('form')
        this.dialogMail=true

      },
         queryLists(){
         let option = {}
          // option.gameType = this.gameType
          option.emailType = this.emailType
          option.emailExplain = this.emailExplain
          option.accessoryType= this.accessoryType
          option.id=this.id
           option.playIds = this.playIds
          option.startTime = this.startTime
          option.endTime = this.endTime
          option.adminId = this.adminId
            option.pageNo = this.pageNo

         this.API.ApiemailQueryList(option).then((res)=>{
            this.pagtotal = res.data.total
           
            res.data.rows.forEach((item)=>{
             
                    let contrast  = item.accessoryType
                    item.xaddtime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''
                 
                    item.xaccessoryType = contrast==1?"筹码类":contrast==2?"实物兑换类":contrast==3?"礼包类":contrast==4?"文本":''
                     contrast  = item.emailType
                     item.xemailType = contrast==0?"系统邮件":contrast==1?"玩家个人":contrast==2?"节日":''
                     //  contrast  = item.gameType
                     // item.xgameType = contrast==1?"全平台":contrast==2?"德州扑克":''
                     item.xprops = item.attachmentContent
                    // item.props.forEach((item1)=>{
                    //   item.xprops += '道具id:'+item1.propId + ' X 筹码数量:' +item1.propSize +','
                    // })
                   

               })

               this.tableData = res.data.rows



         })



         },
        changEndTime(val){
           this.endTime = val
          if (this.startTime>val) {
              this.$message(`结束时间必须大于起始时间`)
              this.endTime = " "
          }
          
        },
        changStartTime(val){
         
          this.startTime = val
        },

         handleCurrentChange(val){
          this.pageNo = val
          this.queryLists()
          this.pageNo = 1


         },
          editOperation(index,row){//编辑
       
          this.dialogMail = true
         
          Object.assign(this.form,row)
          this.form.emailType =  this.form.emailType.toString()
          this.form.accessoryType =  this.form.accessoryType.toString()
          this.form.chipSize =  this.form.chipSize.toString()
          
          while(this.form.props.length<5){
                let op = {propId:'',propSize:0}
                this.form.props.push(op)
          }
         
         },
         sendMail(index,row){//发送邮件
           let option = {}
          option.id = row.id
         
           this.$confirm('您要发送该邮件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApiupdEmailStatus(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {

                      this.queryLists()
                    }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });          
              })


         },
         ensureAction(){//发送邮件
             let option = {},
                props = {};
                // arrs= [this.form.proobjA,this.form.proobjB,this.form.proobjC,this.form.proobjD,this.form.proobjE]
              
           option.emailType = this.form.emailType
          option.emailContent = this.form.emailContent
          option.emailExplain = this.form.emailExplain
          option.accessoryType= this.form.accessoryType
          option.chipSize= this.form.chipSize
          option.diamond= this.form.diamond
           option.playIds = this.form.playIds
           option.id = this.form.id
           // Object.assign(option,this.form)
            if (this.form.accessoryType==1) {//筹码
              //  let obj = {
              //   propSize:this.form.propSize,
              //   propId:this.form.propId
              //  }
              // option.propsStr = JSON.stringify([obj])
            if (this.form.emailType==0) {//系统
                    option.playIds = ''
                }else{//个人与节日
                   
                }


            }else if(this.form.accessoryType==2){//实物兑换
          

            }else if(this.form.accessoryType==3){//礼包
              let arr = this.form.props.filter((item)=>{
                return item.propId&&item.propSize
              })
             if (arr.length==0) {
                this.$message(`第一行不能为空`)
              return 
             }
               option.propsStr = JSON.stringify(arr)
                if (this.form.emailType==0) {//系统
                    option.chipSize= ''
                    option.diamond= ''
                    option.playIds = ''
                }else{//个人与节日
                    option.chipSize= ''
                    option.diamond= ''
                }


            }else if(this.form.accessoryType==4){//文本
                if (this.form.emailType==0) {//系统
                    option.chipSize= ''
                    option.diamond= ''
                    option.playIds = ''
                }else{//个人与节日
                    option.chipSize= ''
                    option.diamond= ''
                }

            }

            // if (this.form.accessoryType!=='2'&&this.form.emailType!=0) {

            // }else{
            //     option.playIds = ''
            // }
            //  if (this.form.accessoryType=='4') {
            //        option.chipSize= ''
            //     option.diamond= ''
            //     // option.playIds = ''
            // }

         

            this.API.ApiaddEmail(option).then((res)=>{
               this.$message(`${res.data.retmsg}`)
              if (res.data.retcode==1) {
                this.resetForm('form')
                this.queryLists()
                 
              }

          })

         },
          submitForm(formName) {//表单确定cho
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.ensureAction()
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
      resetForm(formName) {//表单重置

        this.$refs[formName]?this.$refs[formName].resetFields():'';
        Object.assign(this.form, this.$options.data().form)
        console.log(this.form)

          this.dialogMail = false
      },
        
         
      },


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.mailMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    .block{//分页
    margin-top: 80px;
    text-align:center;
  }
   .el-dialog__footer{
  text-align: center;
}
  .nav-top{
    margin-left: 10px;
    margin-top: 10px;
  }
  nav{
  // height: 25px;
  line-height: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  font-size: 12px;
  margin: 20px auto;
  margin-top: 10px;
  .nav-item{
    display: flex;
     align-items:center;
     min-width: 150px;
     margin-left: 10px;
     margin-top: 10px;
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
        
         
          
          margin-bottom: 0px;
            
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

