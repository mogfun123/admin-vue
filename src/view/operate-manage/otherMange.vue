<template>
  <div class="otherMange-wrapper">
      <el-tabs v-model="activeName">
          <el-tab-pane label="敏感字配置" name="first">
          <nav>
              <div class="nav-item">
                 <el-button size="small"  type="primary" @click="dialogword=true,formSEN.id=''">添加敏感字</el-button> 
              </div>
              <div class="nav-item">
              <label for="id">提示ID:</label>
              <el-input v-model="id" size="small" placeholder=""></el-input>
            </div>  
            <div class="nav-item">
              <label for="sensitiveWord">敏感字:</label>
              <el-input v-model="sensitiveWord" size="small" placeholder=""></el-input> 
            </div>  
          <div class="nav-item">
                 <el-button size="small"  type="primary" @click="queryLists">查询</el-button> 
              </div>
          </nav>
            <!-- table -->
               <el-table :data="tableword" highlight-current-row row-class-name="cell-style" style="width: 100%">
                    <el-table-column prop="id" label="ID" >
                    </el-table-column>
                     
                     <el-table-column prop="sensitiveWord" label="敏感字">
                    </el-table-column>
                     <el-table-column prop="xaddTime" label="创建时间" min-width="200">
                    </el-table-column>
                     <el-table-column prop="xupdTime" label="修改时间" min-width="200">
                    </el-table-column>
                 
                    <el-table-column prop="adminName" label="操作人">
                    </el-table-column>
                     <el-table-column label="操作">
                      <template scope="scope">
                      <el-button size="small"  type="primary" @click="editedAction(scope.$index,scope.row)">编辑</el-button>
                      <el-button size="small"  type="primary" @click="deleteAction(scope.$index,scope.row)">删除</el-button>
                        </template>
                      </el-table-column>   
                  </el-table>
            <!-- table -->
            <!--   //敏感字编辑 -->
    <el-dialog title="敏感字编辑" v-model="dialogword" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="formSEN" :model="formSEN" :rules="rules" label-width="100px">

                 <el-form-item label="提示ID" prop="id">
                     <el-col :span="10">
                      <el-input v-model="formSEN.id" type="number" min="1"></el-input>
                      </el-col>
                    
                  </el-form-item>
                      <el-form-item label="敏感字" prop="sensitiveWord">
                     <el-col :span="10">
                      <el-input v-model="formSEN.sensitiveWord" ></el-input>
                      </el-col>

                </el-form-item>
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('formSEN')">确定</el-button>
        <el-button type="primary" @click="resetForm('formSEN')">取消</el-button>
       
      </span>
    </el-dialog>
<!--   //敏感字编辑 -->
 <!--  //分页 -->
        <div class="block">
           <el-pagination
              @current-change="handleCurrentChangeSEN"
              layout="total, prev, pager, next, jumper"
              :total="pagtotalSEN">
            </el-pagination>
       </div>
     <!-- 分页 -->
          </el-tab-pane>
          <el-tab-pane label="Tips配置" name="second">
         <nav>
              <div class="nav-item">
                 <el-button size="small"  type="primary" @click="dialogTips=true,form.tipsId=''">添加提示</el-button> 
              </div>
              <div class="nav-item">
              <label for="tipsId">提示ID:</label>
              <el-input v-model="tipsId" size="small" placeholder=""></el-input>
            </div>  
            <div class="nav-item">
              <label for="hintContent">提示内容:</label>
              <el-input v-model="hintContent" size="small" placeholder=""></el-input> 
            </div> 
              <div class="nav-item">
              <label for="remark">备注:</label>
              <el-input v-model="remark" size="small" placeholder=""></el-input> 
            </div>  
            <div class="nav-item">
            <div class="blocktime">
              <label class="demonstration">创建时间:</label>
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
                 <el-button size="small"  type="primary" @click="queryTipsList">查询</el-button> 
              </div>
          </nav>
