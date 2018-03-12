<template>
  <div >  
 <zs-tip :tiptext='tipName'></zs-tip>
 <nav>
        <div class="nav-item" style="display:inline-block">
         <el-button size="small"  type="primary"  class='btn-search-s' @click="postAddList">添加名单</el-button>
         </div>
         <br>
         <div class="nav-item">
              <label>用户ID</label>
              <el-input  v-model="serachform.playerId" size="small" placeholder="用户ID"></el-input>
             
          </div> 
          
       
          <div class="nav-item">
              <label for="">状态</label>
             <el-select  v-model="serachform.state" placeholder="状态"  size="small" >
              <el-option label="所有" value=""></el-option>
              <el-option label="启用中" value="1"></el-option>
             <el-option label="未启用" value="0"></el-option>
            </el-select>
        </div>  
        
          <div class="nav-item">
              <label for="">创建者</label>
              <el-input  v-model="serachform.modifier" size="small" placeholder="创建者"></el-input>
        </div>  
        <br>


        <div class="nav-item">
         <label >时间</label>
                 <el-date-picker
                v-model="serachform.startTime"
                type="datetime"
                :editable=false
                placeholder="选择日期时间">
              </el-date-picker>
        </div>
        <div class="nav-item">
         <label class="date-label">至</label>
         <el-date-picker
                v-model="serachform.endTime"
                type="datetime"
                 :editable=false
                placeholder="选择日期时间">
              </el-date-picker>
        </div>
       
         <div class="nav-item">
         <el-button size="small" class='btn-search-s' type="primary" @click="queryLists">查询</el-button>
         <!--   <el-button size="small" type="primary" class='btn-search-s' @click="confirmDownload">导出xlsx表格</el-button> -->
         </div>
     
        
     </nav>     

      

<!-- 上导航栏 -->
<!-- table -->
          
   <el-table :data="tableData"   align='left' highlight-current-row row-class-name="cell-style"  style="width: 100%">
       
         <el-table-column prop="playerId" label="用户ID" >
        </el-table-column>
         <el-table-column  prop="nickname" label="昵称" >
        </el-table-column>

         <el-table-column  prop="title" label="备注" min-width="120">
          <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p style='max-width:200px'>{{ scope.row.remarks }}</p>
                <div slot="reference" class="name-wrapper" style='text-overflow:ellipsis; white-space:nowrap; overflow:hidden;'>
                 {{  scope.row.remarks }}
                </div>
              </el-popover>
            </template>
        </el-table-column>
         <el-table-column  prop="state" label="状态" >
            <template scope="scope">
              {{scope.row.state==1?'启用中':scope.row.state==0?'未启用':'未知'}}
            </template>
        </el-table-column>
           <el-table-column  prop="modifier" label="创建者" >
        </el-table-column>
            <el-table-column  prop="createTime" label="添加时间" >
              
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template scope="scope">
          <el-button v-if="scope.row.state==0" size="small" type="success" @click="deleteActionRow(scope.$index,scope.row)">{{
           '启用'
          }}</el-button>
        <el-button v-if="scope.row.state==1" size="small" type="danger" @click="deleteActionRow(scope.$index,scope.row)">{{
         '禁用'
          }}</el-button>


            </template>
          </el-table-column>

       
      </el-table>
<!--   //发邮件 -->
    <el-dialog title="添加名单" v-model="dialogAddList"  size="small" :modal-append-to-body = false :close-on-click-modal=false>
      <div class="content">
        <div class="header">
        <el-form ref="form"  :model="form" :rules="rules"  label-width="100px">
             <el-form-item label="用户ID" prop="playerIds" >
              <el-col :span="11">
                <el-input type="textarea" v-model="form.playerIds"  placeholder="多个玩家id用英文逗号分开"></el-input>
              </el-col>
              </el-form-item>
            <el-form-item label="备注"  prop="remarks">
              <el-col :span="11">
                <el-input type="textarea" v-model="form.remarks"  placeholder="备注信息"></el-input>
                 </el-col>
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


    <zspagination :total = total :pagesize="20" @click="handleCurrentChange"></zspagination>
   
   
  </div>
</template>

<script>
import {dateUtil,hsdateUtil} from '@/utils'
import myMixin from '@/mixin/mixinchannel'
const curDate = new Date()
export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
         // vm.queryLists()
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
        
           channels:[],
           hsdateUtil:hsdateUtil,
          allTime:'',
          tipName:'黑名单管理',
          dialogAddList:false,
          serachform:{
            state:'',
            playerId :'',
            modifier:'',
        startTime:new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 0, 0),//开始时间
         endTime:new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 23, 59,59),
          },
         tableData: null,
       
          total:0,
          pageNo:1,
             //表单
          form: {
          playerIds:'',
          remarks:''
          },
         //表单验证
          rules: {
          playerIds: [
            { required: true, message: '请填写玩家ID,多个玩家id用英文逗号分开', trigger: 'blur' },

          ],
            remarks: [
            { required: true, message: '请填写备注信息', trigger: 'blur' },

          ],
        }
         //表单验证
        
         
        }
      },
        mixins: [myMixin],
      methods:{
         beginDownExcl(title){
           let keytitle  = {
            playerId:'用户ID',
            nickname:'昵称',
            modifier:'创建者',
            goodsName:'备注',
            attrValue:'添加时间',

           } ,vm = this ; 
         title = title||'表格'    
          this.exportLists('ApiqueryGlobalBlacklist').then((res)=>{
              if (vm.validateExportData(res)) { return }
              this.dataHanding(res.data)
              this.downloadExl([keytitle,...res.data.rows],title)
           })
          
      

    },
       dataHanding(data){

    
   },
         postAddList(){
         this.resetForm('form')
        this.dialogAddList=true
      },
      ensureAction(){
         let option = {...this.form};
       
            this.API.ApiaddGlobalBlacklist(option).then((res)=>{
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
          this.dialogAddList = false
      },

   deleteActionRow(index,row){
    const {state,id} = row
    let option = {
      id
    }

           this.$confirm(`您要${state==0?'启用':'禁用'}该黑名单, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApideleteGlobalBlacklist(option).then((res)=>{
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
         queryLists(){
         let option = {},vm = this;
         Object.assign(option,this.serachform)
        option.pageNo = this.pageNo
        option.pageSize = 20
        option.startTime = hsdateUtil(option.startTime)
        option.endTime = hsdateUtil(option.endTime)
         this.API.ApiqueryGlobalBlacklist(option).then((res)=>{
          let data = res.data
            
                if (!data||!data.rows||data.rows.length==0) {
                        vm.tableData = []
                        vm.total = 0
                          vm.$message({
                            message: '数据结果为空',
                            type: 'warning'
                          });
                          return 
                   }
              this.dataHanding(data)
              this.total = data.total||0
              this.tableData = data.rows||[]

         })



         },
       
      

         handleCurrentChange(val){
          this.pageNo = val
          this.queryLists()
          this.pageNo = 1
         },

      },


} 
</script>

<style lang="scss" scoped>
@import "~style/common.scss";


    .block{//分页
    margin-top: 80px;
    text-align:center;
  }
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

