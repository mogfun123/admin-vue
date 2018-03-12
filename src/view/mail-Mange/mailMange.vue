<template>
  <div >
 <zs-tip :tiptext='tipName'></zs-tip>
 <nav>

         <div class="nav-item">
              <label>邮件ID</label>
              <el-input  v-model="searchform.id" size="small" placeholder="邮件ID"></el-input>

          </div>

           <div class="nav-item">
            <label class="subtitle">邮件类型</label>
            <el-select style="width:160px" v-model="searchform.emailType" placeholder="邮件类型"  size="small" >
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
              <label for="">邮件标题</label>
              <el-input  v-model="searchform.emailExplain" size="small" placeholder="邮件标题"></el-input>
        </div>

        <div class="nav-item">
            <label class="subtitle">附件类型</label>
            <el-select  style="width:160px" v-model="searchform.accessoryType" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in accessoryTypes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div>
      <br>
       <div class="nav-item">
              <label for="">玩家ID</label>
              <el-input  v-model="searchform.playIds" size="small" placeholder="玩家ID"></el-input>
          </div>

            <div class="nav-item">
              <label for="adminId">创建者</label>
              <el-input  v-model="searchform.adminId" size="small" placeholder="创建者"></el-input>
          </div>

        <div class="nav-item">
         <label >时间</label>
                 <el-date-picker
                v-model="searchform.startTime"
                type="datetime"
                :editable=false
                placeholder="选择日期时间">
              </el-date-picker>
        </div>
        <div class="nav-item">
         <label class="date-label">至</label>
         <el-date-picker
                v-model="searchform.endTime"
                type="datetime"
                 :editable=false
                placeholder="选择日期时间">
              </el-date-picker>
        </div>
      <br>
         <div class="nav-item" tyle="display:inline-block">
         <el-button size="small"  type="primary" class='btn-search-s' @click="queryLists">查询</el-button>
         </div>

         <div class="nav-item" style="display:inline-block">
         <el-button size="small"  type="primary"  class='btn-search-s' @click="resetFormAction">发邮件</el-button>
         </div>



</nav>


