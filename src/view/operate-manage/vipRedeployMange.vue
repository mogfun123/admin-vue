<template>
  <div class="vipMange-wrapper">
      <el-tabs v-model="activeName">
          <el-tab-pane label="VIP基础属性" name="first">
            <!-- table -->
               <el-table :data="tableDatabase" highlight-current-row row-class-name="cell-style" style="width: 100%">
                    <el-table-column prop="buyMoney" label="VIP购买费用(¥)" >
                    </el-table-column>
                     
                     <el-table-column prop="renewMoney" label="VIP续约费用(¥)" >
                    </el-table-column>
                     <el-table-column prop="continueDay" label="持续时间(天)" >
                    </el-table-column>
                     <el-table-column prop="experience" label="每日经验扣减" >
                    </el-table-column>
                    <el-table-column prop="xupdTime" label="修改时间" min-width="120">
                      </el-table-column>
                    <el-table-column prop="adminName" label="操作人">
                    </el-table-column>
                     <el-table-column label="操作" >
                      <template scope="scope">
                      <el-button size="small"  type="primary" @click="editrAction(scope.$index,scope.row)">编辑</el-button>
                        </template>
                      </el-table-column>   
                  </el-table>
            <!-- table -->
            <!--   //基础属性 -->
    <el-dialog title="发邮件" v-model="dialogVipBase" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="formVIP" :model="form1" :rules="rules" label-width="100px">

                 <el-form-item label="VIP购买费用">
                     <el-col :span="10">
                      <el-input v-model="form1.buyMoney" type="number" min="1"></el-input>
                      </el-col>
                      元
                  </el-form-item>
                      <el-form-item label="VIP续约费">
                     <el-col :span="10">
                      <el-input v-model="form1.renewMoney" type="number" min="1"></el-input>
                      </el-col>
                      元
                  </el-form-item>
                      <el-form-item label="持续时间">
                     <el-col :span="10">
                      <el-input v-model="form1.continueDay" type="number" min="1"></el-input>
                      </el-col>
                      天
                  </el-form-item>
                      <el-form-item label="每日经验扣减">
                     <el-col :span="10">
                      <el-input v-model="form1.experience" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                    

              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('formVIP')">确定</el-button>
        <el-button type="primary" @click="resetForm('formVIP')">取消</el-button>
       
      </span>
    </el-dialog>
<!--   //基础属性 -->
          </el-tab-pane>
          <el-tab-pane label="VIP权限" name="second">
              <div class="nav-second">
                 <el-button size="small"  type="primary" @click="dialogVipPower=true,form.manageId=''">添加VIP等级</el-button>
              </div>
<!-- table -->
           <el-table :data="tableData" highlight-current-row row-class-name="cell-style" style="width: 100%">
            <el-table-column prop="vipGrade" label="VIP等级" width="80">
            </el-table-column>
            <el-table-column prop="updateExprience" label="升级所需要的经验" width="80">
            </el-table-column>
             
             <el-table-column prop="chipDay" label="每天领取的筹码" width="80">
            </el-table-column>
             <el-table-column prop="presented" label="购买筹码赠送(%)" width="80">
            </el-table-column>
             <el-table-column prop="subsidyCount" label="免费补助次数" width="80">
            </el-table-column>
          
             <el-table-column prop="awardProp" label="奖励道具1" width="80">
              </el-table-column>
               <el-table-column prop="awardCount" label="数量1" width="80">
              </el-table-column>
               <el-table-column prop="awardProp2" label="奖励道具2" width="80">
              </el-table-column>
               <el-table-column prop="awardCount2" label="数量2" width="80">
              </el-table-column>
                 <el-table-column prop="awardProp3" label="奖励道具3" width="80">
              </el-table-column>
               <el-table-column prop="awardCount3" label="数量3" width="80">
              </el-table-column>
               <el-table-column prop="xaddTime" label="创建时间" width="150">
              </el-table-column>
               <el-table-column prop="xupdTime" label="修改时间" width="150">
              </el-table-column>
             <el-table-column prop="adminName" label="操作人" width="120" >
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template scope="scope">
              <el-button size="small"  type="primary" @click="editedAction(scope.$index,scope.row)">编辑</el-button>
              <el-button size="small"  type="primary" @click="vipGrade(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
