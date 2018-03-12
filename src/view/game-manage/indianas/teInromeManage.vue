<template>
  <div class="activityMange-wrapper">
    <!-- <zs-tip :tiptext='tipName'></zs-tip>
      <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
    <!-- 导航栏 -->
 
           
    <nav>     
<!--         <div class="nav-item">
              <label for="keywords">房间id</label>
              <el-input  size="small" placeholder=""></el-input>
             
        </div>   -->

       <el-button type="primary" size="small"  @click="queryLists">搜索</el-button>
      
      <el-button type="primary" size="small"  @click="dialogAddRome = true,form.roomId=''">添加房间</el-button>
    
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55">
          </el-table-column>
        <el-table-column prop="minChipSize" label="入场需求筹码" width="160">
        </el-table-column>
         
         <el-table-column prop="maxChipSize" label="最大携带筹码" width="160">
        </el-table-column>
         <el-table-column prop="minBlindNote" label="小盲注" width="120">
        </el-table-column>
          <el-table-column prop="onLineNumber" label="牌桌上限" width="120">
        </el-table-column>
         <el-table-column prop="cid" label="台桌背景图" width="220">
          <template scope="scope">
                        <img v-if="scope.row.deskBackdrop" :src="scope.row.deskBackdrop" class="avatar">
                </template>
        </el-table-column>
            <el-table-column prop="cid" label="房间背景图" width="220">
          <template scope="scope">
                        <img v-if="scope.row.pokerBackdrop" :src="scope.row.pokerBackdrop" class="avatar">
                </template>
        </el-table-column>
        <el-table-column prop="adminName" label="操作人" width="100">
        </el-table-column>
         <el-table-column label="操作" width="200">
          <template scope="scope">
          <el-button size="small"  type="primary" @click="editorActionFist(scope.$index,scope.row)">修改</el-button>
          <el-button size="small"  type="primary" @click="deleteActionFirst(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
         
      </el-table>
      <div class="deletemint">
        <el-button type="primary" size="small" @click="selectionDelete">多选删除</el-button>
      </div>
       
<!-- table -->
<!--   //添加房间 -->
    <el-dialog title="添加房间" v-model="dialogAddRome" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form"  :model="form" :rules="rules" label-width="100px">
              <el-form-item label="入场需求筹码" prop="minChipSize">
                     <el-col :span="14">
                      <el-input v-model="form.minChipSize" ></el-input>
                      </el-col>
                </el-form-item>
             <el-form-item label="最大携带筹码" prop="maxChipSize">
                     <el-col :span="14">
                      <el-input v-model="form.maxChipSize" ></el-input>
                      </el-col>
                </el-form-item>
              <el-form-item label="小盲注" prop="minBlindNote">
                     <el-col :span="14">
                      <el-input v-model="form.minBlindNote" type="number" min="1"></el-input>
                      </el-col>
                    </el-form-item>
                <el-form-item label="牌桌上线人数" prop="onLineNumber">
                     <el-col :span="14">
                      <el-input v-model="form.onLineNumber" type="number" min="1"></el-input>
                      </el-col>
                </el-form-item>
               <el-form-item label="台桌背景图" prop="deskBackdrop" >
                <el-col :span="14">
                      <el-upload
                      class="avatar-uploader"
                      :action="API.UPLOADURL"
                      :show-file-list="false"
                     
                      :on-success="handleAvatarSuccessT"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="form.deskBackdrop" :src="form.deskBackdrop" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     </el-upload>
                </el-col>
              </el-form-item>
            <el-form-item label="房间背景图"  prop="pokerBackdrop"> >
                <el-col :span="14">
                      <el-upload
                      class="avatar-uploader"
                      :action="API.UPLOADURL"
                      :show-file-list="false"
                     

                      :on-success="handleAvatarSuccessR"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="form.pokerBackdrop" :src="form.pokerBackdrop" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     </el-upload>
                </el-col>
              </el-form-item>


          
              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button type="primary" @click="resetForm('form')" >返回</el-button>
      </span>
    </el-dialog>
