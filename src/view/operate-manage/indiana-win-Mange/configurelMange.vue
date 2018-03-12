<template>
  <div >  
 <zs-tip :tiptext='tipName'></zs-tip>
 <nav>
        <div class="nav-item" style="display:inline-block">
         <el-button size="small"  type="primary"  class='btn-search-s' @click="postAddList">添加配置</el-button>
         </div>
         <br>
         <div class="nav-item">
              <label >玩家id</label>
              <el-input  v-model="serachform.playerId" size="small" placeholder="玩家id"></el-input>
             
          </div> 
          

          <div class="nav-item">
              <label style='width:90px'>夺宝场期数</label>
              <el-input  v-model="serachform.baseId" type="number"  size="small" placeholder="夺宝场期数"></el-input>
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
       
      <!--   <el-table-column prop="xgameType" label="游戏类型" width="100">
        </el-table-column> -->
         
         <el-table-column prop="playerId" label="用户ID" >
        </el-table-column>
         <el-table-column  prop="nickname" label="昵称" >
        </el-table-column>
          <el-table-column  prop="baseId" label="夺宝场期数" >
        </el-table-column>
          <el-table-column  prop="bvType" label="配置类型" >
              <template scope="scope">
                {{scope.row.bvType==1?'白名单':'黑名单'}}
              </template>
        </el-table-column>
         <el-table-column  prop="remarks" label="备注" min-width="120">
          <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p style='max-width:200px'>{{ scope.row.remarks }}</p>
                <div slot="reference" class="name-wrapper" style='text-overflow:ellipsis; white-space:nowrap; overflow:hidden;'>
                 {{  scope.row.remarks }}
                </div>
              </el-popover>
            </template>
        </el-table-column>
           <el-table-column  prop="modifier" label="创建者" >
        </el-table-column>
            <el-table-column  prop="createTime" label="添加时间" min-width="120">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template scope="scope">
          <el-button size="small"  type="primary" :disabled="scope.row.state!=1" @click="deleteActionRow(scope.$index,scope.row)">{{scope.row.state==1?'撤销':scope.row.state==0?'已撤销':'已生效'}}</el-button>

            </template>
          </el-table-column>

       
      </el-table>
<!--   //发邮件 -->
    <el-dialog title="添加配置" v-model="dialogAddList"  size="small" :modal-append-to-body = false :close-on-click-modal=false>
      <div class="content">
        <div class="header">
        <el-form ref="form"  :model="form" :rules="rules"  label-width="100px">
             <el-form-item label="玩家id" prop="playerId" >
               <el-col :span="11">
                <el-input type="text" v-model="form.playerId"  placeholder="玩家id"></el-input>
              </el-col>
              </el-form-item>
               <el-form-item label="夺宝场期数" prop="baseId">
                  <el-col :span="10">
                <el-input type="number" v-model="form.baseId"  placeholder="请输入夺宝场期数ID"></el-input>
              </el-col>
              </el-form-item>
                <el-form-item label="配置类型" prop="bvType">
               <el-select style="width:160px" v-model="form.bvType" placeholder="配置类型"  size="small" >
              <el-option label="白名单" value="1"></el-option>
             <el-option label="黑名单" value="0"></el-option>
            </el-select>
              </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-col :span="15">
                <el-input type="textarea" :rows="3" v-model="form.remarks"  placeholder="备注信息"></el-input>
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
          allTime:'',
          tipName:'中奖配置管理',
          dialogAddList:false,
          serachform:{
            playerId :'',
            baseId:'',
            modifier:'',
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
         endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),
          },
         tableData: null,
       
          total:0,
          pageNo:1,
             //表单
          form: {
            playerId:'',
            baseId:'',
            bvType:'1',
            remarks:''
          },
         //表单验证
          rules: {
          playerId: [
            { required: true, message: '请填写玩家ID', trigger: 'blur' },

          ],
            baseId: [
            { required: true, message: '请填写夺宝场期号', trigger: 'blur' },

          ],
           bvType: [
            { required: true, message: '请选择类型', trigger: 'blur' },

          ],
           remarks: [
            { required: true, message: '请填写备注', trigger: 'blur' },

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
        // this.resetForm('form')
        this.dialogAddList=true
      },
      ensureAction(){
         let option = {...this.form};
       
            this.API.ApiaddMatchBlackOrWhite(option).then((res)=>{
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
    const {id} = row
    let option = {id}

           this.$confirm('您要撤销该配置, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApiupdMatchBlackWhite(option).then((res)=>{
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
         this.API.ApiqueryAwardConfigureList(option).then((res)=>{
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


  //   .nav-item{
  //   label{
  //     width:60px;}
  //     .el-input.el-input--small{
  //       width: 160px;
  //     }
  // }


</style>