<!-- table -->
  <!--   //添加权限 -->
    <el-dialog title="发邮件" v-model="dialogVipPower" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">

                 <el-form-item label="VIP等级" prop="vipGrade">
                     <el-col :span="10">
                      <el-input v-model="form.vipGrade" type="number" min="1"></el-input>
                      </el-col>
                    
                  </el-form-item>
                      <el-form-item label="升级所需要经验" prop="updateExprience">
                     <el-col :span="10">
                      <el-input v-model="form.updateExprience" type="number" min="1"></el-input>
                      </el-col>
                     
                  </el-form-item>
                      <el-form-item label="每天领取的筹码" prop="chipDay">
                     <el-col :span="10">
                      <el-input v-model="form.chipDay" type="number" min="1"></el-input>
                      </el-col>
                     
                  </el-form-item>
                   <el-form-item label="购买筹码赠送" prop="presented">
                     <el-col :span="10">
                      <el-input v-model="form.presented" type="number" min="1"></el-input>
                      </el-col>
                     %
                  </el-form-item>
                   <el-form-item label="免费补助次数" prop="subsidyCount">
                     <el-col :span="10">
                      <el-input v-model="form.subsidyCount" type="number" min="1"></el-input>
                      </el-col>
                     
                  </el-form-item>
                   <el-form-item label="奖励道具1">
                     <el-col :span="10">
                      <el-input v-model="form.awardProp" type="number" min="1"></el-input>
                      </el-col>
                     
                  </el-form-item>
                   <el-form-item label="数量1">
                     <el-col :span="10">
                      <el-input v-model="form.awardCount" type="number" min="1"></el-input>
                      </el-col>
                     
                  </el-form-item>
                   <el-form-item label="奖励道具2">
                     <el-col :span="10">
                      <el-input v-model="form.awardProp2" type="number" min="1"></el-input>
                      </el-col>
                     
                  </el-form-item>
                      <el-form-item label="数量2">
                     <el-col :span="10">
                      <el-input v-model="form.awardCount2" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                       <el-form-item label="奖励道具3">
                     <el-col :span="10">
                      <el-input v-model="form.awardProp3" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                    
                       <el-form-item label="数量3">
                     <el-col :span="10">
                      <el-input v-model="form.awardCount3" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                    

              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button type="primary" @click="resetForm('form')">取消</el-button>
       
      </span>
    </el-dialog>
<!--   //添加权限 -->
 <!--  //分页 -->
        <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
           <el-pagination
             
              @current-change="handleCurrentChange"
             
              layout="total,prev, pager, next, jumper"
              :total="pagtotal">
            </el-pagination>
       </div>
     <!-- 分页 -->
       </el-tab-pane>
   </el-tabs>


  </div>
</template>

<script>
import {dateUtil} from '@/utils'