<!-- 上导航栏 -->
<!-- table -->

   <el-table :data="tableData"   align='left' highlight-current-row row-class-name="cell-style"  style="width: 100%">

      <!--   <el-table-column prop="xgameType" label="游戏类型" width="100">
        </el-table-column> -->

         <el-table-column prop="id" label="邮件ID" >
        </el-table-column>
         <el-table-column  prop="xemailType" label="邮件类型" >
        </el-table-column>
         <el-table-column  prop="emailExplain" label="邮件标题" min-width="120">
            <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p style='max-width:200px'>{{ scope.row.emailExplain }}</p>
                <div slot="reference" class="name-wrapper" style='text-overflow:ellipsis; white-space:nowrap; overflow:hidden;'>
                 {{  scope.row.emailExplain }}
                </div>
              </el-popover>
            </template>
        </el-table-column>
         <el-table-column prop="emailContent" label="邮件内容" min-width="200">
            <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p style='max-width:200px'>{{ scope.row.emailContent }}</p>
                <div slot="reference" class="name-wrapper" style='text-overflow:ellipsis; white-space:nowrap; overflow:hidden;'>
                 {{  scope.row.emailContent }}
                </div>
              </el-popover>
            </template>
        </el-table-column>
          <el-table-column  prop="xaccessoryType" label="附件类型"  >
        </el-table-column>
         <el-table-column
            label="附件内容(道具id*数量)"
           min-width="200">

             <template scope="scope">
              <el-popover trigger="hover" placement="top">
               <!--  <p style='max-width:200px'>{{ scope.row.xprops }}</p> -->
                 <p style='max-width:200px'>{{ scope.row.xprops }}</p>
                <div slot="reference" class="name-wrapper" style='text-overflow:ellipsis; white-space:nowrap; overflow:hidden;'>
                 {{  scope.row.xprops }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
        <!--   <el-table-column  prop="xprops" label="附件内容(道具id*数量)" min-width="250" >
        </el-table-column> -->
          <el-table-column  label="玩家名单"  min-width="200">
               <template scope="scope">
              <el-popover trigger="hover" placement="top">
                  <p style='max-width:200px;white-space:normal;word-wrap: break-word'>{{ scope.row.playIds }}</p>
                <div slot="reference" class="name-wrapper" style='text-overflow:ellipsis; white-space:nowrap; overflow:hidden;'>
                 {{  scope.row.playIds }}
                </div>
              </el-popover>
            </template>
        </el-table-column>

         <el-table-column  prop="xaddtime" label="创建时间" min-width="160">
          </el-table-column>
           <el-table-column  prop="adminName" label="创建者" >
        </el-table-column>
         <el-table-column label="邮件状态" width="160">
          <template scope="scope">
          <el-button size="small"  type="primary" :disabled="scope.row.emailStatus!==0" @click="editOperation(scope.$index,scope.row)">编辑</el-button>

          <el-button size="small"  type="primary" :disabled="scope.row.emailStatus!==0" @click="sendMail(scope.$index,scope.row)">{{emailStatusTypes[scope.row.emailStatus]}}</el-button>
            </template>
          </el-table-column>

      </el-table>
<!-- table -->

<!--   //发邮件 -->
    <el-dialog title="发邮件" v-model="dialogMail"  size="small" :modal-append-to-body = false :close-on-click-modal=false>
      <div class="content">
        <div class="header">
        <el-form ref="form"  :model="form" :rules="rules"  label-width="100px">
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
             <!--    <el-option :disabled="true"label="实物兑换" value="2"></el-option> -->
                <el-option  label="道具" value="3"></el-option>

              </el-select>
            </el-form-item>
             <el-form-item label="邮件标题" prop="emailExplain" >
                <el-input type="textarea" :maxlength = 40 v-model="form.emailExplain"  placeholder="最多40个字符"></el-input>
              </el-form-item>
             <el-form-item label="邮件内容" prop="emailContent">
                <el-input type="textarea" :maxlength =180   :rows="4" v-model="form.emailContent"  placeholder="最多180个字符"></el-input>
              </el-form-item>

                <el-form-item label="钻石" v-if="/^[12]$/g.test(form.accessoryType)">
                     <el-col :span="10">
                      <el-input v-model="form.diamond" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                    <el-form-item label="玩家ID"v-if="/^[2]$/g.test(form.accessoryType)"  prop="playIds">
                     <el-col :span="10">
                      <el-input v-model="form.playIds" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                     </el-form-item>
                <el-form-item label="道具配置" v-if="/^[3]$/g.test(form.accessoryType)">
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
                        <el-input v-model="item.propSize" type="number" min="1" ></el-input>
                            </el-col>
                       </template>
                    <el-col :span="24">
                      <span style="color:red">注:实物道具请单独发放,并且每次只能发放一个;一般道具每次发放数量不要超过99个</span>
                      </el-col>
                  </el-form-item>
                <el-form-item label="筹码数量"v-if="/^[1]$/g.test(form.accessoryType)"  prop="chipSize">
                     <el-col :span="10">
                      <el-input v-model="form.chipSize" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
               <el-form-item label="玩家名单"v-if="form.accessoryType!=='2'&&form.emailType!=0"  prop="playIds" >
                <el-input type="textarea" v-model="form.playIds"  placeholder="填0时向当前全服玩家发送,多个玩家用逗号隔开" ></el-input>
              </el-form-item>
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
   <zspagination :total = pagtotal :pagesize="10" @click="handleCurrentChange"></zspagination>

     <!-- 分页 -->
  </div>
</template>

<script>
import {dateUtil,hsdateUtil} from '@/utils'


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
         var validatePass = (rule, value, callback) => {
          if (/^(\d+,)*[\d]+$/g.test(value)) {
            callback();
          } else { 
             return callback(new Error('请输入正确形式的文本'));
           
          }
        };

        return {
          tipName:"后台邮件",
          searchform:{
            id:'',
            emailType:'',
            emailExplain:'',
            accessoryType:'',
            playIds:'',
            adminId:'',
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
         endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),
          },
          accessoryTypes:[{
                  value: '',
                  label: '所有'
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
                   label: '道具类'
                  },
                  {
                  value: '4',
                  label: '文本'
                  },],
          emailStatusTypes:{
              '0':'发送',
              '1':'已发送',
              '2':'发送失败'
          },
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
          emailExplain:'',
          pagtotal:0,
          pageNo:1,
          //表单
          form: {
            emailType: "0",
            emailExplain: '',
            emailContent:'',
            accessoryType:'4',
            // mailContent:'',
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
               
            ]
           
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
             { validator: validatePass, trigger: 'blur' },
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
      handerResponse(res){
        let vm = this 

                  res.data.rows.forEach((item)=>{
                    item.xaddtime = hsdateUtil(item.addTime)
                    item.xaccessoryType = vm.accessoryTypes[item.accessoryType].label||''
                    item.xemailType =vm.emailTypes[item.emailType].label||''
                    item.xprops = item.attachmentContent
               })
      },
         queryLists(){
         let option = {}

          Object.assign(option,this.searchform)
          option.pageNo = this.pageNo
          option.pageSize = 10
          option.startTime = hsdateUtil(option.startTime)
          option.endTime = hsdateUtil(option.endTime)
  
         this.API.ApiemailQueryList(option).then((res)=>{
            this.handerResponse(res)
              this.pagtotal = res.data.total||0
              if (res.data&&res.data.rows.length===0) {
                this.tableData = []
              }else{
               this.tableData = res.data.rows
              }



         })



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

          while(this.form.props.length<3){
                let op = {propId:'',propSize:0}
                this.form.props.push(op)
          }

         },
         sendMail(index,row){//发送邮件
           let option = {}
          option.id = row.id

           this.$confirm('您要发送改邮件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApiupdEmailStatus(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)


                      this.queryLists()

                })

              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
              })


         },
         ensureAction(){//发送邮件
             let option = {};

        
           Object.assign(option,this.form)
      
            if (this.form.accessoryType==1) {//筹码
              if (this.form.emailType==0) {//系统
                     delete option.playIds 
                   }

            }

            if(this.form.accessoryType==2){//实物兑换

            }

            if(this.form.accessoryType==3){//道具
                  delete option.chipSize
                  delete option.diamond
                let arr = this.form.props.filter((item)=>{
                  return item.propId&&item.propSize
                })
               if (arr.length==0) {
                  this.$message(`道具配置第一行不能为空`)
                return
               }
               option.propsStr = JSON.stringify(arr)
                if (this.form.emailType==0) {//系统  
                 delete option.playIds 
                }


            }

            if(this.form.accessoryType==4){//文本
                  delete option.chipSize
                  delete option.diamond
                if (this.form.emailType==0) {//系统
                  delete option.playIds 
                }

            }

          delete option.props
          if (!option.id) {
               delete option.id
          }

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
          this.dialogMail = false
      },


      },


}
</script>

<style lang="scss" scoped>
@import "~style/common.scss";


   .el-dialog__footer{
  text-align: center;
}


    .nav-item{
    label{
      width:60px;}
      .el-input.el-input--small{
        width: 160px;
      }
  }


</style>