<!--   //添加房间 -->

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
      
      data(){

        return {
        
         tableData:null,
        multipleSelection: [],//多选
         dialogAddRome:false,
        pagtotal:1,
          labelPosition:"left",
          cimgslist:[],
           //表单
          form: {
           roomId:'',
           playId:'',
           minChipSize:'',
           maxChipSize:'',
           minBlindNote:'',
           onLineNumber:'',
           // trailerTime:'',
           pokerBackdrop:'',
           deskBackdrop:'',//台桌背景
           // danId:'',
           // maxBlindNote:'',
           // maxIntegral:'',
           // integralPump:'',           
          },
          //表单
          //表单验证
          rules: {
         
          minChipSize: [
            { required: true, message: '请输入入场需求筹码', trigger: 'blur' },
            
          ],
          maxChipSize: [
            { required: true, message: '请输入最大携带筹码', trigger: 'blur' },
            
          ],
          minBlindNote: [
            { required: true, message: '请输入小盲注', trigger: 'blur' },
            
          ],
          onLineNumber: [
            { required: true, message: '请输入桌牌上限人数', trigger: 'blur' },
            
          ],
          // isTrailer: [
          //   { required: true, message: '请输入活动名称', trigger: 'blur' },
            
          // ],
          // trailerTime: [
          //   { required: true, message: '请输入活动名称', trigger: 'blur' },
            
          // ],
          pokerBackdrop: [
            { required: true, message: '请输入房间背景', trigger: 'blur' },
            
          ],
            deskBackdrop: [
            { required: true, message: '请选择台桌背景', trigger: 'blur' },
            
          ],


         
        },
          //表单验证
        }
      },
      methods:{
          changEndTime(val){

           this.form.endTime = val
          if (this.form.startTime>val) {
              this.$message(`结束时间必须大于起始时间`)
              this.form.endTime = " "
          }
          
        },
        changStartTime(val){
         
          this.form.startTime = val
        },
        handleSelectionChange(val) {
        this.multipleSelection = val;
       
      }, 
      beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传图片只能是 PNG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
      },
     
       handleAvatarSuccessT(res, file) {
          this.form.deskBackdrop =res.data;
           
      },
       handleAvatarSuccessR(res, file) {
          this.form.pokerBackdrop =res.data;
           
      },
        editorActionFist(index,row){//1基础道具编辑
          this.dialogAddRome = true
          for(let key in row){
             row[key] = (row[key]||'').toString()
          }

           Object.assign(this.form,row)
           // this.cimgslist = row.cimgs.split(',').map((item)=>{

           //  return {name:'',url:item}
           // })


        },
        deleteActionFirst(index,row){
          let option = {}
          option.rids = row.roomId
           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelRoom(option).then((res)=>{
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
        queryLists(){
           let option = {}
         
            this.API.ApiroomQueryPage(option).then((res)=>{
            
            res.data.rows.forEach((item)=>{
                 this.pagtotal = res.data.total
                  // item.xaddTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd hh:mm:ss'):''
                 
                  // item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd hh:mm:ss'):''

                 

            })
           
              this.tableData = res.data.rows


           },(res)=>{})

         },
         ensureAction(){
          let option = {};

          Object.assign(option,this.form)
          option.playId = 1

            this.API.ApisaveRoom(option).then((res)=>{

              if (res.data.retcode==1) {
                this.resetForm("form")
                this.queryLists()
              
              }

            })




         },

         handleCurrentChange(val){
           this.pageNo = val
           this.queryLists()
           this.pageNo = 1

         },
    selectionDelete(){//多选删除
        let option = {
          rids:[]
        }
           
            if (this.multipleSelection.length==0) {
              this.$message(`请选择要删除的项`)
              return 
            }
        this.multipleSelection.forEach((item)=>{
                option.rids.push(item.roomId)
        })

           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelRoom(option).then((res)=>{
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
         submitForm(formName) {//表单确定
            this.$refs[formName].validate((valid) => {
              if (valid) {
               this.ensureAction()
              } else {
                console.log('error submit!!');
                return false;
              }
            })
      },
      resetForm(formName) {//表单重置
       
        this.$refs[formName].resetFields();
         this.dialogAddRome =false
          

           // trailerTime:'',
          //台桌背景
           // danId:'',
           // maxBlindNote:'',
           // maxIntegral:'',
           // integralPump:'',  


      },

        
         
      },


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.activityMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    .block{//分页
    margin-top: 80px;
    text-align:center;
  }
  .deletemint{
    margin-top: 40px;
  }
    .el-dialog__footer{
    text-align: center;
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
   
        label{
          margin-bottom: 0px;
          min-width: 40px;
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