export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
          vm.queryLists()
          vm.queryMemberManageQueryList()
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
           options: [{
                  value: '选项1',
                  label: '禁用'
                  }, 
                 {
                   value: '选项2',
                   label: '正常'
                  }],
          tableDatabase: null,
         tableData:null,
          nickName:"",//昵称
          iphone:'',//手机号
          dialogVipBase:false,
          dialogVipPower:false,
          pageNo:1,
          pagtotal:0,
          //表单
          form1:{
            buyMoney:0,
            experience:0,
            continueDay:0,
            id:0,
            renewMoney:0,


          },
          form: {
            manageId:1,
            vipGrade:1,
            updateExprience:1,
            chipDay:1,
            presented:1,
            subsidyCount:1,
            awardProp2:'',
            awardProp:'',
            awardProp3:'',
            awardCount:'',
            awardCount2:'',
            awardCount3:'',
          },
          //表单
          //表单验证
          rules: {
          vipGrade: [
            { required: true, message: '请输入VIP等级', trigger: 'blur' },
          ],
            updateExprience: [
            { required: true, message: '请输入升级所需要的经验', trigger: 'blur' },
          ],
            chipDay: [
            { required: true, message: '请输入每天领取的筹码数', trigger: 'blur' },
          ],
            presented: [
            { required: true, message: '请输入购买赠送的筹码数', trigger: 'blur' },
          ],
            subsidyCount: [
            { required: true, message: '请输入免费补助次数', trigger: 'blur' },
          ],
         
          
        },
          //表单验证
        }
      },
      methods:{

          submitForm(formName) {//表单确定
            this.$refs[formName].validate((valid) => {
              if (valid) {
                (formName=="formVIP")? this.ensureAction():this.ensureActionS()
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
      resetForm(formName) {//表单重置
        this.$refs[formName].resetFields();
        this.dialogVipBase = false
          this.dialogVipBase=false
      },
      editedAction(index,row){
           this.form.manageId = row.manageId
         this.form.vipGrade = row.vipGrade.toString()
            this.form.updateExprience= row.updateExprience.toString()
          this.form.chipDay= row.chipDay.toString()
       this.form.presented= row.presented.toString()
         this.form.subsidyCount= row.subsidyCount.toString()
      this.form.awardProp= row.awardProp
    this.form.awardProp2= row.awardProp2
         this.form.awardProp3= row.awardProp3
          this.form.awardCount3= row.awardCount3
            this.form.awardCount= row.awardCount
          this.form.awardCount2= row.awardCount2
           this.dialogVipPower = true


      },
      vipGrade(index,row){
        let option = {}
        option.manageIds = row.manageId
         this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelMemberManage(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {

                      this.queryMemberManageQueryList()
                    }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              })

      },
      editrAction(index,row){
          this.dialogVipBase=true
          this.form1.buyMoney = row.buyMoney
          this.form1.continueDay = row.continueDay
          this.form1.experience = row.experience
          this.form1.id = row.id
          this.form1.renewMoney = row.renewMoney

      },
      ensureAction(){
        let option = {}
        option.buyMoney = this.form1.buyMoney
         option.continueDay = this.form1.continueDay
         option.experience = this.form1.experience
         option.id = this.form1.id
         option.renewMoney = this.form1.renewMoney

        this.API.ApiupdateMember(option).then((res)=>{
           this.$message(`${res.data.retmsg}`)
            this.dialogVipBase=false
            this.queryLists()


        })


      },
      ensureActionS(){
          let option = {}
           option.manageId = this.form.manageId
          option.vipGrade = this.form.vipGrade
           option.updateExprience = this.form.updateExprience
           option.chipDay = this.form.chipDay
           option.presented = this.form.presented
           option.subsidyCount = this.form.subsidyCount
            option.awardProp = this.form.awardProp
           option.awardProp2 = this.form.awardProp2
           option.awardProp3 = this.form.awardProp3
           option.awardCount3 = this.form.awardCount3
            option.awardCount = this.form.awardCount
           option.awardCount2 = this.form.awardCount2
          

          this.API.ApisaveMemberManage(option).then((res)=>{
             this.$message(`${res.data.retmsg}`)
              this.dialogVipPower=false
                this.queryMemberManageQueryList()

          })
      },
        
       
       queryLists(){//查询基础属性
            let option = {}
            this.API.ApimemberQuery(option).then((res)=>{
                if (res.data.retcode==1) {
                  let data = res.data.data.goMember
                  data.adminName = res.data.data.adminName
                 
                   data.xupdTime = dateUtil.format(data.updTime||data.addTime,'yyyy-MM-dd HH:mm:ss')

                 this.tableDatabase  = [data]
                }

            })
         },
     queryMemberManageQueryList(){//查询基础属性
            let option = {}
            option.pageNo = this.pageNo
            this.API.ApimemberManageQueryList(option).then((res)=>{
                 this.pagtotal = res.data.total
           
            res.data.rows.forEach((item)=>{
                    let contrast  = item.accessoryType
                    item.xaddTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''
                    item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd HH:mm:ss'):''
                 
                  
                   

               })

               this.tableData = res.data.rows


            })
         },
       
         handleCurrentChange(val){
          this.pageNo = val
          this.queryMemberManageQueryList()
          this.pageNo = 1

         }
        
         
      },
    


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.vipMange-wrapper{
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
.nav-second{
  margin:10px ;
  margin-top: 0px;
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
        .querybtn{
           border:none;
          border-radius:0px;
          margin-left: 25px;
          height: 25px;
         font-size: 12px;
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