<!-- table -->
           <el-table :data="tableData" highlight-current-row row-class-name="cell-style" style="width: 100%">
            <el-table-column prop="tipsId" label="提示ID" >
            </el-table-column>
            <el-table-column prop="xtipsType" label="提示类型" >
            </el-table-column>
             <el-table-column prop="tipsCount" label="按钮数量" >
            </el-table-column>
             <el-table-column prop="hintContent" label="提示内容">
            </el-table-column>
          
             <el-table-column prop="remark" label="备注" >
              </el-table-column>
               <el-table-column prop="xaddTime" label="创建时间" min-width="120">
              </el-table-column>
               <el-table-column prop="xupdTime" label="修改时间" min-width="120">
              </el-table-column>
             <el-table-column prop="adminName" label="操作人" width="120" >
            </el-table-column>
            <el-table-column label="操作" >
              <template scope="scope">
              <el-button size="small"  type="primary" @click="editorAction(scope.$index,scope.row)">编辑</el-button>
              <el-button size="small"  type="primary" @click="deleteorAction(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
<!-- table -->
  <!--   //添加权限 -->
    <el-dialog title="添加提示" v-model="dialogTips" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">

                 <el-form-item label="提示ID" prop="tipsId">
                     <el-col :span="10">
                      <el-input v-model="form.tipsId" type="number" min="1"></el-input>
                      </el-col>
                    
                  </el-form-item>
                   <el-form-item label="类型" prop="tipsType">
                      <el-select v-model="form.tipsType" placeholder="请选择类型">
                          <el-option label="弹窗" value="1"></el-option>
                          <el-option label="悬浮" value="2"></el-option>
                        </el-select>
                     
                  </el-form-item>
                       <el-form-item label="按钮数量" prop="tipsCount">
                      <el-select v-model="form.tipsCount" placeholder="请选择按钮数量">
                          <el-option label="1" value="1"></el-option>
                          <el-option label="2" value="2"></el-option>
                        </el-select>
                     
                  </el-form-item>
                  
                  
                       <el-form-item label="提示内容" prop="hintContent">
                     <el-col :span="10">
                      <el-input v-model="form.hintContent"></el-input>
                      </el-col>
                  </el-form-item>
                    
                       <el-form-item label="备注" prop="remark">
                     <el-col :span="10">
                      <el-input v-model="form.remark" ></el-input>
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
             
              layout="total, prev, pager, next, jumper"
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
          vm.queryTipsList()
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
           activeName: 'second',
           options: [{
                  value: '选项1',
                  label: '禁用'
                  }, 
                 {
                   value: '选项2',
                   label: '正常'
                  }],
          tableword:null,
         tableData: null,
          sensitiveWord:'',//敏感字
          id:'',//敏感字id
          nickName:"",//昵称
          userName:'',
          iphone:'',//手机号
          tipsId:'',
          hintContent:'',
          remark:'',
          pageNo:'1',
          pagtotal:1,
          pagtotalSEN:1,
          startTime:'',
          endTime:'',
          dialogword:false,
          dialogTips:false,
          formSEN:{
            id:'',
            sensitiveWord:'',

          },
          //表单
          form: {
            tipsId: '',
            tipsType:'1',
            tipsCount: '1',
          tipsCount:'',
          remark:'',
          },
          //表单
          //表单验证
          rules: {
          id: [
            { required: true, message: '请输入敏感词id', trigger: 'blur' },
           
          ],
           sensitiveWord: [
            { required: true, message: '请输入敏感词', trigger: 'blur' },
           
          ],
           tipsId: [
            { required: true, message: '请配置id', trigger: 'blur' },
           
          ],
           tipsType: [
            { required: true, message: '请选择类型', trigger: 'blur' },
           
          ],
           tipsCount: [
            { required: true, message: '请输入按钮数量', trigger: 'blur' },
           
          ],
           hintContent: [
            { required: true, message: '请输入显示内容', trigger: 'blur' },
           
          ],
           remark: [
            { required: true, message: '请输入备注', trigger: 'blur' },
           
          ],
         
        },
          //表单验证
        }
      },
      methods:{
         changEndTime(val){
           this.form.endTime = val
          if (this.form.startTime>val) {
              this.$message(`播放结束时间必须大于播放起始时间`)
              this.form.endTime = " "
          }
          
        },
        changStartTime(val){
         
          this.form.startTime = val
        },
         submitForm(formName) {//表单确定
            this.$refs[formName].validate((valid) => {
              if (valid) {
                (formName=="formSEN")? this.ensureAction():this.ensureActionTip()
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
      resetForm(formName) {//表单重置
        this.$refs[formName].resetFields();
        this.dialogword = false
          this.dialogTips=false
      },
      ensureAction(){//敏感词保存修改

        let option = {}
        option.id = this.formSEN.id
        option.sensitiveWord = this.formSEN.sensitiveWord
        this.API.ApisaveSensitiveWord(option).then((res)=>{
           if (res.data.retcode==1) {
              this.dialogword =false
              this.$message(`${res.data.retmsg}`)
              this.queryLists()
                       }
        })
      },
      deleteAction(index,row){
        let option = {}
        option.wordIds = row.id
         this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelWord(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {

                      this.queryLists()
                    }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              })

      },
      editedAction(index,row){
          this.formSEN.id = row.id.toString()
          this.formSEN.sensitiveWord= row.sensitiveWord.toString()
         
          this.dialogword =true
        


      },
      editorAction(index,row){//tips修改

          this.form.tipsId = row.tipsId.toString()
          this.form.tipsType = row.tipsType.toString()
          this.form.tipsCount = row.tipsCount.toString()
          this.form.hintContent = row.hintContent.toString()
          this.form.remark = row.remark.toString()
              
          this.dialogTips =true

      },
      deleteorAction(index,row){//tips删除
           let option = {}
        option.tipsIds = row.tipsId
         this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelTips(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {

                      this.queryTipsList()
                    }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              })

      },
      ensureActionTip(){//保存修改tips
        let option = {}
        option.tipsId = this.form.tipsId
        option.tipsType = this.form.tipsType
        option.tipsCount = this.form.tipsCount
        option.hintContent = this.form.hintContent
        option.remark = this.form.remark

        this.API.ApisaveTips(option).then((res)=>{
            if (res.data.retcode==1) {
              this.dialogTips =false
              this.$message(`${res.data.retmsg}`)
              this.queryTipsList()
                  }

        })

      },
         handleCurrentChange(val){
             this.pageNo = val
            this.queryTipsList()
            this.pageNo = 1
         },
        handleCurrentChangeSEN(val){
             this.pageNo = val
            this.queryLists()
            this.pageNo = 1
         },
            queryLists(){//查询敏感词列表
            let option = {}
            option.pageNo = this.pageNo
            option.sensitiveWord = this.sensitiveWord
            option.id = this.id
            this.API.ApiquerySensitiveWord(option).then((res)=>{
             this.pagtotalSEN = res.data.total

            res.data.rows.forEach((item)=>{
             
                   
                    item.xaddTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''
                    item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd HH:mm:ss'):''

                   
         
                })

            this.tableword = res.data.rows

            })
         },
     queryTipsList(){//查询tips配置
            let option = {}
            option.pageNo = this.pageNo
             option.tipsId = this.tipsId
              option.hintContent = this.hintContent
               option.remark = this.remark
                option.startTime = this.startTime
              option.endTime = this.endTime
            this.API.ApitipsQueryList(option).then((res)=>{
            this.pagtotal = res.data.total
           
            res.data.rows.forEach((item)=>{
                    let contrast  = item.tipsType
                    item.xaddTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''
                    item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd HH:mm:ss'):''
                   item.xtipsType = contrast==1?"弹窗":contrast==2?"悬浮":''
                  
                   

               })

               this.tableData = res.data.rows


            })
         },
       
        
         
      },
    


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.otherMange-wrapper{
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
     margin-top: 15px;
      font-size: 12px;
        .blocktime{
            .demonstration{
              display: inline-block;
              margin:auto 10px;
              font-size: 12px;
              color: #666;
              font-weight: normal;
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

